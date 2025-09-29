// src/components/FileList.tsx
import { File, AlertCircle, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ProcessedData } from "@/lib/services/fileProcessor";

// src/types/index.ts
export interface FileMetadata {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  status: "idle" | "uploading" | "processing" | "completed" | "error";
  progress: number;
  error?: string;
  preview?: string;
  fileObject?: File; // Optional to preserve the original File object
}

export interface DocumentMetadata {
  documentType?: string;
  pageCount?: number;
  wordCount: number;
  charCount: number;
  fileType: string;
}

export interface ProcessedDocument {
  summary?: string;
  keyPoints?: string[];
  metadata?: {
    documentType?: string;
    pageCount?: number;
  };
}

export interface ApiResponse {
  success: boolean;
  data?: ProcessedData;
  error?: string;
  timestamp: string;
}

interface FileListProps {
  files: FileMetadata[];
}

export const FileList = ({ files }: FileListProps) => {
  if (files.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="mb-4 text-lg font-semibold">Uploaded Files</h3>
      <div className="space-y-2">
        {files.map(file => (
          <div
            key={file.id}
            className="flex items-center rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent/5"
          >
            <div className="mr-3 text-muted-foreground">
              <File className="h-5 w-5" />
            </div>
            <div className="mr-3 min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
              <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
              {file.status === "uploading" && (
                <div className="mt-2">
                  <Progress value={file.progress} className="h-1" />
                </div>
              )}
              {file.error && <p className="mt-1 text-xs text-destructive">{file.error}</p>}
              {file.preview && <p className="mt-1 text-xs text-muted-foreground">Preview: {file.preview}</p>}
            </div>
            <div className="flex-shrink-0">
              {file.status === "completed" ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : file.status === "error" ? (
                <AlertCircle className="h-5 w-5 text-destructive" />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
