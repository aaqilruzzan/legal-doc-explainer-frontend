import React, { useState, useEffect, useRef } from "react";
import {
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Loader2,
  FileText,
} from "lucide-react";
import { HighlightsResponse } from "../api/types";
import { getDocumentHighlights } from "../api/analyzeRequest";
import { RiskItem, RiskAnalysisProps } from "../types/interfaces";
import { generateRiskAnalysisPDF } from "../utils/pdfGeneration";
import {
  transformHighlightsToRiskItems,
  getSeverityColor,
  getConfidenceText,
  getRiskScoreLabel,
} from "../utils/riskUtils";
import { getSeverityIcon, getCategoryIcon } from "../utils/riskIconUtils";

const RiskAnalysis: React.FC<RiskAnalysisProps> = ({ namespace }) => {
  const [expandedRisk, setExpandedRisk] = useState<string | null>(null);
  const [highlightsData, setHighlightsData] =
    useState<HighlightsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!riskItems) return;

    try {
      await generateRiskAnalysisPDF({
        riskItems,
        riskScore,
        getRiskScoreLabel,
        criticalRisks,
        highRisks,
        mediumRisks,
        lowRisks,
        risksByCategory,
      });
    } catch (err) {
      console.error("Error generating PDF:", err);
    }
  };

  // Fetching highlights data from API
  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getDocumentHighlights(namespace);
        setHighlightsData(data);
      } catch (err) {
        console.error("Error fetching highlights:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load highlights"
        );
      } finally {
        setLoading(false);
      }
    };

    if (namespace) {
      fetchHighlights();
    }
  }, [namespace]);

  const riskItems: RiskItem[] = highlightsData
    ? transformHighlightsToRiskItems(highlightsData)
    : [];

  const toggleRisk = (id: string) => {
    setExpandedRisk(expandedRisk === id ? null : id);
  };

  const risksByCategory = riskItems.reduce((acc, risk) => {
    if (!acc[risk.category]) {
      acc[risk.category] = [];
    }
    acc[risk.category].push(risk);
    return acc;
  }, {} as Record<string, RiskItem[]>);

  const criticalRisks = riskItems.filter(
    (risk) => risk.severity === "critical"
  ).length;
  const highRisks = riskItems.filter((risk) => risk.severity === "high").length;
  const mediumRisks = riskItems.filter(
    (risk) => risk.severity === "medium"
  ).length;
  const lowRisks = riskItems.filter((risk) => risk.severity === "low").length;

  // Risk Score Algorithm
  const calculateRiskScore = () => {
    const weights = {
      critical: 10,
      high: 7,
      medium: 4,
      low: 1,
    };

    const confidenceMultipliers = {
      high: 1.0,
      medium: 0.8,
      low: 0.6,
    };

    // Calculating weighted base score
    let totalScore = 0;
    let maxPossibleScore = 0;

    riskItems.forEach((risk) => {
      const baseWeight = weights[risk.severity];
      const confidenceMultiplier = confidenceMultipliers[risk.confidence];
      const adjustedWeight = baseWeight * confidenceMultiplier;

      totalScore += adjustedWeight;
      maxPossibleScore += weights.critical; // Max possible per item
    });

    // Additional risk factors
    const categoryDiversityFactor = Object.keys(risksByCategory).length / 5; // 5 total categories
    const lawyerRequiredFactor =
      riskItems.filter((risk) => risk.requiresLawyer).length / riskItems.length;

    // Applying modifiers
    totalScore *= 1 + categoryDiversityFactor * 0.1; // 10% bonus for category diversity
    totalScore *= 1 + lawyerRequiredFactor * 0.2; // 20% bonus for lawyer-required items

    // Normalize to 0-100 scale
    const normalizedScore = Math.min(
      100,
      (totalScore / maxPossibleScore) * 100
    );

    return Math.round(normalizedScore);
  };

  const riskScore = calculateRiskScore();
  const riskScoreData = getRiskScoreLabel(riskScore);

  // Using the imported utility function for risk transformation

  // Showing loading state
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-neutral-200 p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
          <p className="text-neutral-600 font-medium">
            Loading risk analysis...
          </p>
          <p className="text-sm text-neutral-500">
            Analyzing document risks and highlights
          </p>
        </div>
      </div>
    );
  }

  // Showing error state
  if (error) {
    return (
      <div className="bg-white rounded-xl border border-neutral-200 p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <AlertTriangle className="w-8 h-8 text-red-500" />
          <p className="text-red-600 font-medium">
            Error loading risk analysis
          </p>
          <p className="text-sm text-neutral-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Showing message if no data
  if (!highlightsData) {
    return (
      <div className="bg-white rounded-xl border border-neutral-200 p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <FileText className="w-8 h-8 text-neutral-400" />
          <p className="text-neutral-600 font-medium">No risk data available</p>
          <p className="text-sm text-neutral-500">
            Unable to analyze document risks
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={reportRef}
      className="bg-white rounded-xl border border-neutral-200 overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-accent-600" />
            <h2 className="text-lg font-serif font-semibold text-primary-900">
              Risk Analysis
            </h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-neutral-600">Risk Score</p>
            <div className="flex items-center space-x-2">
              <div
                className={`px-2 py-1 rounded-md text-xs font-medium ${riskScoreData.bgColor} ${riskScoreData.color}`}
              >
                {riskScore}/100
              </div>
              <p className={`text-lg font-bold ${riskScoreData.color}`}>
                {riskScoreData.label}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Risk Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-700 mb-1">
              {criticalRisks}
            </div>
            <div className="text-sm text-red-600">Critical</div>
          </div>
          <div className="bg-accent-50 border border-accent-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent-700 mb-1">
              {highRisks}
            </div>
            <div className="text-sm text-accent-600">High</div>
          </div>
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-warning-700 mb-1">
              {mediumRisks}
            </div>
            <div className="text-sm text-warning-600">Medium</div>
          </div>
          <div className="bg-success-50 border border-success-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-success-700 mb-1">
              {lowRisks}
            </div>
            <div className="text-sm text-success-600">Low</div>
          </div>
        </div>

        {/* Risk Categories */}
        <div className="space-y-6">
          {Object.entries(risksByCategory).map(([category, risks]) => (
            <div key={category} className="space-y-3">
              {/* Category Header */}
              <div className="flex items-center space-x-3 pb-2 border-b border-neutral-200">
                {getCategoryIcon(category)}
                <h3 className="text-base font-semibold text-primary-900">
                  {category}
                </h3>
                <span className="text-sm text-neutral-500">
                  ({risks.length} item{risks.length !== 1 ? "s" : ""})
                </span>
              </div>

              {/* Risk Items */}
              <div className="space-y-3">
                {risks.map((risk) => (
                  <div
                    key={risk.id}
                    className="border border-neutral-200 rounded-lg overflow-hidden"
                  >
                    <div
                      className="p-4 cursor-pointer hover:bg-neutral-50 transition-colors duration-200"
                      onClick={() => toggleRisk(risk.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-start space-x-3">
                            <div
                              className={`px-2 py-1 rounded-md border text-xs font-medium flex items-center space-x-1 ${getSeverityColor(
                                risk.severity
                              )}`}
                            >
                              {getSeverityIcon(risk.severity)}
                              <span className="capitalize">
                                {risk.severity}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-primary-900 mb-1">
                                {risk.title}
                              </h4>
                              <p className="text-sm text-neutral-600 line-clamp-2">
                                {risk.description}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 ml-4">
                          <div className="text-right">
                            <div className="text-xs text-neutral-600">
                              {getConfidenceText(risk.confidence)}
                            </div>
                          </div>
                          {expandedRisk === risk.id ? (
                            <ChevronDown className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {expandedRisk === risk.id && (
                      <div className="px-4 pb-4 border-t border-neutral-200 bg-neutral-50/50 animate-slide-up">
                        <div className="pt-4 space-y-4">
                          <div>
                            <h5 className="font-medium text-neutral-900 mb-2">
                              Why This Matters
                            </h5>
                            <p className="text-sm text-neutral-700">
                              {risk.description}
                            </p>
                          </div>

                          <div>
                            <h5 className="font-medium text-neutral-900 mb-2">
                              Our Recommendation
                            </h5>
                            <p className="text-sm text-neutral-700">
                              {risk.recommendation}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-2">
                              <button className="text-xs text-primary-600 hover:text-primary-800 transition-colors duration-200 flex items-center space-x-1">
                                <span>View in document</span>
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            </div>

                            {risk.requiresLawyer && (
                              <button className="px-3 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full hover:bg-accent-200 transition-colors duration-200">
                                Consult Lawyer
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-8 pt-6 border-t border-neutral-200">
          <button
            onClick={generatePDF}
            className="w-full py-2 px-4 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors duration-200"
          >
            Download Risk Report (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;
