import React from 'react';
import { AlertTriangle, Shield, FileText, Mail } from 'lucide-react';

const Footer: React.FC = () => {
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
                <h4 className="font-semibold text-warning-800 mb-1">Important Disclaimer</h4>
                <p className="text-sm text-warning-700">
                  AI analysis is not legal advice. Always consult with a qualified attorney 
                  for legal matters. This tool provides educational insights only.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-primary-900 mb-4">Legal Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-600 hover:text-primary-900 transition-colors duration-200 flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Privacy Policy</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-primary-900 transition-colors duration-200 flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Terms of Service</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-primary-900 transition-colors duration-200 flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Contact Support</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-serif font-semibold text-primary-900 mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-600 hover:text-primary-900 transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-primary-900 transition-colors duration-200">
                  Document Types
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-primary-900 transition-colors duration-200">
                  Find a Lawyer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-neutral-600 mb-4 sm:mb-0">
              © 2025 Legal Doc AI. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-neutral-600">
              <span>Powered by Advanced AI</span>
              <span>•</span>
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;