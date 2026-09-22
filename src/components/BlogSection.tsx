import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Clock, 
  Calendar, 
  User, 
  ArrowRight, 
  Share2, 
  X, 
  Check, 
  Bookmark,
  MessageSquare
} from 'lucide-react';
import { BlogPostItem } from '../types';

interface BlogSectionProps {
  posts: BlogPostItem[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePost, setActivePost] = useState<BlogPostItem | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const categories = [
    'All',
    'AI Marketing',
    'Web Engineering',
    'Paid Acquisition',
    'Automation',
    'Search & SEO',
    'Brand Strategy'
  ];

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase() || p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const handleShare = (post: BlogPostItem) => {
    const summaryText = post.summary || post.excerpt;
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: summaryText,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/#blog-${post.id}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const getAuthorName = (author: BlogPostItem['author']) => {
    if (typeof author === 'string') return author;
    return author?.name || 'ELA Editorial';
  };

  const getPostImage = (post: BlogPostItem) => {
    return post.image || post.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
  };

  return (
    <section id="blog" className="py-24 relative overflow-hidden bg-[#07090F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Digital Intelligence & Research</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit']">
              Agency <span className="text-gold-gradient">Insights</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Cutting-edge methodologies, algorithmic teardowns, and proprietary frameworks for scaling modern digital enterprises.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl glass-panel border border-white/10 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gold-gradient text-black shadow-md shadow-amber-500/20 scale-105'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <motion.article
              key={post.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl glass-panel border border-white/10 hover:border-amber-400/40 overflow-hidden flex flex-col justify-between transition-all group hover:shadow-2xl hover:shadow-amber-500/10"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                <img
                  src={getPostImage(post)}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090C16] via-transparent to-transparent" />
                
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 text-amber-300 border border-amber-400/30 backdrop-blur-md">
                  {post.category}
                </span>

                <div className="absolute bottom-3 right-4 flex items-center gap-1.5 text-[11px] font-mono text-zinc-300 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-2 font-mono">
                    <Calendar className="w-3 h-3" />
                    <span>{post.publishedAt}</span>
                    <span>&bull;</span>
                    <User className="w-3 h-3" />
                    <span>{getAuthorName(post.author)}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2.5 font-['Outfit'] group-hover:text-amber-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-zinc-400 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                    {post.summary || post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => setActivePost(post)}
                    className="text-xs font-bold text-white group-hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => handleShare(post)}
                    className="p-2 rounded-xl glass-panel text-zinc-400 hover:text-amber-300 transition-colors"
                    title="Share article"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {activePost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl rounded-3xl glass-panel-gold p-6 sm:p-10 border border-amber-400/40 shadow-2xl max-h-[90vh] overflow-y-auto bg-[#090C16]"
            >
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-6 right-6 p-2 rounded-xl glass-panel text-zinc-400 hover:text-white"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[16/8] rounded-2xl overflow-hidden mb-6 border border-white/10">
                <img
                  src={getPostImage(activePost)}
                  alt={activePost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {activePost.category}
                </span>
                <span>{activePost.publishedAt}</span>
                <span>&bull;</span>
                <span>{activePost.readTime}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white font-['Outfit'] mb-4 leading-tight">
                {activePost.title}
              </h1>

              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6 text-xs text-zinc-400">
                <span>By <strong className="text-white">{getAuthorName(activePost.author)}</strong></span>
                <button
                  onClick={() => handleShare(activePost)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-panel text-xs text-amber-300 hover:bg-white/10"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied link!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Article</span>
                    </>
                  )}
                </button>
              </div>

              {/* Body Text */}
              <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {activePost.content}
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-zinc-400">
                  Want to implement this framework in your organization?
                </p>
                <a
                  href={`https://wa.me/918667618925?text=${encodeURIComponent(`Hello ELA Digital World, I read your article "${activePost.title}" and would like to discuss implementing this.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gold-gradient text-black font-bold text-xs hover:brightness-110 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Discuss Framework on WhatsApp</span>
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
