import React from "react";

const AboutLegalenz: React.FC = () => {
  return (
    <div className="prose max-w-none">
      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-4">About Legalenz AI</h4>
        <p className="mb-4">
          Legalenz AI is a cutting-edge legal document analysis platform that
          combines advanced artificial intelligence with legal expertise to make
          legal documents more accessible and understandable.
        </p>
      </section>

      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-4">Our Mission</h4>
        <p className="mb-4">
          Our mission is to democratize legal understanding by providing
          intelligent, accessible tools that help individuals and businesses
          better comprehend their legal documents. We believe everyone deserves
          to understand their legal rights and obligations clearly.
        </p>
      </section>

      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-4">What We Offer</h4>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">Advanced AI-powered document analysis</li>
          <li className="mb-2">Clear, concise explanations of legal terms</li>
          <li className="mb-2">
            Risk assessment and highlighting of key provisions
          </li>
          <li className="mb-2">Interactive Q&A for deeper understanding</li>
          <li className="mb-2">Secure and confidential document processing</li>
        </ul>
      </section>

      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-4">Our Commitment</h4>
        <p className="mb-4">
          While we provide powerful tools for understanding legal documents, we
          maintain a strong commitment to transparency and ethics. We always
          remind users that our service is for educational purposes and should
          not replace professional legal advice.
        </p>
      </section>

      <section>
        <h4 className="text-lg font-semibold mb-4">Security & Privacy</h4>
        <p className="mb-4">
          At Legalenz AI, we take your privacy and security seriously. All
          documents are processed with state-of-the-art encryption, and we
          adhere to strict data protection protocols to ensure your sensitive
          information remains confidential.
        </p>
      </section>
    </div>
  );
};

export default AboutLegalenz;
