import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  PhoneCall, 
  MessageSquare, 
  Clock, 
  ShieldCheck,
  Building2,
  Mail,
  User,
  Phone,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitContactRequest } from '../lib/storage';
import { EnterpriseSecurityModal } from './EnterpriseSecurityModal';

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: preselectedService || 'Digital Marketing',
    budget: '$5,000 - $10,000',
    message: ''
  });

  const [honeypot, setHoneypot] = useState<string>('');
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [securityModalOpen, setSecurityModalOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);
  const [whatsappTriggered, setWhatsappTriggered] = useState<boolean>(false);
  const [whatsappChatUrl, setWhatsappChatUrl] = useState<string>('');

  const servicesList = [
    'Digital Marketing',
    'Web Development',
    'Social Media Marketing',
    'Meta Ads',
    'SEO',
    'Branding & Creative Design',
    'AI Solutions',
    'WhatsApp Automation',
    'Lead Generation',
    'Business Growth Strategy'
  ];

  const budgetList = [
    '< $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+'
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (digits & optional +, min 7 digits)
    const phoneClean = formData.phone.replace(/[^0-9+]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (phoneClean.length < 7) {
      newErrors.phone = 'Please enter a valid phone number (e.g., +91 9876543210)';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.budget) {
      newErrors.budget = 'Please select a budget range';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Project details are required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide a few details about your project goals';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 0. Enterprise Bot / Spambot Honeypot Detection
    if (honeypot.trim() !== '') {
      console.warn('Bot submission blocked via honeypot trap');
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      return;
    }

    // Cooldown rate limiter: prevent automated rapid spam submissions
    const now = Date.now();
    if (now - lastSubmitTime < 6000) {
      alert('Security Protection: Please wait a few moments before sending another request.');
      return;
    }

    if (!validate()) return;

    setLastSubmitTime(now);
    setIsSubmitting(true);

    // Sanitize user inputs to prevent injection / XSS
    const cleanName = formData.name.trim().replace(/<[^>]*>?/gm, '');
    const cleanCompany = formData.company.trim().replace(/<[^>]*>?/gm, '');
    const cleanMessage = formData.message.trim().replace(/<[^>]*>?/gm, '');

    // 1. Generate WhatsApp message dynamically following exact format from USER_REQUEST
    const rawMessage = `Hello ELA Digital World,\n\nI would like to discuss a project.\n\nName: ${cleanName}\nEmail: ${formData.email.trim()}\nPhone: ${formData.phone.trim()}\nCompany: ${cleanCompany}\nService Required: ${formData.service}\nBudget: ${formData.budget}\n\nProject Details:\n${cleanMessage}\n\nPlease contact me regarding this project.\n\nThank you.`;

    const encodedMessage = encodeURIComponent(rawMessage);
    const whatsappUrl = `https://wa.me/918667618925?text=${encodedMessage}`;
    setWhatsappChatUrl(whatsappUrl);

    // 2. Immediately store inquiry in local storage & Firestore in background
    submitContactRequest({
      name: cleanName,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company: cleanCompany,
      service: formData.service,
      budget: formData.budget,
      message: cleanMessage,
      viaWhatsApp: true
    }).catch(err => console.warn('Storage sync notice:', err));

    // 3. Open WhatsApp chat with +918667618925 directly
    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setWhatsappTriggered(true);
    } catch {
      // Ignored if popup blocked, fallback link is shown on UI
    }

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F6D565', '#38BDF8', '#FFFFFF']
      });
    } catch {}

    setSubmittedSuccess(true);
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: 'Digital Marketing',
      budget: '$5,000 - $10,000',
      message: ''
    });
    setSubmittedSuccess(false);
    setWhatsappTriggered(false);
    setErrors({});
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#050608]">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Context & Value Props */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Initiate Project Consultation</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-white font-['Outfit'] leading-tight">
              Let's Build <br />
              <span className="text-gold-gradient">Something Bigger.</span>
            </h2>

            <p className="text-zinc-400 text-base leading-relaxed">
              Every transformative digital empire begins with an ambitious conversation. Submit your project requirements to connect directly with our principal team on WhatsApp.
            </p>

            {/* Verification & direct call badge */}
            <div className="p-6 rounded-2xl glass-panel-gold border border-amber-400/40 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Direct WhatsApp Hotline</h4>
                  <a 
                    href="https://wa.me/918667618925" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg font-black text-gold-gradient font-mono hover:underline block"
                  >
                    +91 8667618925
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Guaranteed response time: <strong>under 15 minutes</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Non-Disclosure Agreement (NDA) on request</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <span>Automated WhatsApp conversation + Firestore sync</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-panel border border-white/10 text-xs text-zinc-400 leading-normal">
              <strong className="text-white block mb-1">Global Headquarters & Virtual Atelier:</strong>
              ELA Digital World operates as a high-velocity global digital agency serving North America, Europe, the Middle East, and Asia.
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 shadow-2xl relative bg-[#090C16]">
              
              <AnimatePresence mode="wait">
                {submittedSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 text-center space-y-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                        Your project request has been received.
                      </h3>
                      <p className="text-amber-300 font-medium text-base">
                        Our team will get back to you shortly.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/60 border border-amber-400/30 max-w-md mx-auto text-xs text-zinc-300 space-y-2 text-left">
                      <div className="flex items-center justify-between font-mono text-zinc-400 pb-2 border-b border-white/10">
                        <span>Status: Logged in Firestore</span>
                        <span className="text-emerald-400 font-bold">Synced</span>
                      </div>
                      <p>A formatted project brief has been created and prepared for WhatsApp chat with <strong>+918667618925</strong>.</p>
                      <p className="text-[11px] text-zinc-400">If your browser blocked the new window, click the button below to resume the WhatsApp chat.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                      <a
                        href={whatsappChatUrl || `https://wa.me/918667618925?text=${encodeURIComponent(`Hello ELA Digital World, I would like to discuss a project with ${formData.name}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl bg-gold-gradient text-black text-xs font-extrabold hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Chat on WhatsApp (+91 8667618925)</span>
                      </a>

                      <button
                        onClick={handleReset}
                        className="px-6 py-3 rounded-xl glass-panel text-xs text-zinc-300 hover:text-white"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-white font-['Outfit'] mb-1">
                        Project Scope & Discovery
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Fill in all required fields below. Your details will be synchronized and routed directly to WhatsApp for rapid response.
                      </p>
                    </div>

                    {/* Row 1: Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                          Full Name <span className="text-amber-400">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                          <input
                            type="text"
                            id="contact-name"
                            placeholder="e.g. Anand Sundaram"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border text-white text-xs sm:text-sm focus:outline-none transition-colors ${
                              errors.name ? 'border-red-500' : 'border-white/10 focus:border-amber-400/60'
                            }`}
                          />
                        </div>
                        {errors.name && <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                          Email Address <span className="text-amber-400">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                          <input
                            type="email"
                            id="contact-email"
                            placeholder="anand@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border text-white text-xs sm:text-sm focus:outline-none transition-colors ${
                              errors.email ? 'border-red-500' : 'border-white/10 focus:border-amber-400/60'
                            }`}
                          />
                        </div>
                        {errors.email && <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                      </div>
                    </div>

                    {/* Row 2: Phone & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                          Phone Number <span className="text-amber-400">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                          <input
                            type="tel"
                            id="contact-phone"
                            placeholder="+91 8667618925"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border text-white text-xs sm:text-sm focus:outline-none transition-colors ${
                              errors.phone ? 'border-red-500' : 'border-white/10 focus:border-amber-400/60'
                            }`}
                          />
                        </div>
                        {errors.phone && <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                          Company Name <span className="text-amber-400">*</span>
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                          <input
                            type="text"
                            id="contact-company"
                            placeholder="e.g. Apex Global"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border text-white text-xs sm:text-sm focus:outline-none transition-colors ${
                              errors.company ? 'border-red-500' : 'border-white/10 focus:border-amber-400/60'
                            }`}
                          />
                        </div>
                        {errors.company && <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.company}</p>}
                      </div>
                    </div>

                    {/* Row 3: Service & Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                          Service Required <span className="text-amber-400">*</span>
                        </label>
                        <select
                          id="contact-service"
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400/60"
                        >
                          {servicesList.map((srv) => (
                            <option key={srv} value={srv} className="bg-[#090C16] text-white">
                              {srv}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                          Budget Range <span className="text-amber-400">*</span>
                        </label>
                        <select
                          id="contact-budget"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400/60"
                        >
                          {budgetList.map((bg) => (
                            <option key={bg} value={bg} className="bg-[#090C16] text-white">
                              {bg}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Project Details <span className="text-amber-400">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        placeholder="Tell us about your project, current obstacles, target timeline, and growth goals..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`w-full p-4 rounded-xl bg-black/60 border text-white text-xs sm:text-sm focus:outline-none transition-colors resize-none ${
                          errors.message ? 'border-red-500' : 'border-white/10 focus:border-amber-400/60'
                        }`}
                      />
                      {errors.message && <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
                    </div>

                    {/* Bot Honeypot Trap - Invisible to humans, catches automated spambots */}
                    <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                      <label htmlFor="company_website_verification_trap">Do not fill this field</label>
                      <input
                        type="text"
                        id="company_website_verification_trap"
                        name="company_website_verification_trap"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Submit CTA */}
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gold-gradient text-black font-extrabold text-sm sm:text-base hover:brightness-110 active:scale-[0.99] transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                          <span>Preparing WhatsApp Transmission...</span>
                        </div>
                      ) : (
                        <>
                          <span>Send Project Request</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    {/* Enterprise Business Security Assurance Badge */}
                    <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>256-BIT SSL ENCRYPTED &bull; 100% STRICT NDA</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSecurityModalOpen(true)}
                        className="text-amber-400 hover:text-amber-300 underline font-semibold text-[11px] cursor-pointer transition-colors"
                      >
                        Security & NDA Certificate
                      </button>
                    </div>

                    <p className="text-[11px] text-zinc-400 text-center">
                      Upon submission, your inquiry is securely archived in Firestore and opens direct WhatsApp chat with <span className="text-amber-300 font-mono">+918667618925</span>.
                    </p>

                  </form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>

      {/* Enterprise Security & Compliance Modal */}
      <EnterpriseSecurityModal
        isOpen={securityModalOpen}
        onClose={() => setSecurityModalOpen(false)}
      />
    </section>
  );
};
