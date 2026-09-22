import { ServiceItem, ProjectItem, TestimonialItem, BlogPostItem, LeadItem, ContactRequest } from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    name: 'Digital Marketing',
    shortDescription: 'High-impact omni-channel campaigns engineered to scale brand resonance and customer acquisition.',
    fullDescription: 'Comprehensive digital marketing that blends data science, consumer psychology, and algorithmic ad optimization across search, social, display, and programmatic networks to deliver undeniable ROI.',
    category: 'Marketing',
    icon: 'TrendingUp',
    benefits: ['Multi-channel ad attribution', 'High conversion funnels', 'Real-time performance tracking', 'Predictive budget allocation'],
    deliverables: ['Full campaign architecture', 'Creative A/B testing matrix', 'Weekly KPI performance reports', 'Dedicated account manager'],
    popular: true
  },
  {
    id: 'srv-2',
    name: 'Web Development',
    shortDescription: 'Ultra-fast, futuristic web platforms, enterprise WebApps, and high-converting modern digital hubs.',
    fullDescription: 'We engineer bespoke digital experiences with cutting-edge frameworks (React, Next.js, Node.js, Three.js). High-speed performance, immaculate responsiveness, and seamless backend integrations tailored for enterprise scalability.',
    category: 'Development',
    icon: 'Code2',
    benefits: ['Sub-second load times', 'Lighthouse 95+ score', 'Scalable cloud infrastructure', 'Mobile-first responsive UX'],
    deliverables: ['Custom frontend & backend', 'CMS integration', 'API integrations', 'Security audits & SSL deployment'],
    popular: true
  },
  {
    id: 'srv-3',
    name: 'Social Media Marketing',
    shortDescription: 'Viral narrative architecture and brand authority building across Instagram, LinkedIn, YouTube, and X.',
    fullDescription: 'Transform passive followers into passionate brand advocates through cinematic video production, hyper-targeted narrative strategy, and proactive community engagement.',
    category: 'Marketing',
    icon: 'Share2',
    benefits: ['Organic reach expansion', 'Community trust & engagement', 'Consistent brand voice', 'Trend-capitalization system'],
    deliverables: ['Monthly content calendar', 'Short-form video reels & graphics', 'Community management', 'Influencer outreach strategy']
  },
  {
    id: 'srv-4',
    name: 'Meta Ads',
    shortDescription: 'Laser-targeted Facebook & Instagram advertising engineered for explosive ROAS and customer capture.',
    fullDescription: 'High-converting creatives, advanced custom & lookalike audiences, Conversions API setup, and machine-learning driven bid optimization that consistently outbids competitors at lower CPA.',
    category: 'Paid Media',
    icon: 'Target',
    benefits: ['Guaranteed CPA reduction', 'Dynamic product retargeting', 'Creative fatigue mitigation', 'CAPI server-side tracking'],
    deliverables: ['Full Meta Business setup', 'Creative variation production', 'Daily bid management', 'Live analytics dashboard']
  },
  {
    id: 'srv-5',
    name: 'SEO (Search Engine Optimization)',
    shortDescription: 'Dominant first-page Google rankings through technical precision, entity authority, and high-intent keyword mapping.',
    fullDescription: 'Full-spectrum search dominance: programmatic SEO, technical crawl optimization, semantic entity clustering, high-tier backlink acquisition, and local search dominance.',
    category: 'Organic Growth',
    icon: 'Search',
    benefits: ['Compounding organic traffic', 'Top rankings for high-ticket searches', 'Sustainable lead acquisition', 'Technical health 98%+'],
    deliverables: ['Comprehensive SEO audit', 'Core Web Vitals tuning', 'Semantic content strategy', 'Backlink outreach reports']
  },
  {
    id: 'srv-6',
    name: 'Branding & Creative Design',
    shortDescription: 'Futuristic visual identities, 3D design systems, and unforgettable brand design language.',
    fullDescription: 'We sculpt iconic visual worlds that position your company as the undeniable market leader. From 3D logos to comprehensive design systems, packaging, and digital style guides.',
    category: 'Design',
    icon: 'Palette',
    benefits: ['Distinct market positioning', 'Cohesive visual identity', 'Elevated perceived value', 'Multi-format design assets'],
    deliverables: ['Brand guidelines & typography', 'Vector & 3D logo suites', 'Brand collateral & deck templates', 'Iconography sets']
  },
  {
    id: 'srv-7',
    name: 'AI Solutions',
    shortDescription: 'Custom AI agents, intelligent business workflows, LLM integration, and generative pipeline automation.',
    fullDescription: 'Infuse artificial intelligence into the core of your business. From customer service autonomous agents to predictive inventory models, automated content engines, and custom model fine-tuning.',
    category: 'Artificial Intelligence',
    icon: 'Cpu',
    benefits: ['80% operational cost reduction', '24/7 intelligent task handling', 'Predictive business intelligence', 'Custom proprietary models'],
    deliverables: ['AI agent architecture', 'API connection pipelines', 'Custom prompt engineering', 'Staff training & safety safeguards'],
    popular: true
  },
  {
    id: 'srv-8',
    name: 'WhatsApp Automation',
    shortDescription: 'Official WhatsApp Cloud API bots, automated lead nurturing, broadcast campaigns, and instant sales workflows.',
    fullDescription: 'Turn WhatsApp into your primary revenue generator. Instant auto-replies, multi-agent shared inboxes, interactive catalogs, payment gateways, and automated follow-ups connected directly to your CRM.',
    category: 'Automation',
    icon: 'MessageSquare',
    benefits: ['98% open rate on messages', 'Instant lead response under 5s', 'Automated sales pipelines', 'Seamless CRM synchronization'],
    deliverables: ['Official Meta WhatsApp API setup', 'Custom interactive flow bot', 'Broadcast campaign templates', 'Team training']
  },
  {
    id: 'srv-9',
    name: 'Lead Generation',
    shortDescription: 'High-intent B2B and B2C qualified lead engines that fill your sales pipeline with ready-to-buy prospects.',
    fullDescription: 'Bespoke lead acquisition engines that combine interactive quizzes, gated intelligence reports, hyper-targeted landing funnels, and automated qualification scoring.',
    category: 'Growth',
    icon: 'Flame',
    benefits: ['Predictable pipeline velocity', 'Pre-qualified buyers only', 'Zero ad budget wastage', 'Integrated calendar booking'],
    deliverables: ['High-converting landing pages', 'Lead magnet assets', 'Email drip sequences', 'Live CRM lead feeds']
  },
  {
    id: 'srv-10',
    name: 'Business Growth Strategy',
    shortDescription: 'Holistic digital transformation, pricing strategy, market expansion, and unit economic optimization.',
    fullDescription: 'Executive-level strategic consulting for scale-ups and established enterprises. We deconstruct your entire business model, identify growth bottlenecks, and implement high-leverage digital vectors.',
    category: 'Strategy',
    icon: 'Compass',
    benefits: ['Accelerated enterprise valuation', 'Clear 12-month growth roadmap', 'De-risked market expansions', 'Optimized LTV/CAC ratios'],
    deliverables: ['Strategic Growth Blueprint', 'Quarterly execution sprints', 'Competitive intelligence analysis', 'Bi-weekly advisory calls']
  }
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  // --- WEBSITES (4 Examples) ---
  {
    id: 'proj-1',
    name: 'Nexura FinTech Ecosystem',
    category: 'Websites',
    description: 'Next-generation institutional wealth management portal with biometric auth and sub-millisecond trading UX.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'Chart.js'],
    results: ['$42M processed in Q1', '4.9/5 user satisfaction score', '<150ms latency globally'],
    client: 'Nexura Capital Partners',
    year: '2025',
    featured: true
  },
  {
    id: 'proj-2',
    name: 'CyberPulse Security Portal',
    category: 'Websites',
    description: 'Futuristic zero-trust cybersecurity threat monitoring platform with dark mode real-time particle radar.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React', 'D3.js', 'WebAudio', 'Tailwind', 'Express'],
    results: ['Over 10M packets analyzed daily', 'Zero false positive breaches', 'Enterprise adoption by Fortune 500'],
    client: 'CyberPulse Systems',
    year: '2026',
    featured: false
  },
  {
    id: 'proj-3',
    name: 'Solaria Luxury Real Estate 3D Showcase',
    category: 'Websites',
    description: 'Immersive spatial architectural tours with dynamic sun angles, 3D interactive floor plans and instant booking.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Three.js', 'WebGL Shaders', 'React', 'GSAP', 'Tailwind'],
    results: ['340% increase in dwell time', '$18.5M penthouse pre-sold', 'Awwwards Site of the Day'],
    client: 'Solaria Residences Monaco',
    year: '2026',
    featured: true
  },
  {
    id: 'proj-4',
    name: 'Apex Global Logistics Fleet Hub',
    category: 'Websites',
    description: 'Real-time global freight tracking with satellite telemetry, predictive route forecasting, and responsive PWA.',
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Next.js', 'Mapbox GL', 'Node.js', 'TypeScript', 'Tailwind'],
    results: ['Tracking 15,000 vessels live', '28% reduction in dispatch lag', '99.99% system availability'],
    client: 'Apex Intermodal Global',
    year: '2025',
    featured: false
  },

  // --- MARKETING (4 Examples) ---
  {
    id: 'proj-5',
    name: 'HyperScale Meta Ads Scaling',
    category: 'Marketing',
    description: 'Full-funnel direct response campaign scaling a direct-to-consumer luxury brand across North America and APAC.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Meta Conversions API', 'Google Ads', 'Klaviyo', 'Looker Studio'],
    results: ['6.4x Return on Ad Spend (ROAS)', '340,000+ new verified buyers', '$8.4M gross revenue generated'],
    client: 'Veloce Luxury Gear',
    year: '2025',
    featured: true
  },
  {
    id: 'proj-6',
    name: 'Zenith Health OmniChannel Blitz',
    category: 'Marketing',
    description: 'Integrated digital acquisition driving massive patient growth across Google Search, YouTube Shorts, and Meta Advantage+.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Google Ads Search', 'Performance Max', 'Meta Ads Manager', 'GA4 BigQuery'],
    results: ['340% MRR expansion in 90 days', 'CPA reduced by 44%', '12,500+ telehealth consultations booked'],
    client: 'Zenith TeleHealth',
    year: '2026',
    featured: true
  },
  {
    id: 'proj-7',
    name: 'Aura Cosmetics Viral Launch Engine',
    category: 'Marketing',
    description: 'High-velocity TikTok Spark Ads and Meta Reels creator flywheel with automated dynamic creative testing.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    technologies: ['TikTok Ads Manager', 'Meta CAPI', 'Shopify Plus', 'Triple Whale'],
    results: ['4.8x Blended ROAS', '180,000 new customers', 'Sold out initial batch in 48 hours'],
    client: 'Aura Glow Cosmetics',
    year: '2025',
    featured: false
  },
  {
    id: 'proj-8',
    name: 'Vanguard Enterprise Account Acquisition',
    category: 'Marketing',
    description: 'Precision account-based marketing (ABM) targeting C-level executives for multi-million dollar SaaS infrastructure contracts.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    technologies: ['LinkedIn Campaign Manager', 'HubSpot ABM', 'Clearbit', 'Direct Mail Automation'],
    results: ['$14.2M closed qualified pipeline', '62% C-suite open rate', '23 Fortune 1000 contract wins'],
    client: 'Vanguard Cloud Systems',
    year: '2026',
    featured: false
  },

  // --- BRANDING (4 Examples) ---
  {
    id: 'proj-9',
    name: 'Sovereign Watchmaker Identity',
    category: 'Branding',
    description: 'Complete 3D visual language, brand manifesto, physical packaging, and holographic web boutique for horology atelier.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Blender 3D', 'Three.js', 'Figma', 'WebGL Shaders'],
    results: ['Red Dot Design Award Nominee', '100% pre-order sellout in 72 hrs', '350k social media impressions'],
    client: 'Krono Sovereign Switzerland',
    year: '2026',
    featured: true
  },
  {
    id: 'proj-10',
    name: 'Aethelgard Private Jet Brand System',
    category: 'Branding',
    description: 'Dark luxury corporate identity, bespoke typography, livery aerodynamics graphics, and tactile VIP print collateral.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Vector Crafting', 'Figma Tokens', 'Adobe InDesign', 'Cinema 4D'],
    results: ['Charter bookings doubled in year 1', 'Elevated charter seat pricing +40%', 'Unanimous VIP client praise'],
    client: 'Aethelgard Aviation Zurich',
    year: '2025',
    featured: true
  },
  {
    id: 'proj-11',
    name: 'Kavala Botanical Organics Identity',
    category: 'Branding',
    description: 'Eco-luxury cosmetic brand world with minimalist embossed foil packaging, earthy palettes, and retail guidelines.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Packaging 3D Render', 'Typography Suite', 'Sustainable Materials R&D'],
    results: ['Global Sephora placement secured', 'Featured in Vogue & Elle', '100% biodegradable luxury certified'],
    client: 'Kavala Botanics France',
    year: '2025',
    featured: false
  },
  {
    id: 'proj-12',
    name: 'Nexus Quantum Generative Identity',
    category: 'Branding',
    description: 'Algorithmic dynamic logo system that shifts with live quantum telemetry, paired with cyber dark UI guidelines.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Generative SVG Algorithms', 'Figma Design System', 'WebGL Canvas'],
    results: ['Featured in TechCrunch Brand Index', '$65M Series B funding announced', 'Iconic developer mindshare'],
    client: 'Nexus Quantum Labs',
    year: '2026',
    featured: false
  },

  // --- AI (4 Examples) ---
  {
    id: 'proj-13',
    name: 'Aetheris Global AI Cloud',
    category: 'AI',
    description: 'Autonomous cloud infrastructure orchestration portal with generative self-healing clusters and 3D telemetry.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React', 'Three.js', 'Python', 'FastAPI', 'Gemini AI'],
    results: ['+480% processing throughput', '99.99% automated uptime', '$1.2M saved in compute costs'],
    client: 'Aetheris Labs Inc.',
    year: '2026',
    featured: true
  },
  {
    id: 'proj-14',
    name: 'NeuroMed Multimodal Diagnostic Assistant',
    category: 'AI',
    description: 'Vision-language clinical AI agent assisting radiologists with preliminary scan annotations and rapid anomaly triage.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
    technologies: ['PyTorch', 'DICOM Web', 'Gemini Vision', 'FastAPI', 'React'],
    results: ['3.2 hours saved per radiologist daily', '99.4% concordance rate', 'HIPAA & GDPR fully certified'],
    client: 'NeuroMed Healthcare Group',
    year: '2026',
    featured: true
  },
  {
    id: 'proj-15',
    name: 'CogniScale Enterprise Knowledge RAG',
    category: 'AI',
    description: 'Proprietary enterprise retrieval-augmented generation engine unifying 200,000 corporate documents into an instant query agent.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Vector DB', 'LangChain', 'FastAPI', 'Hybrid Semantic Search'],
    results: ['Instant 0.8s internal search', '92% reduction in support escalation', '10,000+ daily internal queries'],
    client: 'OmniCorp Industrial',
    year: '2025',
    featured: false
  },
  {
    id: 'proj-16',
    name: 'Synthetix Multilingual Video Localization',
    category: 'AI',
    description: 'End-to-end generative AI pipeline translating enterprise video training modules into 24 native languages with synchronized lip movements.',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Neural Voice Synthesis', 'Wav2Lip Neural Shaders', 'Gemini Translate'],
    results: ['1,000+ training modules converted', '85% production cost savings', 'Global workforce 100% compliant'],
    client: 'Global Logistics Academy',
    year: '2026',
    featured: false
  },

  // --- AUTOMATION (4 Examples) ---
  {
    id: 'proj-17',
    name: 'OmniFlow WhatsApp CRM Engine',
    category: 'Automation',
    description: 'Enterprise WhatsApp conversational commerce bot automating end-to-end product sales and support for 1M+ users.',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=1200&q=80',
    technologies: ['WhatsApp Cloud API', 'Node.js', 'Firestore', 'Webhooks'],
    results: ['84% inquiries resolved autonomously', '4.2x faster ticket closing', '38% conversion via WhatsApp cart'],
    client: 'Pan-Asian Retail Group',
    year: '2025',
    featured: true
  },
  {
    id: 'proj-18',
    name: 'ZeroTouch ERP & Ledger Reconciliation',
    category: 'Automation',
    description: 'Autonomous financial workflow reconciling thousands of multi-currency transactions across Stripe, Razorpay, SAP, and QuickBooks.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    technologies: ['n8n Workflow Engine', 'SAP OData API', 'PostgreSQL', 'Stripe Connect'],
    results: ['Reconciling 50,000 records daily', 'Zero human calculation errors', '35 hours saved per finance cycle'],
    client: 'TerraPay Financial Services',
    year: '2026',
    featured: true
  },
  {
    id: 'proj-19',
    name: 'SwiftOnboard Client & HR Lifecycle Bot',
    category: 'Automation',
    description: 'Self-serve onboarding automation handling KYC identity checks, dynamic contract generation, NDA signatures, and team workspace provisioning.',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    technologies: ['DocuSign API', 'Meta Cloud API', 'Zapier Enterprise', 'Slack Webhooks'],
    results: ['Onboarding cycle cut from 4 days to 9 mins', '100% document compliance audit rate', 'Saved 12 FTE administrative hours'],
    client: 'Horizon Talent Solutions',
    year: '2025',
    featured: false
  },
  {
    id: 'proj-20',
    name: 'RevVelocity Sub-15s Inbound Lead Router',
    category: 'Automation',
    description: 'Ultra-fast intent enrichment engine: when a prospective buyer submits an inquiry, data is enriched and routed to the top sales executive within 15 seconds.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Clearbit API', 'Twilio Voice Alerts', 'HubSpot Workflows', 'WhatsApp Gateway'],
    results: ['Average response time: 14.8 seconds', 'Lead qualification rate up 74%', '3.1x increase in booked demos'],
    client: 'Kestrel Cloud Security',
    year: '2026',
    featured: false
  }
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    clientName: 'Vikramaditya Sengupta',
    company: 'Apex Horizon Ventures',
    role: 'Chief Technology Officer',
    rating: 5,
    testimonial: 'ELA Digital World completely shattered our expectations. Their 3D interactive web architecture and AI automation reduced our client onboarding time by 70% while tripling inbound organic leads. They are not just an agency; they are strategic growth partners.',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    projectType: 'Web Development & AI'
  },
  {
    id: 'test-2',
    clientName: 'Elena Rostova',
    company: 'Veloce Global Media',
    role: 'Head of Growth Marketing',
    rating: 5,
    testimonial: 'Their Meta ads management and automated WhatsApp funnels produced an astonishing 6.4x ROAS in just 60 days. The level of design sophistication, technical precision, and relentless communication is unheard of in the industry.',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    projectType: 'Paid Media & WhatsApp'
  },
  {
    id: 'test-3',
    clientName: 'Marcus Thorne',
    company: 'Krono Horology Switzerland',
    role: 'Founder & CEO',
    rating: 5,
    testimonial: 'The branding and 3D web experience designed by ELA Digital World enabled us to pre-sell our entire timepiece collection in under 72 hours. Their deep understanding of dark luxury aesthetics and futuristic UI is world-class.',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    projectType: 'Branding & 3D Interactive'
  },
  {
    id: 'test-4',
    clientName: 'Dr. Aarav Patel',
    company: 'BioSynapse Diagnostics',
    role: 'Managing Director',
    rating: 5,
    testimonial: 'From our search engine dominance to the enterprise-grade automated patient consultation workflows on WhatsApp, ELA Digital World has built an untouchable competitive advantage for our clinics.',
    profileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    projectType: 'SEO & Automation'
  }
];

export const INITIAL_BLOGS: BlogPostItem[] = [
  // --- AI MARKETING (3 Articles) ---
  {
    id: 'blog-1',
    title: 'How Generative AI Agents are Revolutionizing High-Ticket B2B Lead Generation in 2026',
    slug: 'ai-agents-b2b-lead-generation-2026',
    excerpt: 'Explore how autonomous multi-agent pipelines qualify, engage, and schedule enterprise meetings without manual sales friction.',
    content: `Artificial Intelligence has moved past simple chatbots into full-stack autonomous agency. Modern digital growth engines now deploy cognitive AI agents capable of contextual reasoning, CRM synchronization, and multi-channel hyper-personalized outreach.

### The Shift to Autonomous Inbound Qualification
Traditional forms lose up to 60% of potential prospects due to slow follow-up cycles. By deploying intelligent conversational agents across web portals and WhatsApp API pipelines, modern brands engage leads within 4 seconds of intent detection.

### Key Performance Multipliers
1. **Zero-Latency Response:** Prospects are engaged while their buying intent is at peak.
2. **Dynamic Knowledge Retrieval:** RAG-enabled agents answer complex proprietary product queries accurately.
3. **Automated Calendar Synchronization:** Leads are qualified and booked directly into sales team calendars.

At ELA Digital World, we combine machine learning intelligence with bespoke branding to make every automated touchpoint feel empathetic, authoritative, and irresistible.`,
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    category: 'AI Marketing',
    readTime: '6 min read',
    author: {
      name: 'E. L. Anand',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      role: 'Principal AI Architect'
    },
    tags: ['AI Marketing', 'Lead Generation', 'Automation', 'B2B Growth'],
    publishedAt: '2026-03-15',
    featured: true
  },
  {
    id: 'blog-2',
    title: 'Predictive Customer Lifetime Value: Training Custom AI Models on First-Party CRM Data',
    slug: 'predictive-clv-custom-ai-models-crm',
    excerpt: 'How machine learning algorithms forecast high-value repeat purchases and identify churning clients 60 days before they cancel.',
    content: `Third-party cookies are gone, but first-party behavioral telemetry is more valuable than ever. By running predictive regression algorithms across customer purchase histories, companies can preemptively intervene with hyper-personalized offers.

### Algorithmic Retention Architecture
- Churn risk scoring updated nightly
- Automated VIP perks triggered upon intent scoring spikes
- Budget reallocation toward users in high propensity-to-buy deciles

Clients utilizing our ELA AI Marketing infrastructure experienced a 42% decrease in churn and a 28% increase in 90-day repeat order value.`,
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    category: 'AI Marketing',
    readTime: '7 min read',
    author: {
      name: 'Dr. Aarav Patel',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      role: 'Head of Data Science'
    },
    tags: ['AI Marketing', 'Predictive Analytics', 'Customer Retention', 'Machine Learning'],
    publishedAt: '2026-03-08',
    featured: false
  },
  {
    id: 'blog-3',
    title: 'Dynamic Creative Optimization: Algorithmic Video & Copy Generation at Enterprise Scale',
    slug: 'dynamic-creative-optimization-algorithmic-scale',
    excerpt: 'Generating 500 personalized ad variants weekly using multimodal LLMs to systematically eliminate creative ad fatigue.',
    content: `Creative fatigue is the number one destroyer of paid advertising profitability. When the algorithm runs out of fresh stimuli, Cost Per Acquisition (CPA) spikes exponentially.

### The Automated Creative Engine
By coupling LLMs with automated rendering pipelines (Remotion, Canvas APIs, and voice synthesis), our agency creates modular video templates where hooks, b-roll sequences, and calls-to-action are generated dynamically.

### What the Data Proves
- 4.2x longer lifespan per core campaign angle
- 67% reduction in manual design and copywriting hours
- Continuously climbing ROAS across Meta Advantage+ and TikTok catalogs`,
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    category: 'AI Marketing',
    readTime: '5 min read',
    author: {
      name: 'Siddharth Varma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Senior Media Director'
    },
    tags: ['AI Marketing', 'Meta Ads', 'Creative Flywheel', 'Generative Media'],
    publishedAt: '2026-02-22',
    featured: false
  },

  // --- WEB ENGINEERING (3 Articles) ---
  {
    id: 'blog-4',
    title: 'The Psychology of 3D Web Experiences: Why Immersive Design Converts 3x Better',
    slug: 'psychology-of-3d-web-experiences-conversion',
    excerpt: 'Why static flat design is losing ground to spatial web interactions, Three.js shaders, and tactile micro-animations.',
    content: `Users make subconscious aesthetic judgements within 50 milliseconds of landing on your digital domain. In an era saturated with commoditized templates, sensory depth is the ultimate status symbol.

### The Spatial Engagement Advantage
When visitors interact with dynamic 3D geometry, interactive lighting, and physics-aware particles, cognitive absorption increases significantly. Time-on-page metrics double, and brand credibility soars.

### Performance Without Compromise
Immersive 3D experiences must not come at the expense of speed. By utilizing progressive asset loading, instanced meshes, and WebGL shader optimization, ELA Digital World achieves 60fps animations alongside sub-second initial load speeds.`,
    coverImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    category: 'Web Engineering',
    readTime: '5 min read',
    author: {
      name: 'Kavitha Raman',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      role: 'Head of Creative Engineering'
    },
    tags: ['Web Engineering', 'Three.js', 'UI/UX Design', 'WebGL'],
    publishedAt: '2026-02-28',
    featured: true
  },
  {
    id: 'blog-5',
    title: 'Next-Gen Micro-Frontend Architectures: Scaling Enterprise Web Applications Without Lag',
    slug: 'micro-frontend-enterprise-web-architectures',
    excerpt: 'How module federation, edge hydration, and decoupled micro-services keep complex web portals responsive under million-user traffic surges.',
    content: `Monolithic web apps collapse under team growth and feature bloat. Web engineering leaders in 2026 rely on decoupled, federated micro-frontends to allow independent feature releases with zero downtime.

### Architectural Pillars
- **Zero-Bundle Hydration:** Islands architecture ensures interactive elements hydrate on-demand.
- **Edge Routing:** Assets and pre-rendered shells are served from edge worker nodes globally in under 20ms.
- **Strict TypeScript Contracts:** Strongly typed APIs prevent runtime communication discrepancies across teams.`,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    category: 'Web Engineering',
    readTime: '8 min read',
    author: {
      name: 'Vikramaditya Sengupta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Principal Systems Engineer'
    },
    tags: ['Web Engineering', 'React', 'Architecture', 'Performance'],
    publishedAt: '2026-02-10',
    featured: false
  },
  {
    id: 'blog-6',
    title: 'Building Zero-Trust Security into Modern Web Apps: Biometric Auth & WebAuthn Mastery',
    slug: 'zero-trust-webauthn-biometric-security-web',
    excerpt: 'Replacing fragile passwords with passkeys, WebAuthn cryptographic hardware keys, and resilient server-side sessions.',
    content: `Credential stuffing and phishing attacks cost enterprises billions. Passwords are mathematically obsolete. The modern web engineering standard is FIDO2 and WebAuthn.

### Implementation Checklist
1. Device-bound cryptographic credential pairs generated directly in browser hardware chips.
2. Server-side signature validation that never touches private keys.
3. Fallback seamless magic links and encrypted session rotation.

At ELA Digital World, every web application we engineer is fortified with military-grade zero-trust principles.`,
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    category: 'Web Engineering',
    readTime: '6 min read',
    author: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Cybersecurity Specialist'
    },
    tags: ['Web Engineering', 'WebAuthn', 'Zero-Trust', 'App Security'],
    publishedAt: '2026-01-28',
    featured: false
  },

  // --- PAID ACQUISITION (3 Articles) ---
  {
    id: 'blog-7',
    title: 'Meta Ads in 2026: Algorithmic Advantage, CAPI Signals, and Creative Flywheels',
    slug: 'meta-ads-algorithmic-advantage-2026',
    excerpt: 'Mastering the new Meta advertising paradigm: First-party server signals, dynamic creative testing, and scaling profitably.',
    content: `The modern Meta algorithm is no longer won by manual hyper-targeting. Today, machine learning algorithms thrive on expansive audiences paired with deep server-side telemetry and high-velocity creative variations.

### The Conversion API (CAPI) Mandate
Browser-based pixels now miss up to 35% of attribution events. Server-side event transmission guarantees clean signal delivery, unlocking the true predictive power of Meta's Andromeda bidding engine.`,
    coverImage: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1200&q=80',
    category: 'Paid Acquisition',
    readTime: '8 min read',
    author: {
      name: 'Siddharth Varma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Senior Paid Media Strategist'
    },
    tags: ['Paid Acquisition', 'Meta Ads', 'ROAS', 'Performance Marketing'],
    publishedAt: '2026-01-20',
    featured: false
  },
  {
    id: 'blog-8',
    title: 'Google Performance Max Blueprint: Maximizing High-Intent B2B Enterprise Conversions',
    slug: 'google-performance-max-blueprint-b2b',
    excerpt: 'How to tame Google PMax to bid strictly for high-value qualified accounts while blocking bot clicks and low-intent consumers.',
    content: `Performance Max can either be an uncontrollable budget sinkhole or the greatest lead driver in your company's history. The key lies in value-based offline conversion syncing.

### Negative Audience & Placement Fortification
- Uploading offline closed-won CRM deals back into Google Ads within 24 hours.
- Bidding up for accounts with verified buying committee signals.
- Excluding non-commercial display networks and mobile app click farms.

This blueprint allowed our enterprise clients to scale monthly ad spend to $150,000+ while driving CAC down by 38%.`,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    category: 'Paid Acquisition',
    readTime: '6 min read',
    author: {
      name: 'E. L. Anand',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      role: 'Growth Architect'
    },
    tags: ['Paid Acquisition', 'Google Ads', 'PMax', 'Enterprise B2B'],
    publishedAt: '2026-02-05',
    featured: false
  },
  {
    id: 'blog-9',
    title: 'Omni-Channel Retargeting Matrix: Closing the 97% Who Leave Without Converting',
    slug: 'omnichannel-retargeting-matrix-closing-leads',
    excerpt: 'Synchronizing programmatic display, Meta stories, and YouTube video reminders to build omnipresence without causing fatigue.',
    content: `Most companies blast the exact same banner ad at lost visitors for 30 straight days. This creates brand irritation, not conversions.

### The 3-Phase Value-First Sequencing
1. **Days 1–3 (Social Proof):** Case studies and customer video testimonials addressing initial doubt.
2. **Days 4–10 (Objection Destruction):** Deep breakdowns of implementation speed, pricing transparency, and ROI math.
3. **Days 11–21 (Scarcity & Direct Founder Offer):** Invitation to a direct strategy session with limited monthly availability.`,
    coverImage: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=1200&q=80',
    category: 'Paid Acquisition',
    readTime: '7 min read',
    author: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Performance Lead'
    },
    tags: ['Paid Acquisition', 'Retargeting', 'Conversion Optimization', 'Omnichannel'],
    publishedAt: '2026-02-18',
    featured: false
  },

  // --- AUTOMATION (3 Articles) ---
  {
    id: 'blog-10',
    title: 'WhatsApp Automation Mastery: Converting Casual Conversations into Compounding Revenue',
    slug: 'whatsapp-automation-mastery-revenue',
    excerpt: 'A comprehensive playbook on utilizing the official Meta WhatsApp Cloud API for automated nurturing and instantaneous sales.',
    content: `With a 98% open rate and 45% click-through rate, WhatsApp is the world's most intimate and potent direct communication channel. Yet, most businesses treat it as a sporadic notification tool.

### Building the Automated Conversational Funnel
By leveraging interactive buttons, dynamic catalog browsing, and CRM-connected webhooks, companies can guide prospective buyers from initial query to confirmed checkout directly inside WhatsApp chat.

### The ELA Digital World 8-Step Blueprint
- Instant trigger on website form submission
- AI qualification and intent categorization
- Automated custom video/proposal delivery
- One-click payment link generation
- Live human escalation for VIP deals`,
    coverImage: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1200&q=80',
    category: 'Automation',
    readTime: '7 min read',
    author: {
      name: 'E. L. Anand',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      role: 'Founder & Managing Director'
    },
    tags: ['Automation', 'WhatsApp Marketing', 'Sales Funnels', 'Meta API'],
    publishedAt: '2026-02-14',
    featured: true
  },
  {
    id: 'blog-11',
    title: 'The Autonomous Agency: Connecting n8n, Make, and Webhooks for Zero-Manual Data Entry',
    slug: 'autonomous-agency-n8n-make-webhooks-zero-manual',
    excerpt: 'Eliminating 25 hours of repetitive administrative tasks every week with self-hosted workflow automation.',
    content: `Every time a human team member copies information from a contact form into a spreadsheet, a calendar, or an email thread, efficiency dies.

### The Zero-Friction Webhook Architecture
- Instant capture from landing pages into encrypted Postgres databases.
- Automatic creation of Notion client workspaces and Slack dedicated channels.
- Real-time WhatsApp confirmation dispatching verified credentials to client stakeholders.

Free your highest-paid thinkers from low-leverage mechanical data entry.`,
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    category: 'Automation',
    readTime: '5 min read',
    author: {
      name: 'Kavitha Raman',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      role: 'Automation Architect'
    },
    tags: ['Automation', 'n8n', 'Webhooks', 'Business Operations'],
    publishedAt: '2026-01-15',
    featured: false
  },
  {
    id: 'blog-12',
    title: 'Automating the Sales Pipeline: Instant Lead Enrichment and Calendar Routing in Under 5 Seconds',
    slug: 'automating-sales-pipeline-instant-lead-enrichment',
    excerpt: 'How top revenue teams respond before the competitor even receives their internal email notification.',
    content: `Studies show that reaching out within 5 minutes increases conversion odds by 900%. Reaching out within 15 seconds makes closing almost inevitable.

### The Sub-Second Enrichment Pipeline
When a lead types their email, our API query looks up company headcount, revenue band, and tech stack in real time. High-value accounts immediately receive an interactive WhatsApp calendar link for an executive consultation.`,
    coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    category: 'Automation',
    readTime: '6 min read',
    author: {
      name: 'Siddharth Varma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Operations Consultant'
    },
    tags: ['Automation', 'Lead Enrichment', 'Sales Velocity', 'CRM'],
    publishedAt: '2026-03-01',
    featured: false
  },

  // --- SEARCH & SEO (3 Articles) ---
  {
    id: 'blog-13',
    title: 'Semantic Entity SEO: Dominating AI Overviews, SearchGPT, and Traditional Google Rankings',
    slug: 'semantic-entity-seo-ai-overviews-rankings',
    excerpt: 'How building interconnected knowledge graph schemas and authoritative topical clusters guarantees first-place AI citations.',
    content: `Google Search is no longer an index of strings; it is an index of entities. With AI Overviews and conversational LLMs answering queries natively, old-school keyword stuffing is dead.

### The Entity-First Playbook
1. **Schema Graph Networks:** JSON-LD structured data linking founders, products, and brand citations to Wikidata and Crunchbase nodes.
2. **Topical Completeness:** Answering every adjacent sub-question in comprehensive, scannable semantic hierarchies.
3. **Information Gain:** Publishing original proprietary research, benchmark charts, and unique datasets that AI engines must cite as canonical sources.`,
    coverImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
    category: 'Search & SEO',
    readTime: '7 min read',
    author: {
      name: 'E. L. Anand',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      role: 'Principal Search Architect'
    },
    tags: ['Search & SEO', 'Entity SEO', 'AI Overviews', 'Organic Dominance'],
    publishedAt: '2026-03-12',
    featured: true
  },
  {
    id: 'blog-14',
    title: 'Programmatic SEO Architecture: Generating 10,000 High-Ranking Intent Pages Automatically',
    slug: 'programmatic-seo-architecture-scale-traffic',
    excerpt: 'Building database-driven search content that captures long-tail transactional searches and brings 450k monthly organic visitors.',
    content: `Targeting individual broad keywords takes years. Programmatic SEO enables modern tech companies to systematically address every location, integration, or feature comparison across thousands of dynamic, high-quality URL routes.

### Maintaining Elite Quality at Scale
- Unique visual diagrams and dynamic comparisons on every generated page.
- Zero boilerplate duplicates: using intelligent templating and contextual datasets.
- Fast, static generation via React and Next.js for instant crawlability.`,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    category: 'Search & SEO',
    readTime: '6 min read',
    author: {
      name: 'Kavitha Raman',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      role: 'Technical SEO Director'
    },
    tags: ['Search & SEO', 'Programmatic SEO', 'Traffic Scaling', 'Indexing'],
    publishedAt: '2026-02-19',
    featured: false
  },
  {
    id: 'blog-15',
    title: 'Core Web Vitals & Technical Crawl Budget Optimization for Heavy 3D Web Portals',
    slug: 'core-web-vitals-technical-crawl-3d-portals',
    excerpt: 'How we achieve 98+ Lighthouse performance scores on WebGL and video-rich domains without stripping visual grandeur.',
    content: `A visually breathtaking 3D site is useless if it ranks on page 10 due to poor Largest Contentful Paint (LCP) or Interaction to Next Paint (INP).

### The ELA Digital World Speed Formula
- **Lazy Shader Compilation:** Initial DOM elements render in under 400ms while heavy WebGL assets stream asynchronously in the background.
- **Font Preloading & Subsetting:** Eliminating layout shifts (CLS < 0.01).
- **Edge Brotli Compression:** Minimizing byte payloads across global CDN points of presence.`,
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    category: 'Search & SEO',
    readTime: '5 min read',
    author: {
      name: 'Vikramaditya Sengupta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Web Systems Lead'
    },
    tags: ['Search & SEO', 'Core Web Vitals', 'PageSpeed', 'Lighthouse 95+'],
    publishedAt: '2026-01-12',
    featured: false
  },

  // --- BRAND STRATEGY (3 Articles) ---
  {
    id: 'blog-16',
    title: 'Dark Luxury Aesthetic: The Visual Philosophy That Commands 5x Higher Pricing Power',
    slug: 'dark-luxury-aesthetic-visual-philosophy-pricing',
    excerpt: 'Why elite technology ateliers and Swiss horology houses embrace deep midnight palettes, polished gold accents, and mathematical negative space.',
    content: `Bright, pastel, cartoonish illustrations signal cheap SaaS commodities. When enterprise buyers or high-net-worth individuals purchase transformative solutions, they look for visual gravity.

### The Anatomy of Dark Luxury Design
- **Deep Midnight Baselines (#030407 to #090C15):** High optical comfort that lets glowing accents pop with cinematic prestige.
- **Precision Metallic Accents:** Warm gold (#F59E0B) and amber gradients paired with laser-sharp borders (0.5px to 1px).
- **Monospaced Technical Telemetry:** Subtle data labels that communicate engineering rigor and unflinching capability.`,
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    category: 'Brand Strategy',
    readTime: '7 min read',
    author: {
      name: 'Marcus Thorne',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      role: 'Creative Brand Director'
    },
    tags: ['Brand Strategy', 'Dark Luxury', 'Aesthetics', 'Pricing Power'],
    publishedAt: '2026-03-04',
    featured: true
  },
  {
    id: 'blog-17',
    title: 'Narrative Architecture: Crafting an Unstoppable Value Proposition in Commoditized Markets',
    slug: 'narrative-architecture-unstoppable-value-proposition',
    excerpt: 'How to position your company as a singular Category of One rather than an interchangeable agency or vendor.',
    content: `If your website says "We build websites and manage ads", you are instantly price-shopped against bargain freelancers.

### Deconstructing the Category-Creating Narrative
1. **Identify the Undeniable Villain:** The obsolete status quo (e.g., slow agency retainers with zero accountability).
2. **Introduce the Paradigm Shift:** The new technological inevitable (autonomous AI acceleration + 3D spatial experiences).
3. **The Unreasonable Guarantee:** Aligning incentives where you only win when the client scales revenue exponentially.`,
    coverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    category: 'Brand Strategy',
    readTime: '6 min read',
    author: {
      name: 'E. L. Anand',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      role: 'Managing Director'
    },
    tags: ['Brand Strategy', 'Positioning', 'Messaging', 'Market Dominance'],
    publishedAt: '2026-02-12',
    featured: false
  },
  {
    id: 'blog-18',
    title: 'The Design System Playbook: Unifying Global Brand Identity Across 20+ Digital Touchpoints',
    slug: 'design-system-playbook-unifying-brand-identity',
    excerpt: 'Creating atomic design tokens, typography scales, and motion curves that keep your digital presence pristine at any scale.',
    content: `Brand erosion happens silently: an unapproved button radius here, an inconsistent font weight there, an off-brand color in a pitch deck.

### The Master Token Hierarchy
- **Foundations:** Strict HSB palette limits, mathematically derived corner radiuses (Inner Radius = Outer Radius - Padding).
- **Components:** Reusable React and Figma components with pre-baked accessibility states and hover animations.
- **Governance:** Automatic CI/CD linting that rejects non-conforming design tokens before they reach production.`,
    coverImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
    category: 'Brand Strategy',
    readTime: '8 min read',
    author: {
      name: 'Kavitha Raman',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      role: 'Brand Systems Architect'
    },
    tags: ['Brand Strategy', 'Design Systems', 'Figma Tokens', 'UI Consistency'],
    publishedAt: '2026-01-18',
    featured: false
  }
];

export const INITIAL_LEADS: LeadItem[] = [
  {
    id: 'lead-1',
    name: 'Rohit Sharma',
    email: 'rohit@techlumina.in',
    phone: '+919876543210',
    source: 'Website Hero Form',
    service: 'AI Solutions',
    status: 'In Discussion',
    notes: 'Requires enterprise WhatsApp AI agent for insurance claim verification.',
    budget: '$10,000 - $25,000',
    createdAt: '2026-03-18T10:20:00Z'
  },
  {
    id: 'lead-2',
    name: 'Sarah Jenkins',
    email: 'sarah.j@veritasretail.com',
    phone: '+14158902341',
    source: 'WhatsApp Floating Chat',
    service: 'Web Development',
    status: 'Proposal Sent',
    notes: 'Full brand revamp and React/Three.js flagship e-commerce redesign.',
    budget: '$25,000 - $50,000',
    createdAt: '2026-03-17T14:45:00Z'
  },
  {
    id: 'lead-3',
    name: 'Ananya Deshmukh',
    email: 'ananya@zenithgrowth.co',
    phone: '+919988776655',
    source: 'Contact Page Form',
    service: 'Digital Marketing',
    status: 'Contacted',
    notes: 'Meta Ads & Search SEO campaign for fast-scaling wellness brand.',
    budget: '$5,000 - $10,000',
    createdAt: '2026-03-16T09:12:00Z'
  },
  {
    id: 'lead-4',
    name: 'Carlos Mendez',
    email: 'carlos@ibexfintech.com',
    phone: '+34612345678',
    source: 'Solutions Page Form',
    service: 'WhatsApp Automation',
    status: 'New',
    notes: 'Automated loan status notifications and customer document collection.',
    budget: '$10,000 - $25,000',
    createdAt: '2026-03-19T08:30:00Z'
  }
];

export const INITIAL_CONTACT_REQUESTS: ContactRequest[] = [
  {
    id: 'req-1',
    name: 'Karthik Raja',
    email: 'karthik@innovatix.org',
    phone: '+918765432198',
    company: 'Innovatix Health',
    service: 'AI Solutions',
    budget: '$10,000 - $25,000',
    message: 'We want to integrate an autonomous customer triage assistant and WhatsApp automated appointments system.',
    status: 'new',
    createdAt: '2026-03-19T11:05:00Z',
    viaWhatsApp: true
  },
  {
    id: 'req-2',
    name: 'Meera Nambiar',
    email: 'meera@celestialjewels.in',
    phone: '+919811223344',
    company: 'Celestial Gems',
    service: 'Branding & Creative Design',
    budget: '$5,000 - $10,000',
    message: 'Looking for a futuristic dark luxury branding identity, 3D product showcase and high-converting website.',
    status: 'reviewed',
    createdAt: '2026-03-18T16:30:00Z',
    viaWhatsApp: true
  }
];
