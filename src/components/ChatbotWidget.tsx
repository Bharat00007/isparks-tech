import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

interface ChatbotWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const botResponses: Record<string, string> = {
  services: `We offer 5 main services:

🤖 AI Chatbot - Custom AI chatbots for customer support, lead generation, and automation.

📄 Doc-AI Extraction - Automated document processing with 99%+ accuracy.

🌐 Website Development - Modern, responsive websites tailored to your business.

🔬 Semiconductor Testing Software - Specialized testing solutions for semiconductor industry.

📱 App Development - Custom mobile and web applications for your business.

Type a service name to learn more!`,
  
  chatbot: `🤖 AI Chatbot Solutions

Our AI-powered chatbots can:
• Handle customer queries 24/7
• Integrate with WhatsApp, Telegram, Web
• Support multiple languages
• Reduce support costs by up to 70%

Plans start from ₹9,999/month. Would you like to request a quote?`,

  invoice: `📄 Doc-AI Extraction

Automate your document processing:
• Extract data from any document format
• 99%+ accuracy with AI
• Export to Excel, CSV, or your ERP
• Process thousands of documents in minutes

Contact us for a demo!`,

  website: `🌐 Website Development

We build modern websites:
• Responsive design for all devices
• SEO optimized
• Fast loading speeds
• Custom features & integrations
• E-commerce solutions

Let's discuss your project!`,

  semiconductor: `🔬 Semiconductor Testing Software

Our semiconductor testing solutions include:
• Automated test equipment integration
• Custom test program development
• Data analysis & yield optimization
• Quality assurance systems
• Production testing solutions

Contact us for specialized semiconductor solutions!`,

  app: `📱 App Development

We build custom applications:
• iOS & Android mobile apps
• Cross-platform solutions
• Web applications
• Enterprise software
• UI/UX design & development

Let's bring your app idea to life!`,

  contact: `📞 Contact Us

• WhatsApp: +65 9185 0551
• Email: info@isparks.com
• Location: Singapore

We typically respond within 1 hour during business hours.`,

  pricing: `💰 Pricing

Our pricing varies by project scope:
• AI Chatbot: From ₹9,999/month
• Invoice Extraction: Custom quote
• Website: From ₹50,000
• Semiconductor Testing: Project-based
• App Development: From ₹1,00,000

Request a quote for accurate pricing!`,

  default: `I can help you learn about our services! Try asking about:

• Services - Overview of what we offer
• Chatbot - AI chatbot solutions
• Invoice - Doc-AI extraction
• Website - Web development
• Semiconductor - Testing software
• App - App development
• Contact - How to reach us
• Pricing - Our pricing info

Or ask any question!`
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  
  if (lower.includes('service') || lower.includes('offer') || lower.includes('what do you')) {
    return botResponses.services;
  }
  if (lower.includes('chatbot') || lower.includes('ai bot') || lower.includes('chat bot')) {
    return botResponses.chatbot;
  }
  if (lower.includes('invoice') || lower.includes('extraction') || lower.includes('ocr') || lower.includes('doc-ai') || lower.includes('document')) {
    return botResponses.invoice;
  }
  if (lower.includes('website') || lower.includes('web dev') || lower.includes('site')) {
    return botResponses.website;
  }
  if (lower.includes('semiconductor') || lower.includes('testing software') || lower.includes('chip')) {
    return botResponses.semiconductor;
  }
  if (lower.includes('app') || lower.includes('mobile') || lower.includes('application')) {
    return botResponses.app;
  }
  if (lower.includes('contact') || lower.includes('phone') || lower.includes('email') || lower.includes('whatsapp')) {
    return botResponses.contact;
  }
  if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing') || lower.includes('quote')) {
    return botResponses.pricing;
  }
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
    return `Hello! 👋 Welcome to iSparks! I'm here to help you learn about our services. ${botResponses.default}`;
  }
  
  return botResponses.default;
};

const ChatbotWidget = ({ isOpen, onClose }: ChatbotWidgetProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! 👋 Welcome to iSparks! I'm your virtual assistant. How can I help you today?\n\nType 'services' to see what we offer!",
      isBot: true
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      setIsTyping(false);
      const botMessage: Message = {
        id: messages.length + 2,
        text: getResponse(input),
        isBot: true
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickActions = [
    { label: 'Services', query: 'services' },
    { label: 'Pricing', query: 'pricing' },
    { label: 'Contact', query: 'contact' },
  ];

  const handleQuickAction = (query: string) => {
    setInput(query);
    setTimeout(() => {
      const userMessage: Message = {
        id: messages.length + 1,
        text: query,
        isBot: false
      };
      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        const botMessage: Message = {
          id: messages.length + 2,
          text: getResponse(query),
          isBot: true
        };
        setMessages(prev => [...prev, botMessage]);
      }, 800);
    }, 100);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-44 right-6 z-50 w-[360px] sm:w-[400px] h-[500px] bg-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-700/50">
      {/* Header */}
      <div className="bg-slate-800 p-5 flex items-center gap-4 border-b border-slate-700/50">
        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg">iSparks AI</h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <p className="text-slate-400 text-sm">Online</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center hover:bg-slate-600 transition-colors"
        >
          <X className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            {message.isBot && (
              <div className="w-8 h-8 bg-primary/20 rounded-xl flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-primary" />
              </div>
            )}
            <div
              className={`max-w-[80%] p-4 text-sm whitespace-pre-line leading-relaxed ${
                message.isBot
                  ? 'bg-slate-800 text-slate-200 rounded-2xl rounded-tl-md'
                  : 'bg-primary text-white rounded-2xl rounded-tr-md'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="w-8 h-8 bg-primary/20 rounded-xl flex items-center justify-center mr-2 flex-shrink-0 mt-1">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-slate-800 text-slate-200 rounded-2xl rounded-tl-md p-4">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2 flex gap-2 flex-wrap">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => handleQuickAction(action.query)}
              className="px-4 py-2 bg-slate-800 text-slate-300 text-sm rounded-full border border-slate-700 hover:bg-slate-700 hover:text-white transition-colors"
            >
              {action.label}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-slate-800 border-t border-slate-700/50">
        <div className="flex gap-3 items-center bg-slate-900 rounded-2xl p-2 pl-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask anything..."
            className="flex-1 border-0 bg-transparent text-white placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="bg-primary hover:bg-primary/90 rounded-xl h-10 w-10"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-slate-500 mt-3 text-center">
          Need human help? <a href="https://wa.me/6591850551" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Chat on WhatsApp</a>
        </p>
      </div>
    </div>
  );
};

export default ChatbotWidget;
