import { 
  isFirebaseConfigured, 
  db, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc 
} from './firebase';
import { 
  UserProfile, 
  ProjectItem, 
  ServiceItem, 
  ContactRequest, 
  LeadItem, 
  TestimonialItem, 
  BlogPostItem, 
  NewsletterSubscriber, 
  LeadStatus 
} from '../types';
import { 
  INITIAL_SERVICES, 
  INITIAL_PROJECTS, 
  INITIAL_TESTIMONIALS, 
  INITIAL_BLOGS, 
  INITIAL_LEADS, 
  INITIAL_CONTACT_REQUESTS 
} from '../data/seedData';

// Local storage keys
const STORAGE_KEYS = {
  SERVICES: 'ela_services_v1',
  PROJECTS: 'ela_projects_v1',
  TESTIMONIALS: 'ela_testimonials_v1',
  BLOGS: 'ela_blogs_v1',
  LEADS: 'ela_leads_v1',
  CONTACT_REQUESTS: 'ela_contact_requests_v1',
  SUBSCRIBERS: 'ela_subscribers_v1',
  USERS: 'ela_users_v1'
};

// Generic local helper
function getLocal<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    if (!data) return fallback;
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Local storage write failed:', e);
  }
}

// Initial hydration if empty
function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
    setLocal(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    setLocal(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)) {
    setLocal(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.BLOGS)) {
    setLocal(STORAGE_KEYS.BLOGS, INITIAL_BLOGS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.LEADS)) {
    setLocal(STORAGE_KEYS.LEADS, INITIAL_LEADS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.CONTACT_REQUESTS)) {
    setLocal(STORAGE_KEYS.CONTACT_REQUESTS, INITIAL_CONTACT_REQUESTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS)) {
    setLocal(STORAGE_KEYS.SUBSCRIBERS, [
      { id: 'sub-1', name: 'Arun Kumar', email: 'arun@digitalventures.in', createdAt: '2026-03-10' },
      { id: 'sub-2', name: 'Priya Sundaram', email: 'priya@apexbrand.com', createdAt: '2026-03-12' }
    ]);
  }
}

initializeStorage();

// SERVICES CRUD
export async function getServices(): Promise<ServiceItem[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'services'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() })) as ServiceItem[];
      }
    } catch (err) {
      console.warn('Firestore getServices error, using local fallback:', err);
    }
  }
  return getLocal<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
}

export async function saveService(service: ServiceItem): Promise<void> {
  const current = getLocal<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  const exists = current.some(s => s.id === service.id);
  const updated = exists ? current.map(s => s.id === service.id ? service : s) : [service, ...current];
  setLocal(STORAGE_KEYS.SERVICES, updated);

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'services', service.id), service);
    } catch (e) {
      console.error('Firestore saveService error:', e);
    }
  }
}

export async function deleteService(id: string): Promise<void> {
  const current = getLocal<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  setLocal(STORAGE_KEYS.SERVICES, current.filter(s => s.id !== id));

  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'services', id));
    } catch (e) {
      console.error('Firestore deleteService error:', e);
    }
  }
}

// PROJECTS CRUD
export async function getProjects(): Promise<ProjectItem[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'projects'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() })) as ProjectItem[];
      }
    } catch (err) {
      console.warn('Firestore getProjects error, using local fallback:', err);
    }
  }
  return getLocal<ProjectItem[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
}

export async function saveProject(project: ProjectItem): Promise<void> {
  const current = getLocal<ProjectItem[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  const exists = current.some(p => p.id === project.id);
  const updated = exists ? current.map(p => p.id === project.id ? project : p) : [project, ...current];
  setLocal(STORAGE_KEYS.PROJECTS, updated);

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'projects', project.id), project);
    } catch (e) {
      console.error('Firestore saveProject error:', e);
    }
  }
}

export async function deleteProject(id: string): Promise<void> {
  const current = getLocal<ProjectItem[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  setLocal(STORAGE_KEYS.PROJECTS, current.filter(p => p.id !== id));

  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (e) {
      console.error('Firestore deleteProject error:', e);
    }
  }
}

export async function addProject(project: Omit<ProjectItem, 'id'>): Promise<ProjectItem> {
  const newProj: ProjectItem = {
    id: `proj-${Date.now()}`,
    ...project
  };
  await saveProject(newProj);
  return newProj;
}

// BLOGS CRUD
export async function getBlogPosts(): Promise<BlogPostItem[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'blog_posts'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() })) as BlogPostItem[];
      }
    } catch (err) {
      console.warn('Firestore getBlogPosts error, using local fallback:', err);
    }
  }
  return getLocal<BlogPostItem[]>(STORAGE_KEYS.BLOGS, INITIAL_BLOGS);
}

export async function saveBlogPost(post: BlogPostItem): Promise<void> {
  const current = getLocal<BlogPostItem[]>(STORAGE_KEYS.BLOGS, INITIAL_BLOGS);
  const exists = current.some(b => b.id === post.id);
  const updated = exists ? current.map(b => b.id === post.id ? post : b) : [post, ...current];
  setLocal(STORAGE_KEYS.BLOGS, updated);

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'blog_posts', post.id), post);
    } catch (e) {
      console.error('Firestore saveBlogPost error:', e);
    }
  }
}

export async function addBlogPost(post: Omit<BlogPostItem, 'id'>): Promise<BlogPostItem> {
  const newPost: BlogPostItem = {
    id: `blog-${Date.now()}`,
    ...post
  };
  await saveBlogPost(newPost);
  return newPost;
}

export async function deleteBlogPost(id: string): Promise<void> {
  const current = getLocal<BlogPostItem[]>(STORAGE_KEYS.BLOGS, INITIAL_BLOGS);
  setLocal(STORAGE_KEYS.BLOGS, current.filter(b => b.id !== id));

  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'blog_posts', id));
    } catch (e) {
      console.error('Firestore deleteBlogPost error:', e);
    }
  }
}

// CONTACT REQUESTS & LEADS
export async function submitContactRequest(data: Omit<ContactRequest, 'id' | 'status' | 'createdAt'>): Promise<ContactRequest> {
  const newReq: ContactRequest = {
    id: `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    ...data,
    status: 'new',
    createdAt: new Date().toISOString()
  };

  // Also auto-create a lead record for the admin CRM
  const newLead: LeadItem = {
    id: `lead-${Date.now()}`,
    name: data.name,
    email: data.email,
    phone: data.phone,
    source: 'Website Contact Form',
    service: data.service,
    status: 'New',
    budget: data.budget,
    notes: `Company: ${data.company || 'N/A'}. Details: ${data.message}`,
    createdAt: new Date().toISOString()
  };

  const currentReqs = getLocal<ContactRequest[]>(STORAGE_KEYS.CONTACT_REQUESTS, INITIAL_CONTACT_REQUESTS);
  setLocal(STORAGE_KEYS.CONTACT_REQUESTS, [newReq, ...currentReqs]);

  const currentLeads = getLocal<LeadItem[]>(STORAGE_KEYS.LEADS, INITIAL_LEADS);
  setLocal(STORAGE_KEYS.LEADS, [newLead, ...currentLeads]);

  if (isFirebaseConfigured && db) {
    // Asynchronous Cloud Firestore sync
    Promise.all([
      setDoc(doc(db, 'contact_requests', newReq.id), newReq),
      setDoc(doc(db, 'leads', newLead.id), newLead)
    ]).catch(e => {
      console.warn('Firestore async save notice:', e);
    });
  }

  return newReq;
}

export async function getContactRequests(): Promise<ContactRequest[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'contact_requests'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() })) as ContactRequest[];
      }
    } catch (e) {
      console.warn('Firestore getContactRequests error:', e);
    }
  }
  return getLocal<ContactRequest[]>(STORAGE_KEYS.CONTACT_REQUESTS, INITIAL_CONTACT_REQUESTS);
}

export async function getLeads(): Promise<LeadItem[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'leads'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() })) as LeadItem[];
      }
    } catch (e) {
      console.warn('Firestore getLeads error:', e);
    }
  }
  return getLocal<LeadItem[]>(STORAGE_KEYS.LEADS, INITIAL_LEADS);
}

export async function updateLeadStatus(id: string, status: LeadStatus, notes?: string): Promise<void> {
  const current = getLocal<LeadItem[]>(STORAGE_KEYS.LEADS, INITIAL_LEADS);
  const updated = current.map(lead => {
    if (lead.id === id) {
      return { 
        ...lead, 
        status, 
        notes: notes !== undefined ? notes : lead.notes 
      };
    }
    return lead;
  });
  setLocal(STORAGE_KEYS.LEADS, updated);

  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'leads', id), { status, ...(notes ? { notes } : {}) });
    } catch (e) {
      console.warn('Firestore updateLeadStatus error:', e);
    }
  }
}

export async function deleteLead(id: string): Promise<void> {
  const current = getLocal<LeadItem[]>(STORAGE_KEYS.LEADS, INITIAL_LEADS);
  setLocal(STORAGE_KEYS.LEADS, current.filter(l => l.id !== id));

  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'leads', id));
    } catch (e) {
      console.warn('Firestore deleteLead error:', e);
    }
  }
}

// NEWSLETTER
export async function submitNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  return subscribeNewsletter('Subscriber', email);
}

export async function getNewsletters(): Promise<NewsletterSubscriber[]> {
  return getNewsletterSubscribers();
}

export async function subscribeNewsletter(name: string, email: string): Promise<{ success: boolean; message: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const current = getLocal<NewsletterSubscriber[]>(STORAGE_KEYS.SUBSCRIBERS, []);

  const exists = current.some(sub => sub.email.toLowerCase() === cleanEmail);
  if (exists) {
    return { success: false, message: 'This email is already subscribed to our digital intelligence briefs.' };
  }

  const newSub: NewsletterSubscriber = {
    id: `sub-${Date.now()}`,
    name: name.trim() || 'Valued Subscriber',
    email: cleanEmail,
    createdAt: new Date().toISOString()
  };

  setLocal(STORAGE_KEYS.SUBSCRIBERS, [newSub, ...current]);

  if (isFirebaseConfigured && db) {
    try {
      await addDoc(collection(db, 'newsletter_subscribers'), newSub);
    } catch (e) {
      console.error('Firestore newsletter subscription error:', e);
    }
  }

  return { success: true, message: 'Welcome to ELA Digital World briefings! You are successfully subscribed.' };
}

export async function getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
  return getLocal<NewsletterSubscriber[]>(STORAGE_KEYS.SUBSCRIBERS, []);
}

// TESTIMONIALS
export async function getTestimonials(): Promise<TestimonialItem[]> {
  return getLocal<TestimonialItem[]>(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
}

export async function saveTestimonial(t: TestimonialItem): Promise<void> {
  const current = getLocal<TestimonialItem[]>(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
  const exists = current.some(item => item.id === t.id);
  const updated = exists ? current.map(item => item.id === t.id ? t : item) : [t, ...current];
  setLocal(STORAGE_KEYS.TESTIMONIALS, updated);
}
