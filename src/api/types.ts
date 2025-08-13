// Type definitions for API responses

export interface AnalyzeDocumentResponse {
  summary: {
    important_contract_terms: {
      [key: string]: string;
    };
    key_data_points: {
      contract_period: {
        end_date: string;
        start_date: string;
        term_description: string;
      };
      financial_terms: string[];
      key_deadlines: string[];
      parties_involved: Array<{
        name: string;
        role: string;
      }>;
    };
    legal_terms_glossary: {
      [term: string]: string;
    };
    summary: string;
  };
}

// More specific types for better type safety
export interface ContractTerm {
  Confidentiality?: string;
  "Governing Law"?: string;
  "Intellectual Property"?: string;
  "Service Scope"?: string;
  Termination?: string;
  [key: string]: string | undefined;
}

export interface ContractPeriod {
  end_date: string;
  start_date: string;
  term_description: string;
}

export interface Party {
  name: string;
  role: string;
}

export interface LegalTermsGlossary {
  [term: string]: string | undefined;
}

export interface KeyDataPoints {
  contract_period: ContractPeriod;
  financial_terms: string[];
  key_deadlines: string[];
  parties_involved: Party[];
}

export interface DocumentSummary {
  important_contract_terms: ContractTerm;
  key_data_points: KeyDataPoints;
  legal_terms_glossary: LegalTermsGlossary;
  summary: string;
}

export interface AnalyzeDocumentResponseTyped {
  summary: DocumentSummary;
}
