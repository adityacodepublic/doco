"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, Suspense } from "react";
import LearningsSection from "@/components/documents/LearningsSection";
import { useMorphik } from "@/contexts/morphik-context";
import { useRouter, useSearchParams } from "next/navigation";
import { useHeader } from "@/contexts/header-context";

function DocumentsContent() {
  const { apiBaseUrl, authToken } = useMorphik();
  const router = useRouter();
  const searchParams = useSearchParams();

  const folderParam = searchParams?.get("folder") || null;
  const [currentFolder, setCurrentFolder] = useState<string | null>(folderParam);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [allFoldersExpanded, setAllFoldersExpanded] = useState(false);
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const { setCustomBreadcrumbs } = useHeader();

  // Sync folder state with URL param changes
  useEffect(() => {
    setCurrentFolder(folderParam);
  }, [folderParam]);

  // // Listen for events from LearningsSection
  // useEffect(() => {
  //   const handleSelectionChange = (event: CustomEvent<{ selectedDocuments?: string[] }>) => {
  //     setSelectedDocuments(event.detail?.selectedDocuments || []);
  //   };

  //   const handleWorkflowCountChange = (event: CustomEvent<{ count?: number }>) => {
  //     setWorkflowCount(event.detail?.count || 0);
  //   };

  //   const handleOpenNewFolderDialog = () => {
  //     setShowNewFolderDialog(true);
  //   };

  //   const handleToggleExpandAllFolders = () => {
  //     setAllFoldersExpanded(prev => !prev);
  //   };

  //   const handleOpenUploadDialog = () => {
  //     setShowUploadDialog(true);
  //   };

  //   window.addEventListener("documentsSelectionChanged", handleSelectionChange as EventListener);
  //   window.addEventListener("workflowCountChanged", handleWorkflowCountChange as EventListener);
  //   window.addEventListener("openNewFolderDialog", handleOpenNewFolderDialog);
  //   window.addEventListener("toggleExpandAllFolders", handleToggleExpandAllFolders);
  //   window.addEventListener("openUploadDialog", handleOpenUploadDialog);

  //   return () => {
  //     window.removeEventListener("documentsSelectionChanged", handleSelectionChange as EventListener);
  //     window.removeEventListener("workflowCountChanged", handleWorkflowCountChange as EventListener);
  //     window.removeEventListener("openNewFolderDialog", handleOpenNewFolderDialog);
  //     window.removeEventListener("toggleExpandAllFolders", handleToggleExpandAllFolders);
  //     window.removeEventListener("openUploadDialog", handleOpenUploadDialog);
  //   };
  // }, []);

  // Set breadcrumbs when component mounts
  useEffect(() => {
    setCustomBreadcrumbs([{ label: "Home", href: "/" }, { label: "Knowledge Center" }]);
  }, [setCustomBreadcrumbs]);

  // Handle folder navigation
  const handleFolderClick = (folderName: string | null) => {
    setCurrentFolder(folderName);
    if (folderName) {
      router.push(`/learnings?folder=${encodeURIComponent(folderName)}`);
    } else {
      router.push("/learnings");
    }
  };

  return (
    <LearningsSection
      apiBaseUrl={apiBaseUrl}
      authToken={authToken}
      initialFolder={folderParam}
      onDocumentUpload={undefined}
      onDocumentDelete={undefined}
      onDocumentClick={undefined}
      onFolderCreate={undefined}
      onFolderClick={handleFolderClick}
      onRefresh={undefined}
      onViewInPDFViewer={(documentId: string) => {
        router.push(`/pdf?document=${documentId}`);
      }}
      allFoldersExpanded={allFoldersExpanded}
      showNewFolderDialog={showNewFolderDialog}
      setShowNewFolderDialog={setShowNewFolderDialog}
      showUploadDialog={showUploadDialog}
      setShowUploadDialog={setShowUploadDialog}
    />
  );
}

export default function DocumentsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DocumentsContent />
    </Suspense>
  );
}
