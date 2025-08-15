import { useState } from "react";
import { analyzeDocumentRequest } from "../api/analyzeRequest";
import { AnalyzeDocumentResponse } from "../api/types";
import { AppState, ProcessingStep } from "../types/app";
import { initialProcessingSteps } from "../config/initialData";

export const useDocumentAnalysis = () => {
  const [appState, setAppState] = useState<AppState>("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [apiResponse, setApiResponse] =
    useState<AnalyzeDocumentResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>(
    initialProcessingSteps
  );

  const processDocumentWithAPI = async (file: File) => {
    // Using functional update to get the latest steps state
    const updateStep = (index: number, updates: Partial<ProcessingStep>) => {
      setProcessingSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        newSteps[index] = { ...newSteps[index], ...updates };
        return newSteps;
      });
    };

    try {
      // Step 1: Upload simulation
      updateStep(0, { current: true });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      updateStep(0, { current: false, completed: true });

      // Step 2: Extract text simulation
      updateStep(1, { current: true });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      updateStep(1, { current: false, completed: true });

      // Step 3: Actual API call
      updateStep(2, { current: true });
      const response = await analyzeDocumentRequest(file);
      updateStep(2, { current: false, completed: true });

      // Step 4: Identify key clauses
      updateStep(3, { current: true });
      await new Promise((resolve) => setTimeout(resolve, 800));
      updateStep(3, { current: false, completed: true });

      // Step 5: Compile insights
      updateStep(4, { current: true });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      updateStep(4, { current: false, completed: true });

      // Store the API response and transition to results
      setApiResponse(response);
      setTimeout(() => {
        setAppState("results");
      }, 500);
    } catch (err) {
      console.error("Error processing document:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );
      setAppState("error");
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setAppState("processing");
    setError(null);
    setProcessingSteps(initialProcessingSteps); // Reset steps for new upload
    processDocumentWithAPI(file);
  };

  const handleNewDocument = () => {
    setAppState("upload");
    setUploadedFile(null);
    setApiResponse(null);
    setError(null);
    setProcessingSteps(initialProcessingSteps);
  };

  const handleRetry = () => {
    if (uploadedFile) {
      setAppState("processing");
      setError(null);
      setProcessingSteps(initialProcessingSteps);
      processDocumentWithAPI(uploadedFile);
    }
  };

  return {
    appState,
    uploadedFile,
    apiResponse,
    error,
    processingSteps,
    handleFileUpload,
    handleNewDocument,
    handleRetry,
  };
};
