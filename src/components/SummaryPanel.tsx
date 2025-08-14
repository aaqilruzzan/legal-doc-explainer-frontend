import React, { useState } from "react";
import {
  FileText,
  Calendar,
  Users,
  DollarSign,
  Clock,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Info,
} from "lucide-react";
import { AnalyzeDocumentResponse } from "../api/types";

interface SummaryPanelProps {
  analysisData: AnalyzeDocumentResponse;
  onGenerateRisks?: () => void;
}

const SummaryPanel: React.FC<SummaryPanelProps> = ({
  analysisData,
  onGenerateRisks,
}) => {
  const [showGlossary, setShowGlossary] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Extract data from API response
  const { summary } = analysisData;
  console.log("Summary Data:", summary);
  const { important_contract_terms, key_data_points, legal_terms_glossary } =
    summary;

  // Convert glossary object to array for rendering
  const glossaryTerms = Object.entries(legal_terms_glossary).map(
    ([term, definition]) => ({
      term,
      definition: definition || "Definition not available",
    })
  );

  // Split summary by line breaks to preserve original formatting
  const summaryLines = summary.summary
    .split("\n")
    .filter((line) => line.trim().length > 0);

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
            {summaryLines.map((line, index) => {
              // Check if line starts with a number (topic line)
              const isTopicLine = /^\d+\./.test(line.trim());

              return (
                <p key={index} className="text-primary-800 leading-relaxed">
                  {isTopicLine ? (
                    <span className="font-bold">{line}</span>
                  ) : (
                    line
                  )}
                </p>
              );
            })}
          </div>
        </div>

        {/* Document Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-4">
            {/* Parties Involved - only show if there are parties */}
            {key_data_points.parties_involved &&
              key_data_points.parties_involved.length > 0 && (
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-secondary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-neutral-900">
                      Parties Involved
                    </h4>
                    {key_data_points.parties_involved.map((party, index) => (
                      <p key={index} className="text-sm text-neutral-600">
                        {party.name} ({party.role})
                      </p>
                    ))}
                  </div>
                </div>
              )}

            {/* Contract Period - only show if there's date or term info */}
            {(key_data_points.contract_period.start_date ||
              key_data_points.contract_period.end_date ||
              key_data_points.contract_period.term_description) && (
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-secondary-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-neutral-900">
                    Contract Period
                  </h4>
                  {(key_data_points.contract_period.start_date ||
                    key_data_points.contract_period.end_date) && (
                    <p className="text-sm text-neutral-600">
                      {(() => {
                        const startDate =
                          key_data_points.contract_period.start_date;
                        const endDate =
                          key_data_points.contract_period.end_date;

                        if (startDate && endDate) {
                          return `${startDate} - ${endDate}`;
                        } else if (startDate && !endDate) {
                          return `As of ${startDate}`;
                        } else if (!startDate && endDate) {
                          return `Up until ${endDate}`;
                        } else {
                          return "Date information not available";
                        }
                      })()}
                    </p>
                  )}
                  {key_data_points.contract_period.term_description && (
                    <p className="text-sm text-neutral-600">
                      {key_data_points.contract_period.term_description}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* Financial Terms - only show if there are terms */}
            {key_data_points.financial_terms &&
              key_data_points.financial_terms.length > 0 && (
                <div className="flex items-start space-x-3">
                  <DollarSign className="w-5 h-5 text-secondary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-neutral-900">
                      Financial Terms
                    </h4>
                    {key_data_points.financial_terms.map((term, index) => (
                      <p key={index} className="text-sm text-neutral-600">
                        {term}
                      </p>
                    ))}
                  </div>
                </div>
              )}

            {/* Key Deadlines - only show if there are deadlines */}
            {key_data_points.key_deadlines &&
              key_data_points.key_deadlines.length > 0 && (
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-secondary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-neutral-900">
                      Key Deadlines
                    </h4>
                    {key_data_points.key_deadlines.map((deadline, index) => (
                      <p key={index} className="text-sm text-neutral-600">
                        {deadline}
                      </p>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Expandable Sections */}
        <div className="space-y-3">
          {/* Key Terms Section */}
          <div className="border border-neutral-200 rounded-lg">
            <button
              onClick={() => toggleSection("terms")}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="w-4 h-4 text-neutral-600" />
                <span className="font-medium text-neutral-900">
                  Important Contract Terms
                </span>
              </div>
              {expandedSection === "terms" ? (
                <ChevronDown className="w-4 h-4 text-neutral-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-neutral-500" />
              )}
            </button>

            {expandedSection === "terms" && (
              <div className="px-4 pb-4 space-y-3 border-t border-neutral-200 bg-neutral-50/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {Object.entries(important_contract_terms).map(
                    ([key, value]) => (
                      <div key={key}>
                        <h5 className="font-medium text-neutral-900 mb-2">
                          {key}
                        </h5>
                        <p className="text-sm text-neutral-600">{value}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Document Type Section */}
          <div className="border border-neutral-200 rounded-lg">
            <button
              onClick={() => toggleSection("type")}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <Info className="w-4 h-4 text-neutral-600" />
                <span className="font-medium text-neutral-900">
                  Document Classification
                </span>
              </div>
              {expandedSection === "type" ? (
                <ChevronDown className="w-4 h-4 text-neutral-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-neutral-500" />
              )}
            </button>

            {expandedSection === "type" && (
              <div className="px-4 pb-4 border-t border-neutral-200 bg-neutral-50/50 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">
                      Document Type:
                    </span>
                    <span className="text-sm font-medium text-primary-900">
                      Service Agreement
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">
                      Complexity Level:
                    </span>
                    <span className="text-sm font-medium text-success-600">
                      Standard
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">
                      Page Count:
                    </span>
                    <span className="text-sm font-medium text-neutral-900">
                      12 pages
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">
                      Last Modified:
                    </span>
                    <span className="text-sm font-medium text-neutral-900">
                      December 15, 2024
                    </span>
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
              {showGlossary ? "Hide" : "Show"} Legal Terms Glossary
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
                <div
                  key={index}
                  className="border-b border-neutral-200 pb-3 last:border-b-0 last:pb-0"
                >
                  <h4 className="font-medium text-neutral-900 mb-1">
                    {item.term}
                  </h4>
                  <p className="text-sm text-neutral-600">{item.definition}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-neutral-200">
          <button
            onClick={onGenerateRisks}
            className="w-full py-3 px-4 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors duration-200 font-medium"
          >
            Generate Risks and Highlights
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryPanel;
