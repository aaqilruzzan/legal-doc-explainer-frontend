import React, { useState } from 'react';
import { 
  Send, 
  MessageCircle, 
  Bookmark, 
  Clock, 
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Lightbulb
} from 'lucide-react';

interface Message {
  id: string;
  type: 'question' | 'answer';
  content: string;
  timestamp: Date;
  confidence?: 'low' | 'medium' | 'high';
  sourcePages?: number[];
  requiresLawyer?: boolean;
  saved?: boolean;
}

const QAInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'question',
      content: 'Can I terminate this contract early?',
      timestamp: new Date(Date.now() - 5000)
    },
    {
      id: '2',
      type: 'answer',
      content: 'Yes, you can terminate this contract early. According to Section 2 on page 3, either party may terminate this Agreement with thirty (30) days written notice. There are no early termination penalties mentioned in the contract.',
      timestamp: new Date(Date.now() - 4000),
      confidence: 'high',
      sourcePages: [3],
      requiresLawyer: false
    }
  ]);

  const suggestedQuestions = [
    'What are the penalties for late payment?',
    'How does auto-renewal work?',
    'What happens if I breach the contract?',
    'Can the other party change the terms?',
    'What are my intellectual property rights?',
    'How are disputes resolved?'
  ];

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newQuestion: Message = {
      id: `q_${Date.now()}`,
      type: 'question',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newQuestion]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const mockAnswer: Message = {
        id: `a_${Date.now()}`,
        type: 'answer',
        content: generateMockAnswer(input),
        timestamp: new Date(),
        confidence: Math.random() > 0.5 ? 'high' : 'medium',
        sourcePages: [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1],
        requiresLawyer: Math.random() > 0.7
      };

      setMessages(prev => [...prev, mockAnswer]);
    }, 1500);
  };

  const generateMockAnswer = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('payment') || lowerQuestion.includes('late')) {
      return 'According to Section 3 on page 5, late payments incur a fee of 1.5% per month on the outstanding balance. Payments are due within 30 days of the invoice date. This rate is quite high (18% annually), so timely payments are important to avoid significant penalties.';
    }
    
    if (lowerQuestion.includes('renewal') || lowerQuestion.includes('auto')) {
      return 'This contract does not have an auto-renewal clause. The agreement runs for exactly 12 months from January 1, 2025 to December 31, 2025. If you want to continue the relationship, you\'ll need to negotiate a new contract or extend the current one before it expires.';
    }
    
    return 'Based on my analysis of your document, I found relevant information in the contract terms. However, for this specific question, I recommend consulting with a qualified attorney to get detailed legal advice tailored to your situation.';
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const toggleSaveAnswer = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, saved: !msg.saved } : msg
    ));
  };

  const getConfidenceColor = (confidence: Message['confidence']) => {
    switch (confidence) {
      case 'high':
        return 'text-success-700 bg-success-100';
      case 'medium':
        return 'text-warning-700 bg-warning-100';
      case 'low':
        return 'text-accent-700 bg-accent-100';
      default:
        return 'text-neutral-700 bg-neutral-100';
    }
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
        {messages.map(message => (
          <div key={message.id} className={`flex ${message.type === 'question' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[80%] p-4 rounded-lg
              ${message.type === 'question' 
                ? 'bg-primary-900 text-white ml-12' 
                : 'bg-neutral-50 border border-neutral-200 mr-12'
              }
            `}>
              <div className="space-y-3">
                <p className={`text-sm leading-relaxed ${message.type === 'question' ? 'text-white' : 'text-neutral-800'}`}>
                  {message.content}
                </p>
                
                {message.type === 'answer' && (
                  <div className="space-y-3">
                    {/* Confidence and Source Info */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        {message.confidence && (
                          <span className={`px-2 py-1 rounded-full font-medium ${getConfidenceColor(message.confidence)}`}>
                            {message.confidence === 'high' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                            {message.confidence === 'medium' && <Clock className="w-3 h-3 inline mr-1" />}
                            {message.confidence === 'low' && <AlertCircle className="w-3 h-3 inline mr-1" />}
                            {message.confidence} confidence
                          </span>
                        )}
                        {message.sourcePages && (
                          <span className="text-neutral-500">
                            Source: Pages {message.sourcePages.join(', ')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleSaveAnswer(message.id)}
                          className={`
                            flex items-center space-x-1 text-xs transition-colors duration-200
                            ${message.saved 
                              ? 'text-primary-600 hover:text-primary-800' 
                              : 'text-neutral-500 hover:text-primary-600'
                            }
                          `}
                        >
                          <Bookmark className={`w-3 h-3 ${message.saved ? 'fill-current' : ''}`} />
                          <span>{message.saved ? 'Saved' : 'Save'}</span>
                        </button>
                        
                        <button className="flex items-center space-x-1 text-xs text-neutral-500 hover:text-primary-600 transition-colors duration-200">
                          <ExternalLink className="w-3 h-3" />
                          <span>View in document</span>
                        </button>
                      </div>

                      {message.requiresLawyer && (
                        <button className="px-2 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-md hover:bg-accent-200 transition-colors duration-200">
                          Consult Lawyer
                        </button>
                      )}
                    </div>
                  </div>
                )}
                
                <div className={`text-xs ${message.type === 'question' ? 'text-primary-200' : 'text-neutral-500'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Questions */}
      <div className="px-4 py-3 border-t border-neutral-100 bg-neutral-50/50">
        <div className="flex items-center space-x-2 mb-3">
          <Lightbulb className="w-4 h-4 text-warning-600" />
          <span className="text-sm font-medium text-neutral-700">Suggested questions:</span>
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
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about your document..."
            className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className="px-4 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-neutral-500 mt-2">
          Ask specific questions about terms, risks, obligations, or any part of your document.
        </p>
      </div>
    </div>
  );
};

export default QAInterface;