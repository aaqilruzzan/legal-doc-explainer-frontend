import { ProcessingStep } from "../types/app";

export const initialProcessingSteps: ProcessingStep[] = [
  {
    id: "upload",
    label: "Uploading document...",
    completed: false,
    current: false,
  },
  {
    id: "extract",
    label: "Extracting text content...",
    completed: false,
    current: false,
  },
  {
    id: "analyze",
    label: "Analyzing legal structure...",
    completed: false,
    current: false,
  },
  {
    id: "identify",
    label: "Identifying key clauses and terms...",
    completed: false,
    current: false,
  },
  {
    id: "compile",
    label: "Compiling insights and summary...",
    completed: false,
    current: false,
  },
];
