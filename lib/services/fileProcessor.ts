import { GoogleGenAI, createUserContent, createPartFromUri, Type, GenerateContentConfig } from "@google/genai";
import z from "zod";
import { getAllDepartments } from "./notifications";

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
    .array(z.string())
    .describe("Array of notifications with questionId, isAnswerable flag, and answer if applicable"),
});

export type ProcessedData = z.infer<typeof documentSchema>;

const key = z.string().min(1).parse(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);

const ai = new GoogleGenAI({ apiKey: key });

export const processFile = async (file: File, departments?: string[]): Promise<ProcessedData | Error> => {
  if (file.size === 0) {
    return Error(`File "${file.name}" is empty (0 bytes). Please select a valid file.`);
  }
  const dept = await getAllDepartments();
  const questions = { departments: dept.map(d => ({ dept: d.name, questions: d.questions })) };

  try {
    const uploadedFile = await ai.files.upload({
      file: file,
      config: { mimeType: file.type },
    });

    const prompt = `Extract and structure the key information from this document. 
    Provide a summary and key points in the following JSON format:

    these are the departments and their questions: ${questions ? JSON.stringify(questions) : "[]"}.

    {
      "departmentName": "Identify the most relevant department from ${departments ? JSON.stringify(departments) : "[]"} that the document belongs to. If none match, suggest a new appropriate department name.",
      "title": "A short, concise title describing the main subject of the document.",
      "keyPointsSummary": [
        "What has happened or what the document is about",
        "Any reasons or causes mentioned",
        "Any extra relevant details or context"
      ],
      "usePali": "boolean — true if the document contains complex or unparsable images, or if it uses a language other than English; false if it’s a normal plain-text English document.",
      "notifiy": [
        "If the document contains questions related to the identified department and they can be answered, include your answers as an array of strings. Otherwise, return an empty array."
      ]
    }   
    `;

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
              type: Type.STRING,
            },
          },
        },
        propertyOrdering: ["departmentName", "title", "keyPointsSummary", "usePali", "notifiy"],
        // Allow departmentName to be omitted
        required: ["departmentName", "title", "keyPointsSummary", "usePali", "notifiy"],
      },
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
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
