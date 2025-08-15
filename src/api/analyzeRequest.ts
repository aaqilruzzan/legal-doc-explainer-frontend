import { API_CONFIG, API_ENDPOINTS } from "./config";
import {
  AnalyzeDocumentResponse,
  AskQuestionRequest,
  AskQuestionResponse,
  ApiError,
  HighlightsRequest,
  HighlightsResponse,
} from "./types";

// Request payload for the analyze endpoint
export const analyzeDocumentRequest = async (
  documentFile: File
): Promise<AnalyzeDocumentResponse> => {
  const formData = new FormData();
  formData.append("file", documentFile);

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

export const askQuestionRequest = async (
  query: string,
  namespace: string
): Promise<AskQuestionResponse> => {
  const requestBody: AskQuestionRequest = {
    query,
    namespace,
  };

  const abortController = new AbortController();
  const timeoutId = setTimeout(
    () => abortController.abort(),
    30000 // 30 seconds timeout for questions
  );

  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.ASK}`, {
      method: "POST",
      headers: API_CONFIG.HEADERS,
      body: JSON.stringify(requestBody),
      signal: abortController.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = (await response.json()) as ApiError;
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${
          errorData.error || "Unknown error"
        }`
      );
    }

    return (await response.json()) as AskQuestionResponse;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error(
          "Request timed out. Please try asking your question again."
        );
      }
      throw error;
    }
    throw new Error(
      "An unexpected error occurred while processing your question."
    );
  }
};

// Getting document highlights and key clauses analysis
export const getDocumentHighlights = async (
  namespace: string
): Promise<HighlightsResponse> => {
  const requestBody: HighlightsRequest = {
    namespace,
  };

  // Creating an AbortController for timeout handling
  const abortController = new AbortController();
  const timeoutId = setTimeout(
    () => abortController.abort(),
    45000 // 45 seconds timeout for highlights analysis
  );

  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_ENDPOINTS.HIGHLIGHTS}`,
      {
        method: "POST",
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(requestBody),
        signal: abortController.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = (await response.json()) as ApiError;
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${
          errorData.error || "Unknown error"
        }`
      );
    }

    return (await response.json()) as HighlightsResponse;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error(
          "Request timed out. The highlights analysis is taking longer than expected. Please try again."
        );
      }
      throw error;
    }
    throw new Error(
      "An unexpected error occurred while generating document highlights."
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
