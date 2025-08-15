import React, { useState } from "react";
import { AlertTriangle, Shield, FileText, Mail, Info } from "lucide-react";
import Modal from "./shared/Modal";
import PrivacyPolicy from "./legal/PrivacyPolicy";
import TermsOfService from "./legal/TermsOfService";
import AboutLegalenz from "./legal/AboutLegalenz";

const Footer: React.FC = () => {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  return (
    <footer className="bg-white border-t border-neutral-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Disclaimer */}
          <div className="lg:col-span-2">
            <div className="flex items-start space-x-3 p-4 bg-warning-50 border border-warning-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-warning-800 mb-1">
                  Important Disclaimer
                </h4>
                <p className="text-sm text-warning-700">
                  AI analysis is not legal advice. Always consult with a
                  qualified attorney for legal matters. This tool provides
                  educational insights only.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-primary-900 mb-4">
              Legal Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setShowPrivacyPolicy(true)}
                  className="text-neutral-600 hover:text-primary-900 transition-colors duration-200 flex items-center space-x-2 w-full text-left"
                >
                  <Shield className="w-4 h-4" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowTermsOfService(true)}
                  className="text-neutral-600 hover:text-primary-900 transition-colors duration-200 flex items-center space-x-2 w-full text-left"
                >
                  <FileText className="w-4 h-4" />
                  <span>Terms of Service</span>
                </button>
              </li>
              <li>
                <a
                  href="https://www.hg.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-primary-900 transition-colors duration-200 flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Find a Lawyer</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-serif font-semibold text-primary-900 mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:customersupport@legalenz-ai.com"
                  className="text-neutral-600 hover:text-primary-900 transition-colors duration-200"
                >
                  Help Center
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    window.scrollTo({
                      top: Math.max(0, window.scrollY - 100),
                      behavior: "smooth",
                    });
                  }}
                  className="text-neutral-600 hover:text-primary-900 transition-colors duration-200"
                >
                  Document Types
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowAbout(true)}
                  className="text-neutral-600 hover:text-primary-900 transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>About Legalenz</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-neutral-600 mb-4 sm:mb-0">
              © 2025 Legalenz AI. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-neutral-600">
              <span>Powered by ShifttoEsc</span>
              <span>•</span>
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={showPrivacyPolicy}
        onClose={() => setShowPrivacyPolicy(false)}
        title="Privacy Policy"
      >
        <PrivacyPolicy />
      </Modal>

      {/* Terms of Service Modal */}
      <Modal
        isOpen={showTermsOfService}
        onClose={() => setShowTermsOfService(false)}
        title="Terms of Service"
      >
        <TermsOfService />
      </Modal>

      {/* About Legalenz Modal */}
      <Modal
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
        title="About Legalenz AI"
      >
        <AboutLegalenz />
      </Modal>
    </footer>
  );
};

export default Footer;
