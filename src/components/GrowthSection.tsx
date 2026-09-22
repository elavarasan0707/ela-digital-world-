import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Zap, 
  Globe, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  BarChart3 
} from 'lucide-react';

export const GrowthSection: React.FC = () => {
  const [selectedTimeline, setSelectedTimeline] = useState<'after' | 'before'>('after');
  const [counterValues, setCounterValues] = useState({
    leads: 254820,
    visitors: 4850000,
    conversion: 8.8,
    growth: 342,
    reach: 18500000
  });

  // Simulated live counter tick
  useEffect(() => {
    const interval = setInterval(() => {
      setCounterValues(prev => ({
        ...prev,
        leads: prev.leads + Math.floor(Math.random() * 3),
        visitors: prev.visitors + Math.floor(Math.random() * 12)
      }));
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const pipelineStages = [
    { name: 'Idea', desc: 'Market analysis & proposition' },
    { name: 'Digital Presence', desc: '3D Web & Brand Systems' },
    { name: 'Leads', desc: 'Meta & Search CAPI funnels' },
    { name: 'Customers', desc: 'WhatsApp 24/7 AI nurture' },
    { name: 'Growth', desc: 'Compounding multi-channel scale' }
  ];

  // Monthly performance dataset for interactive chart
  const monthlyData = [
    { month: 'Month 1', baseline: 15, accelerated: 28 },
    { month: 'Month 2', baseline: 18, accelerated: 46 },
    { month: 'Month 3', baseline: 20, accelerated: 78 },
    { month: 'Month 4', baseline: 22, accelerated: 125 },
    { month: 'Month 5', baseline: 25, accelerated: 210 },
    { month: 'Month 6', baseline: 28, accelerated: 342 },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#06080E]">
      {/* Ambience */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Cinematic Growth Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] mb-6">
            Predictable Scaling. <br />
            <span className="text-gold-gradient">Mathematically Engineered.</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            We architect every touchpoint from initial concept to high-ticket customer conversion with automated intelligence and server-grade performance.
          </p>
        </div>

        {/* Pipeline Diagram */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl glass-panel-gold border border-amber-400/30 shadow-2xl">
          <div className="text-center mb-6">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400">
              The ELA Compounding Pipeline
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
            {pipelineStages.map((stage, idx) => (
              <div 
                key={idx}
                className="relative rounded-2xl bg-black/40 border border-white/10 p-4 text-center group hover:border-amber-400/50 transition-all hover:scale-105"
              >
                <div className="w-8 h-8 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 font-bold text-xs flex items-center justify-center mx-auto mb-2 font-mono">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-bold text-white font-['Outfit'] mb-1 group-hover:text-amber-300 transition-colors">
                  {stage.name}
                </h4>
                <p className="text-[11px] text-zinc-400 leading-tight">
                  {stage.desc}
                </p>

                {/* Arrow connector between stages */}
                {idx < pipelineStages.length - 1 && (
                  <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-amber-400/60">
                    <ArrowUpRight className="w-4 h-4 rotate-45" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics Counters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          
          <div className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-amber-400/40 transition-all text-center">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 mx-auto flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] mb-1">
              {(counterValues.leads).toLocaleString()}+
            </p>
            <p className="text-xs text-zinc-400 font-medium">Leads Generated</p>
            <span className="text-[10px] text-emerald-400 font-semibold mt-1 inline-block">+34% this month</span>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-amber-400/40 transition-all text-center">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/10 text-cyan-400 mx-auto flex items-center justify-center mb-3">
              <Eye className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] mb-1">
              {(counterValues.visitors / 1000000).toFixed(1)}M+
            </p>
            <p className="text-xs text-zinc-400 font-medium">Website Visitors</p>
            <span className="text-[10px] text-emerald-400 font-semibold mt-1 inline-block">High-intent traffic</span>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-amber-400/40 transition-all text-center">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 mx-auto flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-amber-400 font-['Outfit'] mb-1">
              {counterValues.conversion}%
            </p>
            <p className="text-xs text-zinc-400 font-medium">Conversion Rate</p>
            <span className="text-[10px] text-zinc-300 font-semibold mt-1 inline-block">Industry avg: 2.1%</span>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-amber-400/40 transition-all text-center">
            <div className="w-10 h-10 rounded-xl bg-purple-400/10 text-purple-400 mx-auto flex items-center justify-center mb-3">
              <BarChart3 className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] mb-1">
              +{counterValues.growth}%
            </p>
            <p className="text-xs text-zinc-400 font-medium">Campaign Growth</p>
            <span className="text-[10px] text-emerald-400 font-semibold mt-1 inline-block">Verified ROI</span>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-amber-400/40 transition-all text-center col-span-2 md:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-300 mx-auto flex items-center justify-center mb-3">
              <Globe className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] mb-1">
              {(counterValues.reach / 1000000).toFixed(1)}M+
            </p>
            <p className="text-xs text-zinc-400 font-medium">Customer Reach</p>
            <span className="text-[10px] text-amber-400 font-semibold mt-1 inline-block">Global impressions</span>
          </div>

        </div>

        {/* Interactive Growth Trajectory Visualization */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white font-['Outfit']">
                Revenue & Lead Velocity Trajectory
              </h3>
              <p className="text-xs text-zinc-400">
                Comparing standard industry baseline vs. ELA Digital World 3D & AI ecosystem.
              </p>
            </div>

            <div className="flex items-center gap-2 p-1 rounded-xl bg-black/50 border border-white/10 text-xs">
              <button
                onClick={() => setSelectedTimeline('before')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedTimeline === 'before' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Traditional Agency
              </button>
              <button
                onClick={() => setSelectedTimeline('after')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedTimeline === 'after' ? 'bg-gold-gradient text-black font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                With ELA Digital World
              </button>
            </div>
          </div>

          {/* Bar / Column Chart Visualizer */}
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-6 pt-8 pb-4 border-b border-white/10">
            {monthlyData.map((item, i) => {
              const val = selectedTimeline === 'after' ? item.accelerated : item.baseline;
              const maxVal = 350;
              const heightPercent = Math.min(100, Math.max(12, (val / maxVal) * 100));

              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[10px] font-mono text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    +{val}%
                  </div>
                  <div className="w-full max-w-[48px] bg-black/40 rounded-t-xl overflow-hidden h-full flex items-end p-1 border border-white/5">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPercent}%` }}
                      transition={{ duration: 0.6, delay: i * 0.08 }}
                      className={`w-full rounded-lg ${
                        selectedTimeline === 'after'
                          ? 'bg-gradient-to-t from-amber-600 via-amber-400 to-amber-300 shadow-lg shadow-amber-500/20'
                          : 'bg-zinc-700'
                      }`}
                    />
                  </div>
                  <span className="text-[11px] text-zinc-400 font-mono mt-1">{item.month}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>Omni-channel ROAS (Meta Ads + Search + CAPI)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>WhatsApp Conversational Closing</span>
              </span>
            </div>
            <span className="text-amber-300 font-mono">Real-time Attribution Verified</span>
          </div>

        </div>

      </div>
    </section>
  );
};
