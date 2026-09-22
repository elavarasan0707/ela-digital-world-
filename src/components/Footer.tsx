import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { submitNewsletter } from '../lib/storage';
import { EnterpriseSecurityModal } from './EnterpriseSecurityModal';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [securityModalOpen, setSecurityModalOpen] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    setSubmitting(true);
    try {
      await submitNewsletter(newsletterEmail.trim());
      setIsSubscribed(true);
      setNewsletterEmail('');
    } catch {
      setIsSubscribed(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-[#030407] border-t border-white/10 overflow-hidden pt-20 pb-12">
      {/* Subtle Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-48 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-48 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/ela-logo.png"
                alt="ELA Digital World Logo"
                className="w-12 h-12 rounded-xl object-contain border border-amber-400/40 shadow-md shadow-amber-500/20 bg-black/60 p-0.5"
              />
              <div>
                <span className="text-xl font-extrabold text-white font-['Outfit'] tracking-wider block">
                  ELA DIGITAL WORLD
                </span>
                <span className="text-[10px] text-amber-400 font-mono tracking-widest block uppercase">
                  Think Digital. Think Bigger.
                </span>
              </div>
            </div>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              World-class digital marketing, 3D web development, bespoke branding, and autonomous AI systems built for market-dominating brands.
            </p>

            <div className="pt-2">
              <a
                id="footer-whatsapp-btn"
                href="https://wa.me/918667618925"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-500/30 transition-all shadow-md"
              >
                <span>WhatsApp: +91 8667618925</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-['Outfit']">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-amber-300 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-300 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-300 transition-colors">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-amber-300 transition-colors">
                  Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-300 transition-colors">
                  AI & Automation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-amber-300 transition-colors">
                  Intelligence Blog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-amber-300 transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-['Outfit']">
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-300 transition-colors">
                  Digital Marketing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-300 transition-colors">
                  3D Web Development
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-300 transition-colors">
                  Meta & Search Ads
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-300 transition-colors">
                  AI Solutions & Bots
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-300 transition-colors">
                  WhatsApp Automation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-300 transition-colors">
                  SEO & Organic Authority
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-['Outfit']">
              Digital Intelligence Briefing
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Subscribe to receive high-leverage growth blueprints, conversion optimization frameworks, and AI case studies bi-weekly.
            </p>

            {isSubscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>You're subscribed to ELA Digital Intelligence. Welcome!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  id="newsletter-email-input"
                  required
                  placeholder="Enter work email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400/50"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2.5 rounded-xl bg-gold-gradient text-black font-bold text-xs hover:brightness-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer whitespace-nowrap"
                >
                  {submitting ? '...' : <Send className="w-3.5 h-3.5" />}
                </button>
              </form>
            )}

            <div className="flex items-center gap-4 text-xs text-zinc-400 pt-2">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-amber-300 transition-colors"
              >
                LinkedIn
              </a>
              <span>&bull;</span>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-amber-300 transition-colors"
              >
                Instagram
              </a>
              <span>&bull;</span>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-amber-300 transition-colors"
              >
                X (Twitter)
              </a>
              <span>&bull;</span>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-amber-300 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>

        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <p>© 2025 ELA Digital World. All Rights Reserved.</p>
          
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <button 
              id="footer-security-btn"
              onClick={() => setSecurityModalOpen(true)}
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Security & NDA Protocol</span>
            </button>
            <span>&bull;</span>
            <button 
              id="footer-dashboard-btn"
              onClick={() => onNavigate('dashboard')} 
              className="text-amber-400 hover:text-amber-300 font-semibold transition-colors cursor-pointer"
            >
              Client & Admin Dashboard
            </button>
            <span>&bull;</span>
            <button 
              id="footer-login-btn"
              onClick={() => onNavigate('login')} 
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Sign In / Register
            </button>
            <span>&bull;</span>
            <span className="text-zinc-500">Official WhatsApp: +91 8667618925</span>
          </div>
        </div>

      </div>

      <EnterpriseSecurityModal
        isOpen={securityModalOpen}
        onClose={() => setSecurityModalOpen(false)}
      />
    </footer>
  );
};
