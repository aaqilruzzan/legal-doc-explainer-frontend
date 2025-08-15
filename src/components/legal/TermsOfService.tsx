import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <div className="prose max-w-none">
      <p className="mb-4">Last updated: August 15, 2025</p>

      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-2">1. Acceptance of Terms</h4>
        <p>
          By accessing or using Legalenz AI, you agree to be bound by these
          Terms of Service. If you do not agree to these terms, please do not
          use our service.
        </p>
      </section>

      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-2">2. Service Description</h4>
        <p>
          Legalenz AI provides AI-powered legal document analysis and
          explanation services. Our service is intended for informational
          purposes only and should not be considered legal advice.
        </p>
      </section>

      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-2">3. Disclaimer</h4>
        <p>
          The information provided through our service is for educational and
          informational purposes only. It does not constitute legal advice and
          should not be relied upon as such. Always consult with a qualified
          legal professional for legal matters.
        </p>
      </section>

      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-2">4. User Obligations</h4>
        <ul className="list-disc pl-6 mb-4">
          <li>You must be at least 18 years old to use our service</li>
          <li>You must provide accurate information when using our service</li>
          <li>
            You must not use our service for any illegal or unauthorized purpose
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your
            account
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-2">5. Intellectual Property</h4>
        <p>
          All content, features, and functionality of our service are owned by
          Legalenz AI and are protected by international copyright, trademark,
          and other intellectual property laws.
        </p>
      </section>

      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-2">
          6. Limitation of Liability
        </h4>
        <p>
          Legalenz AI shall not be liable for any indirect, incidental, special,
          consequential, or punitive damages resulting from your use of our
          service or any related content.
        </p>
      </section>

      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-2">7. Changes to Terms</h4>
        <p>
          We reserve the right to modify these terms at any time. We will notify
          users of any material changes via email or through our service.
        </p>
      </section>

      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-2">8. Contact</h4>
        <p>
          For any questions about these Terms of Service, please contact us at
          terms@legalenz-ai.com
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;
