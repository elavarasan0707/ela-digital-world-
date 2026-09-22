import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, ExternalLink } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [customMsg, setCustomMsg] = useState<string>('');
  const WHATSAPP_NUMBER = '918667618925';

  const defaultUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello ELA Digital World, I would like to discuss a project.')}`;

  const handleSendQuick = (text: string) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(customMsg.trim())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setCustomMsg('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Interactive Quick-Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-3 w-80 sm:w-96 rounded-2xl glass-panel-gold border border-amber-400/40 p-4 shadow-2xl backdrop-blur-2xl bg-[#090b12]/95"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <MessageSquare className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#090b12]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>ELA WhatsApp Desk</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </h3>
                  <p className="text-[11px] text-amber-300 font-mono">+91 8667618925</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10"
                aria-label="Close WhatsApp prompt"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Prompts */}
            <div className="py-3 space-y-2 text-xs">
              <p className="text-zinc-400 text-[11px]">Instant consultation shortcuts:</p>
              <button
                onClick={() => handleSendQuick('Hello ELA Digital World, I would like to schedule a strategy call.')}
                className="w-full text-left p-2 rounded-xl bg-white/[0.04] hover:bg-amber-400/10 hover:border-amber-400/30 border border-white/5 text-zinc-200 transition-all flex items-center justify-between group"
              >
                <span>🚀 Book a Free Digital Strategy Call</span>
                <Send className="w-3 h-3 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => handleSendQuick('Hello, I want to learn more about your AI Solutions and WhatsApp Automation.')}
                className="w-full text-left p-2 rounded-xl bg-white/[0.04] hover:bg-amber-400/10 hover:border-amber-400/30 border border-white/5 text-zinc-200 transition-all flex items-center justify-between group"
              >
                <span>🤖 Enquire about AI & WhatsApp Automation</span>
                <Send className="w-3 h-3 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => handleSendQuick('Hi, I need a proposal for Web Development and Branding.')}
                className="w-full text-left p-2 rounded-xl bg-white/[0.04] hover:bg-amber-400/10 hover:border-amber-400/30 border border-white/5 text-zinc-200 transition-all flex items-center justify-between group"
              >
                <span>💼 Get Website & Branding Proposal</span>
                <Send className="w-3 h-3 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            {/* Custom message input */}
            <form onSubmit={handleCustomSubmit} className="pt-2 border-t border-white/10 flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400/50"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-gold-gradient text-black font-bold text-xs hover:brightness-110 flex items-center justify-center cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-2">
        <a
          id="floating-whatsapp-direct-link"
          href={defaultUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#0B0D14] border border-amber-400/40 text-xs font-semibold text-white shadow-xl hover:border-amber-400 hover:shadow-amber-500/20 transition-all duration-300 group"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Chat with us on WhatsApp</span>
          <ExternalLink className="w-3 h-3 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
        </a>

        {/* Primary Icon Trigger Pill */}
        <button
          id="floating-whatsapp-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open WhatsApp Chat Support"
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#050608] via-[#0F131D] to-[#1B2232] border-2 border-amber-400 text-amber-300 shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer gold-glow"
        >
          {/* Pulsing Ripple Rings */}
          <span className="absolute -inset-1 rounded-full border border-amber-400/40 animate-ping opacity-40 pointer-events-none" />
          <span className="absolute -inset-2 rounded-full border border-amber-300/20 animate-pulse pointer-events-none" />

          {/* WhatsApp SVG / Lucide Icon */}
          <div className="relative z-10 flex items-center justify-center text-amber-300 group-hover:text-amber-200">
            <svg 
              className="w-7 h-7 fill-current" 
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};
