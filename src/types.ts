export type UserRole = 'admin' | 'editor' | 'viewer' | 'client';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  company?: string;
  photoURL?: string;
  createdAt: string;
  lastLogin: string;
  role: UserRole;
}

export interface ServiceItem {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  icon: string;
  benefits: string[];
  deliverables: string[];
  popular?: boolean;
}

export interface ProjectItem {
  id: string;
  name: string;
  category: 'Websites' | 'Marketing' | 'Branding' | 'AI' | 'Automation';
  description: string;
  image: string;
  technologies: string[];
  results: string[];
  client: string;
  year: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  status: 'new' | 'reviewed' | 'contacted';
  createdAt: string;
  viaWhatsApp?: boolean;
}

export type LeadStatus = 'New' | 'Contacted' | 'In Discussion' | 'Proposal Sent' | 'Converted' | 'Closed' | 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';

export interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  service: string;
  status: LeadStatus;
  notes: string;
  company?: string;
  message?: string;
  budget?: string;
  createdAt: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  company: string;
  role: string;
  rating: number;
  testimonial: string;
  profileImage: string;
  projectType: string;
}

export interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  summary?: string;
  content: string;
  coverImage?: string;
  image?: string;
  category: string;
  readTime: string;
  author: string | {
    name: string;
    avatar: string;
    role: string;
  };
  tags?: string[];
  publishedAt: string;
  featured?: boolean;
}

export interface NewsletterSubscriber {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface GrowthMetric {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change: string;
  description: string;
}
