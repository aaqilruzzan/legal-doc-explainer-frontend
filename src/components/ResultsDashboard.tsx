import React, { useState } from "react";
import DocumentViewer from "./DocumentViewer";
import SummaryPanel from "./SummaryPanel";
import RiskAnalysis from "./RiskAnalysis";
import QAInterface from "./QAInterface";
import { AnalyzeDocumentResponse } from "../api/types";

interface ResultsDashboardProps {
  fileName: string;
  fileObject: File;
  analysisData: AnalyzeDocumentResponse;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  fileName,
  fileObject,
  analysisData,
}) => {
  const [activeTab, setActiveTab] = useState<"summary" | "risks" | "qa">(
    "summary"
  );

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary-900 mb-2">
          Document Analysis Complete
        </h1>
        <p className="text-neutral-600">
          Analysis of:{" "}
          <span className="font-medium text-primary-900">{fileName}</span>
        </p>
      </div>

      {/* Mobile Tab Navigation */}
      <div className="md:hidden mb-6">
        <div className="flex bg-white rounded-lg border border-neutral-200 p-1">
          <button
            onClick={() => setActiveTab("summary")}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors duration-200 ${
              activeTab === "summary"
                ? "bg-primary-900 text-white"
                : "text-neutral-600 hover:text-primary-900"
            }`}
          >
            Summary
          </button>
          <button
            onClick={() => setActiveTab("risks")}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors duration-200 ${
              activeTab === "risks"
                ? "bg-primary-900 text-white"
                : "text-neutral-600 hover:text-primary-900"
            }`}
          >
            Risk Analysis
          </button>
          <button
            onClick={() => setActiveTab("qa")}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors duration-200 ${
              activeTab === "qa"
                ? "bg-primary-900 text-white"
                : "text-neutral-600 hover:text-primary-900"
            }`}
          >
            Q&A
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-12 gap-8">
        {/* Document Viewer */}
        <div className="md:col-span-5">
          <DocumentViewer fileName={fileName} fileObject={fileObject} />
        </div>

        {/* Analysis Panels */}
        <div className="md:col-span-7 space-y-8">
          <SummaryPanel analysisData={analysisData} />
          <RiskAnalysis />
          <QAInterface />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="mb-6">
          <DocumentViewer fileName={fileName} fileObject={fileObject} />
        </div>

        {activeTab === "summary" && (
          <SummaryPanel analysisData={analysisData} />
        )}
        {activeTab === "risks" && <RiskAnalysis />}
        {activeTab === "qa" && <QAInterface />}
      </div>
    </div>
  );
};

export default ResultsDashboard;
