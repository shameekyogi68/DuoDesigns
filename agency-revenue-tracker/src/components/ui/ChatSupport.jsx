import React, { useState } from 'react';
import { MessageSquare, X, Send, User, ChevronRight } from 'lucide-react';

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to Duo Designs Agency Support. Identity verified.", type: 'system' },
    { id: 2, text: "How can I assist you with your settlements today?", type: 'agent' }
  ]);

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      {/* Trigger Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-[var(--accent)] text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(232,255,59,0.3)] hover:scale-110 transition-all group"
        >
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--red)] border-2 border-[#111] rounded-full animate-bounce"></div>
          <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[380px] bg-[#111] border border-[#222] shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden reveal">
          {/* Header */}
          <div className="p-6 bg-[#0a0a0a] border-b border-[#222] flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="relative">
                 <div className="w-10 h-10 bg-[#1a1a1a] rounded-lg flex items-center justify-center">
                    <User size={20} className="text-[var(--accent)]" />
                 </div>
                 <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[var(--green)] border-2 border-[#111] rounded-full"></div>
               </div>
               <div>
                  <h4 className="text-[12px] font-black uppercase tracking-[2px]">Core Support</h4>
                  <p className="text-[9px] font-bold text-[var(--gray)] uppercase tracking-widest">Global Agency Hub</p>
               </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[var(--gray)] hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-[350px] overflow-y-auto p-6 space-y-6">
            {messages.map(msg => (
              <div key={msg.id} className={`flex flex-col ${msg.type === 'system' ? 'items-center' : 'items-start'}`}>
                {msg.type === 'system' && (
                  <span className="text-[9px] font-black uppercase tracking-[3px] text-[#444] py-1 px-3 border border-[#222] rounded-full mb-2">
                    {msg.text}
                  </span>
                )}
                {msg.type === 'agent' && (
                  <div className="p-4 bg-[#1a1a1a] border border-[#222] text-[12px] leading-relaxed max-w-[90%] font-semibold italic">
                    {msg.text}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer Input */}
          <div className="p-4 bg-[#0a0a0a] border-t border-[#222]">
            <div className="flex gap-2">
               <input 
                 type="text" 
                 placeholder="COMMAND PARSING..." 
                 className="flex-1 bg-[#1a1a1a] border border-[#222] px-4 py-3 text-[11px] font-bold outline-none focus:border-[var(--accent)] transition-all uppercase tracking-widest"
               />
               <button className="w-10 h-10 bg-[var(--accent)] text-black flex items-center justify-center rounded-sm">
                 <Send size={16} />
               </button>
            </div>
            <p className="text-[8px] font-bold text-[var(--gray)] mt-3 uppercase tracking-[2px] text-center opacity-50">
               Authenticated Session: ID-99XLR
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSupport;
