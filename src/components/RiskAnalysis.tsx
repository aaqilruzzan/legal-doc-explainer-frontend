import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Users,
  FileText,
  ChevronDown,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface RiskItem {
  id: string;
  category: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: 'low' | 'medium' | 'high';
  pageReference: number;
  recommendation: string;
  requiresLawyer: boolean;
}

const RiskAnalysis: React.FC = () => {
  const [expandedRisk, setExpandedRisk] = useState<string | null>(null);

  const riskItems: RiskItem[] = [
    {
      id: '1',
      category: 'Termination Conditions',
      title: '30-Day Termination Notice Requirement',
      description: 'Either party can terminate with 30 days written notice, which may limit your flexibility in ending the relationship quickly.',
      severity: 'medium',
      confidence: 'high',
      pageReference: 3,
      recommendation: 'Consider negotiating for shorter notice period if you need more flexibility.',
      requiresLawyer: false
    },
    {
      id: '2',
      category: 'Financial Obligations',
      title: 'High Late Payment Penalties',
      description: 'Late payments incur 1.5% monthly fee (18% annually), which is above typical market rates.',
      severity: 'high',
      confidence: 'high',
      pageReference: 5,
      recommendation: 'Try to negotiate a lower late fee or longer grace period before penalties apply.',
      requiresLawyer: false
    },
    {
      id: '3',
      category: 'Liability Clauses',
      title: 'Limited Liability Cap',
      description: 'Provider liability is limited to fees paid in the last 12 months, which may not cover all potential damages.',
      severity: 'critical',
      confidence: 'medium',
      pageReference: 8,
      recommendation: 'Review if the liability cap adequately protects your interests for the services provided.',
      requiresLawyer: true
    },
    {
      id: '4',
      category: 'Renewal Terms',
      title: 'No Auto-Renewal Clause',
      description: 'Contract does not automatically renew, requiring renegotiation at the end of the term.',
      severity: 'low',
      confidence: 'high',
      pageReference: 2,
      recommendation: 'This actually reduces risk by preventing unwanted automatic renewals.',
      requiresLawyer: false
    },
    {
      id: '5',
      category: 'Service Delivery',
      title: 'Vague Service Description',
      description: 'Services are defined only as "consulting services detailed in Exhibit A" without specific deliverables.',
      severity: 'medium',
      confidence: 'medium',
      pageReference: 4,
      recommendation: 'Request more detailed service specifications to avoid scope disputes.',
      requiresLawyer: false
    }
  ];

  const getSeverityColor = (severity: RiskItem['severity']) => {
    switch (severity) {
      case 'low':
        return 'text-success-700 bg-success-50 border-success-200';
      case 'medium':
        return 'text-warning-700 bg-warning-50 border-warning-200';
      case 'high':
        return 'text-accent-700 bg-accent-50 border-accent-200';
      case 'critical':
        return 'text-red-700 bg-red-50 border-red-200';
    }
  };

  const getSeverityIcon = (severity: RiskItem['severity']) => {
    switch (severity) {
      case 'low':
        return <Shield className="w-4 h-4" />;
      case 'medium':
        return <Clock className="w-4 h-4" />;
      case 'high':
        return <AlertTriangle className="w-4 h-4" />;
      case 'critical':
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getConfidenceText = (confidence: RiskItem['confidence']) => {
    switch (confidence) {
      case 'low':
        return 'Low Confidence';
      case 'medium':
        return 'Medium Confidence';
      case 'high':
        return 'High Confidence';
    }
  };

  const toggleRisk = (id: string) => {
    setExpandedRisk(expandedRisk === id ? null : id);
  };

  const risksByCategory = riskItems.reduce((acc, risk) => {
    if (!acc[risk.category]) {
      acc[risk.category] = [];
    }
    acc[risk.category].push(risk);
    return acc;
  }, {} as Record<string, RiskItem[]>);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Termination Conditions':
        return <Clock className="w-5 h-5" />;
      case 'Financial Obligations':
        return <DollarSign className="w-5 h-5" />;
      case 'Liability Clauses':
        return <Shield className="w-5 h-5" />;
      case 'Renewal Terms':
        return <TrendingUp className="w-5 h-5" />;
      case 'Service Delivery':
        return <Users className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const criticalRisks = riskItems.filter(risk => risk.severity === 'critical').length;
  const highRisks = riskItems.filter(risk => risk.severity === 'high').length;

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-accent-600" />
            <h2 className="text-lg font-serif font-semibold text-primary-900">
              Risk Analysis
            </h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-neutral-600">Risk Score</p>
            <p className="text-lg font-bold text-accent-600">Medium-High</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Risk Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-700 mb-1">{criticalRisks}</div>
            <div className="text-sm text-red-600">Critical</div>
          </div>
          <div className="bg-accent-50 border border-accent-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent-700 mb-1">{highRisks}</div>
            <div className="text-sm text-accent-600">High</div>
          </div>
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-warning-700 mb-1">2</div>
            <div className="text-sm text-warning-600">Medium</div>
          </div>
          <div className="bg-success-50 border border-success-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-success-700 mb-1">1</div>
            <div className="text-sm text-success-600">Low</div>
          </div>
        </div>

        {/* Risk Categories */}
        <div className="space-y-6">
          {Object.entries(risksByCategory).map(([category, risks]) => (
            <div key={category} className="space-y-3">
              {/* Category Header */}
              <div className="flex items-center space-x-3 pb-2 border-b border-neutral-200">
                {getCategoryIcon(category)}
                <h3 className="text-base font-semibold text-primary-900">{category}</h3>
                <span className="text-sm text-neutral-500">({risks.length} item{risks.length !== 1 ? 's' : ''})</span>
              </div>

              {/* Risk Items */}
              <div className="space-y-3">
                {risks.map(risk => (
                  <div key={risk.id} className="border border-neutral-200 rounded-lg overflow-hidden">
                    <div
                      className="p-4 cursor-pointer hover:bg-neutral-50 transition-colors duration-200"
                      onClick={() => toggleRisk(risk.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-start space-x-3">
                            <div className={`px-2 py-1 rounded-md border text-xs font-medium flex items-center space-x-1 ${getSeverityColor(risk.severity)}`}>
                              {getSeverityIcon(risk.severity)}
                              <span className="capitalize">{risk.severity}</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-primary-900 mb-1">{risk.title}</h4>
                              <p className="text-sm text-neutral-600 line-clamp-2">{risk.description}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 ml-4">
                          <div className="text-right">
                            <div className="text-xs text-neutral-500 mb-1">Page {risk.pageReference}</div>
                            <div className="text-xs text-neutral-600">{getConfidenceText(risk.confidence)}</div>
                          </div>
                          {expandedRisk === risk.id ? (
                            <ChevronDown className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {expandedRisk === risk.id && (
                      <div className="px-4 pb-4 border-t border-neutral-200 bg-neutral-50/50 animate-slide-up">
                        <div className="pt-4 space-y-4">
                          <div>
                            <h5 className="font-medium text-neutral-900 mb-2">Why This Matters</h5>
                            <p className="text-sm text-neutral-700">{risk.description}</p>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-neutral-900 mb-2">Our Recommendation</h5>
                            <p className="text-sm text-neutral-700">{risk.recommendation}</p>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-neutral-500">Found on page {risk.pageReference}</span>
                              <button className="text-xs text-primary-600 hover:text-primary-800 transition-colors duration-200 flex items-center space-x-1">
                                <span>View in document</span>
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            </div>
                            
                            {risk.requiresLawyer && (
                              <button className="px-3 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full hover:bg-accent-200 transition-colors duration-200">
                                Consult Lawyer
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-neutral-200 space-y-3">
          <button className="w-full py-3 px-4 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors duration-200 font-medium">
            Get Professional Legal Review
          </button>
          <button className="w-full py-2 px-4 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors duration-200">
            Download Risk Report (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;