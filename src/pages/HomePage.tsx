import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Smile,
} from 'lucide-react';
import {
  COMPETITIVE_EXAM_HIGHLIGHTS,
  INTERVIEW_PROGRAM_NAME,
  SPOKEN_ENGLISH_AUDIENCE,
  getDirectionsUrl,
  getProgramById,
  getSafeEmail,
  getTelHref,
  getWhatsAppUrl,
  siteConfig,
  type ProgramItem,
} from '../data/siteConfig';
import { buildCourseListSchema, buildFaqSchema, buildPersonSchemas } from '../lib/seo';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useEnquiryModal } from '../context/EnquiryModalContext';
import { Layout } from '../components/Layout';
import { HeroBannerCarousel } from '../components/HeroBannerCarousel';
import { SmartPhoto } from '../components/SmartPhoto';
import { WhatsAppEnquiryForm } from '../components/WhatsAppEnquiryForm';
import { FormatOrdinals } from '../components/FormatText';
import { AcademyLocationMap } from '../components/AcademyLocationMap';
import {
  AnimatedCounter,
  EASE_OUT,
  Reveal,
  SectionHeading,
} from '../components/MotionPrimitives';

const posterOrder: ProgramItem['id'][] = [
  'competitive-exam-english',
  'spoken-english',
  'be-bca-diploma',
  'school-tuition',
];

const posterCardStyles: Record<
  ProgramItem['id'],
  {
    bgClass: string;
    titleClass: string;
    subClass: string;
    curveFill: string;
    btnClass: string;
    posterTitle: string;
    posterSub: string;
    caption: string;
    photo: string;
    alt: string;
  }
> = {
  'competitive-exam-english': {
    bgClass: 'bg-[var(--cta)]',
    titleClass: 'text-white',
    subClass: 'text-[var(--gold)]',
    curveFill: '#E9BF5A',
    btnClass: 'bg-[var(--gold)] text-[var(--ink)]',
    posterTitle: 'COMPETITIVE EXAM ENGLISH',
    posterSub: 'Grammar & Language Skills · Online & Offline',
    caption:
      'Complete Grammar Concepts, Exam-Oriented Practice & Mock Tests for COMPETITIVE EXAM ASPIRANTS',
    photo: siteConfig.mediaSlots.competitiveExamVisual,
    alt: 'Competitive exam aspirants practising English grammar and timed mock tests in a bright classroom',
  },
  'spoken-english': {
    bgClass: 'bg-[var(--royal)]',
    titleClass: 'text-white',
    subClass: 'text-white/90',
    curveFill: '#E9BF5A',
    btnClass: 'bg-white text-[var(--navy)]',
    posterTitle: 'SPOKEN ENGLISH',
    posterSub: '4 Levels · Online & Offline Across India',
    caption:
      'Kids, Beginners/Intermediates, Advanced & Interview Mastery with Personality Skill Development Program',
    photo: siteConfig.mediaSlots.spokenEnglishVisual,
    alt: 'Learners practising spoken English conversation in a bright study room',
  },
  'be-bca-diploma': {
    bgClass: 'bg-[var(--navy)]',
    titleClass: 'text-white',
    subClass: 'text-[var(--gold)]',
    curveFill: '#E9BF5A',
    btnClass: 'bg-[var(--gold)] text-[var(--ink)]',
    posterTitle: 'B.E, B.COM & DIPLOMA',
    posterSub: 'Core Subjects · Online & Offline',
    caption: 'Core subject coaching by qualified B.E graduate lecturers',
    photo: siteConfig.mediaSlots.beBcaDiplomaVisual,
    alt: 'College learners collaborating over technical notebooks and a laptop',
  },
  'school-tuition': {
    bgClass: 'bg-[var(--gold)]',
    titleClass: 'text-[var(--ink)]',
    subClass: 'text-[var(--ink)]/85',
    curveFill: '#FFFFFF',
    btnClass: 'bg-[var(--ink)] text-white',
    posterTitle: 'CLASSES 6TH TO 10TH',
    posterSub: 'All Subjects · CBSE, ICSE, KVS, State',
    caption: 'All school subjects with strong basics & exam preparation (Online & Offline)',
    photo: siteConfig.mediaSlots.schoolTuitionVisual,
    alt: 'School learners studying textbooks and writing notes at a wooden desk',
  },
  'interview-mastery': {
    bgClass: 'bg-[var(--navy)]',
    titleClass: 'text-white',
    subClass: 'text-[var(--gold)]',
    curveFill: '#E9BF5A',
    btnClass: 'bg-[var(--gold)] text-[var(--ink)]',
    posterTitle: 'INTERVIEW MASTERY WITH PERSONALITY SKILL DEVELOPMENT',
    posterSub: 'Online & Offline · 2 Months',
    caption: 'Self-introduction, GD sessions, mock interviews & body language',
    photo: siteConfig.mediaSlots.interviewMasteryVisual,
    alt: 'Graduate practising clear answers during a mock interview session',
  },
};

const levelIcons = [Smile, BookOpen, Award, Briefcase];

const glanceTabOrder: { id: ProgramItem['id']; label: string }[] = [
  { id: 'competitive-exam-english', label: 'Competitive Exam English' },
  { id: 'spoken-english', label: 'Spoken English' },
  { id: 'be-bca-diploma', label: 'B.E, B.Com & Diploma' },
  { id: 'school-tuition', label: 'Classes 6th to 10th' },
];

export function HomePage() {
  const { openEnquiryModal } = useEnquiryModal();
  const prefersReduced = useReducedMotion();
  const [activeTabId, setActiveTabId] = useState<ProgramItem['id']>('competitive-exam-english');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [testimonialOffset, setTestimonialOffset] = useState(0);

  const breadcrumbs = useMemo(() => [{ name: 'Home', path: '/' }], []);
  const schemas = useMemo(
    () => [buildCourseListSchema(), buildFaqSchema(siteConfig.faqs), ...buildPersonSchemas()],
    []
  );

  useDocumentHead({
    path: '/',
    title: 'MASTERMIND ACADEMY Belagavi | Competitive & Spoken English',
    description:
      'Join MASTERMIND ACADEMY in Nehru Nagar, 2nd Cross, Belagavi or Online across India for Competitive Exam English, Spoken English, B.E/B.Com/Diploma & 6th–10th.',
    pageType: 'WebPage',
    breadcrumbs,
    schemas,
  });

  const orderedPrograms = posterOrder
    .map((id) => siteConfig.programs.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const spokenEnglishProgram = getProgramById('spoken-english');
  const spokenEnglishBatches = spokenEnglishProgram.batches ?? [];

  const activeProgram =
    siteConfig.programs.find((p) => p.id === activeTabId) ?? siteConfig.programs[0];

  const activeDetailItems: string[] = activeProgram.boards?.length
    ? activeProgram.boards.map((board) => `${board} — All Subjects`)
    : activeProgram.batches?.length
      ? activeProgram.batches.map((b) => b.level)
      : activeProgram.curriculum?.length
        ? activeProgram.curriculum.slice(0, 4)
        : ['B.E Core Subjects', 'B.Com Core Subjects', 'Diploma Core Subjects'];

  const activeBoardsLabel = activeProgram.boards?.length
    ? 'Subjects & Boards'
    : activeProgram.batches?.length
      ? 'Four Levels'
      : activeProgram.id === 'competitive-exam-english'
        ? 'Course Highlights'
        : 'Core Tracks';

  const safeEmail = getSafeEmail();
  const testimonials = siteConfig.testimonials;
  const visibleTestimonials = useMemo(() => {
    if (testimonials.length === 0) return [];
    const count = Math.min(3, testimonials.length);
    return Array.from({ length: count }, (_, i) => {
      return testimonials[(testimonialOffset + i) % testimonials.length];
    });
  }, [testimonials, testimonialOffset]);

  return (
    <Layout breadcrumbs={breadcrumbs}>
      {/* =====================================================================
          3) HERO = POSTER BANNER CAROUSEL
      ===================================================================== */}
      <HeroBannerCarousel />

      {/* =====================================================================
          4) OUR COURSES — POSTER CARDS (rounded-20px, solid brand colours)
      ===================================================================== */}
      <section id="courses" className="py-[56px] lg:py-[96px]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <Reveal>
            <SectionHeading title="Our Courses" />
          </Reveal>

          {/* 4 Core Offerings in Exact Priority Order: 2x2 Balanced Grid on Mobile/Tablet, 4-Column Row on Desktop */}
          <div className="mt-8 lg:mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {orderedPrograms.map((program, idx) => {
              const style = posterCardStyles[program.id];
              return (
                <Reveal key={program.id} delay={idx * 0.05}>
                  <div className="flex flex-col h-full">
                    <Link
                      to={program.slug}
                      className={`poster-card group relative block w-full overflow-hidden aspect-[4/5] ${style.bgClass}`}
                    >
                      {/* Soft Decorative Curved Shape Behind Photo */}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 260 220"
                        className="pointer-events-none absolute -right-4 -bottom-4 w-[78%] h-[62%] opacity-90"
                      >
                        <path
                          d="M40,220 C15,120 70,25 185,10 C225,5 250,25 260,55 L260,220 Z"
                          fill={style.curveFill}
                          fillOpacity="0.28"
                        />
                        <circle cx="195" cy="155" r="88" fill={style.curveFill} fillOpacity="0.88" />
                      </svg>

                      {/* Top-Left Big Condensed Title & Small Sub-line */}
                      <div className="relative z-10 p-3 sm:p-4 lg:p-5">
                        <h3
                          className={`font-poster uppercase text-[21px] min-[390px]:text-[24px] sm:text-[28px] lg:text-[26px] xl:text-[30px] leading-[0.98] ${style.titleClass}`}
                        >
                          <FormatOrdinals text={style.posterTitle} />
                        </h3>
                        <p
                          className={`mt-1 text-[11px] sm:text-xs font-semibold leading-tight ${style.subClass}`}
                        >
                          <FormatOrdinals text={style.posterSub} />
                        </p>
                      </div>

                      {/* Bottom-Right Photo Slot */}
                      <div className="pointer-events-none absolute right-2 bottom-2 sm:right-3 sm:bottom-3 z-10 aspect-[4/3] w-[64%] sm:w-[68%] overflow-hidden rounded-xl border-2 border-white shadow-md bg-[var(--sand-placeholder)] transition-transform duration-300 group-hover:scale-[1.03]">
                        <SmartPhoto
                          src={style.photo}
                          alt={style.alt}
                          width={640}
                          height={480}
                          aspectClass="h-full w-full"
                          placeholderLabel={program.shortTitle}
                        />
                      </div>

                      {/* "Learn More" Button — Always Visible on Mobile, Hover-Reveal on Desktop */}
                      <span
                        className={`absolute left-2.5 bottom-2.5 sm:left-3.5 sm:bottom-3.5 z-20 inline-flex items-center gap-1 rounded-lg px-2 py-1 sm:px-2.5 sm:py-1.5 text-[10.5px] sm:text-xs font-bold shadow-sm transition-all duration-200 opacity-100 lg:opacity-0 lg:translate-y-1.5 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 lg:group-focus-visible:opacity-100 lg:group-focus-visible:translate-y-0 ${style.btnClass}`}
                      >
                        <span>Learn More</span>
                        <ArrowRight className="h-3 w-3 shrink-0" aria-hidden="true" />
                      </span>
                    </Link>

                    {/* Short Caption Underneath Each Card */}
                    <p className="mt-2 px-0.5 text-xs sm:text-sm font-medium leading-snug text-[var(--muted)] text-center">
                      <FormatOrdinals text={style.caption} />
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4B) FEATURED #1 COURSE — COMPETITIVE EXAM ENGLISH (Navy & Gold Banner)
      ===================================================================== */}
      <section className="py-[56px] lg:py-[72px] pt-0 lg:pt-0">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[20px] bg-[var(--navy)] text-white p-6 sm:p-8 lg:p-10 shadow-[0_16px_34px_-16px_rgba(16,28,58,0.35)] border-2 border-[var(--gold)]">
              <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-center">
                {/* Left Content */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                      MASTERMIND ACADEMY · LEARN • PRACTISE • ACHIEVE
                    </p>
                    <h2 className="font-poster uppercase text-[36px] sm:text-[48px] leading-[0.96] text-white">
                      Competitive Exam English
                    </h2>
                    <p className="text-base sm:text-lg font-bold text-[var(--gold)]">
                      Grammar &amp; Language Skills
                    </p>
                    <p
                      data-aeo-summary="true"
                      className="text-sm sm:text-base leading-relaxed text-white/90 max-w-2xl"
                    >
                      <FormatOrdinals text="Comprehensive English grammar training for competitive examinations — now taught at our Nehru Nagar, 2nd Cross, Belagavi centre and live online across India." />
                    </p>
                  </div>

                  {/* Three Core Highlights as Bullets */}
                  <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    {COMPETITIVE_EXAM_HIGHLIGHTS.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 rounded-xl border border-white/15 bg-white/10 p-3.5 text-sm font-bold text-white"
                      >
                        <CheckCircle2
                          className="h-4 w-4 shrink-0 text-[var(--gold)] mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Mode & Audience Row */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 rounded-2xl border border-[var(--gold)]/35 bg-[#091B45] p-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
                        Mode
                      </p>
                      <p className="mt-1 text-sm sm:text-base font-bold text-white">
                        Online &amp; Offline
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
                        For
                      </p>
                      <ul className="mt-1 list-disc pl-5 text-sm sm:text-base font-extrabold tracking-wide text-white marker:text-[var(--gold)]">
                        <li>COMPETITIVE EXAM ASPIRANTS</li>
                      </ul>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() =>
                        openEnquiryModal('Competitive Exam English (Grammar & Language Skills)')
                      }
                      className="btn-cta inline-flex min-h-[48px] items-center gap-2 rounded-xl px-6 py-2.5 text-sm sm:text-base font-bold cursor-pointer whitespace-nowrap"
                    >
                      <span>Enquire Now</span>
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </button>

                    <Link
                      to="/competitive-exam-english-belagavi"
                      className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-[var(--gold)] hover:underline underline-offset-4"
                    >
                      <span>Explore Competitive Exam Course</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                {/* Right Photo */}
                <div className="lg:col-span-5">
                  <div className="mx-auto max-w-[400px] lg:max-w-none overflow-hidden rounded-2xl border-4 border-white shadow-lg">
                    <SmartPhoto
                      src={siteConfig.mediaSlots.competitiveExamVisual}
                      alt="Competitive exam aspirants practising English grammar and timed tests in a bright classroom"
                      width={960}
                      height={720}
                      aspectClass="aspect-[4/3]"
                      placeholderLabel="Competitive Exam English"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================================
          5) PROMO STRIP — SPOKEN ENGLISH FOR EVERY LEVEL (Soft Gold Banner)
      ===================================================================== */}
      <section className="py-[56px] lg:py-[96px] pt-0 lg:pt-0">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[20px] bg-[var(--gold)] p-6 sm:p-8 lg:p-10 shadow-[0_14px_30px_-16px_rgba(16,28,58,0.22)]">
              <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-start">
                {/* Left Content: Heading + Highlighted Bulleted Audience + 4 Level Tiles */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--navy)]">
                      MASTERMIND ACADEMY · Online &amp; Offline Across India
                    </p>
                    <h2 className="font-poster uppercase text-[34px] sm:text-[44px] leading-none text-[var(--ink)]">
                      Spoken English for Every Level
                    </h2>

                    {/* Highlighted Capitalized Audience Bullet List */}
                    <div className="rounded-2xl bg-[var(--navy)] p-4 sm:p-5 text-white">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
                        Spoken English Is For Everyone
                      </p>
                      <ul className="mt-2.5 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 list-disc pl-5 text-sm sm:text-base font-extrabold tracking-wide text-white marker:text-[var(--gold)]">
                        {SPOKEN_ENGLISH_AUDIENCE.map((group) => (
                          <li key={group}>{group}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Four Level Tiles with Bulleted Points */}
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    {spokenEnglishBatches.map((batch, idx) => {
                      const Icon = levelIcons[idx] ?? BookOpen;
                      const isInterviewLevel = batch.level === INTERVIEW_PROGRAM_NAME;
                      return (
                        <div
                          key={batch.level}
                          className={`rounded-2xl bg-white/95 p-4 border border-[var(--ink)]/10 shadow-2xs flex flex-col justify-between gap-2.5 ${
                            isInterviewLevel ? 'sm:col-span-2' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--navy)] text-[var(--gold)]">
                              <Icon className="h-4 w-4" aria-hidden="true" />
                            </span>
                            <div className="min-w-0">
                              <h3 className="text-sm sm:text-base font-bold text-[var(--ink)] leading-snug">
                                {batch.level}
                              </h3>
                              <p className="mt-0.5 text-xs font-semibold text-[var(--royal)]">
                                {batch.mode} · <span className="tabular-nums">{batch.duration}</span>
                              </p>
                            </div>
                          </div>

                          <ul
                            className={`list-disc pl-5 space-y-1 text-xs sm:text-sm text-[var(--muted)] marker:text-[var(--royal)] ${
                              isInterviewLevel ? 'grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 space-y-0' : ''
                            }`}
                          >
                            {batch.highlights.map((point) => (
                              <li key={point}>{point}</li>
                            ))}
                          </ul>

                          {isInterviewLevel && (
                            <div className="pt-1">
                              <Link
                                to="/interview-mastery-personality-development-belagavi"
                                className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[var(--royal)] hover:underline underline-offset-4"
                              >
                                <span>Explore full program details</span>
                                <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                              </Link>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => openEnquiryModal('Spoken English (Beginners or Intermediates)')}
                      className="btn-cta inline-flex min-h-[48px] items-center gap-2 rounded-xl px-6 py-2.5 text-sm sm:text-base font-bold cursor-pointer whitespace-nowrap"
                    >
                      <span>Enquire Now</span>
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </button>

                    <Link
                      to="/spoken-english-classes-belagavi"
                      className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-[var(--navy)] hover:underline underline-offset-4"
                    >
                      <span>See batch details</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                {/* Right Student Photo Slot (Drops cleanly below on mobile) */}
                <div className="lg:col-span-4 lg:sticky lg:top-24">
                  <div className="mx-auto max-w-[360px] lg:max-w-none overflow-hidden rounded-2xl border-4 border-white shadow-md">
                    <SmartPhoto
                      src={siteConfig.mediaSlots.heroMain}
                      alt="Learners practising spoken English around a sunlit table"
                      width={960}
                      height={720}
                      aspectClass="aspect-[4/3]"
                      placeholderLabel="Spoken English Classes"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================================
          6) FIND US — LOCATION HIGHLIGHTED (Nehru Nagar, 2nd Cross + Satellite Map)
      ===================================================================== */}
      <section className="bg-white py-[56px] lg:py-[96px] border-y border-[var(--hairline)]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <Reveal>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              {/* Left: Heading, Address, Exact Coordinates & Action Buttons */}
              <div className="lg:col-span-5 space-y-5">
                <div className="space-y-2">
                  <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--gold-text)]">
                    <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>Offline Centre in Belagavi · Online Across India</span>
                  </p>
                  <h2 className="text-[28px] sm:text-[34px] font-bold leading-[1.15] text-[var(--ink)]">
                    <FormatOrdinals text="Find MASTERMIND ACADEMY at Nehru Nagar, 2nd Cross, Belagavi" />
                  </h2>
                </div>

                <address className="not-italic space-y-1.5 text-base text-[var(--muted)]">
                  <p className="font-bold text-[var(--ink)]">{siteConfig.name}</p>
                  <p>
                    <FormatOrdinals text={siteConfig.address.fullFormatted} />
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-[var(--muted)] tabular-nums">
                    GPS: {siteConfig.location.latitude}, {siteConfig.location.longitude} ·{' '}
                    {siteConfig.location.plusCode}
                  </p>
                  {siteConfig.address.landmark.trim() && (
                    <p className="text-sm">
                      <FormatOrdinals text={siteConfig.address.landmark.trim()} />
                    </p>
                  )}
                  {siteConfig.timings.trim() && (
                    <p className="inline-flex items-center gap-1.5 pt-1 text-sm font-bold text-[var(--royal)] tabular-nums">
                      <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Open: {siteConfig.timings.trim()}</span>
                    </p>
                  )}
                </address>

                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href={getDirectionsUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cta inline-flex min-h-[46px] items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold whitespace-nowrap"
                  >
                    <Navigation className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Get Directions</span>
                  </a>

                  <a
                    href={getTelHref(0)}
                    className="btn-press inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-[var(--navy)] bg-white px-5 py-2.5 text-sm font-bold text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white whitespace-nowrap tabular-nums"
                  >
                    <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Call</span>
                  </a>

                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-[var(--whatsapp)] px-5 py-2.5 text-sm font-bold text-[var(--ink)] hover:bg-[var(--whatsapp-hover)] whitespace-nowrap"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Right: Interactive Google Maps Satellite View at Exact Coordinates */}
              <div className="lg:col-span-7">
                <AcademyLocationMap />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================================
          7) PROGRAM DETAILS TABS — "COURSES AT A GLANCE"
      ===================================================================== */}
      <section className="py-[56px] lg:py-[96px]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <Reveal>
            <SectionHeading title="Courses at a Glance" />
          </Reveal>

          {/* Underline-Style Scrollable Tabs */}
          <div className="mt-8 border-b border-[var(--hairline)]">
            <div
              role="tablist"
              aria-label="Course details tabs"
              className="flex items-center justify-start sm:justify-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar -mb-px"
            >
              {glanceTabOrder.map((tab) => {
                const active = activeTabId === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveTabId(tab.id)}
                    className={`relative min-h-[48px] shrink-0 px-3 sm:px-4 py-3 text-sm sm:text-base font-bold transition-colors whitespace-nowrap cursor-pointer ${
                      active ? 'text-[var(--royal)]' : 'text-[var(--muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    <FormatOrdinals text={tab.label} />
                    {active && (
                      <motion.span
                        layoutId="courses-glance-underline"
                        transition={{ duration: 0.2, ease: EASE_OUT }}
                        className="absolute inset-x-0 bottom-0 h-[3px] rounded-t-full bg-[var(--royal)]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Compact White Info Card */}
          <div className="mx-auto mt-6 max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProgram.id}
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                role="tabpanel"
                className="card-coaching p-6 sm:p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[var(--hairline)] pb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
                    <FormatOrdinals text={activeProgram.title} />
                  </h3>
                  <Link
                    to={activeProgram.slug}
                    className="inline-flex min-h-[40px] items-center gap-1 text-sm font-bold text-[var(--royal)] hover:underline whitespace-nowrap"
                  >
                    <span>Full Details</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--gold-text)]">
                      Who it is for
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-[var(--ink)]">
                      <ul className="list-disc pl-4 space-y-1 font-bold marker:text-[var(--royal)]">
                        {activeProgram.whoItIsForList.map((item) => (
                          <li key={item}>
                            <FormatOrdinals text={item} />
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--gold-text)]">
                      Mode
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-[var(--ink)] font-medium">
                      <FormatOrdinals text={activeProgram.mode} />
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--gold-text)]">
                      Duration
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-[var(--ink)] font-medium tabular-nums">
                      <FormatOrdinals text={activeProgram.duration} />
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--gold-text)]">
                      {activeBoardsLabel}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-[var(--ink)] font-medium">
                      <ul className="list-disc pl-4 space-y-1 marker:text-[var(--royal)]">
                        {activeDetailItems.map((item) => (
                          <li key={item}>
                            <FormatOrdinals text={item} />
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 pt-5 border-t border-[var(--hairline)] flex flex-wrap items-center gap-3">
                  <a
                    href={getWhatsAppUrl(activeProgram.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-[var(--whatsapp)] px-5 py-2.5 text-sm font-bold text-[var(--ink)] hover:bg-[var(--whatsapp-hover)] whitespace-nowrap"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Enquire on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => openEnquiryModal(activeProgram.shortTitle)}
                    className="btn-press inline-flex min-h-[46px] items-center gap-1.5 rounded-xl border border-[var(--navy)] bg-white px-5 py-2.5 text-sm font-bold text-[var(--navy)] hover:bg-[var(--cream)] cursor-pointer whitespace-nowrap"
                  >
                    <span>Quick Enquiry Form</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Semantic Course Comparison Table for Quick Scanning, Google Featured Snippets & AEO/GEO */}
          <div className="mx-auto mt-8 max-w-5xl">
            <div data-aeo-summary="true" className="card-coaching overflow-hidden">
              <div className="border-b border-[var(--hairline)] bg-[var(--cream)]/70 px-5 py-3.5 sm:px-6">
                <h3 className="text-sm sm:text-base font-bold text-[var(--ink)]">
                  All Courses at MASTERMIND ACADEMY — Quick Comparison
                </h3>
                <p className="mt-0.5 text-xs text-[var(--muted)]">
                  <FormatOrdinals text="Offline at Nehru Nagar, 2nd Cross, Belagavi (7:00 AM–8:30 PM) & live Online across India." />
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left text-xs sm:text-sm">
                  <caption className="sr-only">
                    Comparison of priority coaching programs offered by MASTERMIND ACADEMY in Nehru
                    Nagar, 2nd Cross, Belagavi and online across India.
                  </caption>
                  <thead>
                    <tr className="border-b border-[var(--hairline)] bg-white text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--royal)]">
                      <th scope="col" className="px-4 py-3 sm:px-5">
                        Course
                      </th>
                      <th scope="col" className="px-4 py-3 sm:px-5">
                        Who It Is For
                      </th>
                      <th scope="col" className="px-4 py-3 sm:px-5">
                        Mode
                      </th>
                      <th scope="col" className="px-4 py-3 sm:px-5">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--hairline)] bg-white">
                    {orderedPrograms.map((program) => (
                      <tr key={program.id} className="hover:bg-[var(--cream)]/40 transition-colors">
                        <th scope="row" className="px-4 py-3 sm:px-5 font-bold text-[var(--ink)]">
                          <Link
                            to={program.slug}
                            className="text-[var(--navy)] hover:text-[var(--royal)] hover:underline underline-offset-2"
                          >
                            <FormatOrdinals text={program.title} />
                          </Link>
                        </th>
                        <td className="px-4 py-3 sm:px-5 text-[var(--muted)] font-medium">
                          <FormatOrdinals text={program.whoItIsForList.join(' · ')} />
                        </td>
                        <td className="px-4 py-3 sm:px-5 font-semibold text-[var(--ink)] whitespace-nowrap">
                          Online &amp; Offline
                        </td>
                        <td className="px-4 py-3 sm:px-5 text-[var(--muted)] tabular-nums">
                          <FormatOrdinals text={program.duration} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7B) OUR FACULTY — MEET OUR QUALIFIED B.E LECTURERS
      ===================================================================== */}
      <section className="bg-white py-[56px] lg:py-[96px] border-t border-[var(--hairline)]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 space-y-8">
          <Reveal>
            <SectionHeading
              title="Our Faculty"
              subtitle="Taught by qualified B.E graduate lecturers focused on clear concepts, daily speaking practice and personal attention."
            />
          </Reveal>

          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3.5 sm:gap-6">
            {siteConfig.lecturers.map((lecturer, idx) => (
              <Reveal key={lecturer.id} delay={idx * 0.06}>
                <Link
                  to={`/lecturers/${lecturer.id}`}
                  className="card-coaching card-coaching-hover group rounded-2xl border border-[var(--hairline)] bg-[var(--cream)] p-4 sm:p-6 h-full flex flex-col items-center justify-between text-center gap-3"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div
                      aria-hidden="true"
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--navy)] font-poster text-2xl text-[var(--gold)] ring-2 ring-[var(--gold)] ring-offset-2 ring-offset-[var(--cream)]"
                    >
                      {lecturer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[var(--ink)] group-hover:text-[var(--royal)] transition-colors">
                        {lecturer.name}, {lecturer.qualification}
                      </h3>
                      <p className="mt-1 inline-block rounded-md bg-[var(--gold)]/30 px-2 py-0.5 text-[11px] sm:text-xs font-bold text-[var(--navy)]">
                        {lecturer.experience}
                      </p>
                      <p className="mt-1.5 text-xs sm:text-sm text-[var(--muted)] line-clamp-3">
                        <FormatOrdinals text={lecturer.bio.trim()} />
                      </p>
                    </div>
                  </div>

                  <span className="mt-1 inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[var(--royal)]">
                    <span>View Profile</span>
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/lecturers"
              className="btn-press inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-[var(--navy)] bg-white px-5 py-2.5 text-sm font-bold text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white"
            >
              <span>Meet Our Faculty &amp; What They Teach</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8) TESTIMONIALS — 3-CARD CAROUSEL (HIDDEN AUTOMATICALLY WHILE EMPTY)
      ===================================================================== */}
      {testimonials.length > 0 && (
        <section className="bg-white py-[56px] lg:py-[96px] border-t border-[var(--hairline)]">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="flex flex-col items-center gap-4">
              <SectionHeading title="Loved by Students. Trusted by Parents." />

              {testimonials.length > 3 && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setTestimonialOffset(
                        (prev) => (prev - 1 + testimonials.length) % testimonials.length
                      )
                    }
                    aria-label="Previous testimonials"
                    className="btn-press inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--cream)] text-[var(--navy)] hover:border-[var(--royal)] cursor-pointer"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setTestimonialOffset((prev) => (prev + 1) % testimonials.length)
                    }
                    aria-label="Next testimonials"
                    className="btn-press inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--cream)] text-[var(--navy)] hover:border-[var(--royal)] cursor-pointer"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              {visibleTestimonials.map((item) => (
                <blockquote
                  key={`${item.name}-${item.program}`}
                  className="card-coaching p-6 flex flex-col justify-between gap-4"
                >
                  <p className="text-base leading-relaxed text-[var(--ink)]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <footer className="border-t border-[var(--hairline)] pt-3 text-xs font-bold text-[var(--navy)]">
                    {item.name} · {item.role} ({item.program})
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          9) FACTS BAND (FULL-WIDTH RED using --cta variable, Animated Once on Scroll)
      ===================================================================== */}
      <section aria-label="Institute facts" className="band-cta py-[56px] lg:py-[88px]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <Reveal>
            <SectionHeading title="Why Families Choose MASTERMIND ACADEMY" tone="dark" />
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {siteConfig.facts.map((fact, idx) => (
              <Reveal key={fact.id} delay={idx * 0.05}>
                <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-6 text-center backdrop-blur-[2px] h-full flex flex-col justify-center">
                  <div className="font-poster text-[44px] sm:text-[56px] leading-none text-[var(--gold)]">
                    <AnimatedCounter
                      display={fact.display}
                      target={fact.countTarget}
                      prefix={fact.countPrefix}
                      suffix={fact.countSuffix}
                    />
                  </div>
                  <div className="mt-2 text-base sm:text-lg font-bold text-white leading-snug">
                    <FormatOrdinals text={fact.label} />
                  </div>
                  {fact.sublabel && (
                    <div className="mt-0.5 text-xs sm:text-sm text-white/85">
                      <FormatOrdinals text={fact.sublabel} />
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          10) FAQ ACCORDION (Approved FAQs, FAQPage Schema Kept)
      ===================================================================== */}
      <section className="py-[56px] lg:py-[96px]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <Reveal>
            <SectionHeading title="Frequently Asked Questions" />
          </Reveal>

          <div className="mx-auto mt-8 max-w-3xl space-y-3">
            {siteConfig.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={faq.question} className="card-coaching overflow-hidden">
                  <h3 className="text-base font-bold text-[var(--ink)]">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="flex w-full min-h-[54px] items-center justify-between gap-4 px-5 py-3.5 text-left hover:bg-[var(--cream)]/60 transition-colors cursor-pointer"
                    >
                      <span>
                        <FormatOrdinals text={faq.question} />
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[var(--royal)] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>

                  <div
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        data-aeo-answer="true"
                        className="border-t border-[var(--hairline)] px-5 py-4 text-base leading-relaxed text-[var(--muted)]"
                      >
                        <FormatOrdinals text={faq.answer} />
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          11) "GOT ANY QUESTIONS?" FORM — 2-COLUMN CREAM CARD
      ===================================================================== */}
      <section id="enquire" className="bg-white py-[56px] lg:py-[96px] border-t border-[var(--hairline)]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <Reveal>
            <div className="rounded-[20px] border border-[var(--hairline)] bg-[var(--cream)] p-6 sm:p-8 lg:p-10 shadow-xs">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
                {/* Left Column */}
                <div className="lg:col-span-5 space-y-4">
                  <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--gold-text)]">
                    <Globe className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>MASTERMIND ACADEMY · Online &amp; Offline Across India</span>
                  </p>
                  <h2 className="font-poster uppercase text-[36px] sm:text-[46px] leading-none text-[var(--ink)]">
                    Got Any Questions?
                  </h2>
                  <p className="text-base leading-relaxed text-[var(--muted)]">
                    Fill the form and we will get in touch with you soon.
                  </p>

                  <div className="pt-2 space-y-1.5 text-sm font-semibold text-[var(--navy)] tabular-nums">
                    {siteConfig.phones.map((num, idx) => (
                      <div key={num}>
                        <a
                          href={getTelHref(idx)}
                          className="inline-flex min-h-[40px] items-center gap-2 hover:text-[var(--royal)]"
                        >
                          <Phone className="h-4 w-4 text-[var(--royal)] shrink-0" aria-hidden="true" />
                          <span>{num}</span>
                        </a>
                      </div>
                    ))}
                    {safeEmail && (
                      <div className="pt-1">
                        <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--gold-text)]">
                          Help &amp; Support Email
                        </span>
                        <a
                          href={`mailto:${safeEmail}`}
                          className="inline-flex min-h-[40px] items-center gap-2 hover:text-[var(--royal)] break-all"
                        >
                          <Mail className="h-4 w-4 text-[var(--royal)] shrink-0" aria-hidden="true" />
                          <span>{safeEmail}</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: WhatsApp Form */}
                <div className="lg:col-span-7">
                  <WhatsAppEnquiryForm />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
