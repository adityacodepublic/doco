import { GoogleGenAI, createUserContent, createPartFromUri, Type, GenerateContentConfig } from "@google/genai";
import z from "zod";

const notifiySchema = z.object({
  questionId: z.string().describe("ID of the question, only if notifyQuestion object is given in the prompt"),
  isAnswerable: z.boolean().describe("Boolean output: true if data is related to the question, false otherwise"),
  answer: z.string().optional().describe("Markdown-formatted answer, only provided if isAnswerable is true"),
});

const documentSchema = z.object({
  departmentName: z
    .string()
    .describe(
      'Name of department ("engineering" or "design") if it belongs to them; otherwise suggest a new department name.'
    ),
  title: z.string().describe("Short title describing the document"),
  keyPointsSummary: z.array(z.string()).describe("Key points summary: what happened, reasons, and extra details"),
  usePali: z
    .boolean()
    .describe(
      "Boolean indicating if the document contains complex, unparsable images (true) or normal plain text (false)"
    ),
  notifiy: z
    .array(notifiySchema)
    .describe("Array of notifications with questionId, isAnswerable flag, and answer if applicable"),
});

export type ProcessedData = z.infer<typeof documentSchema>;

const key = z.string().min(1).parse(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);

const ai = new GoogleGenAI({ apiKey: key });

export const processFile = async (file: File, departments?: string[]): Promise<ProcessedData | Error> => {
  if (file.size === 0) {
    return Error(`File "${file.name}" is empty (0 bytes). Please select a valid file.`);
  }

  try {
    const uploadedFile = await ai.files.upload({
      file: file,
      config: { mimeType: file.type },
    });

    const prompt = `Extract and structure the key information from this document. 
    Provide a summary and key points in the following JSON format:

    {
      "departmentName": "name of department from ${departments ? JSON.stringify(departments) : "[]"} if it belongs to them else suggest a new department name.",
      "title": "short title desribing the document", 
      "keyPointsSummary": ["what has happened", "any reason for happening", "any extra details"],
      "usePali":"boolean, if document contain complex unparsable images, or different language other than english then yes, if normal plain text document then no",
      "notifiy": [
        "answer":"if it isAnswerable (true) then answer in markdown formatted string"
      ]
    }`;

    const config: GenerateContentConfig = {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          departmentName: {
            type: Type.STRING,
          },
          title: {
            type: Type.STRING,
          },
          keyPointsSummary: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
          usePali: {
            type: Type.BOOLEAN,
          },
          notifiy: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                questionId: {
                  type: Type.STRING,
                },
                isAnswerable: {
                  type: Type.BOOLEAN,
                },
                answer: {
                  type: Type.STRING,
                },
              },
              propertyOrdering: ["questionId", "isAnswerable", "answer"],
            },
          },
        },
        propertyOrdering: ["departmentName", "title", "keyPointsSummary", "usePali", "notifiy"],
        // Allow departmentName to be omitted
        required: ["departmentName", "title", "keyPointsSummary", "usePali", "notifiy"],
      },
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: createUserContent([createPartFromUri(uploadedFile.uri!, uploadedFile.mimeType!), prompt]),
      config: config,
    });

    const responseText = response.text || "";
    let processedData: ProcessedData | null = null;

    try {
      processedData = documentSchema.parse(JSON.parse(responseText || ""));
    } catch (e) {
      return Error("Cound not parse data.");
    }

    return processedData ?? Error("Cound not parse correct data.");
  } catch (error) {
    console.error("Error processing file with Google GenAI:", error);
    // Fallback to basic file reading if AI processing fails
    return Error("Could not parse file. ai error");
  }
};
