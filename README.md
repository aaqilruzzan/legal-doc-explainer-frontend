# Legalenz AI - Document Analysis Frontend

A modern React application for analyzing legal documents using AI. The application provides instant plain-English explanations, risk analysis, and interactive Q&A capabilities for legal documents.

## Features

- 📄 PDF Document Upload & Viewing
- 🔍 Intelligent Document Analysis
- ⚖️ Risk Assessment
- 💬 Interactive Q&A Interface
- 📱 Responsive Design
- 🎯 Real-time Processing Updates
- 📊 Comprehensive Results Dashboard

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **PDF Handling**: React-PDF
- **Icons**: Lucide React
- **PDF Export**: html2pdf.js
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/aaqilruzzan/legal-doc-explainer-frontend.git
cd legal-doc-explainer-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── api/          # API integration and types
├── components/   # React components
├── config/       # Configuration files
├── hooks/        # Custom React hooks
├── types/        # TypeScript type definitions
└── utils/        # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## File Upload Specifications

- Supports PDF files only
- Maximum file size: 16MB
- Secure document processing
- No permanent storage of uploaded files

## Supported Document Types

- Employment Contracts
- Service Agreements
- Lease Agreements
- Privacy Policies
- Terms of Service
- NDAs
- Partnership Agreements
- Purchase Contracts

## License

Copyright © 2025 Legalenz AI. All rights reserved.
