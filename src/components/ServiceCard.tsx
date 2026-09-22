import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Code2, 
  Share2, 
  Target, 
  Search, 
  Palette, 
  Cpu, 
  MessageSquare, 
  Flame, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  onSelectForInquiry: (serviceName: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelectForInquiry }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Map icon names to Lucide components with 3D gradient aura
  const renderIcon = () => {
    const iconProps = { className: "w-7 h-7 text-amber-300" };
    switch (service.icon) {
      case 'TrendingUp': return <TrendingUp {...iconProps} />;
      case 'Code2': return <Code2 {...iconProps} />;
      case 'Share2': return <Share2 {...iconProps} />;
      case 'Target': return <Target {...iconProps} />;
      case 'Search': return <Search {...iconProps} />;
      case 'Palette': return <Palette {...iconProps} />;
      case 'Cpu': return <Cpu {...iconProps} />;
      case 'MessageSquare': return <MessageSquare {...iconProps} />;
      case 'Flame': return <Flame {...iconProps} />;
      case 'Compass': return <Compass {...iconProps} />;
      default: return <Sparkles {...iconProps} />;
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative rounded-3xl glass-panel p-7 border border-white/10 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between group overflow-hidden hover:shadow-2xl hover:shadow-amber-500/10"
      >
        {/* Background glow on hover */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {service.popular && (
          <div className="absolute top-4 right-4">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-gradient text-black shadow-md">
              POPULAR
            </span>
          </div>
        )}

        <div>
          {/* 3D Icon Container */}
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#121622] via-[#0E1017] to-[#181D2A] border border-amber-400/30 flex items-center justify-center mb-6 shadow-lg shadow-black/60 group-hover:border-amber-400/80 transition-colors">
            <div className="absolute inset-0 rounded-2xl bg-amber-400/5 filter blur-sm group-hover:blur-md transition-all" />
            <div className="relative z-10">
              {renderIcon()}
            </div>
          </div>

          <span className="text-[11px] font-semibold text-amber-400/80 uppercase tracking-widest block mb-1">
            {service.category}
          </span>

          <h3 className="text-xl font-bold text-white mb-3 font-['Outfit'] group-hover:text-amber-300 transition-colors">
            {service.name}
          </h3>

          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            {service.shortDescription}
          </p>
        </div>

        <div>
          {/* Benefits Preview */}
          <div className="space-y-2 mb-6 pt-4 border-t border-white/5">
            {service.benefits.slice(0, 2).map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span className="truncate">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              id={`service-learn-more-${service.id}`}
              onClick={() => setModalOpen(true)}
              className="flex-1 py-2.5 px-4 rounded-xl glass-panel text-xs font-semibold text-white hover:text-amber-300 hover:border-amber-400/40 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Learn More</span>
            </button>

            <button
              id={`service-inquire-${service.id}`}
              onClick={() => onSelectForInquiry(service.name)}
              className="p-2.5 rounded-xl bg-gold-gradient text-black hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
              title="Request Project"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl rounded-3xl glass-panel-gold p-6 sm:p-8 border border-amber-400/40 shadow-2xl max-h-[90vh] overflow-y-auto bg-[#090C14]"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-xl glass-panel text-zinc-400 hover:text-white"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                  {renderIcon()}
                </div>
                <div>
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                    {service.category}
                  </span>
                  <h2 className="text-2xl font-black text-white font-['Outfit']">
                    {service.name}
                  </h2>
                </div>
              </div>

              <div className="space-y-6 text-sm">
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Service Overview</h4>
                  <p className="text-zinc-300 leading-relaxed">{service.fullDescription}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-black/40 border border-white/10 p-4">
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Key Value Drivers
                    </h4>
                    <ul className="space-y-2">
                      {service.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-black/40 border border-white/10 p-4">
                    <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Standard Deliverables
                    </h4>
                    <ul className="space-y-2">
                      {service.deliverables.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <a
                    href={`https://wa.me/918667618925?text=${encodeURIComponent(`Hello ELA Digital World, I would like to consult about ${service.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-500/30"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Quick WhatsApp Enquiry</span>
                  </a>

                  <button
                    onClick={() => {
                      setModalOpen(false);
                      onSelectForInquiry(service.name);
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gold-gradient text-black font-bold text-xs hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    <span>Request Proposal for {service.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
