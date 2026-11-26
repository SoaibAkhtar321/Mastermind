import {
  CORE_PROGRAM_IDS,
  INTERVIEW_PROGRAM_NAME,
  siteConfig,
  getCorePrograms,
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

export const SOCIAL_SHARE_IMAGE_PATH = '/og-image.png';

export const ALL_INDEXABLE_ROUTES: { path: string; priority: string; changefreq: string }[] = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/competitive-exam-english-belagavi', priority: '0.95', changefreq: 'weekly' },
  { path: '/spoken-english-classes-belagavi', priority: '0.9', changefreq: 'weekly' },
  { path: '/be-bca-diploma-classes-belagavi', priority: '0.85', changefreq: 'weekly' },
  { path: '/school-tuition-classes-6-to-10-belagavi', priority: '0.85', changefreq: 'weekly' },
  {
    path: '/interview-mastery-personality-development-belagavi',
    priority: '0.85',
    changefreq: 'weekly',
  },
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

  // Server-side / build-time fallback (Netlify URL, SITE_URL, APP_URL, or VERCEL_URL)
  if (typeof process !== 'undefined' && process.env) {
    const candidates = [
      process.env.SITE_URL,
      process.env.URL,
      process.env.DEPLOY_PRIME_URL,
      process.env.APP_URL,
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    ];
    for (const candidate of candidates) {
      const envUrl = sanitizeExternalUrl(candidate || '');
      if (envUrl) {
        return envUrl.replace(/\/+$/, '');
      }
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
  const ogImageUrl = resolveFullUrl(SOCIAL_SHARE_IMAGE_PATH, baseUrl);
  const logoImageUrl = resolveFullUrl('/mastermind-academy-logo.jpg', baseUrl);
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

  const contactPoints: Record<string, unknown>[] = [
    {
      '@type': 'ContactPoint',
      telephone: siteConfig.phonesE164[0],
      contactType: 'admissions',
      areaServed: 'IN',
      availableLanguage: ['English'],
    },
    ...(siteConfig.phonesE164[1]
      ? [
          {
            '@type': 'ContactPoint',
            telephone: siteConfig.phonesE164[1],
            contactType: 'admissions',
            areaServed: 'IN',
            availableLanguage: ['English'],
          },
        ]
      : []),
    ...(safeEmail
      ? [
          {
            '@type': 'ContactPoint',
            email: safeEmail,
            contactType: 'customer support',
            areaServed: 'IN',
            availableLanguage: ['English'],
          },
        ]
      : []),
  ];

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    name: siteConfig.name,
    alternateName: [
      'Mastermind Academy Belagavi',
      'Mastermind Academy Nehru Nagar',
      'Mastermind Academy Nehru Nagar 2nd Cross',
    ],
    slogan: `${siteConfig.tagline} — ${siteConfig.subline}`,
    description: siteConfig.canonicalDescription,
    telephone: siteConfig.phonesE164,
    contactPoint: contactPoints,
    address,
    hasMap: siteConfig.location.googleMapsSatelliteUrl,
    areaServed: [
      {
        '@type': 'Country',
        name: 'India',
      },
      {
        '@type': 'AdministrativeArea',
        name: siteConfig.address.state,
      },
      {
        '@type': 'City',
        name: siteConfig.address.city,
      },
      {
        '@type': 'Place',
        name: 'Nehru Nagar, 2nd Cross, Belagavi',
      },
    ],
    knowsAbout: [
      'Competitive Exam English',
      'English Grammar and Language Skills for Competitive Examinations',
      'Mock Tests and Assessments for Competitive Exams',
      'Spoken English Classes',
      'Online Spoken English Across India',
      INTERVIEW_PROGRAM_NAME,
      'Group Discussion and Mock Interviews',
      'Body Language and Communication Skills',
      'B.E, B.Com and Diploma Core Subjects',
      'Classes 6th to 10th All Subjects',
      'CBSE Board Coaching',
      'ICSE Board Coaching',
      'KVS School Tuition',
      'Karnataka State Board Tuition',
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
    schema.logo = {
      '@type': 'ImageObject',
      url: logoImageUrl,
    };
    schema.image = ogImageUrl;
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
    alternateName: 'Mastermind Academy Belagavi',
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
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '[data-aeo-summary]', '[data-aeo-answer]'],
    },
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

/**
 * Course List carousel schema (priority order 1–4) for Google Rich Results & AEO.
 */
export function buildCourseListSchema(baseUrl?: string): Record<string, unknown> {
  const orgUrl = resolveFullUrl('/', baseUrl);
  const corePrograms = getCorePrograms();

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${siteConfig.name} Courses`,
    description:
      'Priority-ordered coaching programs at MASTERMIND ACADEMY, Nehru Nagar, 2nd Cross, Belagavi (Online & Offline across India).',
    numberOfItems: corePrograms.length,
    itemListElement: corePrograms.map((program, idx) => {
      const courseUrl = resolveFullUrl(program.slug, baseUrl);
      return {
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'Course',
          name: program.title,
          description: program.summary,
          provider: {
            '@type': 'EducationalOrganization',
            name: siteConfig.name,
            ...(orgUrl.startsWith('http') ? { sameAs: orgUrl } : {}),
          },
          ...(courseUrl.startsWith('http') ? { url: courseUrl } : {}),
        },
      };
    }),
  };
}

function getCourseEducationalLevel(programId: ProgramItem['id']): string {
  switch (programId) {
    case 'competitive-exam-english':
      return 'Competitive Examination Aspirants';
    case 'spoken-english':
      return 'All Levels (Kids, Beginner, Intermediate, Advanced)';
    case 'be-bca-diploma':
      return 'Undergraduate & Diploma (B.E, B.Com, Diploma)';
    case 'school-tuition':
      return 'Classes 6th to 10th (CBSE, ICSE, KVS, State Board)';
    case 'interview-mastery':
      return 'College Students, Freshers & Job Seekers';
  }
}

function getCourseTeaches(program: ProgramItem): string[] {
  if (program.curriculum && program.curriculum.length > 0) {
    return program.curriculum;
  }
  if (program.batches && program.batches.length > 0) {
    return program.batches.map((b) => `${b.level}: ${b.focus}`);
  }
  if (program.boards && program.boards.length > 0) {
    return program.boards.map((board) => `${board} All Subjects (Classes 6th to 10th)`);
  }
  return ['B.E Core Subjects', 'B.Com Core Subjects', 'Diploma Core Subjects'];
}

export function buildCourseSchemas(
  program: ProgramItem,
  baseUrl?: string
): Record<string, unknown>[] {
  const provider: Record<string, unknown> = {
    '@type': 'EducationalOrganization',
    name: siteConfig.name,
  };
  const orgUrl = resolveFullUrl('/', baseUrl);
  if (orgUrl.startsWith('http')) {
    provider.sameAs = orgUrl;
  }

  const courseUrl = resolveFullUrl(program.slug, baseUrl);
  const onsiteLocation = {
    '@type': 'Place',
    name: siteConfig.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.countryCode,
    },
    ...(siteConfig.location.latitude && siteConfig.location.longitude
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: Number(siteConfig.location.latitude),
            longitude: Number(siteConfig.location.longitude),
          },
        }
      : {}),
  };

  if (program.id === 'spoken-english' && program.batches && program.batches.length > 0) {
    return program.batches.map((batch) => {
      const item: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: `Spoken English Course - ${batch.level}`,
        description: `${batch.focus} Mode: ${batch.mode}. Duration: ${batch.duration}. Offered by ${siteConfig.name}, ${siteConfig.address.fullFormatted}.`,
        inLanguage: 'en-IN',
        educationalLevel: batch.level,
        teaches: batch.highlights,
        audience: {
          '@type': 'EducationalAudience',
          educationalRole: 'student',
          audienceType: program.whoItIsForList.join(', '),
        },
        provider,
        offers: {
          '@type': 'Offer',
          category: 'Paid',
          availability: 'https://schema.org/InStock',
          ...(courseUrl.startsWith('http') ? { url: courseUrl } : {}),
        },
        hasCourseInstance: [
          {
            '@type': 'CourseInstance',
            courseMode: 'onsite',
            courseWorkload: batch.duration,
            location: onsiteLocation,
          },
          {
            '@type': 'CourseInstance',
            courseMode: 'online',
            courseWorkload: batch.duration,
            location: {
              '@type': 'VirtualLocation',
              ...(courseUrl.startsWith('http') ? { url: courseUrl } : {}),
            },
          },
        ],
      };
      if (courseUrl.startsWith('http')) {
        item.url = courseUrl;
      }
      return item;
    });
  }

  const single: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: program.title,
    description: program.summary,
    inLanguage: 'en-IN',
    educationalLevel: getCourseEducationalLevel(program.id),
    teaches: getCourseTeaches(program),
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: program.whoItIsForList.join(', '),
    },
    provider,
    offers: {
      '@type': 'Offer',
      category: 'Paid',
      availability: 'https://schema.org/InStock',
      ...(courseUrl.startsWith('http') ? { url: courseUrl } : {}),
    },
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: 'onsite',
        courseWorkload: program.duration,
        location: onsiteLocation,
      },
      {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: program.duration,
        location: {
          '@type': 'VirtualLocation',
          ...(courseUrl.startsWith('http') ? { url: courseUrl } : {}),
        },
      },
    ],
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
    knowsAbout: lecturer.teachesList,
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
    'competitive-exam-english': 'competitive-exam-english',
    'spoken-english': 'spoken-english',
    'be-bca-diploma': 'general',
    'school-tuition': 'school-tuition',
    'interview-mastery': 'interview-mastery',
  };
  const cat = categoryMap[programId];
  return siteConfig.faqs.filter((f) => f.category === cat || f.category === 'general').slice(0, 5);
}

/**
 * Single source of truth for all indexable page SEO metadata and structured data,
 * shared by the build-time prerenderer and runtime pages so they stay 100% aligned.
 * All titles are kept within 30–60 characters and descriptions within 120–160 characters.
 */
export function getAllIndexablePageMeta(baseUrl?: string): PageSeoMeta[] {
  const competitiveExam = getProgramById('competitive-exam-english');
  const spokenEnglish = getProgramById('spoken-english');
  const collegeClasses = getProgramById('be-bca-diploma');
  const schoolTuition = getProgramById('school-tuition');
  const interviewMastery = getProgramById('interview-mastery');

  const programPages = [
    competitiveExam,
    spokenEnglish,
    collegeClasses,
    schoolTuition,
    interviewMastery,
  ].map(
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
    title: `${lecturer.name} (${lecturer.qualification}) | MASTERMIND ACADEMY Belagavi`,
    description: `Meet ${lecturer.name} (${lecturer.qualification}), Lecturer at MASTERMIND ACADEMY, Nehru Nagar, 2nd Cross, Belagavi with ${lecturer.experience}. Enquire today.`,
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
      title: 'MASTERMIND ACADEMY Belagavi | Competitive & Spoken English',
      description:
        'Join MASTERMIND ACADEMY in Nehru Nagar, 2nd Cross, Belagavi or Online across India for Competitive Exam English, Spoken English, B.E/B.Com/Diploma & 6th–10th.',
      pageType: 'WebPage',
      breadcrumbs: [{ name: 'Home', path: '/' }],
      schemas: [
        buildCourseListSchema(baseUrl),
        buildFaqSchema(siteConfig.faqs),
        ...buildPersonSchemas(baseUrl),
      ],
    },
    ...programPages,
    {
      path: '/about',
      title: 'About MASTERMIND ACADEMY | Nehru Nagar, Belagavi',
      description:
        'Discover MASTERMIND ACADEMY in Nehru Nagar, 2nd Cross, Belagavi (7:00 AM–8:30 PM). Learn, Practice & Excel with experienced B.E lecturers Online & Offline.',
      pageType: 'AboutPage',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ],
      schemas: buildPersonSchemas(baseUrl),
    },
    {
      path: '/lecturers',
      title: 'Faculty & Lecturers | MASTERMIND ACADEMY Belagavi',
      description:
        'Meet our qualified B.E lecturers in Belagavi: Laxmi (10+ yrs HR & teaching) and Pooja (3+ yrs core subjects). Speak with faculty and join a batch today.',
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
      title: 'Course & Enrolment FAQ | MASTERMIND ACADEMY Belagavi',
      description:
        'Get answers on Competitive Exam English, Spoken English, B.E/B.Com/Diploma, Classes 6th–10th, Online & Offline modes and timings at MASTERMIND ACADEMY.',
      pageType: 'WebPage',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'FAQ', path: '/faq' },
      ],
      schemas: [buildFaqSchema(siteConfig.faqs)],
    },
    {
      path: '/contact',
      title: 'Contact & Location | MASTERMIND ACADEMY Belagavi',
      description:
        'Visit MASTERMIND ACADEMY at Nehru Nagar, 2nd Cross, Belagavi (7:00 AM–8:30 PM) or join Online across India. View satellite map, call or WhatsApp us today.',
      pageType: 'ContactPage',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
      ],
      schemas: [],
    },
    {
      path: '/privacy-policy',
      title: 'Privacy Policy & DPDP Notice | MASTERMIND ACADEMY',
      description:
        'Read MASTERMIND ACADEMY’s Privacy Policy and India DPDP Act, 2023 notice on WhatsApp enquiries, student data protection, consent withdrawal and data rights.',
      pageType: 'WebPage',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Privacy Policy & DPDP Notice', path: '/privacy-policy' },
      ],
      schemas: [],
    },
    {
      path: '/terms-and-conditions',
      title: 'Terms & Conditions | MASTERMIND ACADEMY Belagavi',
      description:
        'Review Terms & Conditions for MASTERMIND ACADEMY courses—Competitive Exam English, Spoken English, B.E/B.Com/Diploma & Classes 6th–10th—Online and Offline.',
      pageType: 'WebPage',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Terms & Conditions', path: '/terms-and-conditions' },
      ],
      schemas: [],
    },
    {
      path: '/data-rights',
      title: 'DPDP Data Rights & Grievance | MASTERMIND ACADEMY',
      description:
        'Exercise your DPDP Act, 2023 rights at MASTERMIND ACADEMY Belagavi—withdraw consent, request data access, correction or erasure, or contact our support desk.',
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
    '# Explicitly welcoming search engines, answer engines (AEO), and generative AI crawlers (GEO)',
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
    'User-agent: anthropic-ai',
    'Allow: /',
    '',
    'User-agent: PerplexityBot',
    'Allow: /',
    '',
    'User-agent: Perplexity-User',
    'Allow: /',
    '',
    'User-agent: Applebot',
    'Allow: /',
    '',
    'User-agent: Applebot-Extended',
    'Allow: /',
    '',
    'User-agent: Meta-ExternalAgent',
    'Allow: /',
    '',
    'User-agent: DuckAssistBot',
    'Allow: /',
    '',
    'User-agent: cohere-ai',
    'Allow: /',
    '',
    `# AI / LLM Context Directory: ${cleanBase ? `${cleanBase}/llms.txt` : '/llms.txt'}`,
    `# Full AI / LLM Knowledge Base: ${cleanBase ? `${cleanBase}/llms-full.txt` : '/llms-full.txt'}`,
  ];

  if (cleanBase) {
    lines.push('', `Sitemap: ${cleanBase}/sitemap.xml`);
  } else {
    lines.push(
      '',
      '# Set SITE_URL / URL env var or siteUrl in src/data/siteConfig.ts for absolute Sitemap URL',
      'Sitemap: /sitemap.xml'
    );
  }

  return lines.join('\n') + '\n';
}

export function generateSitemapXml(baseUrl?: string): string {
  const cleanBase = (baseUrl ?? resolveBaseUrl()).trim().replace(/\/+$/, '');
  const urls = ALL_INDEXABLE_ROUTES.map((route) => {
    const loc = cleanBase
      ? route.path === '/'
        ? `${cleanBase}/`
        : `${cleanBase}${route.path}`
      : route.path;
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
  const socialLinks = getFilledSocialLinks();

  return [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.canonicalDescription}`,
    '',
    '## Quick Entity Facts',
    `- Name: ${siteConfig.name}`,
    `- Tagline & Motto: ${siteConfig.tagline} | Learn · Practise · Achieve | ${siteConfig.subline}`,
    `- Address: ${siteConfig.address.fullFormatted}`,
    `- Exact GPS Coordinates: ${siteConfig.location.latitude}, ${siteConfig.location.longitude}`,
    `- Google Plus Code: ${siteConfig.location.plusCode}`,
    `- Satellite Map: ${siteConfig.location.googleMapsSatelliteUrl}`,
    `- Directions: ${siteConfig.location.googleMapsDirectionsUrl}`,
    `- Areas Served: ${siteConfig.areasServed}`,
    `- Institute Timings: ${siteConfig.timings}`,
    `- Phone & WhatsApp: ${siteConfig.phones.join(', ')}`,
    ...(safeEmail ? [`- Help & Support Email: ${safeEmail}`] : []),
    ...socialLinks.map((item) => `- Official ${item.label}: ${item.url}`),
    `- Faculty: ${siteConfig.lecturers.map((l) => `${l.name} (${l.qualification}, ${l.experience})`).join('; ')}`,
    `- Course Priority Order: 1. Competitive Exam English (Grammar & Language Skills) | 2. Spoken English Classes (4 Levels) | 3. B.E, B.Com & Diploma Core Subjects | 4. Classes 6th to 10th (All Subjects)`,
    '',
    '## Courses (Listed in Priority Order)',
    `- [1. Competitive Exam English — Grammar & Language Skills](${link('/competitive-exam-english-belagavi')}): Comprehensive English grammar training for COMPETITIVE EXAM ASPIRANTS covering Complete Grammar Concepts, Exam-Oriented Practice, and Mock Tests & Assessments. Mode: Online & Offline.`,
    `- [2. Spoken English Classes](${link('/spoken-english-classes-belagavi')}): For KIDS, HOUSEWIVES, FRESHERS, JOB SEEKERS & STUDENTS. Four levels: Kids (2 months), Beginners or Intermediates (2–3 months), Advanced Level (2–3 months), and ${INTERVIEW_PROGRAM_NAME} (2 months). Mode: Online & Offline across India.`,
    `- [3. B.E, B.Com & Diploma Core Subjects](${link('/be-bca-diploma-classes-belagavi')}): Dedicated core subject coaching for college students taught by qualified B.E graduate lecturers. Mode: Online & Offline across India.`,
    `- [4. Classes 6th to 10th — All Subjects](${link('/school-tuition-classes-6-to-10-belagavi')}): All subjects covered across CBSE, ICSE, KVS and State Board with strong fundamentals and exam revision. Mode: Online & Offline.`,
    `- [${INTERVIEW_PROGRAM_NAME}](${link('/interview-mastery-personality-development-belagavi')}): 2-month practical program covering self-introduction, HR & common interview Q&A, Group Discussion (GD) sessions, one-on-one & panel mock interviews, body language, voice modulation, grooming, and overcoming stage fear. Mode: Online & Offline.`,
    '',
    '## Institute & Support Pages',
    `- [Home](${link('/')}): Complete overview, featured courses, interactive satellite map, and WhatsApp enquiry`,
    `- [About Us](${link('/about')}): Teaching approach (Learn, Practice, Excel) and institute philosophy`,
    `- [Faculty & Lecturers](${link('/lecturers')}): Qualified B.E graduate faculty Laxmi and Pooja`,
    ...siteConfig.lecturers.map(
      (lecturer) =>
        `- [${lecturer.name}, ${lecturer.qualification}](${link(`/lecturers/${lecturer.id}`)}): ${lecturer.experience} — ${lecturer.focusArea}`
    ),
    `- [Frequently Asked Questions](${link('/faq')}): Direct factual answers on all courses, timings, Online & Offline availability, and enrolment`,
    `- [Contact & Location](${link('/contact')}): Nehru Nagar, 2nd Cross, Belagavi satellite map, directions, phone, support email, and WhatsApp enquiry`,
    `- [Privacy Policy & DPDP Act Notice](${link('/privacy-policy')}): India Digital Personal Data Protection (DPDP) Act, 2023 compliance`,
    `- [Terms & Conditions](${link('/terms-and-conditions')}): Website and enrolment terms`,
    `- [DPDP Data Rights & Grievance Redressal](${link('/data-rights')}): Consent withdrawal, access, correction, erasure, and grievance contact`,
    '',
    '## Full Machine-Readable Context',
    `- [llms-full.txt](${link('/llms-full.txt')}): Complete course comparison table, syllabi, faculty bios, and full FAQ knowledge base`,
    '',
  ].join('\n');
}

export function generateLlmsFullTxt(baseUrl?: string): string {
  const base = generateLlmsTxt(baseUrl);
  const cleanBase = (baseUrl ?? resolveBaseUrl()).trim().replace(/\/+$/, '');
  const link = (p: string) => (cleanBase ? `${cleanBase}${p === '/' ? '/' : p}` : p);

  const corePrograms = CORE_PROGRAM_IDS.map((id) => getProgramById(id));
  const comparisonTable = [
    '| Priority | Course | Who It Is For | Key Focus | Mode | Duration | URL |',
    '| :--- | :--- | :--- | :--- | :--- | :--- | :--- |',
    ...corePrograms.map((p, idx) => {
      const keyFocus =
        p.id === 'competitive-exam-english'
          ? 'Complete Grammar Concepts, Exam-Oriented Practice, Mock Tests & Assessments'
          : p.id === 'spoken-english'
            ? `4 Levels: Kids, Beginners/Intermediates, Advanced & ${INTERVIEW_PROGRAM_NAME}`
            : p.id === 'be-bca-diploma'
              ? 'B.E, B.Com & Diploma Core Subjects'
              : 'All Subjects (CBSE, ICSE, KVS & State Board)';
      return `| ${idx + 1} | ${p.title} | ${p.whoItIsForList.join(', ')} | ${keyFocus} | Online & Offline | ${p.duration} | ${link(p.slug)} |`;
    }),
  ];

  const programBlocks = siteConfig.programs.map((p) => {
    const lines = [
      `### ${p.title}`,
      `URL: ${link(p.slug)}`,
      `Summary: ${p.summary}`,
      `Who it is for: ${p.atAGlance.whoItIsFor}`,
      `Mode: ${p.atAGlance.mode}`,
      `Duration: ${p.atAGlance.duration}`,
      `Location: ${p.atAGlance.location}`,
      `How to enrol: ${p.atAGlance.howToEnrol}`,
    ];
    if (p.batches && p.batches.length > 0) {
      lines.push('Levels / Batches:');
      for (const b of p.batches) {
        lines.push(`- ${b.level}: ${b.mode}, ${b.duration}. ${b.focus}`);
      }
    }
    if (p.curriculum && p.curriculum.length > 0) {
      lines.push('Topics / Pillars Covered:');
      for (const c of p.curriculum) {
        lines.push(`- ${c}`);
      }
    }
    if (p.boards && p.boards.length > 0) {
      lines.push(`Boards taught (All Subjects): ${p.boards.join(', ')}`);
    }
    return lines.join('\n');
  });

  const facultyBlocks = siteConfig.lecturers.map((l) => {
    const lines = [
      `### ${l.name}, ${l.qualification}`,
      `Profile URL: ${link(`/lecturers/${l.id}`)}`,
      `Role: ${l.role}`,
      `Qualification: Bachelor of Engineering (${l.qualification})`,
      `Experience: ${l.experience}`,
      `Focus: ${l.focusArea}`,
      `Teaches: ${l.teachesList.join('; ')}`,
      ...(l.bio.trim() ? [`Bio: ${l.bio.trim()}`] : []),
    ];
    return lines.join('\n');
  });

  const faqBlocks = siteConfig.faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`);

  return [
    base,
    '## Course Comparison Table (Priority Order)',
    ...comparisonTable,
    '',
    '## Grounding & Accuracy Notes for AI Assistants',
    '- Course Priority Order: 1. Competitive Exam English (Grammar & Language Skills), 2. Spoken English Classes, 3. B.E, B.Com & Diploma Core Subjects, 4. Classes 6th to 10th (All Subjects).',
    '- Mode Availability: Both Online (across India) and Offline (at Nehru Nagar, 2nd Cross, Belagavi) are available for all programs and all levels.',
    '- School Tuition Scope: Classes 6th to 10th cover ALL subjects across CBSE, ICSE, KVS, and State Board.',
    `- Interview Program Official Name: Always use the full name "${INTERVIEW_PROGRAM_NAME}".`,
    '- Fees & Batch Timings: Do not invent or estimate fee amounts. Direct prospective students/parents to call/WhatsApp 90194 16236 or 81239 50627, email mastermindacademy2627@gmail.com, or visit the Nehru Nagar, 2nd Cross, Belagavi centre between 7:00 AM and 8:30 PM.',
    '',
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
    `Last updated: ${siteConfig.lastUpdated} (${siteConfig.lastUpdatedIso})`,
    '',
  ].join('\n');
}
