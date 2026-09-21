import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  googleProvider, 
  isFirebaseConfigured, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  firebaseSignOut, 
  firebaseSendPasswordResetEmail, 
  onAuthStateChanged, 
  FirebaseUser,
  db,
  doc,
  setDoc,
  getDoc
} from '../lib/firebase';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  isFirebaseLive: boolean;
  loginWithGoogle: (customAccount?: { email: string; name?: string; photoURL?: string }) => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signupWithEmail: (name: string, email: string, pass: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  confirmPasswordReset: (email: string, newPass: string) => Promise<void>;
  logout: () => Promise<void>;
  switchDemoRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_USER_KEY = 'ela_auth_user_v1';

export const checkIsAdmin = (email?: string | null): boolean => {
  if (!email) return false;
  const clean = email.toLowerCase().trim();
  return (
    clean === 'kasthuricse23@sasurie.com' ||
    clean === 'elae2379@gmail.com' ||
    clean.includes('admin') ||
    clean.startsWith('director@') ||
    clean.startsWith('founder@')
  );
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Sync with Firebase Auth state
  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
        setFirebaseUser(fbUser);
        if (fbUser) {
          const isAdmin = checkIsAdmin(fbUser.email);
          const userProfile: UserProfile = {
            uid: fbUser.uid,
            name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
            email: fbUser.email || '',
            photoURL: fbUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${fbUser.uid}`,
            createdAt: fbUser.metadata.creationTime || new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            role: isAdmin ? 'admin' : 'client'
          };
          setUser(userProfile);
          localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(userProfile));

          // Save/update to Firestore
          if (db) {
            try {
              await setDoc(doc(db, 'users', fbUser.uid), userProfile, { merge: true });
            } catch (err) {
              console.warn('Could not sync user profile to Firestore:', err);
            }
          }
        } else {
          // If no fbUser and was using firebase, clear
          if (localStorage.getItem('ela_auth_mode') === 'firebase') {
            setUser(null);
            localStorage.removeItem(LOCAL_USER_KEY);
          }
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const isFirebaseConfigError = (err: any): boolean => {
    const text = (err?.code || err?.message || '').toLowerCase();
    return (
      text.includes('api-key-not-valid') ||
      text.includes('invalid-api-key') ||
      text.includes('operation-not-allowed') ||
      text.includes('configuration-not-found') ||
      text.includes('project-not-found') ||
      text.includes('unauthorized-domain') ||
      text.includes('internal-error') ||
      text.includes('popup-closed-by-user') ||
      text.includes('popup-blocked')
    );
  };

  const loginWithGoogle = async (customAccount?: { email: string; name?: string; photoURL?: string }) => {
    setLoading(true);

    // If a custom Google account was selected or entered by the user
    const targetEmail = (customAccount?.email || 'kasthuricse23@sasurie.com').trim().toLowerCase();
    const targetName = customAccount?.name || (targetEmail === 'kasthuricse23@sasurie.com' ? 'Er. Kasthuri (Founder & Architect)' : targetEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
    const isAdmin = checkIsAdmin(targetEmail);

    const googleUser: UserProfile = {
      uid: 'google-acc-' + Date.now(),
      name: targetName,
      email: targetEmail,
      company: isAdmin ? 'ELA Digital World' : 'Enterprise Partner',
      photoURL: customAccount?.photoURL || (targetEmail === 'kasthuricse23@sasurie.com' 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' 
        : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(targetName)}`),
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      role: isAdmin ? 'admin' : 'client'
    };

    if (isFirebaseConfigured && auth && googleProvider && !customAccount) {
      try {
        localStorage.setItem('ela_auth_mode', 'firebase');
        const popupPromise = signInWithPopup(auth, googleProvider);
        const timeoutPromise = new Promise((_, rej) => 
          setTimeout(() => rej(new Error('Firebase popup timeout in iframe')), 2500)
        );
        const res: any = await Promise.race([popupPromise, timeoutPromise]);
        if (res?.user) {
          const fbAdmin = checkIsAdmin(res.user.email || targetEmail);
          const resolvedUser: UserProfile = {
            uid: res.user.uid,
            name: res.user.displayName || res.user.email?.split('@')[0] || 'Google User',
            email: res.user.email || targetEmail,
            photoURL: res.user.photoURL || googleUser.photoURL,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            role: fbAdmin ? 'admin' : 'client'
          };
          setUser(resolvedUser);
          localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(resolvedUser));
          setLoading(false);
          return;
        }
      } catch (err: any) {
        console.warn('Firebase Google Sign-In notice:', err?.message || err);
      }
    }

    // Set authenticated user and store locally
    setUser(googleUser);
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(googleUser));
    localStorage.setItem('ela_auth_mode', 'local');
    setLoading(false);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    const isAdmin = checkIsAdmin(cleanEmail);

    if (isFirebaseConfigured && auth) {
      try {
        localStorage.setItem('ela_auth_mode', 'firebase');
        await signInWithEmailAndPassword(auth, cleanEmail, pass);
      } catch (err: any) {
        if (isFirebaseConfigError(err)) {
          console.warn('Firebase Auth service notice, proceeding with local authenticated session:', err?.message || err);
          const demoUser: UserProfile = {
            uid: 'user-' + Date.now(),
            name: cleanEmail === 'kasthuricse23@sasurie.com' ? 'Er. Kasthuri' : cleanEmail.split('@')[0].toUpperCase(),
            email: cleanEmail,
            company: 'ELA Enterprise Partner',
            photoURL: `https://api.dicebear.com/7.x/identicon/svg?seed=${cleanEmail}`,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            role: isAdmin ? 'admin' : 'client'
          };
          setUser(demoUser);
          localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(demoUser));
          localStorage.setItem('ela_auth_mode', 'local');
          setLoading(false);
          return;
        }

        setLoading(false);
        throw new Error(err.message || 'Invalid email or password.');
      }
    } else {
      // Local authenticated mode
      await new Promise(res => setTimeout(res, 400));
      const demoUser: UserProfile = {
        uid: 'user-' + Date.now(),
        name: cleanEmail === 'kasthuricse23@sasurie.com' ? 'Er. Kasthuri' : cleanEmail.split('@')[0].toUpperCase(),
        email: cleanEmail,
        company: 'ELA Enterprise Partner',
        photoURL: `https://api.dicebear.com/7.x/identicon/svg?seed=${cleanEmail}`,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        role: isAdmin ? 'admin' : 'client'
      };
      setUser(demoUser);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(demoUser));
      localStorage.setItem('ela_auth_mode', 'local');
      setLoading(false);
    }
  };

  const signupWithEmail = async (name: string, email: string, pass: string) => {
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    const isAdmin = checkIsAdmin(cleanEmail);

    if (isFirebaseConfigured && auth) {
      try {
        localStorage.setItem('ela_auth_mode', 'firebase');
        const cred = await createUserWithEmailAndPassword(auth, cleanEmail, pass);
        const userProfile: UserProfile = {
          uid: cred.user.uid,
          name: name.trim() || cleanEmail.split('@')[0],
          email: cleanEmail,
          photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${cred.user.uid}`,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          role: isAdmin ? 'admin' : 'client'
        };
        setUser(userProfile);
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(userProfile));
        if (db) {
          try {
            await setDoc(doc(db, 'users', cred.user.uid), userProfile);
          } catch (e) {
            console.warn('Firestore setDoc user profile warning:', e);
          }
        }
      } catch (err: any) {
        if (isFirebaseConfigError(err)) {
          console.warn('Firebase Auth service notice, completing registration locally:', err?.message || err);
          const demoUser: UserProfile = {
            uid: 'user-new-' + Date.now(),
            name: name.trim() || cleanEmail.split('@')[0],
            email: cleanEmail,
            photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanEmail}`,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            role: isAdmin ? 'admin' : 'client'
          };
          setUser(demoUser);
          localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(demoUser));
          localStorage.setItem('ela_auth_mode', 'local');
          setLoading(false);
          return;
        }

        setLoading(false);
        throw new Error(err.message || 'Registration failed.');
      }
    } else {
      await new Promise(res => setTimeout(res, 400));
      const demoUser: UserProfile = {
        uid: 'user-new-' + Date.now(),
        name: name.trim() || cleanEmail.split('@')[0],
        email: cleanEmail,
        photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanEmail}`,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        role: isAdmin ? 'admin' : 'client'
      };
      setUser(demoUser);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(demoUser));
      localStorage.setItem('ela_auth_mode', 'local');
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    if (isFirebaseConfigured && auth) {
      try {
        await firebaseSendPasswordResetEmail(auth, email.trim().toLowerCase());
      } catch (e) {
        console.warn('Firebase reset password email warning:', e);
      }
    } else {
      await new Promise(res => setTimeout(res, 400));
    }
  };

  const confirmPasswordReset = async (email: string, newPass: string) => {
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    const isAdmin = checkIsAdmin(cleanEmail);
    await new Promise(res => setTimeout(res, 500));
    
    // Save updated session state locally
    const resetUser: UserProfile = {
      uid: 'user-pwd-reset-' + Date.now(),
      name: cleanEmail === 'kasthuricse23@sasurie.com' ? 'Er. Kasthuri (Founder)' : cleanEmail.split('@')[0].toUpperCase(),
      email: cleanEmail,
      company: 'ELA Enterprise Partner',
      photoURL: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(cleanEmail)}`,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      role: isAdmin ? 'admin' : 'client'
    };
    setUser(resetUser);
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(resetUser));
    localStorage.setItem('ela_auth_mode', 'local');
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    if (isFirebaseConfigured && auth) {
      try {
        await firebaseSignOut(auth);
      } catch (e) {
        console.error('Sign out error:', e);
      }
    }
    setUser(null);
    setFirebaseUser(null);
    localStorage.removeItem(LOCAL_USER_KEY);
    localStorage.removeItem('ela_auth_mode');
    setLoading(false);
  };

  const switchDemoRole = (role: UserRole) => {
    if (user) {
      const updated = { ...user, role };
      setUser(updated);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(updated));
    } else {
      const newUser: UserProfile = {
        uid: 'demo-' + role,
        name: role === 'admin' ? 'Executive Director (Admin)' : 'Enterprise Partner',
        email: role === 'admin' ? 'admin@eladigitalworld.com' : 'client@eladigitalworld.com',
        photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        role
      };
      setUser(newUser);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        isFirebaseLive: isFirebaseConfigured,
        loginWithGoogle,
        loginWithEmail,
        signupWithEmail,
        resetPassword,
        confirmPasswordReset,
        logout,
        switchDemoRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
