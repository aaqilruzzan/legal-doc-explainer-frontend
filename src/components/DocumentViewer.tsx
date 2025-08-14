import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  FileText,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
} from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface DocumentViewerProps {
  fileName: string;
  fileObject: File;
}

// Zoom Controls Component
interface ZoomControlsProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({
  scale,
  onZoomIn,
  onZoomOut,
}) => (
  <div className="flex items-center">
    <button
      onClick={onZoomOut}
      className="p-1 hover:bg-neutral-100 rounded transition-colors"
      disabled={scale <= 0.5}
      title="Zoom Out"
    >
      <ZoomOut className="w-3 h-3" />
    </button>
    <span className="text-xs text-neutral-600 min-w-[35px] text-center px-0.5">
      {Math.round(scale * 100)}%
    </span>
    <button
      onClick={onZoomIn}
      className="p-1 hover:bg-neutral-100 rounded transition-colors"
      disabled={scale >= 2.0}
      title="Zoom In"
    >
      <ZoomIn className="w-3 h-3" />
    </button>
  </div>
);

// Page Navigation Component
interface PageNavigationProps {
  pageNumber: number;
  numPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const PageNavigation: React.FC<PageNavigationProps> = ({
  pageNumber,
  numPages,
  onPreviousPage,
  onNextPage,
}) => (
  <div className="flex items-center">
    <button
      onClick={onPreviousPage}
      disabled={pageNumber <= 1}
      className="p-1 hover:bg-neutral-100 rounded disabled:opacity-50 transition-colors"
      title="Previous Page"
    >
      <ChevronLeft className="w-3 h-3" />
    </button>
    <span className="text-xs text-neutral-600 min-w-[45px] text-center px-0.5">
      {pageNumber}/{numPages}
    </span>
    <button
      onClick={onNextPage}
      disabled={pageNumber >= numPages}
      className="p-1 hover:bg-neutral-100 rounded disabled:opacity-50 transition-colors"
      title="Next Page"
    >
      <ChevronRight className="w-3 h-3" />
    </button>
  </div>
);

// Document Actions Component
interface DocumentActionsProps {
  onDownload: () => void;
}

const DocumentActions: React.FC<DocumentActionsProps> = ({ onDownload }) => (
  <div className="flex items-center space-x-2">
    <button
      onClick={onDownload}
      className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
      title="Download Document"
    >
      <Download className="w-4 h-4" />
    </button>
  </div>
);

// Toolbar Component
interface ToolbarProps {
  scale: number;
  pageNumber: number;
  numPages: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onDownload: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  scale,
  pageNumber,
  numPages,
  onZoomIn,
  onZoomOut,
  onPreviousPage,
  onNextPage,
  onDownload,
}) => (
  <div className="flex items-center space-x-4">
    <DocumentActions onDownload={onDownload} />
    <div className="w-px h-6 bg-neutral-300" />
    <ZoomControls scale={scale} onZoomIn={onZoomIn} onZoomOut={onZoomOut} />
    <div className="w-px h-6 bg-neutral-300" />
    <PageNavigation
      pageNumber={pageNumber}
      numPages={numPages}
      onPreviousPage={onPreviousPage}
      onNextPage={onNextPage}
    />
  </div>
);

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  fileName,
  fileObject,
}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");

  useEffect(() => {
    if (fileObject) {
      const url = URL.createObjectURL(fileObject);
      setFileUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [fileObject]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    setError(error.message);
    setLoading(false);
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset;
      return Math.min(Math.max(1, newPageNumber), numPages);
    });
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

  const downloadDocument = () => {
    if (fileObject) {
      const url = URL.createObjectURL(fileObject);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  if (error) {
    return (
      <div className="hidden lg:flex bg-white rounded-xl border border-neutral-200 overflow-hidden flex-col h-full">
        <div className="px-4 py-3 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-primary-900" />
            <h3 className="font-medium text-primary-900">{fileName}</h3>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-red-300" />
            <p className="text-red-600 font-medium mb-2">Failed to load PDF</p>
            <p className="text-sm text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:flex bg-white rounded-xl border border-neutral-200 overflow-hidden flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-neutral-200 bg-neutral-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-primary-900" />
            <h3 className="font-medium text-primary-900">{fileName}</h3>
          </div>

          {/* Controls */}
          {!loading && numPages > 0 && (
            <Toolbar
              scale={scale}
              pageNumber={pageNumber}
              numPages={numPages}
              onZoomIn={zoomIn}
              onZoomOut={zoomOut}
              onPreviousPage={previousPage}
              onNextPage={nextPage}
              onDownload={downloadDocument}
            />
          )}
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto bg-neutral-100">
        <div className="flex justify-center p-4">
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading PDF...</span>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              className="shadow-lg"
              loading={
                <div className="flex items-center justify-center h-96">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              }
            />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
