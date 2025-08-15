import React, { useState } from "react";
import {
  Send,
  MessageCircle,
  Bookmark,
  ExternalLink,
  Lightbulb,
} from "lucide-react";
import { askQuestionRequest } from "../api/analyzeRequest";
import { Message, QAInterfaceProps } from "../types/interfaces";
import { suggestedQuestions } from "../utils/qaUtils";

const QAInterface: React.FC<QAInterfaceProps> = ({ namespace }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    if (!namespace) {
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        type: "answer",
        content: "Please analyze a document first before asking questions.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    const newQuestion: Message = {
      id: `q_${Date.now()}`,
      type: "question",
      content: input,
      timestamp: new Date(),
    };

    // Adding loading answer immediately
    const loadingAnswer: Message = {
      id: `a_${Date.now()}`,
      type: "answer",
      content: "Thinking...",
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, newQuestion, loadingAnswer]);
    const currentInput = input;
    setInput("");

    try {
      // Making API call to ask question
      const response = await askQuestionRequest(currentInput, namespace);

      // Replacing loading message with actual answer
      const actualAnswer: Message = {
        id: `a_${Date.now()}`,
        type: "answer",
        content: response.answer,
        timestamp: new Date(),
      };

      setMessages((prev) =>
        prev.map((msg) => (msg.isLoading ? actualAnswer : msg))
      );
    } catch (error) {
      const errorAnswer: Message = {
        id: `a_${Date.now()}`,
        type: "answer",
        content:
          error instanceof Error
            ? `Sorry, I couldn't process your question: ${error.message}`
            : "Sorry, I encountered an error while processing your question. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) =>
        prev.map((msg) => (msg.isLoading ? errorAnswer : msg))
      );
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const toggleSaveAnswer = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, saved: !msg.saved } : msg
      )
    );
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
        <div className="flex items-center space-x-3">
          <MessageCircle className="w-5 h-5 text-secondary-600" />
          <h2 className="text-lg font-serif font-semibold text-primary-900">
            Ask Questions About Your Document
          </h2>
        </div>
      </div>

      {/* Messages Area */}
      <div className="h-80 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-700 mb-2">
                {namespace
                  ? "Ready for your questions!"
                  : "No document analyzed yet"}
              </h3>
              <p className="text-sm text-neutral-500 max-w-sm">
                {namespace
                  ? "Ask specific questions about terms, obligations, risks, or any part of your document."
                  : "Please analyze a document first to start asking questions about it."}
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "question" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`
              max-w-[80%] p-4 rounded-lg
              ${
                message.type === "question"
                  ? "bg-primary-900 text-white ml-12"
                  : "bg-neutral-50 border border-neutral-200 mr-12"
              }
            `}
              >
                <div className="space-y-3">
                  <div
                    className={`text-sm leading-relaxed ${
                      message.type === "question"
                        ? "text-white"
                        : "text-neutral-800"
                    }`}
                  >
                    {message.isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                        <span>Analyzing your question...</span>
                      </div>
                    ) : (
                      <p>{message.content}</p>
                    )}
                  </div>

                  {message.type === "answer" && (
                    <div className="space-y-3">
                      {/* Actions */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => toggleSaveAnswer(message.id)}
                            className={`
                            flex items-center space-x-1 text-xs transition-colors duration-200
                            ${
                              message.saved
                                ? "text-primary-600 hover:text-primary-800"
                                : "text-neutral-500 hover:text-primary-600"
                            }
                          `}
                          >
                            <Bookmark
                              className={`w-3 h-3 ${
                                message.saved ? "fill-current" : ""
                              }`}
                            />
                            <span>{message.saved ? "Saved" : "Save"}</span>
                          </button>

                          <button className="flex items-center space-x-1 text-xs text-neutral-500 hover:text-primary-600 transition-colors duration-200">
                            <ExternalLink className="w-3 h-3" />
                            <span>View in document</span>
                          </button>

                          {message.sourcePages && (
                            <span className="text-neutral-500">
                              Source: Pages {message.sourcePages.join(", ")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div
                    className={`text-xs ${
                      message.type === "question"
                        ? "text-primary-200"
                        : "text-neutral-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Suggested Questions */}
      <div className="px-4 py-3 border-t border-neutral-100 bg-neutral-50/50">
        <div className="flex items-center space-x-2 mb-3">
          <Lightbulb className="w-4 h-4 text-warning-600" />
          <span className="text-sm font-medium text-neutral-700">
            Suggested questions:
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {suggestedQuestions.slice(0, 4).map((question, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(question)}
              className="text-left text-xs p-2 bg-white border border-neutral-200 rounded-md hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="px-4 py-4 border-t border-neutral-200">
        <div className="flex space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder={
              namespace
                ? "Ask about your document..."
                : "Analyze a document first to ask questions..."
            }
            disabled={!namespace}
            className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || !namespace}
            className="px-4 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-neutral-500 mt-2">
          {namespace
            ? "Ask specific questions about terms, risks, obligations, or any part of your document."
            : "Upload and analyze a document to start asking questions about it."}
        </p>
      </div>
    </div>
  );
};

export default QAInterface;
