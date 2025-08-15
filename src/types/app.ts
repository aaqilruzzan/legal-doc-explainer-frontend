import { AnalyzeDocumentResponse } from "../api/types";

export type AppState = "upload" | "processing" | "results" | "error";

export interface ProcessingStep {
  id: string;
  label: string;
  completed: boolean;
  current: boolean;
}
