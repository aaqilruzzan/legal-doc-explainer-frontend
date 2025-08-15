import {
  Shield,
  Clock,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Users,
  FileText,
} from "lucide-react";
import { RiskItem } from "../types/interfaces";

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Termination Conditions":
      return <Clock className="w-5 h-5" />;
    case "Financial Obligations":
      return <DollarSign className="w-5 h-5" />;
    case "Liability Clauses":
      return <Shield className="w-5 h-5" />;
    case "Renewal Terms":
      return <TrendingUp className="w-5 h-5" />;
    case "Service Delivery":
      return <Users className="w-5 h-5" />;
    default:
      return <FileText className="w-5 h-5" />;
  }
};

export const getSeverityIcon = (severity: RiskItem["severity"]) => {
  switch (severity) {
    case "low":
      return <Shield className="w-4 h-4" />;
    case "medium":
      return <Clock className="w-4 h-4" />;
    case "high":
      return <AlertTriangle className="w-4 h-4" />;
    case "critical":
      return <AlertTriangle className="w-4 h-4" />;
  }
};
