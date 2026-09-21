import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { ThreeGlobeHero } from './components/ThreeGlobeHero';
import { AboutSection } from './components/AboutSection';
import { ServiceCard } from './components/ServiceCard';
import { ProjectShowcase } from './components/ProjectShowcase';
import { GrowthSection } from './components/GrowthSection';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { getServices, getProjects, getTestimonials, getBlogPosts } from './lib/storage';
import { ServiceItem, ProjectItem, TestimonialItem, BlogPostItem } from './types';
import { Sparkles } from 'lucide-react';

function AppContent() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<'home' | 'admin'>('home');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPostItem[]>([]);
  const [selectedServiceForContact, setSelectedServiceForContact] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    async function loadData() {
      try {
        const [servData, projData, testData, blogData] = await Promise.all([
          getServices(),
          getProjects(),
          getTestimonials(),
          getBlogPosts()
        ]);
        setServices(servData);
        setProjects(projData);
        setTestimonials(testData);
        setBlogs(blogData);
      } catch (err) {
        console.error('Error loading core data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleNavigate = (sectionId: string) => {
    // Clean route formatting (strip leading slash if present)
    let route = sectionId.replace(/^\//, '');

    // If 'solutions' was requested, cleanly map it to 'services'
    if (route === 'solutions') {
      route = 'services';
    }

    if (route === 'admin' || route === 'dashboard') {
      // If user is already logged in, show dashboard immediately
      // If not logged in, open the Sign In modal
      if (user) {
        setCurrentView('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setAuthModalMode('login');
        setAuthModalOpen(true);
      }
      return;
    }

    if (route === 'login') {
      setAuthModalMode('login');
      setAuthModalOpen(true);
      return;
    }

    if (route === 'signup' || route === 'register') {
      setAuthModalMode('signup');
      setAuthModalOpen(true);
      return;
    }

    if (currentView === 'admin') {
      setCurrentView('home');
    }

    setActiveSection(route);

    // Smooth scroll to target element on home view
    setTimeout(() => {
      const element = document.getElementById(route);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForContact(serviceName);
    handleNavigate('contact');
  };

  const handleSelectProject = (projectName: string) => {
    setSelectedServiceForContact(`Case Study: ${projectName}`);
    handleNavigate('contact');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050608] flex flex-col items-center justify-center text-white">
        <div className="w-14 h-14 rounded-2xl bg-gold-gradient p-0.5 animate-pulse mb-4">
          <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center font-['Outfit'] font-black text-xl text-gold-gradient">
            E
          </div>
        </div>
        <p className="text-xs uppercase font-mono tracking-widest text-amber-400">
          Loading ELA Digital World...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050608] text-white flex flex-col selection:bg-amber-400 selection:text-black font-['Inter']">
      
      {/* Omnipresent Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Production-Grade Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        onSuccessNavigate={(target) => {
          if (target === 'dashboard') {
            setCurrentView('admin');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />

      {currentView === 'admin' ? (
        <AdminDashboard onBackToSite={() => setCurrentView('home')} />
      ) : (
        <>
          {/* Top Navigation */}
          <Navbar 
            currentRoute={activeSection} 
            onNavigate={handleNavigate} 
            onOpenContact={() => handleNavigate('contact')} 
            onOpenAuth={(mode) => {
              setAuthModalMode(mode || 'login');
              setAuthModalOpen(true);
            }}
          />

          <main className="flex-grow">
            {/* 1. 3D Globe Hero Section */}
            <ThreeGlobeHero 
              onStartProject={() => handleNavigate('contact')} 
              onExploreServices={() => handleNavigate('services')} 
            />

            {/* 2. Services Grid Section */}
            <section id="services" className="py-24 relative overflow-hidden bg-[#06080E]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>End-to-End Capabilities</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] mb-4">
                    Full-Spectrum <span className="text-gold-gradient">Digital Dominance</span>
                  </h2>
                  <p className="text-zinc-400 text-base">
                    Ten synchronized capabilities engineered to scale modern enterprises from idea to category leader.
                  </p>
                </div>

                {/* 10 Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      onSelectForInquiry={handleSelectService}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 3. About Section with 6-Stage Interactive Velocity Timeline */}
            <AboutSection />

            {/* 4. Projects Showcase with 3D filtering and Case Studies */}
            <ProjectShowcase
              projects={projects}
              onSelectProjectForDiscussion={handleSelectProject}
            />

            {/* 5. Digital Growth Section with Animated Counters & Charts */}
            <GrowthSection />

            {/* 7. Client Testimonials 3D Carousel */}
            <TestimonialCarousel testimonials={testimonials} />

            {/* 8. Agency Blog & Insights */}
            <BlogSection posts={blogs} />

            {/* 9. Contact / Lead Generation Section with WhatsApp & Firestore */}
            <ContactSection preselectedService={selectedServiceForContact} />
          </main>

          {/* Dark Luxury Footer */}
          <Footer onNavigate={handleNavigate} />
        </>
      )}

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
