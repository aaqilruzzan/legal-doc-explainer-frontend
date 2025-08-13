import React from "react";
import { Loader2, CheckCircle, Clock } from "lucide-react";

interface ProcessingStep {
  id: string;
  label: string;
  completed: boolean;
  current: boolean;
}

interface ProcessingStateProps {
  steps: ProcessingStep[];
  fileName: string;
}

const ProcessingState: React.FC<ProcessingStateProps> = ({
  steps,
  fileName,
}) => {
  const completedSteps = steps.filter((step) => step.completed).length;
  const totalSteps = steps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  const getEstimatedTime = (completed: number, total: number): string => {
    const remaining = total - completed;
    if (remaining === 0) return "Almost done...";
    if (remaining === 1) return "30-45 seconds";
    if (remaining === 2) return "45-90 seconds";
    if (remaining === 3) return "1-2 minutes";
    if (remaining >= 4) return "1-2 minutes";
    return "1-2 minutes";
  };

  // Calculate estimated time dynamically
  const estimatedTime = getEstimatedTime(completedSteps, totalSteps);

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="flex items-center justify-center w-20 h-20 bg-primary-900 rounded-2xl">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {completedSteps}
              </span>
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-serif font-bold text-primary-900 mb-4">
          Analyzing Your Document
        </h1>
        <p className="text-neutral-600 mb-2">
          Processing:{" "}
          <span className="font-medium text-primary-900">{fileName}</span>
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-neutral-500">
          <Clock className="w-4 h-4" />
          <span>Estimated time: {estimatedTime}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-primary-900">
            Progress: {completedSteps} of {totalSteps} steps
          </span>
          <span className="text-sm text-neutral-600">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Processing Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`
              flex items-center space-x-4 p-4 rounded-xl border transition-all duration-300
              ${
                step.completed
                  ? "bg-success-50 border-success-200"
                  : step.current
                  ? "bg-primary-50 border-primary-200 shadow-sm"
                  : "bg-white border-neutral-200"
              }
            `}
          >
            {/* Step Icon */}
            <div
              className={`
              flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
              ${
                step.completed
                  ? "bg-success-500"
                  : step.current
                  ? "bg-primary-600"
                  : "bg-neutral-300"
              }
            `}
            >
              {step.completed ? (
                <CheckCircle className="w-5 h-5 text-white" />
              ) : step.current ? (
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              ) : (
                <span className="text-xs font-bold text-white">
                  {index + 1}
                </span>
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1">
              <p
                className={`
                font-medium transition-colors duration-300
                ${
                  step.completed
                    ? "text-success-800"
                    : step.current
                    ? "text-primary-900"
                    : "text-neutral-600"
                }
              `}
              >
                {step.label}
              </p>
              {step.current && (
                <p className="text-sm text-primary-600 mt-1">Processing...</p>
              )}
              {step.completed && (
                <p className="text-sm text-success-600 mt-1">Complete</p>
              )}
            </div>

            {/* Step Status */}
            <div
              className={`
              text-xs font-medium px-2 py-1 rounded-full transition-all duration-300
              ${
                step.completed
                  ? "bg-success-100 text-success-700"
                  : step.current
                  ? "bg-primary-100 text-primary-700"
                  : "bg-neutral-100 text-neutral-500"
              }
            `}
            >
              {step.completed ? "Done" : step.current ? "Active" : "Waiting"}
            </div>
          </div>
        ))}
      </div>

      {/* Loading Animation */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white border border-neutral-200 rounded-xl shadow-sm">
          <div className="flex space-x-1">
            <div
              className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
          <span className="text-sm font-medium text-neutral-700">
            AI is working on your document
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProcessingState;
