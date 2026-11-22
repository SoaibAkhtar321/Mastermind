import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  Phone,
} from 'lucide-react';
import {
  INTERVIEW_PROGRAM_NAME,
  SPOKEN_ENGLISH_AUDIENCE,
  getProgramById,
  getProgramBySlug,
  getTelHref,
  getWhatsAppUrl,
  siteConfig,
  type ProgramItem,
} from '../data/siteConfig';
import { buildCourseSchemas, buildFaqSchema, getProgramFaqs } from '../lib/seo';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useEnquiryModal } from '../context/EnquiryModalContext';
import { Layout } from '../components/Layout';
import { AtAGlanceBox } from '../components/AtAGlanceBox';
import { SmartPhoto } from '../components/SmartPhoto';
import { WhatsAppEnquiryForm } from '../components/WhatsAppEnquiryForm';
import { FormatOrdinals } from '../components/FormatText';
import { EASE_OUT, Reveal, SectionHeading } from '../components/MotionPrimitives';

interface ProgramPageProps {
  programId: ProgramItem['id'];
}

const programPhotos: Record<ProgramItem['id'], { src: string; alt: string }> = {
  'spoken-english': {
    src: siteConfig.mediaSlots.spokenEnglishVisual,
    alt: 'Learners practising spoken English conversation together in a bright study room',
  },
  'school-tuition': {
    src: siteConfig.mediaSlots.schoolTuitionVisual,
    alt: 'School learners writing in notebooks and working through textbooks at a desk',
  },
  'interview-mastery': {
    src: siteConfig.mediaSlots.interviewMasteryVisual,
    alt: 'Young college graduate speaking clearly during a mock interview session',
  },
  'be-bca-diploma': {
    src: siteConfig.mediaSlots.beBcaDiplomaVisual,
    alt: 'College learners collaborating over technical notebooks and a laptop',
  },
};

export function ProgramPage({ programId }: ProgramPageProps) {
  const program = getProgramById(programId);
  const photo = programPhotos[program.id];
  const { openEnquiryModal } = useEnquiryModal();
  const prefersReduced = useReducedMotion();
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const breadcrumbs = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: program.shortTitle, path: program.slug },
    ],
    [program.shortTitle, program.slug]
  );

  const relevantFaqs = useMemo(() => getProgramFaqs(program.id), [program.id]);

  const schemas = useMemo(
    () => [...buildCourseSchemas(program), buildFaqSchema(relevantFaqs)],
    [program, relevantFaqs]
  );

  useDocumentHead({
    path: program.slug,
    title: program.seoTitle,
    description: program.seoDescription,
    pageType: 'WebPage',
    breadcrumbs,
    schemas,
  });

  const relatedLinks = program.relatedSlugs.map((slug) => {
    const found = getProgramBySlug(slug);
    if (found) {
      return {
        to: found.slug,
        title: found.shortTitle,
        subtitle: found.duration,
      };
    }
    if (slug === '/lecturers') {
      return {
        to: '/lecturers',
        title: 'Meet Our Lecturers',
        subtitle: 'Laxmi (B.E) and Pooja (B.E)',
      };
    }
    return {
      to: '/contact',
      title: 'Visit Nehru Nagar, 2nd Cross Centre',
      subtitle: 'Directions, phone and WhatsApp enquiry',
    };
  });

  return (
    <Layout breadcrumbs={breadcrumbs} whatsappMessage={program.whatsappMessage}>
      {/* POSTER-STYLE ROYAL BLUE & SOFT GOLD PAGE HERO */}
      <section className="relative overflow-hidden bg-[var(--royal)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0F2A6B] via-[#1F4FB5] to-[#1A439B]"
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 720 420"
          preserveAspectRatio="none"
          className="pointer-events-none absolute right-0 top-0 h-full w-[52%] lg:w-[44%]"
        >
          <path d="M220,0 C110,120 75,280 150,420 L720,420 L720,0 Z" fill="#E9BF5A" />
        </svg>

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 py-10 lg:py-14">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-4">
              <p className="inline-block rounded-md bg-[#0F2A6B]/55 px-2.5 py-0.5 sm:bg-transparent sm:p-0 text-xs font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
                <FormatOrdinals text={`${program.shortTitle} · ${program.duration}`} />
              </p>

              <h1 className="font-poster uppercase text-[36px] sm:text-[48px] lg:text-[56px] leading-[0.98] text-white">
                <FormatOrdinals text={program.h1} />
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-white/95 max-w-2xl">
                <FormatOrdinals text={program.summary} />
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => openEnquiryModal(program.shortTitle)}
                  className="btn-cta inline-flex min-h-[46px] items-center gap-2 rounded-xl px-5 py-2.5 text-sm sm:text-base font-bold cursor-pointer whitespace-nowrap"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </button>

                <a
                  href={getWhatsAppUrl(program.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-[var(--whatsapp)] px-5 py-2.5 text-sm sm:text-base font-bold text-[var(--ink)] hover:bg-[var(--whatsapp-hover)] whitespace-nowrap"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="mx-auto max-w-[380px] lg:max-w-none overflow-hidden rounded-[20px] border-4 border-white shadow-[0_18px_36px_-12px_rgba(15,42,107,0.45)]">
                <SmartPhoto
                  src={photo.src}
                  alt={photo.alt}
                  width={960}
                  height={640}
                  aspectClass="aspect-[3/2]"
                  priority
                  placeholderLabel={program.shortTitle}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Phone Strip */}
        <div className="relative z-10 bg-[#0F2A6B]/95 border-t border-[var(--gold)]/40 py-2.5">
          <div className="mx-auto flex max-w-[1200px] items-center justify-center sm:justify-between px-4 sm:px-6 text-xs sm:text-sm font-semibold text-white tabular-nums">
            <div className="inline-flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-[var(--gold)]" aria-hidden="true" />
              <span className="text-[var(--gold)] uppercase tracking-wider text-xs">Call</span>
              <a href={getTelHref(0)} className="hover:text-[var(--gold)]">
                {siteConfig.phones[0]}
              </a>
              <span aria-hidden="true" className="text-white/40">
                |
              </span>
              <a href={getTelHref(1)} className="hover:text-[var(--gold)]">
                {siteConfig.phones[1]}
              </a>
            </div>
            <span className="hidden sm:inline text-xs text-white/85">
              {siteConfig.timings.trim()
                ? `Open ${siteConfig.timings.trim()} · Online & Offline Across India`
                : 'Online & Offline Across India'}
            </span>
          </div>
        </div>
      </section>

      {/* COURSE OVERVIEW + STRUCTURE */}
      <section className="py-[56px] lg:py-[96px]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 space-y-12">
          <Reveal>
            <AtAGlanceBox title={`${program.shortTitle} at a Glance`} data={program.atAGlance} />
          </Reveal>

          {program.batches && program.batches.length > 0 && (
            <Reveal>
              <div className="space-y-8">
                <SectionHeading
                  title="Spoken English — Four Levels"
                  subtitle="Online and Offline available across India for every level."
                />

                {/* Highlighted Capitalized Audience Bullet Box */}
                <div className="mx-auto max-w-3xl rounded-2xl bg-[var(--navy)] p-5 sm:p-6 text-white">
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
                    Who Can Join Spoken English Classes
                  </h3>
                  <ul className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 list-disc pl-5 text-sm sm:text-base font-extrabold tracking-wide text-white marker:text-[var(--gold)]">
                    {SPOKEN_ENGLISH_AUDIENCE.map((group) => (
                      <li key={group}>{group}</li>
                    ))}
                  </ul>
                </div>

                {/* 4 Level Cards with Bulleted Focus Points */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {program.batches.map((batch, idx) => {
                    const isInterviewLevel = batch.level === INTERVIEW_PROGRAM_NAME;
                    return (
                      <article
                        key={batch.level}
                        className={`card-coaching p-6 sm:p-7 flex flex-col justify-between gap-4 ${
                          isInterviewLevel ? 'md:col-span-2 border-l-4 border-l-[var(--royal)]' : ''
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="inline-flex items-center rounded-md bg-[var(--gold)]/35 px-2.5 py-0.5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--navy)]">
                              Level 0{idx + 1}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-[var(--royal)] tabular-nums">
                              {batch.mode} · {batch.duration}
                            </span>
                          </div>

                          <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
                            {batch.level}
                          </h3>

                          <p className="text-sm sm:text-base leading-relaxed text-[var(--muted)]">
                            {batch.focus}
                          </p>

                          <div className="border-t border-[var(--hairline)] pt-3">
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--gold-text)] mb-2">
                              What We Provide
                            </p>
                            <ul
                              className={`list-disc pl-5 space-y-1.5 text-sm sm:text-base text-[var(--ink)] marker:text-[var(--royal)] ${
                                isInterviewLevel
                                  ? 'grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 space-y-0'
                                  : ''
                              }`}
                            >
                              {batch.highlights.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {isInterviewLevel && (
                          <div className="pt-2 border-t border-[var(--hairline)] flex flex-wrap items-center justify-between gap-3">
                            <Link
                              to="/interview-mastery-personality-development-belagavi"
                              className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--royal)] hover:underline underline-offset-4"
                            >
                              <span>Open full Interview Mastery with Personality Skill Development Program page</span>
                              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                            </Link>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          )}

          {program.curriculum && program.curriculum.length > 0 && (
            <Reveal>
              <div className="space-y-6">
                <SectionHeading
                  title="What We Provide in This 2-Month Program"
                  subtitle="Practical, hands-on training for COLLEGE STUDENTS, FRESHERS and JOB SEEKERS — Online and Offline available across India."
                />
                <div className="card-coaching p-6 sm:p-8">
                  <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 list-disc pl-5 text-base text-[var(--ink)] font-semibold marker:text-[var(--royal)]">
                    {program.curriculum.map((topic) => (
                      <li key={topic} className="leading-relaxed pl-1">
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          )}

          {program.boards && program.boards.length > 0 && (
            <Reveal>
              <div className="space-y-6">
                <SectionHeading
                  title="Boards Covered for Classes 6th to 10th"
                  subtitle="All school subjects taught with concept clarity, syllabus completion and calm exam revision — Online and Offline available."
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {program.boards.map((board) => (
                    <div
                      key={board}
                      className="card-coaching card-coaching-hover p-5 space-y-2.5"
                    >
                      <h3 className="font-poster uppercase text-3xl text-[var(--royal)] text-center">
                        {board}
                      </h3>
                      <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm text-[var(--muted)] marker:text-[var(--gold-text)]">
                        <li>
                          <FormatOrdinals text="All subjects for Classes 6th to 10th" />
                        </li>
                        <li>Strong fundamentals &amp; doubt clearing</li>
                        <li>Timely syllabus &amp; exam revision</li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {program.id === 'be-bca-diploma' && (
            <Reveal>
              <div className="space-y-6">
                <SectionHeading
                  title="College Streams Covered"
                  subtitle="Dedicated core subject coaching taught by qualified B.E graduate lecturers — Online and Offline available across India."
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {[
                    {
                      title: 'B.E Core Subjects',
                      points: [
                        'Clear engineering fundamentals',
                        'Step-by-step problem solving',
                        'Semester exam preparation',
                      ],
                    },
                    {
                      title: 'B.Com Core Subjects',
                      points: [
                        'Core commerce & accounting concepts',
                        'Regular practice & revision',
                        'Personal doubt resolution',
                      ],
                    },
                    {
                      title: 'Diploma Core Subjects',
                      points: [
                        'Practical technical clarity',
                        'Concept-first explanations',
                        'Calm exam readiness',
                      ],
                    },
                  ].map((stream) => (
                    <div key={stream.title} className="card-coaching p-5 space-y-2.5">
                      <h3 className="font-poster uppercase text-2xl text-[var(--royal)]">
                        {stream.title}
                      </h3>
                      <ul className="list-disc pl-4 space-y-1 text-sm text-[var(--muted)] marker:text-[var(--gold-text)]">
                        {stream.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {program.subjects && program.subjects.length > 0 && (
            <Reveal>
              <div className="card-coaching p-6">
                <h2 className="text-xl font-bold text-[var(--ink)]">Subjects Covered</h2>
                <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-base text-[var(--muted)]">
                  {program.subjects.map((subject) => (
                    <li key={subject} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-[var(--royal)] shrink-0" aria-hidden="true" />
                      <span>{subject}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ANSWER-FIRST DETAILS (White Band) */}
      <section className="bg-white py-[56px] lg:py-[96px] border-y border-[var(--hairline)]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 space-y-8">
          <SectionHeading title={`Key Details: ${program.shortTitle}`} />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {program.aeoSections.map((block, idx) => (
              <Reveal key={block.question} delay={idx * 0.05}>
                <article className="rounded-2xl border border-[var(--hairline)] bg-[var(--cream)] p-6 h-full space-y-2.5">
                  <h3 className="text-lg font-bold text-[var(--ink)]">
                    <FormatOrdinals text={block.question} />
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-[var(--ink)]">
                    <FormatOrdinals text={block.directAnswer} />
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">
                    <FormatOrdinals text={block.detail} />
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          {siteConfig.fees.visible && siteConfig.fees.items.length > 0 && (
            <div className="card-coaching p-6">
              <h2 className="text-xl font-bold text-[var(--ink)]">Course Fees</h2>
              {siteConfig.fees.note && (
                <p className="mt-1 text-sm text-[var(--muted)]">{siteConfig.fees.note}</p>
              )}
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-[var(--hairline)] text-xs font-bold uppercase tracking-[0.12em] text-[var(--royal)]">
                    <tr>
                      <th className="py-2.5 pr-4">Program</th>
                      <th className="py-2.5 pr-4">Duration</th>
                      <th className="py-2.5">Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--hairline)] tabular-nums">
                    {siteConfig.fees.items.map((row) => (
                      <tr key={row.program}>
                        <td className="py-3 pr-4 font-bold text-[var(--ink)]">{row.program}</td>
                        <td className="py-3 pr-4 text-[var(--muted)]">{row.duration}</td>
                        <td className="py-3 font-bold text-[var(--ink)]">{row.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* COMMON QUESTIONS & RELATED COURSES */}
      <section className="py-[56px] lg:py-[96px]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 space-y-12">
          <div className="space-y-6">
            <SectionHeading title="Common Questions" />
            <div className="mx-auto max-w-3xl space-y-3">
              {relevantFaqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div key={faq.question} className="card-coaching overflow-hidden">
                    <h3 className="text-base font-bold text-[var(--ink)]">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="flex w-full min-h-[52px] items-center justify-between gap-4 px-5 py-3 text-left cursor-pointer"
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
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={prefersReduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={prefersReduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: EASE_OUT }}
                          className="overflow-hidden"
                        >
                          <p className="border-t border-[var(--hairline)] px-5 py-4 text-sm sm:text-base leading-relaxed text-[var(--muted)]">
                            <FormatOrdinals text={faq.answer} />
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {relatedLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="card-coaching card-coaching-hover group flex min-h-[64px] items-center justify-between gap-3 p-4"
              >
                <div>
                  <div className="text-sm font-bold text-[var(--ink)] group-hover:text-[var(--royal)]">
                    <FormatOrdinals text={item.title} />
                  </div>
                  <div className="mt-0.5 text-xs text-[var(--muted)]">
                    <FormatOrdinals text={item.subtitle} />
                  </div>
                </div>
                <ArrowRight
                  className="h-4 w-4 text-[var(--royal)] shrink-0 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GOT ANY QUESTIONS ENQUIRY FORM */}
      <section className="bg-white py-[56px] lg:py-[96px] border-t border-[var(--hairline)]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="rounded-[20px] border border-[var(--hairline)] bg-[var(--cream)] p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
              <div className="lg:col-span-5 space-y-3">
                <h2 className="font-poster uppercase text-[34px] sm:text-[42px] leading-none text-[var(--ink)]">
                  Enquire About <FormatOrdinals text={program.shortTitle} />
                </h2>
                <p className="text-base text-[var(--muted)]">
                  Fill the form and we will get in touch with you soon.
                </p>
              </div>
              <div className="lg:col-span-7">
                <WhatsAppEnquiryForm defaultProgram={program.shortTitle} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
