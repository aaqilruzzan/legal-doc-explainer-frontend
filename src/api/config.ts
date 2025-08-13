// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5001",
  TIMEOUT: 180000, // 3 minutes for document processing
  HEADERS: {
    "Content-Type": "application/json",
  },
};

// API Endpoints
export const API_ENDPOINTS = {
  ANALYZE: "/analyze",
} as const;
