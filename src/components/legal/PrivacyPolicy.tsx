import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="prose max-w-none">
      <p className="mb-4">Last updated: August 15, 2025</p>

      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-2">
          1. Information We Collect
        </h4>
        <p>
          When you use Legalenz AI, we collect and process the following types
          of information:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Document content you upload for analysis</li>
          <li>Usage data and interaction with our services</li>
          <li>Technical information about your device and browser</li>
        </ul>
      </section>

      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-2">
          2. How We Use Your Information
        </h4>
        <p>We use your information to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Provide and improve our document analysis services</li>
          <li>Analyze and process legal documents</li>
          <li>Enhance the accuracy and reliability of our AI models</li>
          <li>Maintain and improve our service</li>
        </ul>
      </section>

      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-2">3. Data Security</h4>
        <p>
          We implement appropriate technical and organizational measures to
          protect your data. Documents are encrypted during transmission and
          storage, and we maintain strict access controls.
        </p>
      </section>

      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-2">4. Data Retention</h4>
        <p>
          We retain your documents and analysis results for a limited time to
          provide our services. You can request deletion of your data at any
          time.
        </p>
      </section>

      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-2">5. Your Rights</h4>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Access your personal data</li>
          <li>Request correction of your data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
        </ul>
      </section>

      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-2">6. Contact Us</h4>
        <p>
          For any privacy-related questions or concerns, please contact our Data
          Protection Officer at privacy@legalenz-ai.com
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
