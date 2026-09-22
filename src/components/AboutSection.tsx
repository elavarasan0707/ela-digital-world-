import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lightbulb, 
  Compass, 
  Palette, 
  Code, 
  TrendingUp, 
  Rocket, 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  Cpu, 
  Layers, 
  Workflow 
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const timelineSteps = [
    {
      title: 'Idea',
      subtitle: 'Cognitive Discovery & Auditing',
      icon: Lightbulb,
      description: 'We deconstruct your core vision, customer profiles, competitive vulnerabilities, and unit economics to find undeniable market leverage.',
      metrics: '100% De-risked Blueprint',
      deliverable: 'Strategic Vision Document & Product Roadmap'
    },
    {
      title: 'Strategy',
      subtitle: 'Market Vector & Architecture',
      icon: Compass,
      description: 'Data-driven go-to-market planning, conversion funnel architecture, audience segmentation, and tech stack determination.',
      metrics: 'Calculated 3x-10x Potential',
      deliverable: 'Omni-channel Execution Funnel Blueprint'
    },
    {
      title: 'Design',
      subtitle: 'Futuristic 3D Aesthetics',
      icon: Palette,
      description: 'Transforming brand perception into ultra-premium status through 3D visual language, spatial WebGL aesthetics, and sensory UX design.',
      metrics: 'Instant Brand Authority',
      deliverable: 'Figma 3D Design System & Micro-Interactions'
    },
    {
      title: 'Development',
      subtitle: 'High-Velocity Engineering',
      icon: Code,
      description: 'Bespoke, blazing fast development with React 19, TypeScript, Three.js, serverless architectures, and zero technical debt.',
      metrics: '<0.8s Initial Render',
      deliverable: 'Production Cloud Deployment with 99.99% Uptime'
    },
    {
      title: 'Marketing',
      subtitle: 'Algorithmic Paid & Organic Scaling',
      icon: TrendingUp,
      description: 'Deploying high-ROAS Meta ad campaigns, programmatic entity SEO, and viral social narratives engineered for compounding reach.',
      metrics: '6.4x Average ROAS',
      deliverable: 'Server-side CAPI Tracking & Ad Flywheels'
    },
    {
      title: 'Growth',
      subtitle: 'Autonomous AI & Scale',
      icon: Rocket,
      description: 'Automating customer retention, deploying 24/7 WhatsApp AI sales bots, and locking in compounding enterprise revenue.',
      metrics: '+340% Year-over-Year',
      deliverable: 'Enterprise Autonomous Intelligence Engine'
    }
  ];

  const pillars = [
    { label: 'Marketing', desc: 'Performance-driven omni-channel acquisition', icon: TrendingUp },
    { label: 'Technology', desc: 'Cutting-edge WebGL, React, & cloud backends', icon: Code },
    { label: 'Creativity', desc: 'Iconic 3D spatial branding & design', icon: Palette },
    { label: 'AI Solutions', desc: 'Autonomous intelligence & generative workflows', icon: Cpu },
    { label: 'Automation', desc: 'Zero-latency WhatsApp bots & CRM webhooks', icon: Workflow },
    { label: 'Business Strategy', desc: 'Holistic growth roadmaps & valuation drivers', icon: Layers }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#050608]">
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The ELA Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-['Outfit'] mb-6">
            We Don't Just Build Digital Presence. <br />
            <span className="text-gold-gradient">We Build Digital Growth.</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            ELA Digital World represents the intersection of relentless artistic craftsmanship, high-velocity engineering, and cognitive artificial intelligence. We engineer full-spectrum digital dominance for brands that refuse to be ignored.
          </p>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-20">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-amber-400/40 transition-all duration-300 group text-center flex flex-col items-center justify-center hover:bg-white/[0.04]"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-2 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white font-['Outfit'] mb-1">{pillar.label}</h4>
                <p className="text-[11px] text-zinc-400 leading-tight">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Interactive 3D Growth Timeline */}
        <div className="rounded-3xl glass-panel-gold p-6 sm:p-10 border border-amber-400/30 relative shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                Systematic Methodology
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Outfit']">
                The 6-Stage Digital Velocity Pipeline
              </h3>
            </div>
            <p className="text-xs text-zinc-400 max-w-xs">
              Click any stage below to inspect our architectural protocol and strategic deliverables.
            </p>
          </div>

          {/* Timeline Nodes Navigation */}
          <div className="relative mb-10">
            {/* Connecting Glowing Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 hidden md:block" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-gold-gradient -translate-y-1/2 hidden md:block transition-all duration-500" 
              style={{ width: `${(activeStep / (timelineSteps.length - 1)) * 100}%` }}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 relative z-10">
              {timelineSteps.map((step, idx) => {
                const Icon = step.icon;
                const isSelected = activeStep === idx;
                const isPassed = activeStep >= idx;
                return (
                  <button
                    key={idx}
                    id={`timeline-step-${idx}`}
                    onClick={() => setActiveStep(idx)}
                    className={`p-3 rounded-2xl flex flex-col items-center text-center transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-gold-gradient text-black font-bold shadow-lg shadow-amber-500/25 scale-105' 
                        : isPassed 
                          ? 'glass-panel border-amber-400/50 text-amber-300' 
                          : 'glass-panel text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1.5 ${
                      isSelected ? 'bg-black text-amber-300' : 'bg-white/10'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold tracking-wide">{step.title}</span>
                    <span className="text-[9px] opacity-75">Stage 0{idx + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Detailed Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl bg-black/50 border border-white/10 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  <span>Stage 0{activeStep + 1} — {timelineSteps[activeStep].title}</span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-bold text-white font-['Outfit']">
                  {timelineSteps[activeStep].subtitle}
                </h4>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {timelineSteps[activeStep].description}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-zinc-400">
                  <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Deliverable: <strong className="text-white">{timelineSteps[activeStep].deliverable}</strong></span>
                </div>
              </div>

              <div className="lg:col-span-4 rounded-xl glass-panel-gold p-5 border border-amber-400/30 text-center flex flex-col justify-center items-center">
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Benchmark Outcome</span>
                <p className="text-2xl sm:text-3xl font-black text-gold-gradient font-['Outfit'] my-1">
                  {timelineSteps[activeStep].metrics}
                </p>
                <span className="text-xs text-zinc-300">Verified through client analytics</span>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
