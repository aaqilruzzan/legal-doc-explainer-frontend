export const validateFile = (file: File): string | null => {
  const maxSize = 16 * 1024 * 1024; // 16MB
  const allowedTypes = ["application/pdf"];

  if (!allowedTypes.includes(file.type)) {
    return "Please upload a PDF file only.";
  }

  if (file.size > maxSize) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    return `File size (${sizeMB}MB) exceeds the maximum limit of 16MB.`;
  }

  return null;
};
