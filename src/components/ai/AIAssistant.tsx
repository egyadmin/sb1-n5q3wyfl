import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Loader, Maximize2, Minimize2, Bot } from 'lucide-react';
import { aiService } from '../../services/aiService';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = aiService.prepareMessage(input.trim());
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await aiService.chat([
        {
          role: 'system',
          content: 'أنت مساعد ذكي متخصص في إدارة المستودعات والمخزون. ساعد المستخدم في الإجابة على أسئلته وتقديم الاقتراحات المفيدة.'
        },
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        { role: 'user', content: userMessage }
      ]);
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: error instanceof Error ? error.message : 'عذراً، حدث خطأ في معالجة طلبك. الرجاء المحاولة مرة أخرى.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed ${isExpanded ? 'inset-0' : 'bottom-4 left-4'} z-50 transition-all duration-300`}>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-110"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className={`bg-white rounded-lg shadow-xl ${
          isExpanded ? 'w-full h-full' : 'w-96 h-[600px]'
        } flex flex-col transition-all duration-300`}>
          <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Bot className="w-6 h-6" />
              <div>
                <h3 className="font-medium">مونيكا - المساعد الذكي</h3>
                <p className="text-sm text-blue-100">متخصص في إدارة المستودعات</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white hover:text-blue-100 transition-colors"
              >
                {isExpanded ? (
                  <Minimize2 className="w-5 h-5" />
                ) : (
                  <Maximize2 className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-blue-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <Bot className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                <p className="text-lg font-medium">مرحباً بك!</p>
                <p className="text-sm">أنا مونيكا، مساعدك الذكي في إدارة المستودعات.</p>
                <p className="text-sm">كيف يمكنني مساعدتك اليوم؟</p>
              </div>
            )}
            
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Loader className="w-5 h-5 animate-spin text-blue-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t bg-gray-50">
            <div className="flex space-x-2 rtl:space-x-reverse">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}