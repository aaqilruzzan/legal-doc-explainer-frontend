import Header from "./components/Header";
import Footer from "./components/Footer";
import DocumentUpload from "./components/DocumentUpload";
import ProcessingState from "./components/ProcessingState";
import ResultsDashboard from "./components/ResultsDashboard";
import { useDocumentAnalysis } from "./hooks/useDocumentAnalysis";

function App() {
  const {
    appState,
    uploadedFile,
    apiResponse,
    error,
    processingSteps,
    handleFileUpload,
    handleNewDocument,
    handleRetry,
  } = useDocumentAnalysis();

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
