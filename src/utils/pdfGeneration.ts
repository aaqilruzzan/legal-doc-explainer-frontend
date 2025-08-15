import html2pdf from "html2pdf.js";
import { PDFGenerationOptions } from "../types/interfaces";

export const generateRiskAnalysisPDF = async ({
  riskItems,
  riskScore,
  getRiskScoreLabel,
  criticalRisks,
  highRisks,
  mediumRisks,
  lowRisks,
  risksByCategory,
}: PDFGenerationOptions): Promise<void> => {
  if (!riskItems) return;

  // Create text content for PDF
  const content = document.createElement("div");
  content.style.padding = "20px";
  content.style.fontFamily = "Arial, sans-serif";

  // Add Risk Score Section
  const scoreSection = document.createElement("div");
  scoreSection.innerHTML = `
    <h1 style="font-size: 24px; margin-bottom: 20px;">Risk Analysis Report</h1>
    <p style="font-size: 16px; margin-bottom: 10px;">Risk Score: ${riskScore}/100 (${
    getRiskScoreLabel(riskScore).label
  })</p>
    <div style="margin-bottom: 20px;">
      <p>Critical Risks: ${criticalRisks}</p>
      <p>High Risks: ${highRisks}</p>
      <p>Medium Risks: ${mediumRisks}</p>
      <p>Low Risks: ${lowRisks}</p>
    </div>
  `;
  content.appendChild(scoreSection);

  // Add Risk Items by Category
  Object.entries(risksByCategory).forEach(([category, risks]) => {
    const categorySection = document.createElement("div");
    categorySection.innerHTML = `
      <h2 style="font-size: 20px; margin: 20px 0 10px;">${category}</h2>
    `;

    risks.forEach((risk) => {
      const riskItem = document.createElement("div");
      riskItem.style.marginBottom = "20px";
      riskItem.innerHTML = `
        <h3 style="font-size: 16px; margin-bottom: 10px;">${risk.title}</h3>
        <p style="margin-bottom: 5px;"><strong>Severity:</strong> ${
          risk.severity
        }</p>
        <p style="margin-bottom: 5px;"><strong>Confidence:</strong> ${
          risk.confidence
        }</p>
        <p style="margin-bottom: 10px;"><strong>Description:</strong> ${
          risk.description
        }</p>
        <p style="margin-bottom: 5px;"><strong>Recommendation:</strong> ${
          risk.recommendation
        }</p>
        ${
          risk.requiresLawyer
            ? '<p style="color: #d32f2f;"><strong>Note:</strong> Legal consultation recommended</p>'
            : ""
        }
      `;
      categorySection.appendChild(riskItem);
    });

    content.appendChild(categorySection);
  });

  const opt = {
    margin: [10, 10, 10, 10] as [number, number, number, number],
    filename: "risk-analysis-report.pdf",
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
      putOnlyUsedFonts: true,
    },
  };

  try {
    await html2pdf().set(opt).from(content).save();
  } catch (err) {
    console.error("Error generating PDF:", err);
  }
};
