import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  BarChart2, 
  Terminal, 
  Sparkles, 
  CheckCircle, 
  Zap, 
  Send,
  Play,
  RotateCcw,
  ExternalLink,
  PhoneCall
} from 'lucide-react';
import { submitContactRequest } from '../lib/storage';

export const AICommandCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'leads' | 'marketing' | 'analytics'>('whatsapp');
  const [simulatedChat, setSimulatedChat] = useState<Array<{ sender: 'lead' | 'ai'; text: string; time: string }>>([
    { sender: 'lead', text: 'Hi, I need a high-converting website and Meta ads campaign for our real estate group in Dubai.', time: '10:42 AM' },
    { sender: 'ai', text: 'Hello! Welcome to ELA Digital World. Our AI has matched your request with our Enterprise Real Estate Growth package (6.4x avg ROAS). What is your target monthly acquisition budget?', time: '10:42 AM' },
    { sender: 'lead', text: 'Around $15,000 to $25,000 per month.', time: '10:43 AM' },
    { sender: 'ai', text: 'Excellent. Generating your tailored 3D interactive proposal and booking a calendar slot with Principal Strategist E. L. Anand...', time: '10:43 AM' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Terminal log stream
  const [logs, setLogs] = useState<string[]>([
    '[10:43:02] [SYSTEM] Neural pipeline initialized on node: asia-south1',
    '[10:43:04] [WHATSAPP-API] Webhook received from +91 8667618925',
    '[10:43:06] [META-CAPI] Server event transmitted: Purchase intent detected',
    '[10:43:08] [LEAD-ENGINE] Lead #4829 scored: 96/100 (High-Ticket Enterprise)',
    '[10:43:10] [CRM-SYNC] Synced to Firestore collection: leads'
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const simulatedActions = [
        `[${new Date().toLocaleTimeString()}] [WHATSAPP] Lead captured and assigned via auto-nurture`,
        `[${new Date().toLocaleTimeString()}] [META-ADS] Budget reallocated: +18% to top-performing Adset`,
        `[${new Date().toLocaleTimeString()}] [AI-AGENT] Auto-reply dispatched in 1.4 seconds`,
        `[${new Date().toLocaleTimeString()}] [SEO-INDEX] 14 semantic URLs indexed on Google Search`
      ];
      const randomAction = simulatedActions[Math.floor(Math.random() * simulatedActions.length)];
      setLogs(prev => [randomAction, ...prev.slice(0, 5)]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const generateAiReply = (text: string): string => {
    const t = text.toLowerCase();
    if (t.includes('real estate') || t.includes('property') || t.includes('dubai')) {
      return "Understood. Our Dubai & Gulf Real Estate Growth system integrates targeted Meta lead-generation ads and verified WhatsApp instant qualification, delivering an average 6.4x ROAS. Let's connect directly on WhatsApp +91 8667618925 to review your project brief!";
    }
    if (t.includes('ecommerce') || t.includes('e-commerce') || t.includes('order') || t.includes('shop')) {
      return "Fantastic. For scaling e-commerce brands, we implement full-funnel Meta CAPI ads, automated cart abandonment WhatsApp bots, and speed-optimized landing pages. Connect with our strategist on WhatsApp +91 8667618925 to begin.";
    }
    if (t.includes('web') || t.includes('app') || t.includes('design') || t.includes('brand')) {
      return "Excellent! We specialize in ultra-fast, premium React/Next.js web applications, futuristic UI/UX, and complete brand identities. Message us on WhatsApp +91 8667618925 for a tailored proposal.";
    }
    if (t.includes('price') || t.includes('cost') || t.includes('budget') || t.includes('quote')) {
      return "Our growth packages range from targeted sprint solutions to enterprise transformation retainers. Our team is available right now on WhatsApp +91 8667618925 for an instant customized quote.";
    }
    return `Thank you! ELA Digital World's cognitive engine has analyzed your inquiry: "${text}". We can deploy this system for you immediately. Click below to chat directly on WhatsApp +91 8667618925.`;
  };

  const handleSendTestChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const queryText = userInput.trim();
    const newMsg = { sender: 'lead' as const, text: queryText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setSimulatedChat(prev => [...prev, newMsg]);
    setUserInput('');
    setIsTyping(true);

    // Auto-sync into leads CRM
    submitContactRequest({
      name: 'WhatsApp AI Explorer',
      email: 'lead@inquiry.com',
      phone: '+91 8667618925',
      company: 'Enterprise Inquiry',
      service: 'AI Solutions',
      budget: '$5,000 - $10,000',
      message: queryText,
      viaWhatsApp: true
    }).catch(() => {});

    setTimeout(() => {
      setIsTyping(false);
      const aiReply = {
        sender: 'ai' as const,
        text: generateAiReply(queryText),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setSimulatedChat(prev => [...prev, aiReply]);
    }, 400);
  };

  const handleDirectWhatsAppSend = (textToSend?: string) => {
    const text = textToSend || userInput.trim() || 'Hello ELA Digital World, I would like to discuss a project.';
    const formatted = `Hello ELA Digital World,\n\nI am contacting you regarding: ${text}\n\nPlease let me know how we can proceed.\n\nThank you.`;
    const url = `https://wa.me/918667618925?text=${encodeURIComponent(formatted)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="ai-command" className="py-24 relative overflow-hidden bg-[#050608]">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-amber-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Futuristic AI Command Center</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] mb-6">
            Your Business. <br />
            <span className="text-gold-gradient">Powered by Digital Intelligence.</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Deploy autonomous marketing, predictive lead scoring, and official WhatsApp Cloud API bots that generate revenue 24/7 without manual lag.
          </p>
        </div>

        {/* Command Center Shell */}
        <div className="rounded-3xl glass-panel-gold border border-amber-400/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden bg-[#080A12]">
          
          {/* Top Bar of the Console */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="h-4 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-300">CORE://ELA-AI-COGNITIVE-MATRIX</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  ONLINE
                </span>
              </div>
            </div>

            {/* Subsystem Selectors */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10 text-xs">
              <button
                id="cmd-tab-whatsapp"
                onClick={() => setActiveTab('whatsapp')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'whatsapp' ? 'bg-gold-gradient text-black font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp AI Bot</span>
              </button>

              <button
                id="cmd-tab-leads"
                onClick={() => setActiveTab('leads')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'leads' ? 'bg-gold-gradient text-black font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Lead Intelligence</span>
              </button>

              <button
                id="cmd-tab-marketing"
                onClick={() => setActiveTab('marketing')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'marketing' ? 'bg-gold-gradient text-black font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Ad Optimizer</span>
              </button>

              <button
                id="cmd-tab-analytics"
                onClick={() => setActiveTab('analytics')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'analytics' ? 'bg-gold-gradient text-black font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Telemetry</span>
              </button>
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            
            {/* Main Interactive Screen */}
            <div className="lg:col-span-8 rounded-2xl bg-black/60 border border-white/10 p-6 flex flex-col justify-between min-h-[380px]">
              
              {activeTab === 'whatsapp' && (
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-bold text-white">Live WhatsApp AI Agent Simulation</span>
                        <span className="text-[10px] text-zinc-400">(Connected to Meta Cloud API)</span>
                      </div>
                      <span className="text-[10px] text-amber-400 font-mono">+91 8667618925</span>
                    </div>

                    {/* Chat Messages */}
                    <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2">
                      {simulatedChat.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex ${msg.sender === 'lead' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                              msg.sender === 'lead'
                                ? 'bg-amber-400/20 text-amber-200 border border-amber-400/30'
                                : 'bg-white/[0.07] text-zinc-200 border border-white/10'
                            }`}
                          >
                            <p>{msg.text}</p>
                            <span className="text-[9px] text-zinc-400 block text-right mt-1">{msg.time}</span>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="text-[10px] text-amber-300 font-mono animate-pulse">
                          ELA AI is analyzing parameters and typing response...
                        </div>
                      )}
                    </div>

                    {/* Quick Suggestion Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-2 pb-1">
                      <button
                        type="button"
                        onClick={() => {
                          setUserInput('Can you scale our e-commerce brand to 50k orders?');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-amber-400/10 border border-white/5 hover:border-amber-400/30 text-[10px] text-zinc-300 transition-colors cursor-pointer"
                      >
                        🛍️ E-commerce 50k Orders
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setUserInput('We need high-converting Meta Ads and Dubai real estate leads.');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-amber-400/10 border border-white/5 hover:border-amber-400/30 text-[10px] text-zinc-300 transition-colors cursor-pointer"
                      >
                        🏢 Real Estate Lead Gen
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setUserInput('We need a custom full-stack web application with AI integration.');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-amber-400/10 border border-white/5 hover:border-amber-400/30 text-[10px] text-zinc-300 transition-colors cursor-pointer"
                      >
                        ⚡ Web App & AI
                      </button>
                    </div>

                    {/* Direct WhatsApp Action Banner */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-[11px] text-zinc-200">Official Desk: <strong className="text-emerald-400 font-mono">+91 8667618925</strong></span>
                      </div>
                      <a
                        href={`https://wa.me/918667618925?text=${encodeURIComponent('Hello ELA Digital World, I am testing your AI Bot and would like to connect on WhatsApp.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded-lg bg-emerald-500 text-black text-[11px] font-bold hover:bg-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  {/* Test Input Form */}
                  <form onSubmit={handleSendTestChat} className="mt-3 pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Type your message or project question..."
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-black/80 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400/50"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gold-gradient text-black font-bold text-xs hover:brightness-110 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDirectWhatsAppSend()}
                        title="Send this text directly to real WhatsApp +91 8667618925"
                        className="px-3.5 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs hover:bg-emerald-500/30 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'leads' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <h4 className="text-sm font-bold text-white">Autonomous Lead Qualification & Scoring Matrix</h4>
                    <span className="text-xs text-amber-400 font-mono">Neural Weight: 0.98</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-[10px] text-zinc-400 uppercase font-mono">Intent Scoring</span>
                      <p className="text-lg font-bold text-white mt-1">94.6% Accuracy</p>
                      <p className="text-xs text-zinc-400 mt-0.5">Filters out tire-kickers; elevates high-ticket enterprise buyers.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-[10px] text-zinc-400 uppercase font-mono">Instant Dispatch</span>
                      <p className="text-lg font-bold text-emerald-400 mt-1">&lt; 3.2s Trigger</p>
                      <p className="text-xs text-zinc-400 mt-0.5">Automated WhatsApp message + CRM lead creation.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-[10px] text-zinc-400 uppercase font-mono">Data Enrichment</span>
                      <p className="text-lg font-bold text-amber-300 mt-1">Full Entity Lookup</p>
                      <p className="text-xs text-zinc-400 mt-0.5">Auto-extracts company revenue, domain authority, and decision makers.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-[10px] text-zinc-400 uppercase font-mono">Closing Rate</span>
                      <p className="text-lg font-bold text-white mt-1">+48% Uplift</p>
                      <p className="text-xs text-zinc-400 mt-0.5">Compared to standard static website email forms.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'marketing' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <h4 className="text-sm font-bold text-white">Algorithmic Meta & Google Ad Allocation</h4>
                    <span className="text-xs text-emerald-400 font-mono">Autonomous ROAS Engine</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Our AI models connect server-side via Meta CAPI and Google Ads Offline Conversions to adjust ad bids and creative rotation in real-time, preventing ad fatigue and reducing CAC by 42%.
                  </p>
                  <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Active Predictive Bidding Model</p>
                      <p className="text-[11px] text-amber-300">Auto-throttles during low-conversion hours; floods during peak buyer windows.</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold-gradient text-black">Active</span>
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <h4 className="text-sm font-bold text-white">Live Cognitive Telemetry Stream</h4>
                    <span className="text-xs text-cyan-400 font-mono">Global Edge CDN</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-[10px] text-zinc-400">P99 Latency</span>
                      <p className="text-xl font-bold text-white">16ms</p>
                    </div>
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-[10px] text-zinc-400">CAPI Reliability</span>
                      <p className="text-xl font-bold text-emerald-400">99.98%</p>
                    </div>
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-[10px] text-zinc-400">Sync Pipeline</span>
                      <p className="text-xl font-bold text-amber-300">Active</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Right Side: Live Terminal Log Feed */}
            <div className="lg:col-span-4 rounded-2xl bg-black/80 border border-white/10 p-5 flex flex-col justify-between font-mono text-[11px]">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-white text-xs font-bold font-['Outfit']">System Telemetry</span>
                  </div>
                  <span className="text-[10px] text-emerald-400">STREAMING</span>
                </div>

                <div className="space-y-2 text-zinc-400 leading-normal">
                  {logs.map((log, i) => (
                    <div key={i} className="animate-fadeIn">
                      <span className="text-zinc-500 select-none">&gt; </span>
                      <span className={log.includes('WHATSAPP') ? 'text-emerald-400' : log.includes('LEAD') ? 'text-amber-300' : 'text-zinc-300'}>
                        {log}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-[10px] text-zinc-500">
                <span>Direct WhatsApp: +91 8667618925</span>
                <span className="text-amber-400">v4.8 Production</span>
              </div>
            </div>

          </div>

          {/* Bottom Callout Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-transparent p-5 border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-white font-['Outfit']">
                Ready to deploy AI automation for your enterprise?
              </h4>
              <p className="text-xs text-zinc-300">
                We configure the official WhatsApp Cloud API, integrate AI lead qualifications, and set up your growth engine in 7 days.
              </p>
            </div>
            <a
              href="https://wa.me/918667618925?text=Hello%20ELA%20Digital%20World%2C%20I%20want%20to%20deploy%20AI%20and%20WhatsApp%20Automation%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-gold-gradient text-black font-bold text-xs hover:brightness-110 flex items-center gap-2 whitespace-nowrap shadow-lg shadow-amber-500/20"
            >
              <Zap className="w-4 h-4" />
              <span>Connect with AI Team on WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
