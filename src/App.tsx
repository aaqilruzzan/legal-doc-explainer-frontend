import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DocumentUpload from './components/DocumentUpload';
import ProcessingState from './components/ProcessingState';
import ResultsDashboard from './components/ResultsDashboard';

type AppState = 'upload' | 'processing' | 'results';

interface ProcessingStep {
  id: string;
  label: string;
  completed: boolean;
  current: boolean;
}

function App() {
  const [appState, setAppState] = useState<AppState>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([
    { id: 'upload', label: 'Uploading document...', completed: false, current: false },
    { id: 'extract', label: 'Extracting text...', completed: false, current: false },
    { id: 'analyze', label: 'Analyzing content...', completed: false, current: false },
    { id: 'identify', label: 'Identifying key clauses...', completed: false, current: false },
    { id: 'compile', label: 'Compiling insights...', completed: false, current: false },
  ]);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setAppState('processing');
    simulateProcessing();
  };

  const simulateProcessing = () => {
    const steps = [...processingSteps];
    let currentIndex = 0;

    const processStep = () => {
      if (currentIndex < steps.length) {
        steps[currentIndex].current = true;
        setProcessingSteps([...steps]);

        setTimeout(() => {
          steps[currentIndex].completed = true;
          steps[currentIndex].current = false;
          currentIndex++;
          setProcessingSteps([...steps]);

          if (currentIndex < steps.length) {
            processStep();
          } else {
            setTimeout(() => {
              setAppState('results');
            }, 500);
          }
        }, 1500);
      }
    };

    processStep();
  };

  const handleNewDocument = () => {
    setAppState('upload');
    setUploadedFile(null);
    setProcessingSteps(processingSteps.map(step => ({
      ...step,
      completed: false,
      current: false
    })));
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      <Header onNewDocument={handleNewDocument} showNewDocument={appState === 'results'} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {appState === 'upload' && (
          <DocumentUpload onFileUpload={handleFileUpload} />
        )}
        
        {appState === 'processing' && (
          <ProcessingState steps={processingSteps} fileName={uploadedFile?.name || ''} />
        )}
        
        {appState === 'results' && uploadedFile && (
          <ResultsDashboard fileName={uploadedFile.name} />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;