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
 * 2.  address.landmark             : Nearby landmark in Nehru Nagar, 2nd Cross, Belagavi
 * 3.  location.googleMapsEmbedUrl  : Google Maps iframe embed URL (Share -> Embed a map)
 * 4.  location.latitude            : Exact latitude coordinate (e.g. "15.8825")
 * 5.  location.longitude           : Exact longitude coordinate (e.g. "74.5135")
 * 6.  social.instagram             : Full Instagram profile URL
 * 7.  social.facebook              : Full Facebook page URL
 * 8.  social.youtube               : Full YouTube channel URL
 * 9.  social.others                : Any other verified directory or social profile URLs
 * 10. lecturers[].photo            : Optional real portrait photo for Laxmi (B.E) and Pooja (B.E)
 * 11. programs (be-bca-diploma).subjects : Confirmed individual subject list for B.E, B.Com and Diploma
 * 12. mediaSlots.*                 : Real classroom or centre photos (replace WebP files in /public/images/)
 * 13. testimonials                 : Real, verified student or parent reviews (section stays hidden while empty)
 * 14. galleryImages                : Real classroom or campus photos with descriptive alt text
 * 15. fees                         : Set fees.visible = true and add confirmed fee rows when ready
 * 16. tickerMessages               : Top marquee messages (add "Admissions Open" only when you choose to)
 * 17. facts                        : Add real verified counts (e.g. students taught, years) whenever ready
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
  highlights: string[];
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
  whoItIsForList: string[];
  mode: string;
  duration: string;
  boards?: string[];
  batches?: ProgramBatch[];
  curriculum?: string[];
  subjects?: string[]; // Hidden automatically when empty
  whatsappMessage: string;
  atAGlance: {
    whoItIsFor: string;
    whoItIsForList?: string[];
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
  teachesList: string[];
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

export const INTERVIEW_PROGRAM_NAME =
  'Interview Mastery with Personality Skill Development Program';

export const SPOKEN_ENGLISH_AUDIENCE = [
  'KIDS',
  'HOUSEWIVES',
  'FRESHERS',
  'JOB SEEKERS',
  'STUDENTS',
] as const;

export const INTERVIEW_PROGRAM_TOPICS = [
  'Self-introduction & personal pitch',
  'Answering common & HR interview questions',
  'Group Discussion (GD) sessions & teamwork practice',
  'Mock interviews (one-on-one & panel) with personal feedback',
  'Body language, posture, voice modulation & eye contact',
  'Communication, fluency & presentation skills',
  'Professional grooming, workplace etiquette & confidence building',
  'Overcoming stage fear & interview readiness',
] as const;

export const siteConfig = {
  name: 'MASTERMIND ACADEMY',
  tagline: 'Learn · Practice · Excel',
  subline: 'Education is food to a hungry soul.',
  canonicalDescription:
    'MASTERMIND ACADEMY is a coaching institute in Nehru Nagar, 2nd Cross, Belagavi, Karnataka (open 7:00 AM to 8:30 PM), offering Online and Offline classes across India across three dedicated programs: Spoken English classes (Kids, Beginners or Intermediates, Advanced Level, and Interview Mastery with Personality Skill Development Program), all subjects for Classes 6th to 10th (CBSE, ICSE, KVS and State Board), and core subjects for B.E, B.Com and Diploma students.',
  lastUpdated: 'November 2026',
  lastUpdatedIso: '2026-11-22',

  // Recoloured official logo on clean white background + original file fallback
  brand: {
    logoUrl: '/src/assets/images/mastermind_logo_recoloured_1795261606320.jpg',
    logoFallbackUrl: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_3.52.36_PM_41b83410.jpeg',
    logoAlt: 'MASTERMIND ACADEMY — Education is food to a hungry soul. Learn, Practice, Excel',
  },

  // Top 32px Navy & Gold scrolling ticker (add "Admissions Open" here only when ready)
  tickerMessages: [
    'SPOKEN ENGLISH · ONLINE AND OFFLINE AVAILABLE ACROSS INDIA',
    'CLASSES 6TH TO 10TH · ALL SUBJECTS (CBSE, ICSE, KVS, STATE BOARD)',
    'INTERVIEW MASTERY WITH PERSONALITY SKILL DEVELOPMENT PROGRAM',
    'CORE SUBJECTS FOR B.E, B.COM & DIPLOMA',
    'NEHRU NAGAR, 2ND CROSS, BELAGAVI · OPEN 7:00 AM TO 8:30 PM',
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
      eyebrow: 'NEHRU NAGAR, 2ND CROSS, BELAGAVI · 7:00 AM – 8:30 PM',
      headline: 'SPOKEN ENGLISH CLASSES',
      subline:
        'Online and Offline available across India — for KIDS, HOUSEWIVES, FRESHERS, JOB SEEKERS & STUDENTS.',
      pills: [
        'Kids',
        'Beginners / Intermediates',
        'Advanced Level',
        'Interview Mastery with Personality Skill Development Program',
      ],
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
      eyebrow: 'SCHOOL TUITION · ALL SUBJECTS · ONLINE & OFFLINE',
      headline: 'CLASSES 6TH TO 10TH',
      subline: 'All subjects covered for CBSE, ICSE, KVS and State Board students.',
      pills: ['All Subjects', 'CBSE & ICSE', 'KVS & State Board'],
      ctaLabel: 'Explore Tuition',
      ctaHref: '/school-tuition-classes-6-to-10-belagavi',
      enquiryProgram: 'Classes 6th to 10th (All Subjects)',
      image: '/images/school-tuition.webp',
      imageAlt: 'School learners writing notes and studying textbooks at a wooden desk',
      transparentCutout: false,
    },
    {
      id: 'slide-college-classes',
      programId: 'be-bca-diploma',
      eyebrow: 'COLLEGE COACHING · CORE SUBJECTS · ONLINE & OFFLINE',
      headline: 'B.E, B.COM & DIPLOMA',
      subline: 'Core subjects taught by qualified B.E graduate lecturers.',
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
      label: 'All Subjects',
      sublabel: 'CBSE, ICSE, KVS, State',
    },
    {
      id: 'levels',
      display: '4',
      countTarget: 4,
      label: 'Spoken English Levels',
      sublabel: 'Including Interview Mastery with Personality Skill Development Program',
    },
    {
      id: 'streams',
      display: '3',
      countTarget: 3,
      label: 'College Streams',
      sublabel: 'B.E, B.Com & Diploma Core Subjects',
    },
    {
      id: 'modes',
      display: '2',
      countTarget: 2,
      label: 'Learning Modes',
      sublabel: 'Online and Offline available across India',
    },
  ] as FactItem[],

  // Fill this with your live HTTPS domain before production launch (no trailing slash).
  siteUrl: '',

  phones: ['90194 16236', '81239 50627'],
  phonesE164: ['+919019416236', '+918123950627'],
  whatsappNumber: '919019416236',
  whatsappDefaultMessage:
    'Hello MASTERMIND ACADEMY, I would like to enquire about your classes (Online / Offline) at Nehru Nagar, 2nd Cross, Belagavi.',

  // Contact & Institute Hours
  email: 'mastermindacademy2627@gmail.com',
  timings: '7:00 AM to 8:30 PM',
  opensTime: '07:00',
  closesTime: '20:30',
  openingHoursSchema: [] as string[],

  address: {
    street: 'Nehru Nagar, 2nd Cross',
    city: 'Belagavi',
    state: 'Karnataka',
    postalCode: '590010',
    country: 'India',
    countryCode: 'IN',
    landmark: '', // Auto-hidden when empty
    fullFormatted: 'Nehru Nagar, 2nd Cross, Belagavi, Karnataka 590010',
    napLine: 'MASTERMIND ACADEMY, Nehru Nagar, 2nd Cross, Belagavi, Karnataka, 590010',
  },

  areasServed: 'Nehru Nagar, 2nd Cross, Belagavi (Offline) and Across India (Online)',

  location: {
    googleMapsEmbedUrl: '',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=15.879063,74.514022',
    googleMapsSatelliteUrl:
      'https://www.google.com/maps/place/15.879063,74.514022/@15.879063,74.514022,20z/data=!3m1!1e3',
    googleMapsFallbackQuery:
      '15.879063,74.514022',
    latitude: '15.879063',
    longitude: '74.514022',
    plusCode: 'VGH7+JJC Belagavi, Karnataka',
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
      'At MASTERMIND ACADEMY in Nehru Nagar, 2nd Cross, Belagavi (Online and Offline available across India), we offer Spoken English classes (4 levels including Interview Mastery with Personality Skill Development Program), all subjects for Classes 6th to 10th, and core subjects for B.E, B.Com and Diploma students.',
    highlights: [
      'Spoken English (Kids, Beginners or Intermediates, Advanced Level & Interview Mastery with Personality Skill Development Program)',
      'Classes 6th to 10th — All Subjects (CBSE, ICSE, KVS, State Board)',
      'Core subjects for B.E, B.Com and Diploma students',
      'Online and Offline available across India · Open 7:00 AM to 8:30 PM',
      'Taught by qualified B.E graduate lecturers (Laxmi & Pooja)',
    ],
  },

  about: {
    story:
      'MASTERMIND ACADEMY is a learning centre in Nehru Nagar, 2nd Cross, Belagavi, open from 7:00 AM to 8:30 PM with Online and Offline options available across India. Built around one simple idea — students learn best when they practise, not just listen — our classes are small and personal. Every student gets attention, every doubt gets answered, and every session gives them a chance to speak, write and think for themselves. Whether a child needs guidance across all school subjects or a graduate is preparing through our Interview Mastery with Personality Skill Development Program, we work at their pace until they feel ready.',
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
      'Classes at MASTERMIND ACADEMY in Nehru Nagar, 2nd Cross, Belagavi are taught by qualified B.E graduate lecturers: Laxmi (B.E), who has 10+ years of prior HR experience along with teaching experience, and Pooja (B.E), who has 3+ years of experience in core subjects.',
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
        'Spoken English classes across 4 levels (including Interview Mastery with Personality Skill Development Program), all subjects from Class 6th to 10th (CBSE, ICSE, KVS, State Board), and core subjects for B.E, B.Com and Diploma students.',
    },
    {
      title: 'Online and Offline available across India',
      detail:
        'Attend classroom sessions at Nehru Nagar, 2nd Cross, Belagavi (open 7:00 AM to 8:30 PM), or join interactive online classes from anywhere across India.',
    },
    {
      title: 'Short, goal-based Spoken English courses of 2 to 3 months',
      detail:
        'Focused 2 to 3 month courses help KIDS, HOUSEWIVES, FRESHERS, JOB SEEKERS and STUDENTS build steady speaking fluency and interview readiness without dragging through theory.',
    },
    {
      title: 'Focus on speaking practice and concept clarity',
      detail:
        'Every session gives students a chance to speak, write and think for themselves so confidence builds step by step.',
    },
    {
      title: 'Convenient hours from 7:00 AM to 8:30 PM',
      detail:
        'Our Nehru Nagar, 2nd Cross, Belagavi centre is open from 7:00 AM to 8:30 PM with a friendly, personal classroom environment.',
    },
  ],

  homeAtAGlance: {
    whoItIsFor:
      'KIDS, HOUSEWIVES, FRESHERS, JOB SEEKERS, STUDENTS (Spoken English), School students (Classes 6th to 10th — All Subjects), and College students (B.E, B.Com, Diploma Core Subjects)',
    mode: 'Online and Offline available (Nehru Nagar, 2nd Cross, Belagavi & Across India)',
    duration:
      '2 to 3 months for Spoken English (4 levels); ongoing academic support for Classes 6th to 10th and B.E, B.Com & Diploma core subjects',
    location: 'Nehru Nagar, 2nd Cross, Belagavi, Karnataka 590010 & Online across India',
    howToEnrol: 'Call 90194 16236 or 81239 50627, send a WhatsApp enquiry, or visit the centre',
  },

  programs: [
    {
      id: 'spoken-english',
      slug: '/spoken-english-classes-belagavi',
      shortTitle: 'Spoken English Classes',
      title: 'Spoken English Classes (Online and Offline)',
      seoTitle: 'Spoken English Classes in Belagavi & Online Across India | MASTERMIND ACADEMY',
      seoDescription:
        'Online and Offline Spoken English classes across India for KIDS, HOUSEWIVES, FRESHERS, JOB SEEKERS & STUDENTS. 4 levels including Interview Mastery with Personality Skill Development Program.',
      h1: 'Spoken English Classes — Online and Offline Across India',
      summary:
        'Spoken English is for everyone: KIDS, HOUSEWIVES, FRESHERS, JOB SEEKERS and STUDENTS. Four structured levels — Kids, Beginners or Intermediates, Advanced Level, and Interview Mastery with Personality Skill Development Program — with Online and Offline available.',
      whoItIsFor:
        'Spoken English is for everyone: KIDS, HOUSEWIVES, FRESHERS, JOB SEEKERS, STUDENTS.',
      whoItIsForList: [...SPOKEN_ENGLISH_AUDIENCE],
      mode: 'Online and Offline available (Nehru Nagar, 2nd Cross, Belagavi & Across India)',
      duration: '2 to 3 months depending on level',
      batches: [
        {
          level: 'Kids',
          mode: 'Online and Offline available',
          duration: '2 months',
          focus: 'Vocabulary, pronunciation and speaking without fear.',
          highlights: [
            'Everyday vocabulary & sentence formation',
            'Clear pronunciation & reading aloud',
            'Interactive speaking games & stage confidence',
          ],
          courseModeSchema: 'blended',
        },
        {
          level: 'Beginners or Intermediates',
          mode: 'Online and Offline available',
          duration: '2 to 3 months',
          focus: 'Fluency, grammar in daily use and comfortable everyday conversation.',
          highlights: [
            'Practical grammar for daily speaking',
            'Everyday conversation & hesitation removal',
            'Listening, speaking & daily dialogue practice',
          ],
          courseModeSchema: 'blended',
        },
        {
          level: 'Advanced Level',
          mode: 'Online and Offline available',
          duration: '2 to 3 months',
          focus:
            'Fluency, clear expression and confident conversation at college, at work and in public.',
          highlights: [
            'Fluent workplace & academic communication',
            'Public speaking, articulation & presentation skills',
            'Structured thinking & expressive vocabulary',
          ],
          courseModeSchema: 'blended',
        },
        {
          level: INTERVIEW_PROGRAM_NAME,
          mode: 'Online and Offline available',
          duration: '2 months',
          focus:
            'Self-introduction, Group Discussion (GD) sessions, mock interviews, body language, communication skills and professional grooming.',
          highlights: [...INTERVIEW_PROGRAM_TOPICS],
          courseModeSchema: 'blended',
        },
      ],
      whatsappMessage:
        'Hello MASTERMIND ACADEMY, I would like details about Spoken English classes (Kids / Beginners or Intermediates / Advanced Level / Interview Mastery with Personality Skill Development Program) — Online / Offline.',
      atAGlance: {
        whoItIsFor: 'KIDS, HOUSEWIVES, FRESHERS, JOB SEEKERS, STUDENTS',
        whoItIsForList: [...SPOKEN_ENGLISH_AUDIENCE],
        mode: 'Online and Offline available',
        duration:
          'Kids & Interview Mastery with Personality Skill Development Program: 2 months. Beginners or Intermediates & Advanced Level: 2 to 3 months',
        location: 'Nehru Nagar, 2nd Cross, Belagavi, Karnataka 590010 & Online across India',
        howToEnrol: 'Call 90194 16236 / 81239 50627 or send a WhatsApp enquiry',
      },
      aeoSections: [
        {
          question: 'Who can join Spoken English classes at MASTERMIND ACADEMY?',
          directAnswer:
            'Spoken English is for everyone: KIDS, HOUSEWIVES, FRESHERS, JOB SEEKERS and STUDENTS. Classes at MASTERMIND ACADEMY (Nehru Nagar, 2nd Cross, Belagavi) are available both Online across India and Offline at our centre, taught by qualified B.E graduate lecturers.',
          detail:
            'Our four Spoken English levels cover Kids, Beginners or Intermediates, Advanced Level, and Interview Mastery with Personality Skill Development Program, giving every learner personal attention until they speak comfortably.',
        },
        {
          question: 'What are the levels in the Spoken English course at MASTERMIND ACADEMY?',
          directAnswer:
            'Spoken English at MASTERMIND ACADEMY includes four levels — all with Online and Offline options available: Kids (2 months), Beginners or Intermediates (2 to 3 months), Advanced Level (2 to 3 months), and Interview Mastery with Personality Skill Development Program (2 months).',
          detail:
            'Short, goal-based courses keep every learner focused on steady improvement week after week, with regular speaking practice in each session.',
        },
        {
          question: 'Are online Spoken English classes available across India?',
          directAnswer:
            'Yes, MASTERMIND ACADEMY offers both Online and Offline options. Learners from anywhere across India can join live interactive online batches, or attend offline classroom sessions at Nehru Nagar, 2nd Cross, Belagavi.',
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
      shortTitle: INTERVIEW_PROGRAM_NAME,
      title: INTERVIEW_PROGRAM_NAME,
      seoTitle:
        'Interview Mastery with Personality Skill Development Program | MASTERMIND ACADEMY',
      seoDescription:
        'Practical 2-month Interview Mastery with Personality Skill Development Program (Online & Offline across India) covering self-introduction, GD sessions, mock interviews, body language and grooming.',
      h1: 'Interview Mastery with Personality Skill Development Program',
      summary:
        'A practical 2-month program (Online and Offline available across India) for COLLEGE STUDENTS, FRESHERS and JOB SEEKERS covering self-introduction, Group Discussion (GD) sessions, mock interviews, body language, communication skills and grooming.',
      whoItIsFor: 'COLLEGE STUDENTS, FRESHERS and JOB SEEKERS',
      whoItIsForList: ['COLLEGE STUDENTS', 'FRESHERS', 'JOB SEEKERS'],
      mode: 'Online and Offline available (Nehru Nagar, 2nd Cross, Belagavi & Across India)',
      duration: '2 months',
      curriculum: [...INTERVIEW_PROGRAM_TOPICS],
      whatsappMessage:
        'Hello MASTERMIND ACADEMY, I would like to enquire about the 2-month Interview Mastery with Personality Skill Development Program (Online / Offline).',
      atAGlance: {
        whoItIsFor: 'COLLEGE STUDENTS, FRESHERS, JOB SEEKERS',
        whoItIsForList: ['COLLEGE STUDENTS', 'FRESHERS', 'JOB SEEKERS'],
        mode: 'Online and Offline available',
        duration: '2 months',
        location: 'Nehru Nagar, 2nd Cross, Belagavi, Karnataka 590010 & Online across India',
        howToEnrol: 'Call 90194 16236 / 81239 50627 or WhatsApp us for batch details',
      },
      aeoSections: [
        {
          question:
            'What does the Interview Mastery with Personality Skill Development Program cover?',
          directAnswer:
            'The 2-month Interview Mastery with Personality Skill Development Program at MASTERMIND ACADEMY (Online and Offline available across India) provides self-introduction coaching, answering common and HR interview questions, Group Discussion (GD) sessions, one-on-one and panel mock interviews, body language, posture, voice modulation, eye contact, presentation skills, and professional grooming.',
          detail:
            'We work at each learner’s pace so FRESHERS, COLLEGE STUDENTS and JOB SEEKERS who feel nervous about an interview can practise speaking clearly and calmly until they feel ready.',
        },
        {
          question:
            'Who teaches the Interview Mastery with Personality Skill Development Program?',
          directAnswer:
            'The program is guided by Laxmi (B.E), who has 10+ years of prior HR experience along with teaching experience, helping learners understand real interview expectations, Group Discussion dynamics, confident body language and clear answers.',
          detail:
            'Sessions emphasise practical speaking, live GD rounds and realistic mock interviews rather than only listening to theory.',
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
      shortTitle: 'Classes 6th to 10th (All Subjects)',
      title: 'Classes 6th to 10th — All Subjects (CBSE, ICSE, KVS, State Board)',
      seoTitle: 'Classes 6th to 10th Tuition (All Subjects) | MASTERMIND ACADEMY',
      seoDescription:
        'All subjects tuition for Classes 6th to 10th across CBSE, ICSE, KVS and State Board at MASTERMIND ACADEMY, Nehru Nagar, 2nd Cross, Belagavi (Online & Offline available). Open 7:00 AM to 8:30 PM.',
      h1: 'Classes 6th to 10th — All Subjects (CBSE, ICSE, KVS & State Board)',
      summary:
        'Complete coaching for all subjects from Class 6th to 10th across CBSE, ICSE, KVS and State Board — with Online and Offline options available. We help students build strong basics, finish their syllabus on time and prepare calmly for exams.',
      whoItIsFor: 'SCHOOL STUDENTS from Class 6th to 10th (All Subjects)',
      whoItIsForList: [
        'CLASS 6TH STUDENTS',
        'CLASS 7TH & 8TH STUDENTS',
        'CLASS 9TH & 10TH BOARD STUDENTS',
        'CBSE, ICSE, KVS & STATE BOARD LEARNERS',
      ],
      mode: 'Online and Offline available (Nehru Nagar, 2nd Cross, Belagavi & Across India · Open 7:00 AM to 8:30 PM)',
      duration: 'Academic year guidance and exam preparation',
      boards: ['CBSE', 'ICSE', 'KVS', 'State Board'],
      whatsappMessage:
        'Hello MASTERMIND ACADEMY, I would like to enquire about Classes 6th to 10th all subjects tuition (CBSE / ICSE / KVS / State Board) — Online / Offline.',
      atAGlance: {
        whoItIsFor: 'SCHOOL STUDENTS from Class 6th to 10th covering all subjects',
        whoItIsForList: [
          'CLASS 6TH TO 10TH STUDENTS',
          'CBSE, ICSE, KVS & STATE BOARD',
        ],
        mode: 'Online and Offline available (7:00 AM to 8:30 PM)',
        duration: 'Ongoing academic guidance and exam revision',
        location: 'Nehru Nagar, 2nd Cross, Belagavi, Karnataka 590010 & Online across India',
        howToEnrol: 'Call 90194 16236 / 81239 50627 or visit the centre',
      },
      aeoSections: [
        {
          question: 'Which boards and subjects do you teach for Classes 6th to 10th?',
          directAnswer:
            'MASTERMIND ACADEMY in Nehru Nagar, 2nd Cross, Belagavi teaches all subjects from Class 6th to 10th across four school boards: CBSE, ICSE, KVS and State Board, with Online and Offline options available. We help students build strong basics, finish their syllabus on time and prepare calmly for exams.',
          detail:
            'Our classes are small and personal. Every student gets attention, every doubt gets answered, and regular writing and revision keep every subject clear.',
        },
        {
          question: 'How does MASTERMIND ACADEMY help students excel in Classes 6th to 10th?',
          directAnswer:
            'At MASTERMIND ACADEMY, qualified B.E graduate lecturers — including Pooja (B.E) with 3+ years of experience — explain concepts across all subjects in simple language rather than only dictating notes. Students practise writing and revising regularly until each chapter feels clear before exams.',
          detail:
            'Whether a child needs help catching up or staying consistent through the term, our Learn, Practice, Excel approach supports steady progress.',
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
      seoTitle: 'B.E, B.Com & Diploma Core Subjects | MASTERMIND ACADEMY',
      seoDescription:
        'Core subject coaching for B.E, B.Com and Diploma students (Online & Offline available across India) at MASTERMIND ACADEMY, Nehru Nagar, 2nd Cross, Belagavi. Open 7:00 AM to 8:30 PM.',
      h1: 'Core Subjects for B.E, B.Com and Diploma Students',
      summary:
        'Dedicated core subject coaching for college students pursuing B.E, B.Com and Diploma courses, taught by qualified B.E graduate lecturers — Online and Offline available.',
      whoItIsFor: 'COLLEGE STUDENTS pursuing B.E, B.Com and Diploma courses',
      whoItIsForList: [
        'B.E (ENGINEERING) STUDENTS',
        'B.COM STUDENTS',
        'DIPLOMA STUDENTS',
      ],
      mode: 'Online and Offline available (Nehru Nagar, 2nd Cross, Belagavi & Across India · Open 7:00 AM to 8:30 PM)',
      duration: 'Semester-aligned core subject coaching',
      subjects: [], // Hidden in UI until individual subject list is confirmed
      whatsappMessage:
        'Hello MASTERMIND ACADEMY, I would like to ask about core subject classes for B.E / B.Com / Diploma students (Online / Offline).',
      atAGlance: {
        whoItIsFor: 'B.E, B.Com and Diploma COLLEGE STUDENTS',
        whoItIsForList: ['B.E STUDENTS', 'B.COM STUDENTS', 'DIPLOMA STUDENTS'],
        mode: 'Online and Offline available (7:00 AM to 8:30 PM)',
        duration: 'Ongoing core subject academic coaching',
        location: 'Nehru Nagar, 2nd Cross, Belagavi, Karnataka 590010 & Online across India',
        howToEnrol: 'Call 90194 16236 / 81239 50627 or WhatsApp us with your course and semester',
      },
      aeoSections: [
        {
          question:
            'Does MASTERMIND ACADEMY teach core subjects for B.E, B.Com and Diploma students?',
          directAnswer:
            'Yes, MASTERMIND ACADEMY in Nehru Nagar, 2nd Cross, Belagavi offers dedicated coaching in core subjects for B.E, B.Com and Diploma students — with Online and Offline options available across India. Taught by qualified B.E graduate lecturers, including Pooja (B.E) with 3+ years of experience in core subjects, sessions focus on clear fundamentals, problem solving and exam readiness.',
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
      focusArea:
        'Spoken English (All 4 Levels) & Interview Mastery with Personality Skill Development Program',
      teachesList: [
        'Spoken English — Kids, Beginners or Intermediates & Advanced Level',
        INTERVIEW_PROGRAM_NAME,
        'Self-introduction, Group Discussion (GD) sessions & mock interviews',
        'Body language, communication clarity & workplace confidence',
      ],
      bio: 'Laxmi (B.E) has 10+ years of prior professional experience working in HR, along with hands-on experience in teaching. At MASTERMIND ACADEMY in Nehru Nagar, 2nd Cross, Belagavi, she combines her HR background and teaching experience to guide KIDS, HOUSEWIVES, FRESHERS, JOB SEEKERS and STUDENTS across all four Spoken English levels — including the Interview Mastery with Personality Skill Development Program, communication clarity and personal confidence.',
      photo: '', // Optional real portrait path when available
    },
    {
      id: 'pooja',
      name: 'Pooja',
      qualification: 'B.E',
      role: 'Lecturer, MASTERMIND ACADEMY',
      experience: '3+ years of experience in core subjects',
      focusArea: 'Classes 6th to 10th (All Subjects) & B.E, B.Com, Diploma Core Subjects',
      teachesList: [
        'Classes 6th to 10th — All Subjects (CBSE, ICSE, KVS & State Board)',
        'B.E Core Subjects',
        'B.Com Core Subjects',
        'Diploma Core Subjects',
      ],
      bio: 'Pooja (B.E) brings 3+ years of experience in core subjects to MASTERMIND ACADEMY in Nehru Nagar, 2nd Cross, Belagavi. She teaches all subjects for Classes 6th to 10th (CBSE, ICSE, KVS and State Board) as well as core subjects for B.E, B.Com and Diploma students with clear explanations, regular revision and personal attention.',
      photo: '', // Optional real portrait path when available
    },
  ] as Lecturer[],

  faqs: [
    {
      question: 'Who can join the Spoken English course?',
      answer:
        'Spoken English is for everyone: KIDS, HOUSEWIVES, FRESHERS, JOB SEEKERS and STUDENTS. We offer four levels at MASTERMIND ACADEMY (Online and Offline available across India): Kids, Beginners or Intermediates, Advanced Level, and Interview Mastery with Personality Skill Development Program.',
      category: 'spoken-english',
    },
    {
      question: 'Are Online and Offline classes available across India?',
      answer:
        'Yes. Both Online and Offline options are available. Students from anywhere across India can join live online classes, or attend offline classroom sessions at our Nehru Nagar, 2nd Cross, Belagavi centre.',
      category: 'spoken-english',
    },
    {
      question: 'What are the institute timings at MASTERMIND ACADEMY?',
      answer:
        'MASTERMIND ACADEMY in Nehru Nagar, 2nd Cross, Belagavi is open from 7:00 AM to 8:30 PM. Call or WhatsApp us on 90194 16236 or 81239 50627 to check batch slots within these hours.',
      category: 'general',
    },
    {
      question: 'How long are the Spoken English courses?',
      answer:
        'Spoken English runs 2 to 3 months depending on the level (Kids: 2 months; Beginners or Intermediates & Advanced Level: 2 to 3 months; Interview Mastery with Personality Skill Development Program: 2 months).',
      category: 'spoken-english',
    },
    {
      question: 'Do you teach all subjects and school boards for Classes 6th to 10th?',
      answer:
        'Yes. We cover all subjects for Classes 6th to 10th across CBSE, ICSE, KVS and State Board at MASTERMIND ACADEMY (Online and Offline available).',
      category: 'school-tuition',
    },
    {
      question: 'Do you offer core subject coaching for college students?',
      answer:
        'Yes. MASTERMIND ACADEMY offers dedicated coaching in core subjects for B.E, B.Com and Diploma students (Online and Offline available).',
      category: 'general',
    },
    {
      question:
        'What is taught in the Interview Mastery with Personality Skill Development Program?',
      answer:
        'The 2-month Interview Mastery with Personality Skill Development Program provides self-introduction coaching, answering common and HR interview questions, Group Discussion (GD) sessions, one-on-one and panel mock interviews, body language, posture, voice modulation and eye contact, communication and presentation skills, and professional grooming and etiquette.',
      category: 'interview-mastery',
    },
    {
      question: 'Who teaches the classes at MASTERMIND ACADEMY?',
      answer:
        'Classes at MASTERMIND ACADEMY in Nehru Nagar, 2nd Cross, Belagavi are taught by qualified B.E graduate lecturers: Laxmi (B.E), who has 10+ years of prior HR experience along with teaching experience, and Pooja (B.E), who has 3+ years of experience in core subjects.',
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
        'Call or WhatsApp us on 90194 16236 or 81239 50627, email mastermindacademy2627@gmail.com, or visit our centre at Nehru Nagar, 2nd Cross, Belagavi, Karnataka 590010 between 7:00 AM and 8:30 PM.',
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
  const lat = siteConfig.location.latitude.trim();
  const lng = siteConfig.location.longitude.trim();
  if (lat && lng) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${lat},${lng}`)}`;
  }
  const custom = sanitizeExternalUrl(siteConfig.location.googleMapsDirectionsUrl);
  if (custom) {
    return custom;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    siteConfig.location.googleMapsFallbackQuery
  )}`;
}

export function getOpenInMapsUrl(): string {
  const lat = siteConfig.location.latitude.trim();
  const lng = siteConfig.location.longitude.trim();
  if (lat && lng) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lat},${lng}`)}`;
  }
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
