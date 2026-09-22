import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, ShieldCheck } from 'lucide-react';
import { TestimonialItem } from '../types';

interface TestimonialCarouselProps {
  testimonials: TestimonialItem[];
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);

  useEffect(() => {
    if (!isAutoplay || testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoplay, testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  if (!testimonials.length) return null;
  const current = testimonials[currentIndex];

  return (
    <section className="py-24 relative overflow-hidden bg-[#07090F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] mb-4">
            Trusted by Visionaries. <br />
            <span className="text-gold-gradient">Celebrated for Real Outcomes.</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            See why leading enterprises and fast-scaling brands partner with ELA Digital World.
          </p>
        </div>

        {/* 3D Carousel Stage */}
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="rounded-3xl glass-panel-gold border border-amber-400/40 p-8 sm:p-12 relative shadow-2xl bg-[#090C16]"
            >
              <div className="absolute top-6 right-8 text-amber-400/20 pointer-events-none">
                <Quote className="w-20 h-20" />
              </div>

              {/* Rating stars */}
              <div className="flex items-center gap-1.5 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-2 text-xs font-bold text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                  5.0 Verified Review
                </span>
              </div>

              {/* Testimonial Quote */}
              <blockquote className="text-lg sm:text-2xl text-zinc-200 font-medium leading-relaxed mb-8 relative z-10 font-['Outfit']">
                "{current.testimonial}"
              </blockquote>

              {/* Client Profile Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-md">
                    <img 
                      src={current.profileImage} 
                      alt={current.clientName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                      <span>{current.clientName}</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </h4>
                    <p className="text-xs text-zinc-400">
                      {current.role} &bull; <strong className="text-amber-300 font-semibold">{current.company}</strong>
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Scope Executed</span>
                  <span className="text-xs font-semibold text-white px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 inline-block mt-1">
                    {current.projectType}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'w-8 bg-gold-gradient' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <button
                id="testimonial-prev-btn"
                onClick={handlePrev}
                className="p-3 rounded-xl glass-panel text-zinc-300 hover:text-white hover:border-amber-400/50 transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                id="testimonial-next-btn"
                onClick={handleNext}
                className="p-3 rounded-xl bg-gold-gradient text-black font-bold hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
