import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  FileText,
  Download,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface DocumentViewerProps {
  fileName: string;
  fileObject: File;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  fileName,
  fileObject,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [zoom, setZoom] = useState(100);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset states when file changes
    setLoading(true);
    setError(null);
    setCurrentPage(1);
    setNumPages(null);

    // Validate file type
    if (!fileObject.type.includes("pdf")) {
      setError("Invalid file type. Please upload a PDF file.");
      setLoading(false);
      return;
    }

    console.log("Loading PDF file:", {
      name: fileObject.name,
      type: fileObject.type,
      size: fileObject.size,
    });
  }, [fileObject]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("Error loading PDF:", error);
    let errorMessage = "Failed to load PDF file.";

    if (error.message.includes("Invalid PDF")) {
      errorMessage = "The file appears to be corrupted or not a valid PDF.";
    } else if (error.message.includes("fetch")) {
      errorMessage = "Network error while loading PDF. Please try again.";
    } else if (error.message.includes("password")) {
      errorMessage = "This PDF is password protected and cannot be displayed.";
    } else {
      errorMessage = `PDF loading error: ${error.message}`;
    }

    setError(errorMessage);
    setLoading(false);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, numPages || 1));
  };

  const handleDownload = () => {
    const url = URL.createObjectURL(fileObject);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      {/* Viewer Header */}
      <div className="px-4 py-3 border-b border-neutral-200 bg-neutral-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-primary-900" />
            <div>
              <h3 className="font-medium text-primary-900 truncate max-w-48">
                {fileName}
              </h3>
              <p className="text-xs text-neutral-600">
                Page {currentPage} of {numPages || 0}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="p-2 text-neutral-600 hover:text-primary-900 hover:bg-neutral-100 rounded-lg transition-colors duration-200"
              aria-label="Download document"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              className="p-2 text-neutral-600 hover:text-primary-900 hover:bg-neutral-100 rounded-lg transition-colors duration-200"
              aria-label="Fullscreen view"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Document Display Area */}
      <div className="relative bg-neutral-100 h-96 overflow-auto">
        <div className="flex justify-center items-center h-full">
          {error ? (
            <div className="text-center p-8">
              <div className="text-red-600 mb-4">
                <FileText className="w-12 h-12 mx-auto mb-2" />
              </div>
              <h3 className="text-lg font-medium text-red-600 mb-2">
                PDF Loading Error
              </h3>
              <p className="text-sm text-neutral-600 mb-4">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setLoading(true);
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : loading ? (
            <div className="text-center p-8">
              <div className="animate-spin text-primary-600 mb-4">
                <FileText className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-sm text-neutral-600">Loading PDF...</p>
            </div>
          ) : (
            <Document
              file={fileObject}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="text-center p-8">
                  <div className="animate-spin text-primary-600 mb-4">
                    <FileText className="w-12 h-12 mx-auto" />
                  </div>
                  <p className="text-sm text-neutral-600">Loading PDF...</p>
                </div>
              }
              className="max-w-full"
            >
              <Page
                pageNumber={currentPage}
                scale={zoom / 100}
                className="shadow-lg"
              />
            </Document>
          )}
        </div>
      </div>

      {/* Viewer Controls */}
      <div className="px-4 py-3 border-t border-neutral-200 bg-neutral-50">
        <div className="flex items-center justify-between">
          {/* Page Navigation */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="p-1 text-neutral-600 hover:text-primary-900 hover:bg-neutral-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-neutral-600 min-w-16 text-center">
              {currentPage} / {numPages || 0}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === (numPages || 0)}
              className="p-1 text-neutral-600 hover:text-primary-900 hover:bg-neutral-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 50}
              className="p-1 text-neutral-600 hover:text-primary-900 hover:bg-neutral-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-sm text-neutral-600 min-w-12 text-center">
              {zoom}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 200}
              className="p-1 text-neutral-600 hover:text-primary-900 hover:bg-neutral-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
