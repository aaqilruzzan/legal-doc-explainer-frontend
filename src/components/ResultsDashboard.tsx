import React, { useState } from "react";
import DocumentViewer from "./DocumentViewer";
import SummaryPanel from "./SummaryPanel";
import RiskAnalysis from "./RiskAnalysis";
import QAInterface from "./QAInterface";
import { AnalyzeDocumentResponse } from "../api/types";
import { Loader2 } from "lucide-react";

interface ResultsDashboardProps {
  fileName: string;
  fileObject: File;
  analysisData: AnalyzeDocumentResponse;
}

type RiskState = "hidden" | "loading" | "visible";

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  fileName,
  fileObject,
  analysisData,
}) => {
  const [activeTab, setActiveTab] = useState<"summary" | "risks" | "qa">(
    "summary"
  );
  const [riskState, setRiskState] = useState<RiskState>("hidden");

  const handleGenerateRisks = () => {
    setRiskState("loading");

    // Simulate API call delay - replace with actual API call later
    setTimeout(() => {
      setRiskState("visible");
    }, 3000); // 3 second delay to simulate loading
  };

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
          {riskState === "visible" && (
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
          )}
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
          <SummaryPanel
            analysisData={analysisData}
            onGenerateRisks={handleGenerateRisks}
          />

          {/* Loading State */}
          {riskState === "loading" && (
            <div className="bg-white rounded-xl border border-neutral-200 p-8">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
                <p className="text-neutral-600 font-medium">
                  Loading risks and highlights...
                </p>
                <p className="text-sm text-neutral-500">
                  Analyzing document clauses and identifying potential risks
                </p>
              </div>
            </div>
          )}

          {/* Risk Analysis - Only show when visible */}
          {riskState === "visible" && <RiskAnalysis />}

          {/* Q&A Interface - Always visible, but positioned based on risk state */}
          <QAInterface namespace={analysisData.namespace} />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="mb-6">
          <DocumentViewer fileName={fileName} fileObject={fileObject} />
        </div>

        {activeTab === "summary" && (
          <div className="space-y-6">
            <SummaryPanel
              analysisData={analysisData}
              onGenerateRisks={handleGenerateRisks}
            />

            {/* Loading State */}
            {riskState === "loading" && (
              <div className="bg-white rounded-xl border border-neutral-200 p-8">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
                  <p className="text-neutral-600 font-medium">
                    Loading risks and highlights...
                  </p>
                  <p className="text-sm text-neutral-500">
                    Analyzing document clauses and identifying potential risks
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "risks" && riskState === "visible" && <RiskAnalysis />}

        {activeTab === "qa" && (
          <QAInterface namespace={analysisData.namespace} />
        )}
      </div>
    </div>
  );
};

export default ResultsDashboard;
