import { AnalyzeDocumentResponse, RiskLevel } from "../api/types";

export interface SummaryPanelProps {
  analysisData: AnalyzeDocumentResponse;
  onGenerateRisks?: () => void;
}

export interface RiskItem {
  id: string;
  category: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  confidence: "low" | "medium" | "high";
  recommendation: string;
  requiresLawyer: boolean;
}

export interface RiskAnalysisProps {
  namespace: string;
}

export interface PDFGenerationOptions {
  riskItems: RiskItem[];
  riskScore: number;
  getRiskScoreLabel: (score: number) => { label: string };
  criticalRisks: number;
  highRisks: number;
  mediumRisks: number;
  lowRisks: number;
  risksByCategory: Record<string, RiskItem[]>;
}

export interface ResultsDashboardProps {
  fileName: string;
  fileObject: File;
  analysisData: AnalyzeDocumentResponse;
}

export interface Message {
  id: string;
  type: "question" | "answer";
  content: string;
  timestamp: Date;
  sourcePages?: number[];
  saved?: boolean;
  isLoading?: boolean;
}

export interface QAInterfaceProps {
  namespace?: string; // Document namespace from analysis
}

export interface ProcessingStep {
  id: string;
  label: string;
  completed: boolean;
  current: boolean;
}

export interface ProcessingStateProps {
  steps: ProcessingStep[];
  fileName: string;
}

export interface HeaderProps {
  onNewDocument: () => void;
  showNewDocument: boolean;
}

export interface DocumentViewerProps {
  fileName: string;
  fileObject: File;
}

export interface ZoomControlsProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export interface PageNavigationProps {
  pageNumber: number;
  numPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export interface DocumentActionsProps {
  onDownload: () => void;
}

export interface ToolbarProps {
  scale: number;
  pageNumber: number;
  numPages: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onDownload: () => void;
}

export interface DocumentUploadProps {
  onFileUpload: (file: File) => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
