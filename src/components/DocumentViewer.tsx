import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight,
  Maximize2 
} from 'lucide-react';

interface DocumentViewerProps {
  fileName: string;
}

interface Annotation {
  id: string;
  page: number;
  type: 'critical' | 'important' | 'standard';
  text: string;
  position: { top: number; left: number; width: number; height: number };
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ fileName }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [showAnnotations, setShowAnnotations] = useState(true);
  
  const totalPages = 12; // Mock total pages

  // Mock annotations
  const annotations: Annotation[] = [
    {
      id: '1',
      page: 1,
      type: 'critical',
      text: 'Termination clause with 30-day notice requirement',
      position: { top: 25, left: 10, width: 80, height: 8 }
    },
    {
      id: '2',
      page: 1,
      type: 'important',
      text: 'Payment terms and late fee structure',
      position: { top: 45, left: 15, width: 70, height: 6 }
    },
    {
      id: '3',
      page: 2,
      type: 'critical',
      text: 'Liability limitation clause',
      position: { top: 30, left: 20, width: 60, height: 10 }
    }
  ];

  const currentAnnotations = annotations.filter(ann => ann.page === currentPage);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const getAnnotationColor = (type: Annotation['type']) => {
    switch (type) {
      case 'critical':
        return 'bg-accent-500/20 border-accent-500';
      case 'important':
        return 'bg-warning-500/20 border-warning-500';
      case 'standard':
        return 'bg-success-500/20 border-success-500';
    }
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
                Page {currentPage} of {totalPages}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAnnotations(!showAnnotations)}
              className={`
                px-3 py-1 text-xs rounded-md border transition-colors duration-200
                ${showAnnotations 
                  ? 'bg-primary-900 text-white border-primary-900' 
                  : 'bg-white text-neutral-600 border-neutral-300 hover:border-primary-400'
                }
              `}
            >
              Highlights
            </button>
            <button
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
        <div className="relative mx-auto bg-white shadow-lg" style={{ width: `${zoom}%` }}>
          {/* Mock Document Page */}
          <div className="aspect-[8.5/11] bg-white p-8 text-sm leading-relaxed relative">
            <div className="space-y-4 text-neutral-700">
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-primary-900">SERVICE AGREEMENT</h2>
                <p className="text-neutral-600 mt-2">Effective Date: January 1, 2025</p>
              </div>
              
              <div className="space-y-3">
                <p>
                  This Service Agreement ("Agreement") is entered into between ABC Company ("Provider") 
                  and XYZ Corporation ("Client") on the date last signed below.
                </p>
                
                <h3 className="font-semibold text-primary-900 mt-6">1. SERVICES</h3>
                <p>
                  Provider agrees to provide consulting services as detailed in Exhibit A, 
                  attached hereto and incorporated by reference.
                </p>
                
                <h3 className="font-semibold text-primary-900 mt-6">2. TERM AND TERMINATION</h3>
                <p>
                  This Agreement shall commence on the Effective Date and continue for a period 
                  of twelve (12) months. Either party may terminate this Agreement with thirty (30) 
                  days written notice.
                </p>
                
                <h3 className="font-semibold text-primary-900 mt-6">3. PAYMENT TERMS</h3>
                <p>
                  Client shall pay Provider monthly fees of $5,000, due within thirty (30) days 
                  of invoice date. Late payments shall incur a fee of 1.5% per month.
                </p>
              </div>
            </div>

            {/* Annotations Overlay */}
            {showAnnotations && currentAnnotations.map(annotation => (
              <div
                key={annotation.id}
                className={`absolute border-2 rounded cursor-pointer transition-opacity duration-200 hover:opacity-80 ${getAnnotationColor(annotation.type)}`}
                style={{
                  top: `${annotation.position.top}%`,
                  left: `${annotation.position.left}%`,
                  width: `${annotation.position.width}%`,
                  height: `${annotation.position.height}%`,
                }}
                title={annotation.text}
              />
            ))}
          </div>
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
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
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