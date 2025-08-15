import React, { useState } from "react";
import { Scale, HelpCircle, User, Upload } from "lucide-react";
import Modal from "./shared/Modal";
import AboutLegalenz from "./legal/AboutLegalenz";
import { HeaderProps } from "../types/interfaces";

const Header: React.FC<HeaderProps> = ({ onNewDocument, showNewDocument }) => {
  const [showAbout, setShowAbout] = useState(false);
  return (
    <header className="bg-white border-b border-neutral-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-900 rounded-lg">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-primary-900">
                Legalenz AI
              </h1>
              <p className="text-xs text-neutral-600 hidden sm:block">
                AI-Powered Document Analysis
              </p>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-4">
            {showNewDocument && (
              <button
                onClick={onNewDocument}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors duration-200 font-medium"
                aria-label="Upload new document"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">New Document</span>
              </button>
            )}

            <button
              className="flex items-center justify-center w-10 h-10 text-neutral-600 hover:text-primary-900 hover:bg-neutral-100 rounded-lg transition-colors duration-200"
              aria-label="Help and FAQ"
              onClick={() => setShowAbout(true)}
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
        title="About Legalenz AI"
      >
        <AboutLegalenz />
      </Modal>
    </header>
  );
};

export default Header;
