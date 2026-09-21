import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  User as UserIcon, 
  ShieldAlert, 
  ShieldCheck,
  LogOut, 
  Sparkles, 
  ChevronRight,
  Database,
  PhoneCall,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { EnterpriseSecurityModal } from './EnterpriseSecurityModal';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenContact: () => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onOpenContact, onOpenAuth }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);
  const [securityModalOpen, setSecurityModalOpen] = useState<boolean>(false);
  const { user, logout, isFirebaseLive } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', route: '/' },
    { label: 'About', route: '/about' },
    { label: 'Services', route: '/services' },
    { label: 'Projects', route: '/projects' },
    { label: 'Blog', route: '/blog' },
    { label: 'Contact', route: '/contact' },
    { label: 'Dashboard', route: '/dashboard', isSpecial: true }
  ];

  const handleNavClick = (route: string) => {
    setMobileMenuOpen(false);
    if (route === '/dashboard' || route === 'dashboard') {
      if (!user) {
        onOpenAuth('login');
      } else {
        onNavigate('dashboard');
      }
      return;
    }
    if (route === '/login' || route === 'login') {
      onOpenAuth('login');
      return;
    }
    onNavigate(route);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#050608]/90 backdrop-blur-xl border-b border-amber-400/15 py-3.5 shadow-2xl shadow-black/80' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with 3D Earth & Gold Ring official emblem */}
          <button 
            id="nav-brand-logo"
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="relative flex-shrink-0">
              <img
                src="/assets/ela-logo.png"
                alt="ELA Digital World Logo"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-contain border border-amber-400/40 group-hover:border-amber-400 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-all duration-300 bg-black/50"
              />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-wider text-white font-['Outfit']">
                  ELA
                </span>
                <span className="text-xl sm:text-2xl font-bold tracking-wider text-gold-gradient font-['Outfit']">
                  DIGITAL WORLD
                </span>
              </div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-400 -mt-1 font-medium font-['Space_Grotesk']">
                Think Digital. Think Bigger.
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 bg-white/[0.03] backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  id={`nav-link-${item.label.toLowerCase()}`}
                  onClick={() => handleNavClick(item.route)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive 
                      ? 'text-black font-semibold bg-gold-gradient shadow-md shadow-amber-500/20' 
                      : item.isSpecial
                        ? 'text-amber-300 hover:text-white bg-amber-400/15 border border-amber-400/35 hover:bg-amber-400/25'
                        : 'text-zinc-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {item.isSpecial && <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-2.5">
            {/* Direct WhatsApp Call link */}
            <a
              href="https://wa.me/918667618925"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl glass-panel text-xs text-amber-300 hover:border-amber-400/50 flex items-center gap-1.5 transition-colors"
              title="Chat with Founder on WhatsApp"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-[11px]">+91 8667618925</span>
            </a>

            {/* Full Security Protocol Modal trigger */}
            <button
              id="top-security-btn"
              onClick={() => setSecurityModalOpen(true)}
              className="px-2.5 py-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="View Enterprise Security & Compliance Protocols"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden xl:inline font-mono text-[11px]">Full Security</span>
              <span className="inline xl:hidden font-mono text-[11px]">Security</span>
            </button>

            {/* Direct Top Dashboard Button */}
            <button
              id="top-dashboard-btn"
              onClick={() => handleNavClick('/dashboard')}
              className="px-3.5 py-1.5 rounded-xl border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Open Client & Admin Dashboard"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
              <span>Dashboard</span>
            </button>

            {/* User Auth or Login/Get Started */}
            {user ? (
              <div className="relative">
                <button
                  id="nav-user-dropdown-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel hover:border-amber-400/40 text-xs text-zinc-200 transition-all cursor-pointer"
                >
                  <img 
                    src={user.photoURL || `https://api.dicebear.com/7.x/identicon/svg?seed=${user.email}`} 
                    alt={user.name} 
                    className="w-6 h-6 rounded-full border border-amber-400/40 object-cover"
                  />
                  <span className="max-w-[100px] truncate font-medium">{user.name}</span>
                  <span className="bg-amber-400/20 text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-400/40 uppercase">
                    {user.role}
                  </span>
                </button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 rounded-2xl glass-panel-gold p-2 shadow-2xl z-50 text-xs border border-amber-400/30"
                    >
                      <div className="px-3 py-2 border-b border-white/10 mb-1">
                        <p className="font-semibold text-white truncate">{user.name}</p>
                        <p className="text-zinc-400 text-[11px] truncate">{user.email}</p>
                      </div>

                      <button
                        id="dropdown-dashboard-btn"
                        onClick={() => { setUserDropdownOpen(false); handleNavClick('/dashboard'); }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.08] text-zinc-200 hover:text-white flex items-center justify-between cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
                          Dashboard
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                      </button>

                      <button
                        id="dropdown-admin-btn"
                        onClick={() => { setUserDropdownOpen(false); handleNavClick('/dashboard'); }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-amber-400/10 text-amber-300 flex items-center justify-between font-medium cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          Admin Console
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                      </button>

                      <button
                        id="dropdown-logout-btn"
                        onClick={() => { setUserDropdownOpen(false); logout(); }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-500/20 text-red-300 flex items-center gap-1.5 mt-1 border-t border-white/10 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  id="nav-login-btn"
                  onClick={() => onOpenAuth('login')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  id="nav-get-started-btn"
                  onClick={onOpenContact}
                  className="px-4 py-1.5 rounded-xl bg-gold-gradient text-black font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Get Started</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            {user && (
              <button
                onClick={() => handleNavClick('/dashboard')}
                className="w-8 h-8 rounded-full border border-amber-400/40 overflow-hidden"
              >
                <img src={user.photoURL || `https://api.dicebear.com/7.x/identicon/svg?seed=${user.email}`} alt={user.name} className="w-full h-full object-cover" />
              </button>
            )}

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl glass-panel text-zinc-200 hover:text-amber-400 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#07090f]/95 backdrop-blur-2xl border-b border-amber-400/20 px-4 pt-4 pb-6 space-y-3"
          >
            <div className="grid grid-cols-1 gap-1">
              {navItems.map((item) => (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    currentRoute === item.route 
                      ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30' 
                      : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <a
                href="https://wa.me/918667618925"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-sm font-bold flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp: +91 8667618925</span>
              </a>

              {user ? (
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => handleNavClick('/dashboard')}
                    className="w-full py-2.5 rounded-xl bg-gold-gradient text-black text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Open Dashboard ({user.role.toUpperCase()})</span>
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); logout(); }}
                    className="w-full py-2 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-semibold cursor-pointer text-center"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => handleNavClick('/dashboard')}
                    className="w-full py-2.5 rounded-xl border border-amber-400/40 bg-amber-400/15 text-amber-300 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Client & Admin Dashboard</span>
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => { setMobileMenuOpen(false); onOpenAuth('login'); }}
                      className="w-full py-2.5 rounded-xl glass-panel text-white text-sm font-medium text-center cursor-pointer hover:bg-white/10"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => { setMobileMenuOpen(false); onOpenAuth('signup'); }}
                      className="w-full py-2.5 rounded-xl bg-gold-gradient text-black text-sm font-bold text-center cursor-pointer hover:brightness-110"
                    >
                      Register
                    </button>
                  </div>
                </div>
              )}
              {/* Security trigger for mobile */}
              <button
                onClick={() => { setMobileMenuOpen(false); setSecurityModalOpen(true); }}
                className="w-full py-2 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Enterprise Security & Compliance Status</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enterprise Security Modal */}
      <EnterpriseSecurityModal
        isOpen={securityModalOpen}
        onClose={() => setSecurityModalOpen(false)}
      />
    </header>
  );
};
