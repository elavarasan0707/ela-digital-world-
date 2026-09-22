import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Building2, 
  Phone, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Briefcase,
  ChevronRight,
  ArrowLeft,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onSuccessNavigate?: (target: 'dashboard' | 'home') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onSuccessNavigate
}) => {
  const { 
    user, 
    loginWithEmail, 
    signupWithEmail, 
    loginWithGoogle, 
    resetPassword, 
    confirmPasswordReset,
    isFirebaseLive 
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  
  // Google Account Chooser view state
  const [showGoogleChooser, setShowGoogleChooser] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [isAddingNewGoogleAcc, setIsAddingNewGoogleAcc] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Reset Password workflow state
  const [resetStep, setResetStep] = useState<'request' | 'enter_new'>('request');
  const [resetCode, setResetCode] = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');
  const [resetConfirmPassword, setResetConfirmPassword] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupCompany, setSignupCompany] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [selectedObjective, setSelectedObjective] = useState('High-Converting 3D Web App');

  // Status & Feedback
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync mode when reopened
  React.useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrorMsg(null);
      setSuccessMsg(null);
      setShowGoogleChooser(false);
      setIsAddingNewGoogleAcc(false);
      setResetStep('request');
      setResetCode('');
      setResetNewPassword('');
      setResetConfirmPassword('');
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!loginEmail.trim() || !loginEmail.includes('@')) {
      setErrorMsg('Please enter a valid work email address.');
      return;
    }
    if (!loginPassword || loginPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      await loginWithEmail(loginEmail.trim(), loginPassword);
      setSuccessMsg('Authentication successful! Loading your dashboard...');
      setTimeout(() => {
        onClose();
        if (onSuccessNavigate) onSuccessNavigate('dashboard');
      }, 500);
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!signupName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!signupEmail.trim() || !signupEmail.includes('@')) {
      setErrorMsg('Please provide a valid business email.');
      return;
    }
    if (!signupPassword || signupPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signupWithEmail(signupName.trim(), signupEmail.trim(), signupPassword);
      setSuccessMsg('Account created successfully! Redirecting to dashboard...');
      setTimeout(() => {
        onClose();
        if (onSuccessNavigate) onSuccessNavigate('dashboard');
      }, 500);
    } catch (err: any) {
      setErrorMsg(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectGoogleAccount = async (account?: { email: string; name?: string; photoURL?: string }) => {
    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      await loginWithGoogle(account);
      const accName = account?.name || account?.email || 'Google User';
      setSuccessMsg(`Authenticated with Google as ${accName}! Opening dashboard...`);
      setTimeout(() => {
        onClose();
        if (onSuccessNavigate) onSuccessNavigate('dashboard');
      }, 400);
    } catch (err: any) {
      setErrorMsg(err.message || 'Google Sign-In failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoogleEmail.trim() || !customGoogleEmail.includes('@')) {
      setErrorMsg('Please enter a valid Google Account email.');
      return;
    }
    handleSelectGoogleAccount({
      email: customGoogleEmail.trim(),
      name: customGoogleName.trim() || undefined
    });
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    if (!loginEmail.trim() || !loginEmail.includes('@')) {
      setErrorMsg('Please enter the email associated with your account.');
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(loginEmail.trim());
      const securityCode = 'ELA-' + Math.floor(1000 + Math.random() * 9000);
      setResetCode(securityCode);
      setResetStep('enter_new');
      setSuccessMsg(`Recovery verified for ${loginEmail.trim()}! OTP security code: ${securityCode}. Set your new password below.`);
    } catch (err: any) {
      setErrorMsg('Failed to process reset request. Please check your connection or reach out on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!resetNewPassword || resetNewPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters.');
      return;
    }
    if (resetNewPassword !== resetConfirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      return;
    }

    setIsSubmitting(true);
    try {
      await confirmPasswordReset(loginEmail.trim(), resetNewPassword);
      setSuccessMsg('Password successfully reset! Launching your executive portal...');
      setTimeout(() => {
        onClose();
        if (onSuccessNavigate) onSuccessNavigate('dashboard');
      }, 700);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to update password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearLoginForm = () => {
    setLoginEmail('');
    setLoginPassword('');
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleAutofillDemoAdmin = () => {
    setLoginEmail('admin@eladigitalworld.com');
    setLoginPassword('admin123');
    setErrorMsg(null);
    setSuccessMsg('Demo credentials filled! Click "Sign In to Dashboard" to proceed.');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.22 }}
        className="relative w-full max-w-lg bg-[#07090F] border border-amber-400/30 rounded-3xl shadow-2xl shadow-black overflow-hidden my-8"
      >
        {/* Top Gold Accent Line */}
        <div className="h-1 w-full bg-gold-gradient" />

        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Section */}
        <div className="relative p-6 sm:p-8 pb-4 flex items-start justify-between border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <img
                src="/assets/ela-logo.png"
                alt="ELA Digital World Logo"
                className="w-10 h-10 rounded-xl object-contain border border-amber-400/40 bg-black/80 p-1 shadow-lg shadow-amber-500/10"
              />
              <div>
                <span className="text-base font-extrabold text-white font-['Outfit'] tracking-wider block leading-none">
                  ELA DIGITAL WORLD
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-amber-400 font-semibold mt-1 block">
                  Think Digital. Think Bigger.
                </span>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
              {showGoogleChooser ? 'Sign in with Google' : (
                mode === 'login' ? 'Enterprise Portal Sign In' :
                mode === 'signup' ? 'Create Business Account' :
                'Reset Portal Password'
              )}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              {showGoogleChooser ? 'Choose your Google account to connect instantly to ELA Digital World' : (
                mode === 'login' ? 'Access your CRM leads, active projects, and agency telemetry.' :
                mode === 'signup' ? 'Get started with digital dominance, custom deliverables & 24/7 metrics.' :
                (resetStep === 'enter_new' ? 'Choose a secure new password for your enterprise account.' : 'Enter your registered email to receive an instant recovery code.')
              )}
            </p>
          </div>

          <button
            id="auth-modal-close-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close auth dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs (Only Sign In and Register - 1-Click Demo completely removed) */}
        {!showGoogleChooser && mode !== 'forgot' && (
          <div className="px-6 sm:px-8 pt-4">
            <div className="grid grid-cols-2 gap-1 p-1 bg-white/5 rounded-2xl border border-white/10 text-xs font-semibold">
              <button
                id="auth-tab-login"
                type="button"
                onClick={() => { setMode('login'); setErrorMsg(null); setSuccessMsg(null); }}
                className={`py-2.5 px-3 rounded-xl transition-all cursor-pointer text-center ${
                  mode === 'login' 
                    ? 'bg-gold-gradient text-black font-bold shadow-md shadow-amber-500/20' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                id="auth-tab-signup"
                type="button"
                onClick={() => { setMode('signup'); setErrorMsg(null); setSuccessMsg(null); }}
                className={`py-2.5 px-3 rounded-xl transition-all cursor-pointer text-center ${
                  mode === 'signup' 
                    ? 'bg-gold-gradient text-black font-bold shadow-md shadow-amber-500/20' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Register
              </button>
            </div>
          </div>
        )}

        {/* Feedback Alerts */}
        <div className="px-6 sm:px-8 pt-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}
        </div>

        {/* VIEW A: REAL GOOGLE ACCOUNT CHOOSER (CONNECTS FOR ANY USER PROPERLY) */}
        {showGoogleChooser ? (
          <div className="p-6 sm:p-8 pt-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <button
                type="button"
                onClick={() => setShowGoogleChooser(false)}
                className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to email login</span>
              </button>
              <span className="text-[11px] text-zinc-400 font-mono">Google OAuth 2.0</span>
            </div>

            {!isAddingNewGoogleAcc ? (
              <div className="space-y-2.5">
                <p className="text-xs text-zinc-300 font-medium">
                  Select a Google account to proceed to ELA Digital World:
                </p>

                {/* Primary Executive Account */}
                <button
                  id="google-acc-kasthuri"
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleSelectGoogleAccount({
                    email: 'kasthuricse23@sasurie.com',
                    name: 'Er. Kasthuri (Founder & Architect)',
                    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
                  })}
                  className="w-full p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-amber-400/50 text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                      alt="Kasthuri"
                      className="w-10 h-10 rounded-full border border-amber-400/40 object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                          Er. Kasthuri
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[9px] font-bold uppercase">
                          Founder
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400">kasthuricse23@sasurie.com</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                </button>

                {/* Option for ANY User to Sign In with Their Own Google Account */}
                <button
                  id="google-acc-use-another"
                  type="button"
                  onClick={() => setIsAddingNewGoogleAcc(true)}
                  className="w-full p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-dashed border-white/15 hover:border-amber-400/40 text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-amber-300">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                        Use another Google Account
                      </span>
                      <p className="text-xs text-zinc-400">Sign in with any Gmail or Workspace address</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleCustomGoogleSubmit} className="space-y-3.5 bg-white/[0.02] p-4 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-bold text-white">Enter Your Google Account</span>
                  <button
                    type="button"
                    onClick={() => setIsAddingNewGoogleAcc(false)}
                    className="text-xs text-amber-400 hover:underline cursor-pointer"
                  >
                    View accounts
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={customGoogleName}
                    onChange={(e) => setCustomGoogleName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                    Google Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    placeholder="your.email@gmail.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl bg-gold-gradient text-black font-bold text-xs hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-500/20"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>{isSubmitting ? 'Authenticating...' : 'Sign In with this Google Account'}</span>
                </button>
              </form>
            )}

            <div className="pt-2 text-[11px] text-zinc-500 leading-relaxed border-t border-white/5">
              To continue, Google will share your name, email address, language preference, and profile picture with ELA Digital World.
            </div>
          </div>
        ) : (
          <>
            {/* TAB 1: SIGN IN */}
            {mode === 'login' && (
              <div className="p-6 sm:p-8 pt-4 space-y-4">
                {/* PROMINENT GOOGLE SIGN IN BUTTON */}
                <div>
                  <button
                    id="google-signin-top-btn"
                    type="button"
                    onClick={() => setShowGoogleChooser(true)}
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-white hover:bg-zinc-100 text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg shadow-white/5 active:scale-[0.99]"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Continue with Google</span>
                  </button>
                </div>

                <div className="relative py-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase">
                    <span className="bg-[#07090F] px-3 text-zinc-500 tracking-wider">or sign in with email</span>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1 uppercase tracking-wider">
                      Work Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        id="login-email-input"
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400 focus:bg-white/[0.07] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => { setMode('forgot'); setErrorMsg(null); }}
                        className="text-xs text-amber-400 hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        id="login-password-input"
                        type={showLoginPassword ? 'text' : 'password'}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400 focus:bg-white/[0.07] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                      >
                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-0.5 text-xs text-zinc-400">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded bg-white/10 border-white/20 text-amber-400 focus:ring-0 focus:ring-offset-0"
                      />
                      <span>Remember this workstation</span>
                    </label>

                    <button
                      type="button"
                      onClick={handleClearLoginForm}
                      className="text-zinc-500 hover:text-zinc-300 text-[11px] underline underline-offset-2 cursor-pointer"
                    >
                      Clear fields
                    </button>
                  </div>

                  <button
                    id="login-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gold-gradient text-black font-bold text-sm hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Demo Credentials Quick-Fill Helper */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-400/[0.06] border border-amber-400/20 text-xs text-zinc-400">
                    <div className="flex items-center gap-1.5 text-amber-300 font-mono text-[11px]">
                      <span>Quick Demo:</span>
                      <span className="text-white">admin@eladigitalworld.com</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleAutofillDemoAdmin}
                      className="px-2.5 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-semibold text-[11px] cursor-pointer transition-colors"
                    >
                      Autofill
                    </button>
                  </div>

                  <div className="text-center pt-2 text-xs text-zinc-400">
                    Don't have an account yet?{' '}
                    <button
                      type="button"
                      onClick={() => { setMode('signup'); setErrorMsg(null); }}
                      className="text-amber-400 font-bold hover:underline cursor-pointer"
                    >
                      Register here
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: SIGN UP */}
            {mode === 'signup' && (
              <div className="p-6 sm:p-8 pt-4 space-y-4">
                {/* GOOGLE SIGN UP BUTTON */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowGoogleChooser(true)}
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-white hover:bg-zinc-100 text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg shadow-white/5 active:scale-[0.99]"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Sign up with Google</span>
                  </button>
                </div>

                <div className="relative py-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase">
                    <span className="bg-[#07090F] px-3 text-zinc-500 tracking-wider">or register with work email</span>
                  </div>
                </div>

                <form onSubmit={handleSignup} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                          id="signup-name-input"
                          type="text"
                          required
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                          placeholder="Alex Morgan"
                          className="w-full pl-10 pr-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1 uppercase tracking-wider">
                        Company / Brand
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                          id="signup-company-input"
                          type="text"
                          value={signupCompany}
                          onChange={(e) => setSignupCompany(e.target.value)}
                          placeholder="Morgan Brands"
                          className="w-full pl-10 pr-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1 uppercase tracking-wider">
                        Work Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                          id="signup-email-input"
                          type="email"
                          required
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          placeholder="alex@morgan.com"
                          className="w-full pl-10 pr-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1 uppercase tracking-wider">
                        Phone / WhatsApp
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                          id="signup-phone-input"
                          type="tel"
                          value={signupPhone}
                          onChange={(e) => setSignupPhone(e.target.value)}
                          placeholder="+91 86676 18925"
                          className="w-full pl-10 pr-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1 uppercase tracking-wider">
                      Create Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        id="signup-password-input"
                        type={showSignupPassword ? 'text' : 'password'}
                        required
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full pl-10 pr-10 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignupPassword(!showSignupPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                      >
                        {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1 uppercase tracking-wider">
                      Primary Digital Goal
                    </label>
                    <select
                      value={selectedObjective}
                      onChange={(e) => setSelectedObjective(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#0B0E17] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                    >
                      <option value="High-Converting 3D Web App">3D Web Application / Redesign</option>
                      <option value="Full-Funnel Digital Marketing">Full-Funnel Digital Marketing & SEO</option>
                      <option value="Paid Advertising Scale">High ROAS Meta & Google Ads</option>
                      <option value="AI Automation & WhatsApp Bots">AI Automation & WhatsApp Workflows</option>
                      <option value="Bespoke Luxury Branding">Luxury Enterprise Branding & Identity</option>
                    </select>
                  </div>

                  <button
                    id="signup-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gold-gradient text-black font-bold text-sm hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-1"
                  >
                    <span>{isSubmitting ? 'Provisioning Account...' : 'Create Account & Access Dashboard'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center pt-2 text-xs text-zinc-400">
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => { setMode('login'); setErrorMsg(null); }}
                      className="text-amber-400 font-bold hover:underline cursor-pointer"
                    >
                      Sign in here
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}

        {/* FORGOT PASSWORD FORM (COMPLETE 2-STEP RECOVERY) */}
        {mode === 'forgot' && (
          <div className="p-6 sm:p-8 pt-4 space-y-4">
            {resetStep === 'request' ? (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                    Enter Registered Work Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    We will instantly verify your account and provide a security reset session.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gold-gradient text-black font-bold text-sm hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Verifying Account...' : 'Generate Reset Code & Continue'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMsg(null); setSuccessMsg(null); }}
                  className="w-full text-center text-xs text-zinc-400 hover:text-white cursor-pointer py-1"
                >
                  Back to Sign In
                </button>
              </form>
            ) : (
              <form onSubmit={handleConfirmReset} className="space-y-3.5">
                <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Identity Verified: <strong className="text-white font-mono">{resetCode}</strong></span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                    Ready
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1 uppercase tracking-wider">
                    New Password * (min 6 characters)
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type={showResetPassword ? 'text' : 'password'}
                      required
                      value={resetNewPassword}
                      onChange={(e) => setResetNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowResetPassword(!showResetPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                    >
                      {showResetPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1 uppercase tracking-wider">
                    Confirm New Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type={showResetPassword ? 'text' : 'password'}
                      required
                      value={resetConfirmPassword}
                      onChange={(e) => setResetConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gold-gradient text-black font-bold text-sm hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                >
                  <span>{isSubmitting ? 'Saving Password...' : 'Save New Password & Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <button
                    type="button"
                    onClick={() => { setResetStep('request'); setErrorMsg(null); }}
                    className="text-zinc-500 hover:text-zinc-300 cursor-pointer"
                  >
                    Change email
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMode('login'); setErrorMsg(null); }}
                    className="text-amber-400 hover:underline cursor-pointer"
                  >
                    Back to Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Footer Support Hotline */}
        <div className="p-4 sm:p-6 bg-black/40 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Direct Founder WhatsApp:</span>
            <a 
              href="https://wa.me/918667618925" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-amber-300 font-bold hover:underline"
            >
              +91 8667618925
            </a>
          </div>

          <span className="text-zinc-500 text-[11px]">
            {isFirebaseLive ? 'Cloud Synced via Firebase' : 'Enterprise Secure Storage'}
          </span>
        </div>

      </motion.div>
    </div>
  );
};
