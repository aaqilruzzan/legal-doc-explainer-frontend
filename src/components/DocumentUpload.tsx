import React, { useState, useRef } from "react";
import {
  Upload,
  FileText,
  AlertCircle,
  CheckCircle,
  Shield,
} from "lucide-react";
import { DocumentUploadProps } from "../types/interfaces";
import { validateFile } from "../utils/documentUtils";

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onFileUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    onFileUpload(file);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-900 to-primary-700 rounded-2xl shadow-lg">
            <FileText className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-4">
          AI Legal Document Explainer
        </h1>
        <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Upload your legal document and get instant plain-English explanations,
          risk analysis, and answers to your questions.
        </p>
      </div>

      {/* Upload Zone */}
      <div className="mb-8">
        <div
          className={`
            relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer
            ${
              isDragOver
                ? "border-primary-500 bg-primary-50 scale-[1.02]"
                : "border-neutral-300 bg-white hover:border-primary-400 hover:bg-neutral-50"
            }
          `}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileInputChange}
            className="hidden"
            aria-label="File upload input"
          />

          <div className="space-y-6">
            <div className="flex justify-center">
              <div
                className={`
                flex items-center justify-center w-16 h-16 rounded-full transition-colors duration-300
                ${isDragOver ? "bg-primary-100" : "bg-neutral-100"}
              `}
              >
                <Upload
                  className={`w-8 h-8 ${
                    isDragOver ? "text-primary-600" : "text-neutral-500"
                  }`}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                {isDragOver
                  ? "Drop your document here"
                  : "Upload Your Legal Document"}
              </h3>
              <p className="text-neutral-600 mb-4">
                Drag and drop your PDF file here, or click to browse
              </p>
              <button
                type="button"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors duration-200 font-medium"
              >
                <Upload className="w-4 h-4" />
                <span>Choose File</span>
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-accent-50 border border-accent-200 rounded-lg flex items-start space-x-3 animate-slide-up">
            <AlertCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-accent-800">Upload Error</h4>
              <p className="text-accent-700">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* File Requirements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl border border-neutral-200 text-center">
          <div className="flex justify-center mb-4">
            <FileText className="w-8 h-8 text-success-600" />
          </div>
          <h3 className="font-semibold text-neutral-900 mb-2">PDF Only</h3>
          <p className="text-sm text-neutral-600">
            Supports PDF documents up to 16MB in size
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-neutral-200 text-center">
          <div className="flex justify-center mb-4">
            <Shield className="w-8 h-8 text-success-600" />
          </div>
          <h3 className="font-semibold text-neutral-900 mb-2">
            Secure Processing
          </h3>
          <p className="text-sm text-neutral-600">
            Your documents are processed securely and not stored
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-neutral-200 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-success-600" />
          </div>
          <h3 className="font-semibold text-neutral-900 mb-2">
            Instant Analysis
          </h3>
          <p className="text-sm text-neutral-600">
            Get comprehensive insights in seconds, not hours
          </p>
        </div>
      </div>

      {/* Sample Document Types */}
      <div className="bg-neutral-50 rounded-xl p-8">
        <h3 className="text-lg font-serif font-semibold text-primary-900 mb-4 text-center">
          Supported Document Types
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            "Employment Contracts",
            "Service Agreements",
            "Lease Agreements",
            "Privacy Policies",
            "Terms of Service",
            "NDAs",
            "Partnership Agreements",
            "Purchase Contracts",
          ].map((type, index) => (
            <div
              key={index}
              className="py-2 px-3 bg-white rounded-lg text-sm text-neutral-700 border border-neutral-200"
            >
              {type}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
