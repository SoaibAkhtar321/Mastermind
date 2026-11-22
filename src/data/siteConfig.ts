/**
 * ============================================================================
 * MASTERMIND ACADEMY - SINGLE SOURCE OF TRUTH (siteConfig.ts)
 * ============================================================================
 * All pages, components, structured data (JSON-LD), sitemap.xml, robots.txt,
 * llms.txt and llms-full.txt read directly from this file.
 *
 * FIELDS THAT STILL NEED TO BE FILLED (currently empty and auto-hidden in UI
 * and JSON-LD schema until you add them):
 * 1.  siteUrl                      : Your live HTTPS domain (e.g. "https://mastermindacademybelagavi.com")
 * 2.  address.landmark             : Nearby landmark in Nehru Nagar, Belagavi
 * 3.  location.googleMapsEmbedUrl  : Google Maps iframe embed URL (Share -> Embed a map)
 * 4.  location.googleMapsDirectionsUrl : Verified Google Business Profile directions link
 * 5.  location.latitude            : Exact latitude coordinate (e.g. "15.8825")
 * 6.  location.longitude           : Exact longitude coordinate (e.g. "74.5135")
 * 8.  social.instagram             : Full Instagram profile URL
 * 9.  social.facebook              : Full Facebook page URL
 * 10. social.youtube               : Full YouTube channel URL
 * 11. social.others                : Any other verified directory or social profile URLs
 * 12. lecturers[].photo            : Optional real portrait photo for Laxmi (B.E) and Pooja (B.E)
 * 13. programs (be-bca-diploma).subjects : Confirmed individual subject list for B.E, B.Com and Diploma
 * 14. mediaSlots.*                 : Real classroom or centre photos (replace WebP files in /public/images/)
 * 17. testimonials                 : Real, verified student or parent reviews (section stays hidden while empty)
 * 18. galleryImages                : Real classroom or campus photos with descriptive alt text
 * 19. fees                         : Set fees.visible = true and add confirmed fee rows when ready
 * 20. tickerMessages               : Top marquee messages (add "Admissions Open" only when you choose to)
 * 21. facts                        : Add real verified counts (e.g. students taught, years) whenever ready
 * ============================================================================
 */

import {
  sanitizeEmail,
  sanitizeExternalUrl,
  sanitizeGoogleMapsEmbedUrl,
  sanitizeTelHref,
} from '../lib/security';

export interface ProgramBatch {
  level: string;
  mode: string;
  duration: string;
  focus: string;
  courseModeSchema: string;
}

export interface ProgramItem {
  id: 'school-tuition' | 'spoken-english' | 'interview-mastery' | 'be-bca-diploma';
  slug: string;
  shortTitle: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  summary: string;
  whoItIsFor: string;
  mode: string;
  duration: string;
  boards?: string[];
  batches?: ProgramBatch[];
  curriculum?: string[];
  subjects?: string[]; // Hidden automatically when empty
  whatsappMessage: string;
  atAGlance: {
    whoItIsFor: string;
    mode: string;
    duration: string;
    location: string;
    howToEnrol: string;
  };
  aeoSections: {
    question: string;
    directAnswer: string;
    detail: string;
  }[];
  relatedSlugs: string[];
}

export interface BannerSlide {
  id: string;
  programId: ProgramItem['id'];
  eyebrow: string;
  headline: string;
  subline: string;
  pills: string[];
  ctaLabel: string;
  ctaHref: string;
  enquiryProgram: string;
  image: string;
  imageAlt: string;
  /** Set true if you supply a transparent PNG/WebP student cutout */
  transparentCutout?: boolean;
}

export interface FactItem {
  id: string;
  display: string;
  /** Numeric target animated once on scroll (combined with optional prefix/suffix) */
  countTarget?: number;
  countPrefix?: string;
  countSuffix?: string;
  label: string;
  sublabel?: string;
}

export interface Lecturer {
  id: string;
  name: string;
  qualification: string;
  role: string;
  experience: string;
  focusArea: string;
  bio: string; // Auto-hidden when empty
  photo?: string; // Optional real portrait path (e.g. "/images/faculty-laxmi.webp"); renders emblem when empty
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'spoken-english' | 'school-tuition' | 'interview-mastery' | 'general';
}

export interface Testimonial {
  name: string;
  role: string;
  program: string;
  quote: string;
  rating?: number;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface FeeRow {
  program: string;
  duration: string;
  fee: string;
}

export const siteConfig = {
  name: 'MASTERMIND ACADEMY',
  tagline: 'Learn · Practice · Excel',
  subline: 'Education is food to a hungry soul.',
  canonicalDescription:
    'MASTERMIND ACADEMY is a coaching institute in Nehru Nagar, Belagavi, Karnataka (open 7:00 AM to 8:30 PM), offering three dedicated programs: Spoken English classes (Kids, Beginners or Intermediates, Advanced Level, and Interview Mastery), all core subjects for Classes 6th to 10th (CBSE, ICSE, KVS and State Board), and core subjects for B.E, B.Com and Diploma students.',
  lastUpdated: 'November 2026',
  lastUpdatedIso: '2026-11-21',

  // Recoloured official logo on clean white background + original file fallback
  brand: {
    logoUrl: '/src/assets/images/mastermind_logo_recoloured_1795261606320.jpg',
    logoFallbackUrl: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_3.52.36_PM_41b83410.jpeg',
    logoAlt: 'MASTERMIND ACADEMY — Education is food to a hungry soul. Learn, Practice, Excel',
  },

  // Top 32px Navy & Gold scrolling ticker (add "Admissions Open" here only when ready)
  tickerMessages: [
    'SPOKEN ENGLISH ONLINE AND OFFLINE',
    'CLASSES 6TH TO 10TH · ALL CORE SUBJECTS (CBSE, ICSE, KVS, STATE BOARD)',
    'CORE SUBJECTS FOR B.E, B.COM & DIPLOMA',
    'OPEN 7:00 AM TO 8:30 PM',
    'EDUCATION IS FOOD TO A HUNGRY SOUL',
    'CALL 90194 16236',
  ] as string[],

  // Real WebP photographs served from /public/images/: replace any file in
  // /public/images/ with your own photography (same filename) to update seamlessly.
  // If a file is missing, SmartPhoto automatically shows a sand-coloured placeholder.
  mediaSlots: {
    heroMain: '/images/hero-main.webp',
    heroSecondaryOne: '/images/spoken-english.webp',
    heroSecondaryTwo: '/images/interview-mastery.webp',
    spokenEnglishVisual: '/images/spoken-english.webp',
    interviewMasteryVisual: '/images/interview-mastery.webp',
    schoolTuitionVisual: '/images/school-tuition.webp',
    beBcaDiplomaVisual: '/images/college-support.webp',
    learningPracticeVisual: '/images/learning-practice.webp',
    aboutVisual: '/images/hero-main.webp',
    studySpaceVisual: '/images/study-space.webp',
  },

  // 3 HTML/CSS Poster Banner Slides for the Home Hero Carousel (3 Core Programs)
  bannerSlides: [
    {
      id: 'slide-spoken-english',
      programId: 'spoken-english',
      eyebrow: 'NEHRU NAGAR, BELAGAVI · 7:00 AM – 8:30 PM',
      headline: 'SPOKEN ENGLISH CLASSES',
      subline: 'Spoken English is for everyone: kids, housewives, freshers, job seekers, students, etc.',
      pills: ['Kids', 'Beginners / Intermediates', 'Advanced Level', 'Interview Mastery'],
      ctaLabel: 'Enquire Now',
      ctaHref: '/spoken-english-classes-belagavi',
      enquiryProgram: 'Spoken English (Beginners or Intermediates)',
      image: '/images/spoken-english.webp',
      imageAlt: 'Learners practising spoken English conversation together in a bright study room',
      transparentCutout: false,
    },
    {
      id: 'slide-school-tuition',
      programId: 'school-tuition',
      eyebrow: 'SCHOOL TUITION · ALL CORE SUBJECTS',
      headline: 'CLASSES 6TH TO 10TH',
      subline: 'All core subjects covered for CBSE, ICSE, KVS and State Board',
      pills: ['All Core Subjects', 'CBSE & ICSE', 'KVS & State Board'],
      ctaLabel: 'Explore Tuition',
      ctaHref: '/school-tuition-classes-6-to-10-belagavi',
      enquiryProgram: 'Classes 6th to 10th (All Core Subjects)',
      image: '/images/school-tuition.webp',
      imageAlt: 'School learners writing notes and studying textbooks at a wooden desk',
      transparentCutout: false,
    },
    {
      id: 'slide-college-classes',
      programId: 'be-bca-diploma',
      eyebrow: 'COLLEGE COACHING · CORE SUBJECTS',
      headline: 'B.E, B.COM & DIPLOMA',
      subline: 'Core subjects taught by qualified B.E graduate lecturers',
      pills: ['B.E Core Subjects', 'B.Com Core Subjects', 'Diploma Core Subjects'],
      ctaLabel: 'Learn More',
      ctaHref: '/be-bca-diploma-classes-belagavi',
      enquiryProgram: 'B.E, B.Com & Diploma (Core Subjects)',
      image: '/images/college-support.webp',
      imageAlt: 'College learners collaborating over technical notebooks and a laptop',
      transparentCutout: false,
    },
  ] as BannerSlide[],

  // Real verifiable facts for the red Facts Band
  facts: [
    {
      id: 'classes',
      display: '6th–10th',
      label: 'All Core Subjects',
      sublabel: 'CBSE, ICSE, KVS, State',
    },
    {
      id: 'levels',
      display: '4',
      countTarget: 4,
      label: 'Spoken English Levels',
      sublabel: 'Kids to Interview Mastery',
    },
    {
      id: 'streams',
      display: '3',
      countTarget: 3,
      label: 'College Streams',
      sublabel: 'B.E, B.Com & Diploma',
    },
    {
      id: 'modes',
      display: '2',
      countTarget: 2,
      label: 'Learning Modes',
      sublabel: 'Online and offline',
    },
  ] as FactItem[],

  // Fill this with your live HTTPS domain before production launch (no trailing slash).
  siteUrl: '',

  phones: ['90194 16236', '81239 50627'],
  phonesE164: ['+919019416236', '+918123950627'],
  whatsappNumber: '919019416236',
  whatsappDefaultMessage:
    'Hello MASTERMIND ACADEMY, I would like to enquire about your classes in Nehru Nagar, Belagavi.',

  // Contact & Institute Hours
  email: 'mastermindacademy2627@gmail.com',
  timings: '7:00 AM to 8:30 PM',
  opensTime: '07:00',
  closesTime: '20:30',
  openingHoursSchema: [] as string[],

  address: {
    street: 'Nehru Nagar',
    city: 'Belagavi',
    state: 'Karnataka',
    postalCode: '590010',
    country: 'India',
    countryCode: 'IN',
    landmark: '', // Auto-hidden when empty
    fullFormatted: 'Nehru Nagar, Belagavi, Karnataka 590010',
    napLine: 'MASTERMIND ACADEMY, Nehru Nagar, Belagavi, Karnataka, 590010',
  },

  areasServed: 'Nehru Nagar, Belagavi and nearby areas',

  location: {
    googleMapsEmbedUrl: '', // Paste Google Maps iframe src URL when verified
    googleMapsDirectionsUrl: '', // Paste verified GBP directions URL when ready
    googleMapsFallbackQuery: 'MASTERMIND ACADEMY, Nehru Nagar, Belagavi, Karnataka 590010',
    latitude: '', // Auto-omitted from schema when empty
    longitude: '', // Auto-omitted from schema when empty
  },

  social: {
    instagram: '',
    facebook: '',
    youtube: '',
    others: [] as { label: string; url: string }[],
  },

  hero: {
    headline: 'Confidence in English. Strength in studies. Readiness for the interview room.',
    subcopy:
      'At MASTERMIND ACADEMY in Nehru Nagar, Belagavi, we offer Spoken English classes (4 levels), all core subjects for Classes 6th to 10th, and core subjects for B.E, B.Com and Diploma students.',
    highlights: [
      'Spoken English (Kids, Beginners or Intermediates, Advanced Level & Interview Mastery)',
      'Classes 6th to 10th — All Core Subjects (CBSE, ICSE, KVS, State Board)',
      'Core subjects for B.E, B.Com and Diploma students',
      'Open 7:00 AM to 8:30 PM in Nehru Nagar, Belagavi',
      'Taught by qualified B.E graduate lecturers (Laxmi & Pooja)',
    ],
  },

  about: {
    story:
      'MASTERMIND ACADEMY is a learning centre in Nehru Nagar, Belagavi, open from 7:00 AM to 8:30 PM and built around one simple idea: students learn best when they practise, not just listen. Our classes are small and personal. Every student gets attention, every doubt gets answered, and every session gives them a chance to speak, write and think for themselves. Whether a child needs guidance in school core subjects or a graduate is preparing for interviews, we work at their pace until they feel ready.',
    approach: [
      {
        step: '01',
        title: 'Learn',
        description: 'Clear concepts explained in simple language.',
      },
      {
        step: '02',
        title: 'Practice',
        description: 'Regular speaking, writing and revision, so nothing stays theoretical.',
      },
      {
        step: '03',
        title: 'Excel',
        description: 'The confidence to perform in exams, interviews and everyday life.',
      },
    ],
    leadershipNote:
      'Classes at MASTERMIND ACADEMY in Nehru Nagar, Belagavi are taught by qualified B.E graduate lecturers: Laxmi (B.E), who has 10+ years of prior HR experience along with teaching experience, and Pooja (B.E), who has 3+ years of experience in core subjects.',
  },

  whyChooseUs: [
    {
      title: 'Experienced B.E graduate lecturers',
      detail:
        'Learn from Laxmi (B.E, 10+ years of prior HR experience and teaching experience) and Pooja (B.E, 3+ years of experience in core subjects) who explain concepts in simple language and answer every doubt patiently.',
    },
    {
      title: 'Three focused academic & communication tracks',
      detail:
        'Spoken English classes across 4 levels, all core subjects from Class 6th to 10th (CBSE, ICSE, KVS, State Board), and core subjects for B.E, B.Com and Diploma students.',
    },
    {
      title: 'Online and offline options for Spoken English',
      detail:
        'Attend classroom sessions in Nehru Nagar, Belagavi (open 7:00 AM to 8:30 PM), or join online Spoken English classes across Karnataka for Beginners or Intermediates and Advanced Level.',
    },
    {
      title: 'Short, goal-based Spoken English courses of 2 to 3 months',
      detail:
        'Focused 2 to 3 month courses help learners build steady speaking fluency and interview readiness without dragging through theory.',
    },
    {
      title: 'Focus on speaking practice and core concept clarity',
      detail:
        'Every session gives students a chance to speak, write and think for themselves so confidence builds step by step.',
    },
    {
      title: 'Convenient hours from 7:00 AM to 8:30 PM',
      detail:
        'Our Nehru Nagar, Belagavi centre is open from 7:00 AM to 8:30 PM with a friendly, personal classroom environment.',
    },
  ],

  homeAtAGlance: {
    whoItIsFor: 'Spoken English learners of all ages, School students (Classes 6th to 10th), and College students (B.E, B.Com, Diploma)',
    mode: 'Offline in Nehru Nagar, Belagavi (7:00 AM to 8:30 PM) plus Online for Spoken English Beginners or Intermediates and Advanced Level',
    duration: '2 to 3 months for Spoken English (4 levels); ongoing academic support for Classes 6th to 10th and B.E, B.Com & Diploma core subjects',
    location: 'Nehru Nagar, Belagavi, Karnataka 590010',
    howToEnrol: 'Call 90194 16236 or 81239 50627, send a WhatsApp enquiry, or visit the centre',
  },

  programs: [
    {
      id: 'spoken-english',
      slug: '/spoken-english-classes-belagavi',
      shortTitle: 'Spoken English Classes',
      title: 'Spoken English Classes (Online and Offline)',
      seoTitle: 'Spoken English Classes in Belagavi | MASTERMIND ACADEMY',
      seoDescription:
        'Spoken English is for everyone: kids, housewives, freshers, job seekers & students. 4 levels: Kids, Beginners/Intermediates, Advanced & Interview Mastery.',
      h1: 'Spoken English Classes in Nehru Nagar, Belagavi (Online and Offline)',
      summary:
        'Spoken English is for everyone: kids, housewives, freshers, job seekers, students, etc. Four structured levels: Kids, Beginners or Intermediates, Advanced Level, and Interview Mastery.',
      whoItIsFor: 'Spoken English is for everyone: kids, housewives, freshers, job seekers, students, etc.',
      mode: 'Offline in Nehru Nagar, Belagavi & Online across Karnataka (Kids batch is offline only)',
      duration: '2 to 3 months depending on level',
      batches: [
        {
          level: 'Kids',
          mode: 'Offline (Nehru Nagar, Belagavi)',
          duration: '2 months',
          focus: 'Vocabulary, pronunciation and speaking without fear.',
          courseModeSchema: 'onsite',
        },
        {
          level: 'Beginners or Intermediates',
          mode: 'Online and Offline',
          duration: '2 to 3 months',
          focus: 'Fluency, grammar in daily use and comfortable everyday conversation.',
          courseModeSchema: 'blended',
        },
        {
          level: 'Advanced Level',
          mode: 'Online and Offline',
          duration: '2 to 3 months',
          focus: 'Fluency, clear expression and confident conversation at college, at work and in public.',
          courseModeSchema: 'blended',
        },
        {
          level: 'Interview Mastery',
          mode: 'Practical coaching (Nehru Nagar, Belagavi)',
          duration: '2 months',
          focus: 'Self-introduction, common interview questions, body language, group discussion, mock interviews and grooming.',
          courseModeSchema: 'onsite',
        },
      ],
      whatsappMessage:
        'Hello MASTERMIND ACADEMY, I would like details about Spoken English classes (Kids / Beginners or Intermediates / Advanced Level / Interview Mastery) in Belagavi.',
      atAGlance: {
        whoItIsFor: 'Spoken English is for everyone: kids, housewives, freshers, job seekers, students, etc.',
        mode: 'Kids & Interview Mastery: Offline. Beginners or Intermediates & Advanced Level: Online and Offline',
        duration: 'Kids & Interview Mastery: 2 months. Beginners or Intermediates & Advanced Level: 2 to 3 months',
        location: 'Nehru Nagar, Belagavi, Karnataka 590010 (plus Online across Karnataka)',
        howToEnrol: 'Call 90194 16236 / 81239 50627 or send a WhatsApp enquiry',
      },
      aeoSections: [
        {
          question: 'Which is the best place to learn spoken English in Belagavi?',
          directAnswer:
            'MASTERMIND ACADEMY in Nehru Nagar, Belagavi offers practical Spoken English classes built around daily speaking practice rather than only theory. Spoken English is for everyone: kids, housewives, freshers, job seekers, students, etc., with four levels taught by B.E graduate lecturers.',
          detail:
            'Our four Spoken English levels cover Kids, Beginners or Intermediates, Advanced Level, and Interview Mastery, giving every learner personal attention until they speak comfortably.',
        },
        {
          question: 'What are the levels in the Spoken English course at MASTERMIND ACADEMY?',
          directAnswer:
            'Spoken English at MASTERMIND ACADEMY in Belagavi includes four levels: Kids (Offline, 2 months), Beginners or Intermediates (Online and Offline, 2 to 3 months), Advanced Level (Online and Offline, 2 to 3 months), and Interview Mastery (2 months).',
          detail:
            'Short, goal-based courses keep every learner focused on steady improvement week after week, with regular speaking practice in each session.',
        },
        {
          question: 'Are online spoken English classes available in Karnataka?',
          directAnswer:
            'Yes, MASTERMIND ACADEMY provides online Spoken English classes for learners in Belagavi and across Karnataka. Online batches are available for Beginners or Intermediates and Advanced Level, while the Kids batch is offline only at our Nehru Nagar, Belagavi centre.',
          detail:
            'Both online and offline batches follow our Learn, Practice, Excel approach so learners practise speaking aloud and receive direct guidance.',
        },
      ],
      relatedSlugs: [
        '/interview-mastery-personality-development-belagavi',
        '/school-tuition-classes-6-to-10-belagavi',
        '/contact',
      ],
    },
    {
      id: 'interview-mastery',
      slug: '/interview-mastery-personality-development-belagavi',
      shortTitle: 'Interview Mastery',
      title: 'Interview Mastery with Personality Development',
      seoTitle: 'Interview Mastery Classes Belagavi | MASTERMIND ACADEMY',
      seoDescription:
        'Practical 2-month Interview Mastery & Personality Development classes in Nehru Nagar, Belagavi covering self-introduction, GD, mock interviews and grooming.',
      h1: 'Interview Mastery with Personality Development in Belagavi',
      summary:
        'A practical 2-month program for students, freshers and job seekers covering self-introduction, common interview questions, body language, group discussion, mock interviews and grooming.',
      whoItIsFor: 'College students, freshers and job seekers',
      mode: 'Practical classroom coaching in Nehru Nagar, Belagavi',
      duration: '2 months',
      curriculum: [
        'Self-introduction and answering common interview questions',
        'Body language, voice and eye contact',
        'Communication and presentation skills',
        'Group discussion and mock interviews',
        'Grooming, etiquette and confidence building',
      ],
      whatsappMessage:
        'Hello MASTERMIND ACADEMY, I would like to enquire about the 2-month Interview Mastery with Personality Development program in Belagavi.',
      atAGlance: {
        whoItIsFor: 'College students, freshers and job seekers preparing for interviews',
        mode: 'Practical coaching at Nehru Nagar, Belagavi',
        duration: '2 months',
        location: 'Nehru Nagar, Belagavi, Karnataka 590010',
        howToEnrol: 'Call 90194 16236 / 81239 50627 or WhatsApp us for batch details',
      },
      aeoSections: [
        {
          question: 'Do you offer interview preparation classes in Belagavi?',
          directAnswer:
            'Yes, MASTERMIND ACADEMY in Nehru Nagar, Belagavi offers a practical 2-month Interview Mastery with Personality Development program (also part of our four Spoken English levels) for students, freshers and job seekers. It covers self-introduction, answering common interview questions, body language, communication skills, group discussion, mock interviews, and grooming and etiquette.',
          detail:
            'We work at each learner’s pace so graduates who feel nervous about a first interview can practise speaking clearly and calmly until they feel ready.',
        },
        {
          question: 'What is covered in Personality Development classes at MASTERMIND ACADEMY?',
          directAnswer:
            'Personality Development at MASTERMIND ACADEMY in Belagavi covers body language, voice and eye contact, communication and presentation skills, group discussion, mock interviews, and grooming, etiquette and confidence building across a focused 2-month schedule.',
          detail:
            'Sessions emphasise practical speaking and presentation rather than only listening to theory.',
        },
      ],
      relatedSlugs: [
        '/spoken-english-classes-belagavi',
        '/be-bca-diploma-classes-belagavi',
        '/contact',
      ],
    },
    {
      id: 'school-tuition',
      slug: '/school-tuition-classes-6-to-10-belagavi',
      shortTitle: 'Classes 6th to 10th (All Core Subjects)',
      title: 'Classes 6th to 10th — All Core Subjects (CBSE, ICSE, KVS, State Board)',
      seoTitle: 'Classes 6th to 10th Tuition Belagavi | All Core Subjects',
      seoDescription:
        'All core subjects tuition for Classes 6th to 10th in Nehru Nagar, Belagavi across CBSE, ICSE, KVS and State Board. Open 7:00 AM to 8:30 PM.',
      h1: 'Classes 6th to 10th — All Core Subjects in Nehru Nagar, Belagavi',
      summary:
        'Complete coaching for all core subjects from Class 6th to 10th across CBSE, ICSE, KVS and State Board. We help students build strong basics, finish their syllabus on time and prepare calmly for exams.',
      whoItIsFor: 'School students from Class 6th to 10th (All Core Subjects)',
      mode: 'Offline classroom tuition in Nehru Nagar, Belagavi (Open 7:00 AM to 8:30 PM)',
      duration: 'Academic year guidance and exam preparation',
      boards: ['CBSE', 'ICSE', 'KVS', 'State Board'],
      whatsappMessage:
        'Hello MASTERMIND ACADEMY, I would like to enquire about Classes 6th to 10th all core subjects tuition (CBSE / ICSE / KVS / State Board) in Nehru Nagar, Belagavi.',
      atAGlance: {
        whoItIsFor: 'Students from Class 6th to 10th covering all core subjects across CBSE, ICSE, KVS and State Board',
        mode: 'Offline tuition at Nehru Nagar, Belagavi (7:00 AM to 8:30 PM)',
        duration: 'Ongoing academic guidance and exam revision',
        location: 'Nehru Nagar, Belagavi, Karnataka 590010',
        howToEnrol: 'Call 90194 16236 / 81239 50627 or visit the centre',
      },
      aeoSections: [
        {
          question: 'Which boards and subjects do you teach for Classes 6th to 10th in Belagavi?',
          directAnswer:
            'MASTERMIND ACADEMY in Nehru Nagar, Belagavi teaches all core subjects from Class 6th to 10th across four school boards: CBSE, ICSE, KVS and Karnataka State Board. We help students build strong basics, finish their syllabus on time and prepare calmly for exams.',
          detail:
            'Our classes are small and personal. Every student gets attention, every doubt gets answered, and regular writing and revision keep every core subject clear.',
        },
        {
          question: 'How does MASTERMIND ACADEMY help students master core school subjects?',
          directAnswer:
            'At MASTERMIND ACADEMY in Belagavi, qualified B.E graduate lecturers — including Pooja (B.E) with 3+ years of experience in core subjects — explain concepts in simple language rather than only dictating notes. Students practise writing and revising regularly until each chapter feels clear before exams.',
          detail:
            'Whether a child needs help catching up in a core school subject or staying consistent through the term, our Learn, Practice, Excel approach supports steady progress.',
        },
      ],
      relatedSlugs: [
        '/spoken-english-classes-belagavi',
        '/be-bca-diploma-classes-belagavi',
        '/lecturers',
      ],
    },
    {
      id: 'be-bca-diploma',
      slug: '/be-bca-diploma-classes-belagavi',
      shortTitle: 'B.E, B.Com & Diploma (Core Subjects)',
      title: 'Core Subjects for B.E, B.Com and Diploma Students',
      seoTitle: 'B.E, B.Com & Diploma Core Subjects Belagavi | MASTERMIND ACADEMY',
      seoDescription:
        'Core subject coaching for B.E, B.Com and Diploma students in Nehru Nagar, Belagavi taught by qualified B.E lecturers. Open 7:00 AM to 8:30 PM.',
      h1: 'Core Subjects for B.E, B.Com and Diploma Students in Belagavi',
      summary:
        'Dedicated core subject coaching for college students pursuing B.E, B.Com and Diploma courses, taught by qualified B.E graduate lecturers in Nehru Nagar, Belagavi.',
      whoItIsFor: 'College students pursuing B.E, B.Com and Diploma courses',
      mode: 'Classroom guidance in Nehru Nagar, Belagavi (Open 7:00 AM to 8:30 PM)',
      duration: 'Semester-aligned core subject coaching',
      subjects: [], // Hidden in UI until individual subject list is confirmed
      whatsappMessage:
        'Hello MASTERMIND ACADEMY, I would like to ask about core subject classes for B.E / B.Com / Diploma students in Belagavi.',
      atAGlance: {
        whoItIsFor: 'B.E, B.Com and Diploma college students in Belagavi',
        mode: 'Classroom coaching in Nehru Nagar, Belagavi (7:00 AM to 8:30 PM)',
        duration: 'Ongoing core subject academic coaching',
        location: 'Nehru Nagar, Belagavi, Karnataka 590010',
        howToEnrol: 'Call 90194 16236 / 81239 50627 or WhatsApp us with your course and semester',
      },
      aeoSections: [
        {
          question: 'Does MASTERMIND ACADEMY in Belagavi teach core subjects for B.E, B.Com and Diploma students?',
          directAnswer:
            'Yes, MASTERMIND ACADEMY in Nehru Nagar, Belagavi offers dedicated coaching in core subjects for B.E, B.Com and Diploma students. Taught by qualified B.E graduate lecturers — including Pooja (B.E) with 3+ years of experience in core subjects — sessions focus on clear fundamentals, problem solving and exam readiness.',
          detail:
            'Call or message us on WhatsApp with your stream (B.E, B.Com or Diploma) and semester to check current subject batches and timings between 7:00 AM and 8:30 PM.',
        },
      ],
      relatedSlugs: [
        '/spoken-english-classes-belagavi',
        '/school-tuition-classes-6-to-10-belagavi',
        '/contact',
      ],
    },
  ] as ProgramItem[],

  lecturers: [
    {
      id: 'laxmi',
      name: 'Laxmi',
      qualification: 'B.E',
      role: 'Lecturer, MASTERMIND ACADEMY',
      experience: '10+ years of prior HR experience & teaching experience',
      focusArea: 'Spoken English (All 4 Levels) & Interview Mastery',
      bio: 'Laxmi (B.E) has 10+ years of prior professional experience working in HR, along with hands-on experience in teaching. At MASTERMIND ACADEMY in Nehru Nagar, Belagavi, she combines her HR background and teaching experience to guide kids, housewives, freshers, job seekers and students across all four Spoken English levels — including Interview Mastery, communication clarity and personal confidence.',
      photo: '', // Optional real portrait path when available
    },
    {
      id: 'pooja',
      name: 'Pooja',
      qualification: 'B.E',
      role: 'Lecturer, MASTERMIND ACADEMY',
      experience: '3+ years of experience in core subjects',
      focusArea: 'Classes 6th to 10th & B.E, B.Com, Diploma Core Subjects',
      bio: 'Pooja (B.E) brings 3+ years of experience in core subjects to MASTERMIND ACADEMY in Nehru Nagar, Belagavi. She teaches all core subjects for Classes 6th to 10th (CBSE, ICSE, KVS and State Board) as well as core subjects for B.E, B.Com and Diploma students with clear explanations, regular revision and personal attention.',
      photo: '', // Optional real portrait path when available
    },
  ] as Lecturer[],

  faqs: [
    {
      question: 'Who can join the Spoken English course?',
      answer:
        'Spoken English is for everyone: kids, housewives, freshers, job seekers, students, etc. We offer four levels at MASTERMIND ACADEMY in Belagavi: Kids, Beginners or Intermediates, Advanced Level, and Interview Mastery.',
      category: 'spoken-english',
    },
    {
      question: 'Are online classes available?',
      answer:
        'Yes, for Beginners or Intermediates and Advanced Level. The Kids batch is offline only at our Nehru Nagar, Belagavi centre.',
      category: 'spoken-english',
    },
    {
      question: 'What are the institute timings at MASTERMIND ACADEMY?',
      answer:
        'MASTERMIND ACADEMY in Nehru Nagar, Belagavi is open from 7:00 AM to 8:30 PM. Call or WhatsApp us on 90194 16236 or 81239 50627 to check batch slots within these hours.',
      category: 'general',
    },
    {
      question: 'How long are the Spoken English courses?',
      answer:
        'Spoken English runs 2 to 3 months depending on the level (Kids: 2 months; Beginners or Intermediates & Advanced Level: 2 to 3 months; Interview Mastery: 2 months).',
      category: 'spoken-english',
    },
    {
      question: 'Do you teach all core subjects and school boards for Classes 6th to 10th?',
      answer:
        'Yes. We cover all core subjects for Classes 6th to 10th across CBSE, ICSE, KVS and State Board at MASTERMIND ACADEMY in Nehru Nagar, Belagavi.',
      category: 'school-tuition',
    },
    {
      question: 'Do you offer core subject coaching for college students?',
      answer:
        'Yes. MASTERMIND ACADEMY offers dedicated coaching in core subjects for B.E, B.Com and Diploma students in Nehru Nagar, Belagavi.',
      category: 'general',
    },
    {
      question: 'What is taught in the Interview Mastery level?',
      answer:
        'Interview Mastery with Personality Development is a 2-month practical level covering self-introduction and common interview questions, body language, voice and eye contact, communication and presentation skills, group discussion, mock interviews, and grooming and etiquette.',
      category: 'interview-mastery',
    },
    {
      question: 'Who teaches the classes at MASTERMIND ACADEMY, Belagavi?',
      answer:
        'Classes at MASTERMIND ACADEMY in Nehru Nagar, Belagavi are taught by qualified B.E graduate lecturers: Laxmi (B.E), who has 10+ years of prior HR experience along with teaching experience, and Pooja (B.E), who has 3+ years of experience in core subjects.',
      category: 'general',
    },
    {
      question: 'How do I contact Help & Support or submit a privacy request under the DPDP Act?',
      answer:
        'For help, support, consent withdrawal, or any personal data request under India’s Digital Personal Data Protection (DPDP) Act, 2023, email mastermindacademy2627@gmail.com, call 90194 16236 / 81239 50627 (7:00 AM to 8:30 PM), or use our DPDP Data Rights page.',
      category: 'general',
    },
    {
      question: 'How do I enrol or ask about fees?',
      answer:
        'Call or WhatsApp us on 90194 16236 or 81239 50627, email mastermindacademy2627@gmail.com, or visit our centre in Nehru Nagar, Belagavi, Karnataka 590010 between 7:00 AM and 8:30 PM.',
      category: 'general',
    },
  ] as FaqItem[],

  // Auto-hidden everywhere until real, verified data is supplied
  testimonials: [] as Testimonial[],
  galleryImages: [] as GalleryImage[],
  fees: {
    visible: false,
    note: '',
    items: [] as FeeRow[],
  },

  footer: {
    copyright: '© MASTERMIND ACADEMY, Belagavi. Education is food to a hungry soul.',
  },
};

export function getWhatsAppUrl(message?: string): string {
  const digits = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');
  const text = encodeURIComponent(message || siteConfig.whatsappDefaultMessage);
  return `https://wa.me/${digits}?text=${text}`;
}

export function getTelHref(phoneIndex = 0): string {
  return sanitizeTelHref(siteConfig.phonesE164[phoneIndex] || siteConfig.phonesE164[0]);
}

export function getSafeEmail(): string {
  return sanitizeEmail(siteConfig.email);
}

export function getSafeGoogleMapsEmbedUrl(): string {
  return sanitizeGoogleMapsEmbedUrl(siteConfig.location.googleMapsEmbedUrl);
}

export function getDirectionsUrl(): string {
  const custom = sanitizeExternalUrl(siteConfig.location.googleMapsDirectionsUrl);
  if (custom) {
    return custom;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    siteConfig.location.googleMapsFallbackQuery
  )}`;
}

export function getOpenInMapsUrl(): string {
  const custom = sanitizeExternalUrl(siteConfig.location.googleMapsDirectionsUrl);
  if (custom) {
    return custom;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteConfig.location.googleMapsFallbackQuery
  )}`;
}

export function getFilledSocialLinks(): { id: string; label: string; url: string }[] {
  const list: { id: string; label: string; url: string }[] = [];
  const instagram = sanitizeExternalUrl(siteConfig.social.instagram);
  if (instagram) {
    list.push({ id: 'instagram', label: 'Instagram', url: instagram });
  }
  const facebook = sanitizeExternalUrl(siteConfig.social.facebook);
  if (facebook) {
    list.push({ id: 'facebook', label: 'Facebook', url: facebook });
  }
  const youtube = sanitizeExternalUrl(siteConfig.social.youtube);
  if (youtube) {
    list.push({ id: 'youtube', label: 'YouTube', url: youtube });
  }
  for (const other of siteConfig.social.others) {
    const safeUrl = sanitizeExternalUrl(other.url);
    if (safeUrl && other.label.trim()) {
      list.push({ id: other.label.toLowerCase(), label: other.label.trim(), url: safeUrl });
    }
  }
  return list;
}

export const CORE_PROGRAM_IDS: ProgramItem['id'][] = [
  'spoken-english',
  'school-tuition',
  'be-bca-diploma',
];

export function getCorePrograms(): ProgramItem[] {
  return CORE_PROGRAM_IDS.map((id) => siteConfig.programs.find((p) => p.id === id)).filter(
    (p): p is ProgramItem => Boolean(p)
  );
}

export function getProgramById(id: ProgramItem['id']): ProgramItem {
  const found = siteConfig.programs.find((p) => p.id === id);
  if (!found) {
    return siteConfig.programs[0];
  }
  return found;
}

export function getProgramBySlug(slug: string): ProgramItem | undefined {
  return siteConfig.programs.find((p) => p.slug === slug);
}

export function getLecturerById(id: string): Lecturer | undefined {
  const normalized = id.trim().toLowerCase();
  return siteConfig.lecturers.find((l) => l.id.toLowerCase() === normalized);
}
