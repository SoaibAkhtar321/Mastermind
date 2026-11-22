import {
  INTERVIEW_PROGRAM_NAME,
  siteConfig,
  getFilledSocialLinks,
  getProgramById,
  getSafeEmail,
  type FaqItem,
  type Lecturer,
  type ProgramItem,
} from '../data/siteConfig';
import { sanitizeExternalUrl } from './security';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export type SchemaWebPageType =
  | 'WebPage'
  | 'AboutPage'
  | 'ContactPage'
  | 'FAQPage'
  | 'ProfilePage'
  | 'CollectionPage';

export interface PageSeoMeta {
  path: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  schemas?: Record<string, unknown>[];
  robots?: string;
  pageType?: SchemaWebPageType;
}

export const DEFAULT_INDEX_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

export const NOINDEX_ROBOTS = 'noindex, follow';

export const ALL_INDEXABLE_ROUTES: { path: string; priority: string; changefreq: string }[] = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/spoken-english-classes-belagavi', priority: '0.9', changefreq: 'weekly' },
  { path: '/interview-mastery-personality-development-belagavi', priority: '0.9', changefreq: 'weekly' },
  { path: '/school-tuition-classes-6-to-10-belagavi', priority: '0.9', changefreq: 'weekly' },
  { path: '/be-bca-diploma-classes-belagavi', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/lecturers', priority: '0.8', changefreq: 'monthly' },
  ...siteConfig.lecturers.map((lecturer) => ({
    path: `/lecturers/${lecturer.id}`,
    priority: '0.7',
    changefreq: 'monthly',
  })),
  { path: '/faq', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.9', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.5', changefreq: 'yearly' },
  { path: '/terms-and-conditions', priority: '0.5', changefreq: 'yearly' },
  { path: '/data-rights', priority: '0.5', changefreq: 'yearly' },
];

export function resolveBaseUrl(): string {
  const configured = sanitizeExternalUrl(siteConfig.siteUrl);
  if (configured) {
    return configured.replace(/\/+$/, '');
  }

  // Server-side / build-time fallback (e.g., SITE_URL or APP_URL) when configured as HTTPS
  if (typeof process !== 'undefined' && process.env) {
    const envUrl = sanitizeExternalUrl(process.env.SITE_URL || process.env.APP_URL || '');
    if (envUrl) {
      return envUrl.replace(/\/+$/, '');
    }
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin.replace(/\/+$/, '');
  }

  return '';
}

export function resolveFullUrl(path: string, baseUrl?: string): string {
  const cleanBase = (baseUrl ?? resolveBaseUrl()).replace(/\/+$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (!cleanBase) {
    return cleanPath;
  }
  return cleanPath === '/' ? `${cleanBase}/` : `${cleanBase}${cleanPath}`;
}

export function buildOrganizationSchema(baseUrl?: string): Record<string, unknown> {
  const url = resolveFullUrl('/', baseUrl);
  const logoUrl = resolveFullUrl('/og-image.svg', baseUrl);
  const socialLinks = getFilledSocialLinks().map((item) => item.url);
  const safeEmail = getSafeEmail();

  const address: Record<string, unknown> = {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.landmark.trim()
      ? `${siteConfig.address.street}, ${siteConfig.address.landmark.trim()}`
      : siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.countryCode,
  };

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    name: siteConfig.name,
    slogan: siteConfig.tagline,
    description: siteConfig.canonicalDescription,
    telephone: siteConfig.phonesE164,
    address,
    areaServed: [
      {
        '@type': 'Country',
        name: 'India',
      },
      {
        '@type': 'City',
        name: siteConfig.address.city,
      },
      {
        '@type': 'AdministrativeArea',
        name: siteConfig.address.state,
      },
    ],
    knowsAbout: [
      'Spoken English Classes',
      'Online Spoken English Across India',
      INTERVIEW_PROGRAM_NAME,
      'Group Discussion and Mock Interviews',
      'Body Language and Communication Skills',
      'Classes 6th to 10th All Subjects',
      'CBSE Board Coaching',
      'ICSE Board Coaching',
      'KVS School Tuition',
      'Karnataka State Board Tuition',
      'B.E, B.Com and Diploma Core Subjects',
    ],
    employee: siteConfig.lecturers.map((lecturer) => {
      const profileUrl = resolveFullUrl(`/lecturers/${lecturer.id}`, baseUrl);
      return {
        '@type': 'Person',
        name: `${lecturer.name}, ${lecturer.qualification}`,
        jobTitle: lecturer.role,
        hasCredential: lecturer.qualification,
        ...(profileUrl.startsWith('http') ? { url: profileUrl } : {}),
      };
    }),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${siteConfig.name} Courses`,
      itemListElement: siteConfig.programs.map((program, idx) => {
        const courseUrl = resolveFullUrl(program.slug, baseUrl);
        return {
          '@type': 'ListItem',
          position: idx + 1,
          item: {
            '@type': 'Course',
            name: program.title,
            description: program.summary,
            ...(courseUrl.startsWith('http') ? { url: courseUrl } : {}),
          },
        };
      }),
    },
  };

  if (url.startsWith('http')) {
    schema['@id'] = `${url}#organization`;
    schema.url = url;
    schema.logo = logoUrl;
    schema.image = logoUrl;
  }

  if (safeEmail) {
    schema.email = safeEmail;
  }

  if (siteConfig.location.latitude.trim() && siteConfig.location.longitude.trim()) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: Number(siteConfig.location.latitude.trim()),
      longitude: Number(siteConfig.location.longitude.trim()),
    };
  }

  if (siteConfig.openingHoursSchema.length > 0) {
    schema.openingHours = siteConfig.openingHoursSchema;
  } else if (siteConfig.opensTime && siteConfig.closesTime) {
    schema.openingHoursSpecification = [
      {
        '@type': 'OpeningHoursSpecification',
        opens: siteConfig.opensTime,
        closes: siteConfig.closesTime,
      },
    ];
  }

  if (socialLinks.length > 0) {
    schema.sameAs = socialLinks;
  }

  // Only include Review / AggregateRating if real verified testimonials exist
  if (siteConfig.testimonials.length > 0) {
    const rated = siteConfig.testimonials.filter((t) => typeof t.rating === 'number');
    schema.review = siteConfig.testimonials.map((t) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.name },
      reviewBody: t.quote,
      ...(typeof t.rating === 'number'
        ? {
            reviewRating: {
              '@type': 'Rating',
              ratingValue: t.rating,
              bestRating: 5,
            },
          }
        : {}),
    }));
    if (rated.length > 0) {
      const avg = rated.reduce((sum, item) => sum + (item.rating || 0), 0) / rated.length;
      schema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: Number(avg.toFixed(1)),
        reviewCount: rated.length,
      };
    }
  }

  return schema;
}

export function buildWebSiteSchema(baseUrl?: string): Record<string, unknown> {
  const url = resolveFullUrl('/', baseUrl);
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    inLanguage: 'en-IN',
    description: siteConfig.canonicalDescription,
  };
  if (url.startsWith('http')) {
    schema['@id'] = `${url}#website`;
    schema.url = url;
    schema.publisher = { '@id': `${url}#organization` };
  }
  return schema;
}

export function buildWebPageSchema(
  meta: Pick<PageSeoMeta, 'path' | 'title' | 'description' | 'pageType'>,
  baseUrl?: string
): Record<string, unknown> {
  const pageUrl = resolveFullUrl(meta.path, baseUrl);
  const rootUrl = resolveFullUrl('/', baseUrl);
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': meta.pageType || 'WebPage',
    name: meta.title,
    description: meta.description,
    inLanguage: 'en-IN',
    dateModified: siteConfig.lastUpdatedIso,
  };
  if (pageUrl.startsWith('http')) {
    schema['@id'] = `${pageUrl}#webpage`;
    schema.url = pageUrl;
  }
  if (rootUrl.startsWith('http')) {
    schema.isPartOf = { '@id': `${rootUrl}#website` };
    schema.about = { '@id': `${rootUrl}#organization` };
  }
  return schema;
}

export function buildBreadcrumbSchema(
  items: BreadcrumbItem[],
  baseUrl?: string
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, index) => {
      const fullUrl = resolveFullUrl(crumb.path, baseUrl);
      const entry: Record<string, unknown> = {
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
      };
      if (fullUrl.startsWith('http')) {
        entry.item = fullUrl;
      }
      return entry;
    }),
  };
}

export function buildCourseSchemas(program: ProgramItem, baseUrl?: string): Record<string, unknown>[] {
  const provider: Record<string, unknown> = {
    '@type': 'EducationalOrganization',
    name: siteConfig.name,
  };
  const orgUrl = resolveFullUrl('/', baseUrl);
  if (orgUrl.startsWith('http')) {
    provider.sameAs = orgUrl;
  }

  const courseUrl = resolveFullUrl(program.slug, baseUrl);

  if (program.id === 'spoken-english' && program.batches && program.batches.length > 0) {
    return program.batches.map((batch) => {
      const item: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: `Spoken English Course - ${batch.level}`,
        description: `${batch.focus} Mode: ${batch.mode}. Duration: ${batch.duration}. Offered by ${siteConfig.name}, ${siteConfig.address.fullFormatted}.`,
        inLanguage: 'en-IN',
        provider,
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: batch.courseModeSchema,
          courseWorkload: batch.duration,
          location: {
            '@type': 'Place',
            name: siteConfig.name,
            address: siteConfig.address.fullFormatted,
          },
        },
      };
      if (courseUrl.startsWith('http')) {
        item.url = courseUrl;
      }
      return item;
    });
  }

  const courseMode = 'blended';

  const single: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: program.title,
    description: program.summary,
    inLanguage: 'en-IN',
    provider,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode,
      courseWorkload: program.duration,
      location: {
        '@type': 'Place',
        name: siteConfig.name,
        address: siteConfig.address.fullFormatted,
      },
    },
  };
  if (courseUrl.startsWith('http')) {
    single.url = courseUrl;
  }
  return [single];
}

export function buildFaqSchema(faqs: FaqItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildPersonSchema(
  lecturer: Lecturer,
  baseUrl?: string
): Record<string, unknown> {
  const orgUrl = resolveFullUrl('/', baseUrl);
  const profileUrl = resolveFullUrl(`/lecturers/${lecturer.id}`, baseUrl);
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: `${lecturer.name}, ${lecturer.qualification}`,
    jobTitle: lecturer.role,
    hasCredential: lecturer.qualification,
    knowsAbout: siteConfig.programs.map((p) => p.title),
    worksFor: {
      '@type': 'EducationalOrganization',
      name: siteConfig.name,
      ...(orgUrl.startsWith('http') ? { url: orgUrl } : {}),
    },
    workLocation: {
      '@type': 'Place',
      name: siteConfig.name,
      address: siteConfig.address.fullFormatted,
    },
  };
  if (profileUrl.startsWith('http')) {
    schema.url = profileUrl;
  }
  if (lecturer.bio.trim()) {
    schema.description = lecturer.bio.trim();
  }
  if (lecturer.photo?.trim()) {
    const imgUrl = resolveFullUrl(lecturer.photo.trim(), baseUrl);
    if (imgUrl.startsWith('http')) {
      schema.image = imgUrl;
    }
  }
  return schema;
}

export function buildPersonSchemas(baseUrl?: string): Record<string, unknown>[] {
  return siteConfig.lecturers.map((lecturer) => buildPersonSchema(lecturer, baseUrl));
}

export function getProgramFaqs(programId: ProgramItem['id']): FaqItem[] {
  const categoryMap: Record<ProgramItem['id'], FaqItem['category']> = {
    'spoken-english': 'spoken-english',
    'school-tuition': 'school-tuition',
    'interview-mastery': 'interview-mastery',
    'be-bca-diploma': 'general',
  };
  const cat = categoryMap[programId];
  return siteConfig.faqs.filter((f) => f.category === cat || f.category === 'general').slice(0, 4);
}

/**
 * Single source of truth for all indexable page SEO metadata and structured data,
 * shared by the build-time prerenderer and runtime pages so they stay 100% aligned.
 */
export function getAllIndexablePageMeta(baseUrl?: string): PageSeoMeta[] {
  const spokenEnglish = getProgramById('spoken-english');
  const interviewMastery = getProgramById('interview-mastery');
  const schoolTuition = getProgramById('school-tuition');
  const collegeClasses = getProgramById('be-bca-diploma');

  const programPages = [spokenEnglish, interviewMastery, schoolTuition, collegeClasses].map(
    (program): PageSeoMeta => ({
      path: program.slug,
      title: program.seoTitle,
      description: program.seoDescription,
      pageType: 'WebPage',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: program.shortTitle, path: program.slug },
      ],
      schemas: [
        ...buildCourseSchemas(program, baseUrl),
        buildFaqSchema(getProgramFaqs(program.id)),
      ],
    })
  );

  const lecturerPages: PageSeoMeta[] = siteConfig.lecturers.map((lecturer) => ({
    path: `/lecturers/${lecturer.id}`,
    title: `${lecturer.name}, ${lecturer.qualification} | Faculty · MASTERMIND ACADEMY, Belagavi`,
    description: `${lecturer.name} (${lecturer.qualification}), Lecturer at MASTERMIND ACADEMY in Nehru Nagar, 2nd Cross, Belagavi — ${lecturer.experience}. Focus: ${lecturer.focusArea}.`,
    pageType: 'ProfilePage',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Faculty & Lecturers', path: '/lecturers' },
      {
        name: `${lecturer.name}, ${lecturer.qualification}`,
        path: `/lecturers/${lecturer.id}`,
      },
    ],
    schemas: [buildPersonSchema(lecturer, baseUrl)],
  }));

  return [
    {
      path: '/',
      title: 'MASTERMIND ACADEMY, Belagavi | Spoken English & Tuition',
      description:
        'MASTERMIND ACADEMY in Nehru Nagar, 2nd Cross, Belagavi (7:00 AM–8:30 PM) — Online & Offline across India. Spoken English (4 levels including Interview Mastery with Personality Skill Development Program), Classes 6th to 10th all subjects, and B.E, B.Com & Diploma core subjects.',
      pageType: 'WebPage',
      breadcrumbs: [{ name: 'Home', path: '/' }],
      schemas: [buildFaqSchema(siteConfig.faqs), ...buildPersonSchemas(baseUrl)],
    },
    ...programPages,
    {
      path: '/about',
      title: 'About MASTERMIND ACADEMY | Nehru Nagar, 2nd Cross, Belagavi',
      description:
        'Learn about MASTERMIND ACADEMY in Nehru Nagar, 2nd Cross, Belagavi (open 7:00 AM to 8:30 PM, Online & Offline across India) — Education is food to a hungry soul.',
      pageType: 'AboutPage',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ],
      schemas: buildPersonSchemas(baseUrl),
    },
    {
      path: '/lecturers',
      title: 'Faculty & Lecturers | MASTERMIND ACADEMY, Belagavi',
      description:
        'Meet our B.E graduate faculty in Nehru Nagar, 2nd Cross, Belagavi: Laxmi (B.E, 10+ years of prior HR experience & teaching experience) and Pooja (B.E, 3+ years of experience in core subjects).',
      pageType: 'CollectionPage',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Faculty & Lecturers', path: '/lecturers' },
      ],
      schemas: buildPersonSchemas(baseUrl),
    },
    ...lecturerPages,
    {
      path: '/faq',
      title: 'FAQ | MASTERMIND ACADEMY, Nehru Nagar, 2nd Cross, Belagavi',
      description:
        'Answers on Spoken English 4 levels (including Interview Mastery with Personality Skill Development Program), Classes 6th to 10th all subjects, B.E/B.Com/Diploma core subjects, Online & Offline across India, and timings (7:00 AM–8:30 PM).',
      pageType: 'FAQPage',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'FAQ', path: '/faq' },
      ],
      schemas: [buildFaqSchema(siteConfig.faqs)],
    },
    {
      path: '/contact',
      title: 'Contact & Location | MASTERMIND ACADEMY, Belagavi',
      description:
        'Visit MASTERMIND ACADEMY at Nehru Nagar, 2nd Cross, Belagavi 590010 (open 7:00 AM to 8:30 PM) or join Online from across India. Call 90194 16236 / 81239 50627 or email mastermindacademy2627@gmail.com.',
      pageType: 'ContactPage',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
      ],
      schemas: [],
    },
    {
      path: '/privacy-policy',
      title: 'Privacy Policy & DPDP Act Notice | MASTERMIND ACADEMY',
      description:
        'Privacy Policy and Digital Personal Data Protection (DPDP) Act, 2023 notice for MASTERMIND ACADEMY, Nehru Nagar, 2nd Cross, Belagavi. Learn how enquiry data is handled and how to exercise your rights.',
      pageType: 'WebPage',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Privacy Policy & DPDP Notice', path: '/privacy-policy' },
      ],
      schemas: [],
    },
    {
      path: '/terms-and-conditions',
      title: 'Terms & Conditions | MASTERMIND ACADEMY, Belagavi',
      description:
        'Terms and Conditions for using the MASTERMIND ACADEMY website and enrolling in Spoken English, Classes 6th to 10th (all subjects), and B.E/B.Com/Diploma core subjects — Online across India & Offline in Nehru Nagar, 2nd Cross, Belagavi.',
      pageType: 'WebPage',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Terms & Conditions', path: '/terms-and-conditions' },
      ],
      schemas: [],
    },
    {
      path: '/data-rights',
      title: 'DPDP Data Rights & Grievance Redressal | MASTERMIND ACADEMY',
      description:
        'Exercise your rights under India’s Digital Personal Data Protection (DPDP) Act, 2023 — withdraw consent, request data access, correction, erasure, or raise a grievance with MASTERMIND ACADEMY.',
      pageType: 'WebPage',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'DPDP Data Rights & Grievance', path: '/data-rights' },
      ],
      schemas: [],
    },
  ];
}

export function generateRobotsTxt(baseUrl?: string): string {
  const cleanBase = (baseUrl ?? resolveBaseUrl()).trim().replace(/\/+$/, '');
  const lines = [
    '# Robots.txt for MASTERMIND ACADEMY, Nehru Nagar, 2nd Cross, Belagavi',
    '# Welcoming search engines and AI answer engine crawlers',
    '',
    'User-agent: *',
    'Allow: /',
    '',
    'User-agent: Googlebot',
    'Allow: /',
    '',
    'User-agent: Google-Extended',
    'Allow: /',
    '',
    'User-agent: Bingbot',
    'Allow: /',
    '',
    'User-agent: GPTBot',
    'Allow: /',
    '',
    'User-agent: OAI-SearchBot',
    'Allow: /',
    '',
    'User-agent: ChatGPT-User',
    'Allow: /',
    '',
    'User-agent: ClaudeBot',
    'Allow: /',
    '',
    'User-agent: Claude-Web',
    'Allow: /',
    '',
    'User-agent: PerplexityBot',
    'Allow: /',
    '',
    'User-agent: Applebot-Extended',
    'Allow: /',
  ];

  if (cleanBase) {
    lines.push('', `Sitemap: ${cleanBase}/sitemap.xml`);
  } else {
    lines.push(
      '',
      '# Add siteUrl in src/data/siteConfig.ts to include the absolute Sitemap URL',
      'Sitemap: /sitemap.xml'
    );
  }

  return lines.join('\n') + '\n';
}

export function generateSitemapXml(baseUrl?: string): string {
  const cleanBase = (baseUrl ?? resolveBaseUrl()).trim().replace(/\/+$/, '');
  const locPrefix = cleanBase || 'https://example.com';
  const urls = ALL_INDEXABLE_ROUTES.map((route) => {
    const loc = route.path === '/' ? `${locPrefix}/` : `${locPrefix}${route.path}`;
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${siteConfig.lastUpdatedIso}</lastmod>`,
      `    <changefreq>${route.changefreq}</changefreq>`,
      `    <priority>${route.priority}</priority>`,
      '  </url>',
    ].join('\n');
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}

export function generateLlmsTxt(baseUrl?: string): string {
  const cleanBase = (baseUrl ?? resolveBaseUrl()).trim().replace(/\/+$/, '');
  const link = (p: string) => (cleanBase ? `${cleanBase}${p === '/' ? '/' : p}` : p);
  const safeEmail = getSafeEmail();

  return [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.canonicalDescription}`,
    '',
    `Tagline: ${siteConfig.tagline} (${siteConfig.subline})`,
    `Location: ${siteConfig.address.fullFormatted}`,
    `Areas Served: ${siteConfig.areasServed}`,
    `Phone / WhatsApp: ${siteConfig.phones.join(', ')}`,
    ...(safeEmail ? [`Email: ${safeEmail}`] : []),
    ...(siteConfig.timings.trim() ? [`Timings: ${siteConfig.timings.trim()}`] : []),
    `Lecturers: ${siteConfig.lecturers.map((l) => `${l.name} (${l.qualification}, ${l.experience})`).join('; ')}`,
    '',
    '## Key Pages',
    `- [Home](${link('/')}): Overview of MASTERMIND ACADEMY at Nehru Nagar, 2nd Cross, Belagavi — Online and Offline available across India (Open ${siteConfig.timings})`,
    `- [Spoken English Classes](${link('/spoken-english-classes-belagavi')}): Spoken English is for everyone — KIDS, HOUSEWIVES, FRESHERS, JOB SEEKERS, STUDENTS. Four levels: Kids, Beginners or Intermediates, Advanced Level, and ${INTERVIEW_PROGRAM_NAME}. Online and Offline available across India`,
    `- [${INTERVIEW_PROGRAM_NAME}](${link('/interview-mastery-personality-development-belagavi')}): 2-month practical program covering self-introduction, HR & common interview Q&A, Group Discussion (GD) sessions, mock interviews, body language, voice modulation, grooming, and confidence building. Online and Offline available`,
    `- [Classes 6th to 10th — All Subjects](${link('/school-tuition-classes-6-to-10-belagavi')}): All subjects across CBSE, ICSE, KVS and State Board. Online and Offline available`,
    `- [B.E, B.Com & Diploma Core Subjects](${link('/be-bca-diploma-classes-belagavi')}): Core subject coaching for B.E, B.Com and Diploma college students. Online and Offline available`,
    `- [About Us](${link('/about')}): Teaching approach (Learn, Practice, Excel) and institute background`,
    `- [Faculty & Lecturers](${link('/lecturers')}): Laxmi (B.E, 10+ years of prior HR experience & teaching experience) and Pooja (B.E, 3+ years of experience in core subjects)`,
    ...siteConfig.lecturers.map(
      (lecturer) =>
        `- [${lecturer.name}, ${lecturer.qualification}](${link(`/lecturers/${lecturer.id}`)}): Dedicated faculty profile for ${lecturer.name} (${lecturer.qualification}) — ${lecturer.experience}`
    ),
    `- [FAQ](${link('/faq')}): Direct answers on Spoken English, ${INTERVIEW_PROGRAM_NAME}, Classes 6th to 10th all subjects, B.E/B.Com/Diploma core subjects, Online & Offline availability across India, timings and enrolment`,
    `- [Contact & Location](${link('/contact')}): Nehru Nagar, 2nd Cross, Belagavi 590010 directions (${siteConfig.location.googleMapsDirectionsUrl}), timings (7:00 AM to 8:30 PM), phone, help & support email, and WhatsApp enquiry`,
    `- [Privacy Policy & DPDP Act Notice](${link('/privacy-policy')}): Digital Personal Data Protection (DPDP) Act, 2023 notice, children's data safeguards, and grievance contact`,
    `- [Terms & Conditions](${link('/terms-and-conditions')}): Website usage and institute enrolment terms`,
    `- [DPDP Data Rights & Grievance Redressal](${link('/data-rights')}): Consent withdrawal, access, correction, erasure, nomination, and grievance portal`,
    '',
    '## Full Context',
    `- [llms-full.txt](${link('/llms-full.txt')})`,
    '',
  ].join('\n');
}

export function generateLlmsFullTxt(baseUrl?: string): string {
  const base = generateLlmsTxt(baseUrl);
  const programBlocks = siteConfig.programs.map((p) => {
    const lines = [
      `### ${p.title}`,
      `URL: ${p.slug}`,
      `Summary: ${p.summary}`,
      `Who it is for: ${p.atAGlance.whoItIsFor}`,
      `Mode: ${p.atAGlance.mode}`,
      `Duration: ${p.atAGlance.duration}`,
      `Location: ${p.atAGlance.location}`,
    ];
    if (p.batches && p.batches.length > 0) {
      lines.push('Batches:');
      for (const b of p.batches) {
        lines.push(`- ${b.level}: ${b.mode}, ${b.duration}. ${b.focus}`);
      }
    }
    if (p.curriculum && p.curriculum.length > 0) {
      lines.push('Topics covered:');
      for (const c of p.curriculum) {
        lines.push(`- ${c}`);
      }
    }
    if (p.boards && p.boards.length > 0) {
      lines.push(`Boards taught: ${p.boards.join(', ')}`);
    }
    return lines.join('\n');
  });

  const facultyBlocks = siteConfig.lecturers.map((l) => {
    const lines = [
      `### ${l.name}, ${l.qualification}`,
      `Profile URL: /lecturers/${l.id}`,
      `Role: ${l.role}`,
      `Qualification: Bachelor of Engineering (${l.qualification})`,
      `Experience: ${l.experience}`,
      `Focus: ${l.focusArea}`,
      ...(l.bio.trim() ? [`Bio: ${l.bio.trim()}`] : []),
    ];
    return lines.join('\n');
  });

  const faqBlocks = siteConfig.faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`);

  return [
    base,
    '## About MASTERMIND ACADEMY',
    siteConfig.about.story,
    '',
    '### Teaching Approach',
    ...siteConfig.about.approach.map((a) => `- ${a.title}: ${a.description}`),
    '',
    '## Faculty & Lecturers',
    ...facultyBlocks,
    '',
    '## Programs in Detail',
    ...programBlocks,
    '',
    '## Frequently Asked Questions',
    ...faqBlocks,
    '',
    `Last updated: ${siteConfig.lastUpdated}`,
    '',
  ].join('\n');
}
