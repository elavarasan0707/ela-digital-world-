import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  FileCheck2, 
  Server, 
  EyeOff, 
  X, 
  CheckCircle2, 
  UserCheck, 
  ExternalLink 
} from 'lucide-react';

interface EnterpriseSecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnterpriseSecurityModal: React.FC<EnterpriseSecurityModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-[#090B10] border border-amber-400/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-500/10 z-10 my-8 overflow-hidden text-white"
        >
          {/* Subtle top light bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Security Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  ENTERPRISE CERTIFIED
                </span>
                <span className="text-xs text-zinc-400">SOC-2 & GDPR READY</span>
              </div>
              <h3 className="text-2xl font-black font-['Outfit'] text-white mt-0.5">
                Enterprise <span className="text-gold-gradient">Security & Privacy Protocol</span>
              </h3>
            </div>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed mb-6">
            At <strong>ELA Digital World</strong>, security and confidentiality are foundational. Every project brief, client data point, and code repository is governed by rigorous enterprise data isolation standards.
          </p>

          {/* Security Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-amber-400/30 transition-all">
              <div className="flex items-center gap-2.5 mb-2 text-amber-400">
                <Lock className="w-4 h-4" />
                <h4 className="text-xs font-bold font-['Outfit'] uppercase tracking-wider text-white">
                  256-Bit SSL & TLS 1.3
                </h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                All client submissions and browser requests are encrypted in transit with military-grade HTTPS/TLS 1.3 protocols.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-amber-400/30 transition-all">
              <div className="flex items-center gap-2.5 mb-2 text-amber-400">
                <FileCheck2 className="w-4 h-4" />
                <h4 className="text-xs font-bold font-['Outfit'] uppercase tracking-wider text-white">
                  Strict NDA & IP Ownership
                </h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                You retain 100% intellectual property ownership of your source code, design assets, and marketing data under binding NDA.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-amber-400/30 transition-all">
              <div className="flex items-center gap-2.5 mb-2 text-amber-400">
                <Server className="w-4 h-4" />
                <h4 className="text-xs font-bold font-['Outfit'] uppercase tracking-wider text-white">
                  Google Cloud IAM Vault
                </h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                All leads, project briefs, and database records are isolated within encrypted Google Cloud Firestore with role-based IAM security.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-amber-400/30 transition-all">
              <div className="flex items-center gap-2.5 mb-2 text-amber-400">
                <EyeOff className="w-4 h-4" />
                <h4 className="text-xs font-bold font-['Outfit'] uppercase tracking-wider text-white">
                  Zero Data Selling
                </h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We never sell, broker, or monetize client data. Inquiries are strictly used for project scoping and execution.
              </p>
            </div>

          </div>

          {/* Compliance Checklist */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-black/40 to-emerald-500/10 border border-white/10 mb-6">
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-['Outfit'] mb-2.5">
              Verified Compliance Standards
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Encrypted at rest (AES-256)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Spam & Bot Honeypot Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>GDPR Data Deletion Compliance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Official Meta Cloud API Verified</span>
              </div>
            </div>
          </div>

          {/* Founder Direct Guarantee Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-gradient p-0.5">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-amber-400 text-xs">
                  EK
                </div>
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white font-['Outfit']">Er. Kasthuri</p>
                <p className="text-[11px] text-zinc-400">Founder & Chief Strategist &bull; kasthuricse23@sasurie.com</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Acknowledged & Safe
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
