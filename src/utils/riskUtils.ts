import { HighlightsResponse, RiskLevel } from "../api/types";
import { RiskItem } from "../types/interfaces";

const categoryMap: Record<string, string> = {
  termination: "Termination Conditions",
  financial: "Financial Obligations",
  liability: "Liability Clauses",
  renewal: "Renewal Terms",
  service: "Service Delivery",
};

const mapRiskLevel = (
  risk: RiskLevel
): "low" | "medium" | "high" | "critical" => {
  return risk === "critical" ? "critical" : risk;
};

export const transformHighlightsToRiskItems = (
  highlights: HighlightsResponse
): RiskItem[] => {
  return Object.entries(highlights).map(([key, clause]) => ({
    id: key,
    category: categoryMap[key] || key,
    title: clause.clause.heading,
    description: clause.clause.description,
    severity: mapRiskLevel(clause.risk),
    confidence: clause.confidence,
    recommendation: clause.recommendation,
    requiresLawyer: clause.risk === "high" || clause.risk === "critical",
  }));
};

export const getSeverityColor = (severity: RiskItem["severity"]) => {
  switch (severity) {
    case "low":
      return "text-success-700 bg-success-50 border-success-200";
    case "medium":
      return "text-warning-700 bg-warning-50 border-warning-200";
    case "high":
      return "text-accent-700 bg-accent-50 border-accent-200";
    case "critical":
      return "text-red-700 bg-red-50 border-red-200";
  }
};

export const getConfidenceText = (confidence: RiskItem["confidence"]) => {
  switch (confidence) {
    case "low":
      return "Low Confidence";
    case "medium":
      return "Medium Confidence";
    case "high":
      return "High Confidence";
  }
};

export interface RiskScoreLabel {
  label: string;
  color: string;
  bgColor: string;
}

export const getRiskScoreLabel = (score: number): RiskScoreLabel => {
  if (score >= 80)
    return { label: "Critical", color: "text-red-600", bgColor: "bg-red-50" };
  if (score >= 65)
    return { label: "High", color: "text-red-500", bgColor: "bg-red-50" };
  if (score >= 50)
    return {
      label: "Medium-High",
      color: "text-accent-600",
      bgColor: "bg-accent-50",
    };
  if (score >= 35)
    return {
      label: "Medium",
      color: "text-warning-600",
      bgColor: "bg-warning-50",
    };
  if (score >= 20)
    return {
      label: "Low-Medium",
      color: "text-warning-500",
      bgColor: "bg-warning-50",
    };
  return {
    label: "Low",
    color: "text-success-600",
    bgColor: "bg-success-50",
  };
};
