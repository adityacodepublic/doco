import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadZoneProps {
  onFilesAdded: (files: File[]) => void;
  isUploading: boolean;
  accept?: string | Record<string, string[]>;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({ onFilesAdded, isUploading, accept }) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesAdded(acceptedFiles);
      setIsDragging(false);
    },
    [onFilesAdded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    maxSize: 1024 * 1024 * 1024, // 1GB
    disabled: isUploading,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "rounded-lg border-2 border-dashed p-8 transition-all duration-200 ease-in-out",
        "flex min-h-[200px] flex-col items-center justify-center gap-4 text-center",
        isDragging || isDragActive
          ? "border-primary bg-primary/5 shadow-lg"
          : "border-primary/40 bg-card hover:bg-accent/5",
        isUploading ? "cursor-progress" : "cursor-pointer",
        isUploading && "opacity-75"
      )}
    >
      <input {...getInputProps()} />
      {isUploading ? (
        <>
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-base text-muted-foreground">Processing files...</p>
        </>
      ) : (
        <>
          <Upload
            className={cn(
              "h-12 w-12 transition-colors",
              isDragging || isDragActive ? "text-primary" : "text-muted-foreground"
            )}
          />
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-foreground">
              {isDragActive ? "Drop the files here" : "Drag & drop files here, or click to select files"}
            </h3>
            <p className="text-sm text-muted-foreground">
              Files will be automatically placed in their respective department section.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploadZone;
