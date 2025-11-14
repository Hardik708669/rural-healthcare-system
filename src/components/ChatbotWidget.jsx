import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, User, Heart, Stethoscope, Brain } from 'lucide-react';
import { theme } from '../theme';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I'm your Health Assistant. How can I help you today?", 
      isBot: true,
      avatar: <Bot className="w-5 h-5" />
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage = { 
      id: messages.length + 1, 
      text: inputValue, 
      isBot: false,
      avatar: <User className="w-5 h-5" />
    };
    setMessages([...messages, userMessage]);
    
    // Clear input
    setInputValue('');
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const responses = [
        "I understand your concern. For accurate medical advice, I recommend consulting with a healthcare professional. Is there anything else I can help with?",
        "Based on your symptoms, it's important to stay hydrated and get plenty of rest. If symptoms persist, please see a doctor.",
        "I've noted your concern. Our telemedicine service can connect you with a doctor if needed. Would you like to schedule a consultation?",
        "That's a good question. For immediate care, you can visit the nearest health center or use our telemedicine service."
      ];
      
      const botMessage = { 
        id: messages.length + 2, 
        text: responses[Math.floor(Math.random() * responses.length)], 
        isBot: true,
        avatar: <Bot className="w-5 h-5" />
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickActions = [
    { text: "Check symptoms", icon: <Stethoscope className="w-4 h-4" /> },
    { text: "Find nearby clinic", icon: <Heart className="w-4 h-4" /> },
    { text: "Medication info", icon: <Brain className="w-4 h-4" /> }
  ];

  return (
    <>
      {isOpen ? (
        <div className={`${theme.glass.heavy} shadow-2xl z-50 fixed bottom-24 right-6 w-80 h-96 rounded-2xl flex flex-col ${theme.animation.fadeInUp} transform transition-all duration-300`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/20 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-green-600 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-semibold text-white">Health Assistant</span>
                <div className="text-xs text-green-400">Online</div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-1 transform transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex gap-2 ${message.isBot ? 'justify-start' : 'justify-end'} transform transition-all duration-300`}
              >
                {message.isBot && (
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 transform transition-transform duration-300 hover:scale-110">
                    {message.avatar}
                  </div>
                )}
                <div 
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.isBot 
                      ? 'bg-white/10 text-white rounded-tl-none' 
                      : 'bg-primary text-white rounded-tr-none'
                  } transform transition-all duration-300 hover:shadow-lg`}
                >
                  {message.text}
                </div>
                {!message.isBot && (
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 transform transition-transform duration-300 hover:scale-110">
                    {message.avatar}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Quick Actions */}
          <div className="px-4 py-2 border-y border-white/10">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-xs text-gray-300 whitespace-nowrap transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  {action.icon}
                  {action.text}
                </button>
              ))}
            </div>
          </div>
          
          {/* Input */}
          <div className="p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300"
              />
              <button 
                onClick={handleSend}
                className={`${theme.button.primary} p-2 rounded-lg transform transition-all duration-300 hover:scale-110 active:scale-95`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
      
      {/* Simplified chatbot button with explicit visibility */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-green-600 flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 z-60"
        style={{ 
          animation: 'float 3s ease-in-out infinite',
          display: 'block'
        }}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>
    </>
  );
};

export default ChatbotWidget;