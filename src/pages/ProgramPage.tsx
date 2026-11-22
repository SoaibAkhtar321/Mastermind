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
      title: 'Visit Nehru Nagar Centre',
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
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                {program.shortTitle} · {program.duration}
              </p>

              <h1 className="font-poster uppercase text-[38px] sm:text-[50px] lg:text-[58px] leading-[0.98] text-white">
                {program.h1}
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-white/95 max-w-2xl">
                {program.summary}
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
                ? `Open ${siteConfig.timings.trim()} · Updated ${siteConfig.lastUpdated}`
                : `Updated ${siteConfig.lastUpdated}`}
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
              <div className="space-y-6">
                <SectionHeading
                  title="Spoken English — Four Levels"
                  subtitle="Spoken English is for everyone: kids, housewives, freshers, job seekers, students, etc. Choose from Kids, Beginners or Intermediates, Advanced Level, and Interview Mastery."
                />
                <div className="card-coaching overflow-x-auto">
                  <table className="w-full min-w-[540px] text-left text-sm">
                    <thead className="bg-[var(--navy)] text-xs font-bold uppercase tracking-[0.14em] text-[var(--gold)]">
                      <tr>
                        <th className="px-4 py-3.5">Batch Level</th>
                        <th className="px-4 py-3.5">Mode</th>
                        <th className="px-4 py-3.5">Duration</th>
                        <th className="px-4 py-3.5">Core Focus</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--hairline)] bg-white text-[var(--muted)]">
                      {program.batches.map((batch) => (
                        <tr key={batch.level}>
                          <td className="px-4 py-3.5 font-bold text-[var(--ink)]">
                            <div>{batch.level}</div>
                            {batch.level === 'Interview Mastery' && (
                              <Link
                                to="/interview-mastery-personality-development-belagavi"
                                className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[var(--royal)] hover:underline"
                              >
                                <span>View full curriculum</span>
                                <ArrowRight className="h-3 w-3" aria-hidden="true" />
                              </Link>
                            )}
                          </td>
                          <td className="px-4 py-3.5">{batch.mode}</td>
                          <td className="px-4 py-3.5 tabular-nums font-bold text-[var(--royal)]">
                            {batch.duration}
                          </td>
                          <td className="px-4 py-3.5 leading-relaxed">{batch.focus}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          )}

          {program.curriculum && program.curriculum.length > 0 && (
            <Reveal>
              <div className="space-y-6">
                <SectionHeading title="What the 2-Month Program Covers" />
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {program.curriculum.map((topic, idx) => (
                    <li
                      key={topic}
                      className="card-coaching flex items-start gap-3 p-5"
                    >
                      <CheckCircle2
                        className="h-5 w-5 shrink-0 text-[var(--royal)] mt-0.5"
                        aria-hidden="true"
                      />
                      <div>
                        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--gold-text)] tabular-nums">
                          Module 0{idx + 1}
                        </span>
                        <p className="mt-0.5 text-sm font-semibold text-[var(--ink)]">{topic}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {program.boards && program.boards.length > 0 && (
            <Reveal>
              <div className="space-y-6">
                <SectionHeading
                  title="Boards Covered for Classes 6th to 10th"
                  subtitle="All core school subjects taught with concept clarity, syllabus completion and calm exam revision."
                />
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {program.boards.map((board) => (
                    <div
                      key={board}
                      className="card-coaching card-coaching-hover p-5 text-center"
                    >
                      <h3 className="font-poster uppercase text-3xl text-[var(--royal)]">
                        {board}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-[var(--muted)]">
                        Strong basics, syllabus clarity and steady exam revision.
                      </p>
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
                  <h3 className="text-lg font-bold text-[var(--ink)]">{block.question}</h3>
                  <p className="text-base font-medium leading-relaxed text-[var(--ink)]">
                    {block.directAnswer}
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">{block.detail}</p>
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
                        <span>{faq.question}</span>
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
                            {faq.answer}
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
                    {item.title}
                  </div>
                  <div className="mt-0.5 text-xs text-[var(--muted)]">{item.subtitle}</div>
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
                  Enquire About {program.shortTitle}
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
