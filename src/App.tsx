import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DocumentUpload from "./components/DocumentUpload";
import ProcessingState from "./components/ProcessingState";
import ResultsDashboard from "./components/ResultsDashboard";
import { analyzeDocumentRequest } from "./api/analyzeRequest";
import { AnalyzeDocumentResponse } from "./api/types";

type AppState = "upload" | "processing" | "results" | "error";

interface ProcessingStep {
  id: string;
  label: string;
  completed: boolean;
  current: boolean;
}

function App() {
  const [appState, setAppState] = useState<AppState>("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [apiResponse, setApiResponse] =
    useState<AnalyzeDocumentResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([
    {
      id: "upload",
      label: "Uploading document...",
      completed: false,
      current: false,
    },
    {
      id: "extract",
      label: "Extracting text content...",
      completed: false,
      current: false,
    },
    {
      id: "analyze",
      label: "Analyzing legal structure...",
      completed: false,
      current: false,
    },
    {
      id: "identify",
      label: "Identifying key clauses and terms...",
      completed: false,
      current: false,
    },
    {
      id: "compile",
      label: "Compiling insights and summary...",
      completed: false,
      current: false,
    },
  ]);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setAppState("processing");
    setError(null);
    processDocumentWithAPI(file);
  };

  const processDocumentWithAPI = async (file: File) => {
    const steps = [...processingSteps];

    const updateStep = (
      index: number,
      current: boolean,
      completed: boolean = false
    ) => {
      steps[index].current = current;
      steps[index].completed = completed;
      setProcessingSteps([...steps]);
    };

    try {
      // Step 1: Upload simulation
      updateStep(0, true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      updateStep(0, false, true);

      // Step 2: Extract text simulation
      updateStep(1, true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      updateStep(1, false, true);

      // Step 3-5: Actual API call (these steps will progress during API processing)
      updateStep(2, true);

      // Make the actual API call
      const response = await analyzeDocumentRequest(file);

      // Complete analysis step
      updateStep(2, false, true);

      // Step 4: Identify key clauses
      updateStep(3, true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      updateStep(3, false, true);

      // Step 5: Compile insights
      updateStep(4, true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      updateStep(4, false, true);

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
          : "An unexpected error occurred while processing your document. Please try again."
      );
      setAppState("error");
    }
  };

  const handleNewDocument = () => {
    setAppState("upload");
    setUploadedFile(null);
    setApiResponse(null);
    setError(null);
    setProcessingSteps(
      processingSteps.map((step) => ({
        ...step,
        completed: false,
        current: false,
      }))
    );
  };

  const handleRetry = () => {
    if (uploadedFile) {
      setAppState("processing");
      setError(null);
      setProcessingSteps(
        processingSteps.map((step) => ({
          ...step,
          completed: false,
          current: false,
        }))
      );
      processDocumentWithAPI(uploadedFile);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      <Header
        onNewDocument={handleNewDocument}
        showNewDocument={appState === "results" || appState === "error"}
      />

      <main className="flex-1 container mx-auto px-4 py-8">
        {appState === "upload" && (
          <DocumentUpload onFileUpload={handleFileUpload} />
        )}

        {appState === "processing" && (
          <ProcessingState
            steps={processingSteps}
            fileName={uploadedFile?.name || ""}
          />
        )}

        {appState === "error" && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Processing Failed
              </h2>
              <p className="text-neutral-600 mb-6">{error}</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleRetry}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={handleNewDocument}
                  className="px-6 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
                >
                  New Document
                </button>
              </div>
            </div>
          </div>
        )}

        {appState === "results" && uploadedFile && apiResponse && (
          <ResultsDashboard
            fileName={uploadedFile.name}
            fileObject={uploadedFile}
            analysisData={apiResponse}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
