import { API_CONFIG, API_ENDPOINTS } from "./config";
import { AnalyzeDocumentResponse } from "./types";

// Request payload for the analyze endpoint
export const analyzeDocumentRequest = async (
  documentFile: File
): Promise<AnalyzeDocumentResponse> => {
  const formData = new FormData();
  formData.append("file", documentFile);

  // Create an AbortController for timeout handling
  const abortController = new AbortController();
  const timeoutId = setTimeout(
    () => abortController.abort(),
    API_CONFIG.TIMEOUT
  );

  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_ENDPOINTS.ANALYZE}`,
      {
        method: "POST",
        body: formData,
        signal: abortController.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    return (await response.json()) as AnalyzeDocumentResponse;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error(
          "Request timed out. The document analysis is taking longer than expected. Please try again."
        );
      }
      throw error;
    }
    throw new Error(
      "An unexpected error occurred while analyzing the document."
    );
  }
};

// Example usage with TypeScript:
/*
import { analyzeDocumentRequest, analyzeDocumentRequestBase64 } from './analyzeRequest';
import { AnalyzeDocumentResponse } from './types';

// Using FormData
const file = new File(['content'], 'document.pdf', { type: 'application/pdf' });
const result: AnalyzeDocumentResponse = await analyzeDocumentRequest(file);

// Access typed response
console.log(result.summary.important_contract_terms.Confidentiality);
console.log(result.summary.key_data_points.parties_involved[0].name);
console.log(result.summary.legal_terms_glossary["Force Majeure"]);
*/
