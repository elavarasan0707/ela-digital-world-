import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Layers, 
  FileText, 
  BarChart3, 
  Settings, 
  ShieldCheck, 
  Search, 
  Trash2, 
  CheckCircle, 
  Clock, 
  MessageSquare, 
  ExternalLink, 
  Plus, 
  X, 
  Mail, 
  Phone, 
  PhoneCall,
  AlertCircle,
  TrendingUp,
  Download,
  Lock
} from 'lucide-react';
import { LeadItem, ProjectItem, ServiceItem, BlogPostItem, UserRole } from '../types';
import { 
  getLeads, 
  updateLeadStatus, 
  deleteLead, 
  getProjects, 
  addProject, 
  deleteProject, 
  getServices, 
  getBlogPosts,
  addBlogPost,
  deleteBlogPost,
  getNewsletters
} from '../lib/storage';
import { useAuth } from '../context/AuthContext';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const { user, switchDemoRole, logout } = useAuth();
  const role = user?.role || 'admin';
  const setSimulatedRole = (r: UserRole) => switchDemoRole(r);
  const [activeTab, setActiveTab] = useState<'leads' | 'projects' | 'services' | 'blogs' | 'subscribers' | 'client-portal'>(
    user?.role === 'client' ? 'client-portal' : 'leads'
  );

  useEffect(() => {
    if (user?.role === 'client') {
      setActiveTab('client-portal');
    }
  }, [user?.role]);
  
  // Data states
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPostItem[]>([]);
  const [subscribers, setSubscribers] = useState<Array<{ id: string; email: string; createdAt: string }>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modals
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [newBlogOpen, setNewBlogOpen] = useState(false);

  // Form states for new project
  const [newProj, setNewProj] = useState({
    name: '',
    category: 'Websites',
    client: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    year: '2025',
    results: '300% Conversion Lift',
    technologies: 'React, Three.js, Tailwind CSS'
  });

  // Form states for new blog
  const [newPost, setNewPost] = useState({
    title: '',
    slug: '',
    category: 'AI Marketing',
    readTime: '5 min read',
    summary: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
  });

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [leadsData, projsData, servsData, blogsData, subsData] = await Promise.all([
        getLeads(),
        getProjects(),
        getServices(),
        getBlogPosts(),
        getNewsletters()
      ]);
      setLeads(leadsData);
      setProjects(projsData);
      setServices(servsData);
      setBlogs(blogsData);
      setSubscribers(subsData);
    } catch (e) {
      console.error('Failed to load admin data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: LeadItem['status']) => {
    await updateLeadStatus(id, newStatus);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const handleDeleteLead = async (id: string) => {
    if (confirm('Delete this inquiry record from Firestore/database?')) {
      await deleteLead(id);
      setLeads(prev => prev.filter(l => l.id !== id));
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProj.name || !newProj.description) return;

    await addProject({
      name: newProj.name,
      category: newProj.category as any,
      client: newProj.client || 'Enterprise Client',
      description: newProj.description,
      image: newProj.image,
      year: newProj.year,
      results: newProj.results.split(',').map(s => s.trim()),
      technologies: newProj.technologies.split(',').map(s => s.trim()),
      featured: true
    });

    setNewProjectOpen(false);
    loadAllData();
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to remove this project?')) {
      await deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.summary) return;

    await addBlogPost({
      title: newPost.title,
      slug: newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: newPost.category,
      author: user?.name || 'ELA Editorial',
      readTime: newPost.readTime,
      excerpt: newPost.summary,
      summary: newPost.summary,
      content: newPost.content || newPost.summary,
      image: newPost.image,
      publishedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });

    setNewBlogOpen(false);
    loadAllData();
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm('Delete this article?')) {
      await deleteBlogPost(id);
      setBlogs(prev => prev.filter(b => b.id !== id));
    }
  };

  // Filtered leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.service.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#050608] text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gold-gradient text-black">
                ADMIN ACCESS
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                CLOUD FIRESTORE CONNECTED (gen-lang-client-0690982136)
              </span>
            </div>
            <h1 className="text-3xl font-black text-white font-['Outfit'] mt-1">
              Command <span className="text-gold-gradient">Control Hub</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* RBAC Selector */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 ml-2" />
              <span className="text-zinc-400 text-[11px]">Role:</span>
              {(['admin', 'client', 'editor', 'viewer'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setSimulatedRole(r)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    role === r ? 'bg-amber-400 text-black' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              onClick={onBackToSite}
              className="px-4 py-2 rounded-xl glass-panel text-xs font-semibold text-zinc-300 hover:text-white hover:border-amber-400/40 transition-colors cursor-pointer"
            >
              Return to Website
            </button>

            <button
              onClick={async () => {
                await logout();
                onBackToSite();
              }}
              className="px-3 py-2 rounded-xl bg-red-500/15 border border-red-500/30 text-xs font-semibold text-red-300 hover:bg-red-500/25 transition-colors cursor-pointer"
              title="Sign Out"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Quick KPI Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl glass-panel border border-white/10">
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-mono">Total Leads</span>
            <p className="text-2xl font-black text-white font-['Outfit'] mt-1">{leads.length}</p>
            <span className="text-[10px] text-emerald-400">Captured in Firestore</span>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-white/10">
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-mono">Active Projects</span>
            <p className="text-2xl font-black text-amber-300 font-['Outfit'] mt-1">{projects.length}</p>
            <span className="text-[10px] text-zinc-400">Showcase Portfolio</span>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-white/10">
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-mono">Subscribers</span>
            <p className="text-2xl font-black text-cyan-300 font-['Outfit'] mt-1">{subscribers.length}</p>
            <span className="text-[10px] text-zinc-400">Briefing Pipeline</span>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-white/10">
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-mono">WhatsApp Hotline</span>
            <p className="text-sm font-black text-emerald-400 font-mono mt-2">+91 8667618925</p>
            <span className="text-[10px] text-zinc-400">24/7 Cloud Routing</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('client-portal')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'client-portal' ? 'bg-gold-gradient text-black shadow-md' : 'text-amber-300 hover:text-white glass-panel border-amber-400/30'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Client Deliverables & Portal</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'leads' ? 'bg-gold-gradient text-black shadow-md' : 'text-zinc-400 hover:text-white glass-panel'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Leads & Inquiries ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'projects' ? 'bg-gold-gradient text-black shadow-md' : 'text-zinc-400 hover:text-white glass-panel'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Manage Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'blogs' ? 'bg-gold-gradient text-black shadow-md' : 'text-zinc-400 hover:text-white glass-panel'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Blog Articles ({blogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'subscribers' ? 'bg-gold-gradient text-black shadow-md' : 'text-zinc-400 hover:text-white glass-panel'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Subscribers ({subscribers.length})</span>
          </button>
        </div>

        {/* TAB 1: LEADS MANAGEMENT */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            {/* Search & Status Filters */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search leads by name, company, email, or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400/50"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-400">Filter:</span>
                {(['all', 'new', 'contacted', 'qualified', 'converted'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs uppercase font-mono transition-all cursor-pointer ${
                      statusFilter === st ? 'bg-amber-400 text-black font-bold' : 'glass-panel text-zinc-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table / Cards */}
            <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/60 border-b border-white/10 text-zinc-400 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="p-4">Contact / Company</th>
                      <th className="p-4">Service & Budget</th>
                      <th className="p-4">Project Scope</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4">
                          <strong className="text-white block text-sm">{lead.name}</strong>
                          <span className="text-amber-300 block">{lead.company || 'Enterprise Partner'}</span>
                          <span className="text-zinc-400 text-[11px] block">{lead.email}</span>
                          <span className="text-zinc-500 text-[11px] font-mono block">{lead.phone}</span>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-white font-semibold block w-fit mb-1">
                            {lead.service}
                          </span>
                          <span className="text-emerald-400 font-mono text-xs">{lead.budget}</span>
                        </td>
                        <td className="p-4 max-w-xs">
                          <p className="line-clamp-2 text-zinc-300 text-xs">{lead.message || lead.notes}</p>
                        </td>
                        <td className="p-4 text-zinc-400 font-mono text-[11px]">
                          {lead.createdAt}
                        </td>
                        <td className="p-4">
                          <select
                            value={lead.status}
                            disabled={role === 'viewer'}
                            onChange={(e) => handleUpdateStatus(lead.id, e.target.value as any)}
                            className="bg-black/80 border border-white/15 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-amber-400 font-semibold"
                          >
                            <option value="new">🟢 New</option>
                            <option value="contacted">🟡 Contacted</option>
                            <option value="qualified">🔵 Qualified</option>
                            <option value="converted">⭐ Converted</option>
                            <option value="closed">⚪ Closed</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Open Direct WhatsApp with Lead */}
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '') || '918667618925'}?text=${encodeURIComponent(`Hello ${lead.name}, this is ELA Digital World regarding your ${lead.service} inquiry for ${lead.company || 'your enterprise'}.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition-colors"
                              title="Message Lead on WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>

                            {role === 'admin' && (
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                                title="Delete Record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredLeads.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-zinc-500 text-xs">
                          No inquiries found matching criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-white">Portfolio Showcase Records</h3>
                <p className="text-xs text-zinc-400">Add or manage client case studies displayed on the homepage.</p>
              </div>

              {role !== 'viewer' && (
                <button
                  onClick={() => setNewProjectOpen(true)}
                  className="px-4 py-2 rounded-xl bg-gold-gradient text-black font-bold text-xs hover:brightness-110 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Case Study</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="rounded-2xl glass-panel border border-white/10 p-5 flex flex-col justify-between">
                  <div>
                    <div className="aspect-[16/9] rounded-xl overflow-hidden mb-3 bg-zinc-900">
                      <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] text-amber-400 font-bold uppercase">{proj.category}</span>
                    <h4 className="text-base font-bold text-white mt-0.5">{proj.name}</h4>
                    <p className="text-xs text-zinc-400 line-clamp-2 mt-1">{proj.description}</p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-4">
                    <span className="text-xs text-emerald-400 font-bold">{proj.results[0]}</span>
                    {role === 'admin' && (
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-white/5"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BLOGS MANAGEMENT */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-white">Agency Intelligence Articles</h3>
                <p className="text-xs text-zinc-400">Publish thought leadership articles and tactical frameworks.</p>
              </div>

              {role !== 'viewer' && (
                <button
                  onClick={() => setNewBlogOpen(true)}
                  className="px-4 py-2 rounded-xl bg-gold-gradient text-black font-bold text-xs hover:brightness-110 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Article</span>
                </button>
              )}
            </div>

            <div className="space-y-3">
              {blogs.map((b) => (
                <div key={b.id} className="p-4 rounded-2xl glass-panel border border-white/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-12 rounded-xl overflow-hidden bg-zinc-900 flex-shrink-0">
                      <img src={b.image || b.coverImage || ''} alt={b.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-[10px] text-amber-300 font-bold uppercase">{b.category}</span>
                      <h4 className="text-sm font-bold text-white">{b.title}</h4>
                      <span className="text-[11px] text-zinc-400">{b.publishedAt} &bull; {typeof b.author === 'string' ? b.author : b.author?.name || 'ELA Editorial'}</span>
                    </div>
                  </div>

                  {role === 'admin' && (
                    <button
                      onClick={() => handleDeleteBlog(b.id)}
                      className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-white/5"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SUBSCRIBERS */}
        {activeTab === 'subscribers' && (
          <div className="rounded-2xl glass-panel border border-white/10 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Newsletter Audience</h3>
            <p className="text-xs text-zinc-400">List of verified email subscribers receiving the ELA Digital Intelligence briefing.</p>
            <div className="divide-y divide-white/5">
              {subscribers.map((s) => (
                <div key={s.id} className="py-3 flex items-center justify-between text-xs">
                  <span className="text-white font-mono">{s.email}</span>
                  <span className="text-zinc-500 font-mono">{s.createdAt}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CLIENT DELIVERABLES & PORTAL */}
        {activeTab === 'client-portal' && (
          <div className="space-y-6">
            {/* VIP Welcome Header */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel-gold border border-amber-400/40 bg-gradient-to-r from-amber-950/40 via-black to-zinc-950 relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active Production Engagement</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                    Welcome, <span className="text-gold-gradient">{user?.name || 'Enterprise Partner'}</span>
                  </h2>
                  <p className="text-zinc-300 text-xs sm:text-sm mt-1 max-w-xl">
                    Dedicated Client Operations Center for <strong className="text-white">{user?.company || 'ELA Enterprise Client'}</strong>. Track sprints, test milestones, review deliverables, and collaborate directly with the core engineering team.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/918667618925?text=Hello%20Er.%20Kasthuri,%20I%20am%20reviewing%20my%20ELA%20client%20portal%20and%20would%20like%20an%20update."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>WhatsApp Project Lead</span>
                  </a>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="px-4 py-3 rounded-xl glass-panel text-amber-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>View All Inquiries</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Active SOW Project Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Cols: Sprint & Milestones */}
              <div className="lg:col-span-2 space-y-6">
                <div className="p-6 rounded-2xl glass-panel border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Active Contract SOW #ELA-2026-88</span>
                      <h3 className="text-lg font-bold text-white font-['Outfit'] mt-0.5">
                        Omnichannel AI Web Platform & 3D Interactive Showcase
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold">
                      Sprint 4 / Final QA
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-300 font-medium">Overall Project Completion</span>
                      <span className="text-amber-400 font-bold font-mono">85% Complete</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-black/60 border border-white/10 overflow-hidden p-0.5">
                      <div 
                        className="h-full rounded-full bg-gold-gradient transition-all duration-1000 shadow-md shadow-amber-400/30"
                        style={{ width: '85%' }}
                      />
                    </div>
                  </div>

                  {/* Milestones Checklist */}
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-3">
                    Project Milestones & Sign-Offs
                  </h4>
                  <div className="space-y-2.5">
                    {[
                      { title: 'Brand Direction, UX Architecture & 3D Interactive Design', status: 'Completed', date: 'Signed off', done: true },
                      { title: 'Three.js 3D Interactive Globe & Responsive Visual Canvas', status: 'Completed', date: 'Signed off', done: true },
                      { title: 'Real-time Lead Generation & Omnipresent WhatsApp Sync', status: 'Completed', date: 'Signed off', done: true },
                      { title: 'Firebase Firestore Integration & Role-Based Admin Hub', status: 'Completed', date: 'Signed off', done: true },
                      { title: 'Performance Optimization & Core Web Vitals (99/100 Score)', status: 'In Progress', date: 'Target: This Week', done: false, active: true },
                      { title: 'Global CDN Deployment, Custom Domain & Meta Ad Campaign', status: 'Scheduled', date: 'Pending QA', done: false }
                    ].map((m, idx) => (
                      <div 
                        key={idx}
                        className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                          m.done 
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-zinc-200' 
                            : m.active
                              ? 'bg-amber-400/10 border-amber-400/40 text-white'
                              : 'bg-black/30 border-white/5 text-zinc-500'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            m.done ? 'bg-emerald-500 text-black' : m.active ? 'bg-amber-400 text-black' : 'bg-white/10 text-zinc-400'
                          }`}>
                            {m.done ? '✓' : idx + 1}
                          </div>
                          <span className={m.done ? 'line-through text-zinc-400' : 'font-medium'}>{m.title}</span>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            m.done ? 'bg-emerald-500/20 text-emerald-300' : m.active ? 'bg-amber-400/20 text-amber-300' : 'bg-white/5 text-zinc-500'
                          }`}>
                            {m.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Col: Team, SLAs, and Quick Change Request */}
              <div className="space-y-6">
                {/* Engineering Contacts */}
                <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    Assigned Project Leadership
                  </h4>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-gold-gradient p-0.5">
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-amber-400 font-bold text-xs">
                        EK
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Er. Kasthuri</p>
                      <p className="text-[11px] text-amber-400">Founder & Chief Architect</p>
                      <p className="text-[10px] text-zinc-400 font-mono">+91 8667618925</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">SLA Response Time:</span>
                      <span className="text-white font-mono font-semibold">&lt; 15 Minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Uptime Guarantee:</span>
                      <span className="text-emerald-400 font-mono font-semibold">99.95% Enterprise</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Hosting Infrastructure:</span>
                      <span className="text-white font-mono font-semibold">Google Cloud / Edge</span>
                    </div>
                  </div>
                </div>

                {/* Submit Change Request / New Deliverable */}
                <div className="p-6 rounded-2xl glass-panel-gold border border-amber-400/30 bg-[#0A0D18]">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                    Request Scope Expansion / Fast-Track
                  </h4>
                  <p className="text-zinc-400 text-[11px] mb-3">
                    Need new ad creative sets, custom API endpoints, or brand assets? Direct dispatch to our sprint board.
                  </p>
                  <a
                    href="https://wa.me/918667618925?text=Hello%20ELA%20Engineering,%20I%20would%20like%20to%20request%20a%20new%20deliverable%20or%20feature."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-gold-gradient text-black font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition-all cursor-pointer"
                  >
                    <span>Submit via Direct Hotline</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* New Project Modal */}
      <AnimatePresence>
        {newProjectOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl rounded-3xl glass-panel-gold p-6 sm:p-8 border border-amber-400/40 bg-[#090C16] text-xs"
            >
              <button
                onClick={() => setNewProjectOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-xl glass-panel text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <h2 className="text-xl font-bold text-white mb-4">Add New Case Study</h2>

              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <label className="block text-zinc-300 mb-1">Project Name</label>
                  <input
                    type="text"
                    required
                    value={newProj.name}
                    onChange={(e) => setNewProj({ ...newProj, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-300 mb-1">Category</label>
                    <select
                      value={newProj.category}
                      onChange={(e) => setNewProj({ ...newProj, category: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                    >
                      <option value="Websites">Websites</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Branding">Branding</option>
                      <option value="AI">AI</option>
                      <option value="Automation">Automation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-1">Client Name</label>
                    <input
                      type="text"
                      value={newProj.client}
                      onChange={(e) => setNewProj({ ...newProj, client: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-300 mb-1">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={newProj.description}
                    onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 mb-1">Results (comma separated)</label>
                  <input
                    type="text"
                    value={newProj.results}
                    onChange={(e) => setNewProj({ ...newProj, results: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={newProj.image}
                    onChange={(e) => setNewProj({ ...newProj, image: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setNewProjectOpen(false)}
                    className="px-4 py-2 rounded-xl glass-panel text-zinc-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gold-gradient text-black font-bold"
                  >
                    Save Case Study
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* New Blog Modal */}
      <AnimatePresence>
        {newBlogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl rounded-3xl glass-panel-gold p-6 sm:p-8 border border-amber-400/40 bg-[#090C16] text-xs"
            >
              <button
                onClick={() => setNewBlogOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-xl glass-panel text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <h2 className="text-xl font-bold text-white mb-4">Publish Article</h2>

              <form onSubmit={handleCreateBlog} className="space-y-4">
                <div>
                  <label className="block text-zinc-300 mb-1">Article Title</label>
                  <input
                    type="text"
                    required
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-300 mb-1">Category</label>
                    <input
                      type="text"
                      value={newPost.category}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 mb-1">Read Time</label>
                    <input
                      type="text"
                      value={newPost.readTime}
                      onChange={(e) => setNewPost({ ...newPost, readTime: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-300 mb-1">Executive Summary</label>
                  <textarea
                    rows={2}
                    required
                    value={newPost.summary}
                    onChange={(e) => setNewPost({ ...newPost, summary: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 mb-1">Full Article Content</label>
                  <textarea
                    rows={4}
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setNewBlogOpen(false)}
                    className="px-4 py-2 rounded-xl glass-panel text-zinc-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gold-gradient text-black font-bold"
                  >
                    Publish
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
