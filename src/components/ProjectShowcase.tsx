import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ExternalLink, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Filter,
  TrendingUp,
  Layers
} from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectShowcaseProps {
  projects: ProjectItem[];
  onSelectProjectForDiscussion: (projectName: string) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects, onSelectProjectForDiscussion }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);

  const filters = ['All', 'Websites', 'Marketing', 'Branding', 'AI', 'Automation'];

  const filteredProjects = selectedFilter === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase() === selectedFilter.toLowerCase());

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#07090F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proven Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit']">
              Featured <span className="text-gold-gradient">Digital Works</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Engineered for exponential ROI. Explore how our digital marketing, 3D web portals, and AI systems propel market leaders.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl glass-panel border border-white/10 self-start md:self-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                id={`filter-${filter.toLowerCase()}`}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedFilter === filter
                    ? 'bg-gold-gradient text-black shadow-md shadow-amber-500/20 scale-105'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Grid / Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="group rounded-3xl glass-panel border border-white/10 hover:border-amber-400/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10"
              >
                {/* Image Cover Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090C14] via-black/20 to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 text-amber-300 border border-amber-400/30 backdrop-blur-md">
                    {project.category}
                  </span>

                  {project.featured && (
                    <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-gold-gradient text-black">
                      FLAGSHIP
                    </span>
                  )}

                  {/* Primary result highlight pill */}
                  {project.results[0] && (
                    <div className="absolute bottom-3 left-4 right-4 px-3 py-1.5 rounded-xl glass-panel-gold border border-amber-400/40 text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="truncate">{project.results[0]}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1 font-mono">
                      <span>{project.client}</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 font-['Outfit'] group-hover:text-amber-300 transition-colors">
                      {project.name}
                    </h3>

                    <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-zinc-300 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-1.5 py-0.5 text-[10px] text-zinc-400">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <button
                      id={`view-project-btn-${project.id}`}
                      onClick={() => setActiveProjectModal(project)}
                      className="text-xs font-semibold text-white group-hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>View Project Case</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => onSelectProjectForDiscussion(project.name)}
                      className="p-2 rounded-xl glass-panel text-amber-300 hover:border-amber-400/50 hover:bg-white/10 transition-colors"
                      title="Build similar solution"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {activeProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-3xl rounded-3xl glass-panel-gold p-6 sm:p-8 border border-amber-400/40 shadow-2xl max-h-[90vh] overflow-y-auto bg-[#0A0D16]"
            >
              <button
                onClick={() => setActiveProjectModal(null)}
                className="absolute top-6 right-6 p-2 rounded-xl glass-panel text-zinc-400 hover:text-white"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-white/10">
                <img
                  src={activeProjectModal.image}
                  alt={activeProjectModal.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {activeProjectModal.category}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  Client: {activeProjectModal.client} ({activeProjectModal.year})
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 font-['Outfit']">
                {activeProjectModal.name}
              </h2>

              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                {activeProjectModal.description}
              </p>

              {/* Results Matrix */}
              <div className="rounded-2xl bg-black/50 border border-amber-400/30 p-5 mb-6">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Demonstrated Quantitative Outcomes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeProjectModal.results.map((res, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 mb-1.5" />
                      <p className="text-xs font-bold text-white">{res}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Integrated Technologies & Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProjectModal.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg glass-panel text-xs text-zinc-200 border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href={`https://wa.me/918667618925?text=${encodeURIComponent(`Hello ELA Digital World, I am impressed with the ${activeProjectModal.name} project. Can we discuss a similar solution?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-500/30"
                >
                  <span>Discuss Similar Solution on WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    const name = activeProjectModal.name;
                    setActiveProjectModal(null);
                    onSelectProjectForDiscussion(name);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gold-gradient text-black font-bold text-xs hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <span>Start a Project Like This</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
