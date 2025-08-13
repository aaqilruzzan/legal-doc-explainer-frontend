import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  Users, 
  DollarSign, 
  Clock,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Info
} from 'lucide-react';

const SummaryPanel: React.FC = () => {
  const [showGlossary, setShowGlossary] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const glossaryTerms = [
    {
      term: 'Force Majeure',
      definition: 'Unforeseeable circumstances that prevent a party from fulfilling a contract.'
    },
    {
      term: 'Indemnification',
      definition: 'Protection against financial loss, typically through compensation.'
    },
    {
      term: 'Liquidated Damages',
      definition: 'Pre-agreed compensation amount for specific breaches of contract.'
    },
    {
      term: 'Warranty',
      definition: 'A guarantee or assurance about the quality or condition of services/products.'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
        <div className="flex items-center space-x-3">
          <FileText className="w-5 h-5 text-primary-900" />
          <h2 className="text-lg font-serif font-semibold text-primary-900">
            Document Summary
          </h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Plain English Summary */}
        <div>
          <h3 className="text-base font-semibold text-primary-900 mb-3">
            Plain English Summary
          </h3>
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 space-y-3">
            <p className="text-primary-800 leading-relaxed">
              This is a service agreement between ABC Company (the service provider) and XYZ Corporation 
              (the client) for consulting services. The contract runs for 12 months starting January 1, 2025.
            </p>
            <p className="text-primary-800 leading-relaxed">
              The client will pay $5,000 monthly, with late payments incurring a 1.5% monthly fee. 
              Either party can end the contract with 30 days written notice. The agreement includes 
              standard liability protections and confidentiality requirements.
            </p>
            <p className="text-primary-800 leading-relaxed">
              <strong>Key takeaway:</strong> This is a fairly standard consulting agreement with reasonable 
              terms for both parties, though you should pay attention to the termination and payment clauses.
            </p>
          </div>
        </div>

        {/* Document Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-secondary-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-neutral-900">Parties Involved</h4>
                <p className="text-sm text-neutral-600">ABC Company (Provider)</p>
                <p className="text-sm text-neutral-600">XYZ Corporation (Client)</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-secondary-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-neutral-900">Contract Period</h4>
                <p className="text-sm text-neutral-600">Jan 1, 2025 - Dec 31, 2025</p>
                <p className="text-sm text-neutral-600">12-month term</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <DollarSign className="w-5 h-5 text-secondary-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-neutral-900">Financial Terms</h4>
                <p className="text-sm text-neutral-600">$5,000 monthly</p>
                <p className="text-sm text-neutral-600">1.5% late fee per month</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-secondary-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-neutral-900">Key Deadlines</h4>
                <p className="text-sm text-neutral-600">30-day termination notice</p>
                <p className="text-sm text-neutral-600">30-day payment terms</p>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Sections */}
        <div className="space-y-3">
          {/* Key Terms Section */}
          <div className="border border-neutral-200 rounded-lg">
            <button
              onClick={() => toggleSection('terms')}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="w-4 h-4 text-neutral-600" />
                <span className="font-medium text-neutral-900">Important Contract Terms</span>
              </div>
              {expandedSection === 'terms' ? (
                <ChevronDown className="w-4 h-4 text-neutral-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-neutral-500" />
              )}
            </button>
            
            {expandedSection === 'terms' && (
              <div className="px-4 pb-4 space-y-3 border-t border-neutral-200 bg-neutral-50/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div>
                    <h5 className="font-medium text-neutral-900 mb-2">Service Scope</h5>
                    <p className="text-sm text-neutral-600">Consulting services as defined in Exhibit A</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-neutral-900 mb-2">Governing Law</h5>
                    <p className="text-sm text-neutral-600">Delaware State Law</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-neutral-900 mb-2">Confidentiality</h5>
                    <p className="text-sm text-neutral-600">Standard NDA provisions apply</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-neutral-900 mb-2">Intellectual Property</h5>
                    <p className="text-sm text-neutral-600">Work product ownership defined</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Document Type Section */}
          <div className="border border-neutral-200 rounded-lg">
            <button
              onClick={() => toggleSection('type')}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <Info className="w-4 h-4 text-neutral-600" />
                <span className="font-medium text-neutral-900">Document Classification</span>
              </div>
              {expandedSection === 'type' ? (
                <ChevronDown className="w-4 h-4 text-neutral-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-neutral-500" />
              )}
            </button>
            
            {expandedSection === 'type' && (
              <div className="px-4 pb-4 border-t border-neutral-200 bg-neutral-50/50 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Document Type:</span>
                    <span className="text-sm font-medium text-primary-900">Service Agreement</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Complexity Level:</span>
                    <span className="text-sm font-medium text-success-600">Standard</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Page Count:</span>
                    <span className="text-sm font-medium text-neutral-900">12 pages</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Last Modified:</span>
                    <span className="text-sm font-medium text-neutral-900">December 15, 2024</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Glossary Toggle */}
        <div>
          <button
            onClick={() => setShowGlossary(!showGlossary)}
            className="flex items-center space-x-2 text-primary-900 hover:text-primary-700 transition-colors duration-200"
          >
            <BookOpen className="w-4 h-4" />
            <span className="font-medium">
              {showGlossary ? 'Hide' : 'Show'} Legal Terms Glossary
            </span>
            {showGlossary ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>

          {showGlossary && (
            <div className="mt-4 bg-neutral-50 rounded-lg p-4 space-y-3 animate-slide-up">
              {glossaryTerms.map((item, index) => (
                <div key={index} className="border-b border-neutral-200 pb-3 last:border-b-0 last:pb-0">
                  <h4 className="font-medium text-neutral-900 mb-1">{item.term}</h4>
                  <p className="text-sm text-neutral-600">{item.definition}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-neutral-200">
          <button className="w-full py-3 px-4 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors duration-200 font-medium">
            Simplify Language Further
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryPanel;