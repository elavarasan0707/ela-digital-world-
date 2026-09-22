import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import appletConfig from '../../firebase-applet-config.json';
import { 
  getAuth, 
  Auth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  Firestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';

// Validate Firebase API key format
const isValidFirebaseApiKey = (key?: string): boolean => {
  if (!key) return false;
  const trimmed = key.trim();
  if (
    trimmed === '' ||
    trimmed === 'MY_API_KEY' ||
    trimmed.includes('YOUR_') ||
    trimmed.includes('DUMMY') ||
    trimmed.includes('placeholder')
  ) {
    return false;
  }
  // Standard Google/Firebase Web API keys start with AIza and are at least 35 characters long
  return trimmed.startsWith('AIza') && trimmed.length >= 35;
};

// Check configuration from firebase-applet-config.json with fallback to environment variables
const firebaseConfig = {
  apiKey: (import.meta.env.VITE_FIREBASE_API_KEY || appletConfig.apiKey || '').trim(),
  authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || appletConfig.authDomain || '').trim(),
  projectId: (import.meta.env.VITE_FIREBASE_PROJECT_ID || appletConfig.projectId || '').trim(),
  storageBucket: (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || appletConfig.storageBucket || '').trim(),
  messagingSenderId: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || appletConfig.messagingSenderId || '').trim(),
  appId: (import.meta.env.VITE_FIREBASE_APP_ID || appletConfig.appId || '').trim()
};

const customDatabaseId = appletConfig.firestoreDatabaseId || undefined;

export const isFirebaseConfigured = Boolean(
  isValidFirebaseApiKey(firebaseConfig.apiKey) && 
  firebaseConfig.projectId && 
  !firebaseConfig.projectId.includes('YOUR_')
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let googleProvider: GoogleAuthProvider | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = customDatabaseId ? getFirestore(app, customDatabaseId) : getFirestore(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
    console.log('🔥 Google Cloud Firestore connected successfully with project:', firebaseConfig.projectId, 'database:', customDatabaseId || '(default)');
  } catch (error) {
    console.warn('Firebase initialization notice:', error);
  }
} else {
  console.info('ℹ️ Firebase credentials not yet supplied. Running in Offline-Ready / LocalSync Mode.');
}

export { 
  app, 
  auth, 
  db, 
  googleProvider,
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  firebaseSignOut,
  firebaseSendPasswordResetEmail,
  onAuthStateChanged,
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy 
};
export type { FirebaseUser };
export { firebaseConfig };
