import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  MessageCircle,
  MessageSquare,
  Phone,
} from 'lucide-react';
import {
  getCorePrograms,
  getTelHref,
  getWhatsAppUrl,
  siteConfig,
  type ProgramItem,
} from '../data/siteConfig';
import { buildPersonSchemas } from '../lib/seo';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useEnquiryModal } from '../context/EnquiryModalContext';
import { Layout } from '../components/Layout';
import { FormatOrdinals } from '../components/FormatText';
import { Reveal, SectionHeading } from '../components/MotionPrimitives';

const programMeta: Record<
  ProgramItem['id'],
  { icon: typeof BookOpen; focusLine: string }
> = {
  'spoken-english': {
    icon: MessageSquare,
    focusLine:
      '4 levels: Kids, Beginners or Intermediates, Advanced Level & Interview Mastery with Personality Skill Development Program',
  },
  'school-tuition': {
    icon: BookOpen,
    focusLine: 'All subjects from Class 6th to 10th across CBSE, ICSE, KVS and State Board',
  },
  'interview-mastery': {
    icon: Briefcase,
    focusLine:
      '2-month practical program: self-introduction, GD sessions, mock interviews, body language and grooming',
  },
  'be-bca-diploma': {
    icon: GraduationCap,
    focusLine: 'Core subjects for B.E, B.Com and Diploma college students',
  },
};

const facultyTeachingHighlights = [
  'Concepts explained clearly in simple language, not just dictated notes',
  'Small, personal batches where every doubt gets answered patiently',
  'Daily speaking, writing and revision practice at each learner’s pace',
];

export function LecturersPage() {
  const { openEnquiryModal } = useEnquiryModal();

  const breadcrumbs = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'Faculty & Lecturers', path: '/lecturers' },
    ],
    []
  );
  const schemas = useMemo(() => buildPersonSchemas(), []);

  const corePrograms = getCorePrograms();

  useDocumentHead({
    path: '/lecturers',
    title: 'Faculty & Lecturers | MASTERMIND ACADEMY, Belagavi',
    description:
      'Meet our B.E graduate faculty in Belagavi: Laxmi (B.E, 10+ years of prior HR experience and teaching experience) and Pooja (B.E, 3+ years of experience in core subjects).',
    pageType: 'CollectionPage',
    breadcrumbs,
    schemas,
  });

  return (
    <Layout breadcrumbs={breadcrumbs}>
      {/* POSTER-STYLE FACULTY HERO */}
      <section className="relative overflow-hidden bg-[var(--royal)] py-12 lg:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0F2A6B] via-[#1F4FB5] to-[#1A439B]"
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 720 340"
          preserveAspectRatio="none"
          className="pointer-events-none absolute right-0 top-0 h-full w-[45%] opacity-25"
        >
          <path d="M240,0 C120,100 90,230 165,340 L720,340 L720,0 Z" fill="#E9BF5A" />
        </svg>

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 text-center space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
            <FormatOrdinals text="MASTERMIND ACADEMY · Nehru Nagar, 2nd Cross, Belagavi" />
          </p>
          <h1 className="font-poster uppercase text-[40px] sm:text-[54px] leading-none text-white">
            Meet Our Faculty
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-white/95">
            <FormatOrdinals text={siteConfig.about.leadershipNote} />
          </p>
        </div>
      </section>

      {/* SECTION 1: WHO OUR FACULTY ARE */}
      <section className="py-[56px] lg:py-[96px]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 space-y-10">
          <Reveal>
            <SectionHeading
              title="Who Teaches at MASTERMIND ACADEMY"
              subtitle="Qualified Bachelor of Engineering (B.E) graduates dedicated to personal attention and steady student progress."
            />
          </Reveal>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
            {siteConfig.lecturers.map((lecturer, idx) => (
              <Reveal key={lecturer.id} delay={idx * 0.06}>
                <article className="card-coaching card-coaching-hover p-6 sm:p-8 h-full flex flex-col justify-between gap-5">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Link
                        to={`/lecturers/${lecturer.id}`}
                        aria-label={`View profile of ${lecturer.name}, ${lecturer.qualification}`}
                        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--navy)] font-poster text-3xl text-[var(--gold)] ring-2 ring-[var(--gold)] ring-offset-2 ring-offset-white"
                      >
                        {lecturer.name.charAt(0)}
                      </Link>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
                          <Link
                            to={`/lecturers/${lecturer.id}`}
                            className="hover:text-[var(--royal)] transition-colors"
                          >
                            {lecturer.name}, {lecturer.qualification}
                          </Link>
                        </h2>
                        <p className="text-sm font-semibold text-[var(--royal)]">
                          {lecturer.role}
                        </p>
                        <p className="mt-1 inline-flex items-center gap-1.5 rounded-md bg-[var(--gold)]/30 px-2.5 py-0.5 text-xs font-bold text-[var(--navy)]">
                          <Briefcase className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{lecturer.experience}</span>
                        </p>
                        <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--muted)]">
                          <GraduationCap className="h-3.5 w-3.5 text-[var(--gold-text)] shrink-0" aria-hidden="true" />
                          <span>Bachelor of Engineering ({lecturer.qualification})</span>
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-[var(--hairline)] pt-4 space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--gold-text)]">
                        About {lecturer.name}
                      </h3>
                      <p className="text-sm sm:text-base leading-relaxed text-[var(--muted)]">
                        <FormatOrdinals text={lecturer.bio.trim()} />
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border-t border-[var(--hairline)] pt-4">
                      <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--gold-text)] mb-2">
                        What {lecturer.name} Teaches
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm font-semibold text-[var(--ink)] marker:text-[var(--royal)]">
                        {lecturer.teachesList.map((item) => (
                          <li key={item}>
                            <FormatOrdinals text={item} />
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      to={`/lecturers/${lecturer.id}`}
                      className="btn-press inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--navy)] px-4 py-2.5 text-sm font-bold text-white hover:bg-[var(--royal)] transition-colors"
                    >
                      <span>View {lecturer.name}&rsquo;s Profile</span>
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT OUR FACULTY TEACH (3 Core Offerings) */}
      <section className="bg-white py-[56px] lg:py-[96px] border-y border-[var(--hairline)]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 space-y-10">
          <Reveal>
            <SectionHeading
              title="What Our Faculty Teach"
              subtitle="Three dedicated tracks at Nehru Nagar, 2nd Cross, Belagavi (open 7:00 AM to 8:30 PM) — Online and Offline available across India."
            />
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {corePrograms.map((program, idx) => {
              const meta = programMeta[program.id];
              const Icon = meta.icon;
              return (
                <Reveal key={program.id} delay={idx * 0.05}>
                  <Link
                    to={program.slug}
                    className="card-coaching card-coaching-hover group h-full flex flex-col justify-between p-5 sm:p-6 bg-[var(--cream)]"
                  >
                    <div className="space-y-2.5">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--navy)] text-[var(--gold)]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-[var(--ink)] group-hover:text-[var(--royal)] leading-snug">
                        <FormatOrdinals text={program.shortTitle} />
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed text-[var(--muted)]">
                        <FormatOrdinals text={meta.focusLine} />
                      </p>
                    </div>

                    <span className="mt-4 inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[var(--royal)]">
                      <span>View Course</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: ABOUT THEIR TEACHING APPROACH (Learn · Practice · Excel) */}
      <section className="py-[56px] lg:py-[96px]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 space-y-10">
          <Reveal>
            <SectionHeading
              title="How Our Faculty Teach"
              subtitle={siteConfig.about.story}
            />
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {siteConfig.about.approach.map((step, idx) => (
              <Reveal key={step.title} delay={idx * 0.05}>
                <div className="card-coaching p-6 h-full text-center space-y-2.5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--navy)] font-poster text-2xl text-[var(--gold)] tabular-nums">
                    {step.step}
                  </span>
                  <h3 className="text-xl font-bold text-[var(--ink)]">{step.title}</h3>
                  <p className="text-sm sm:text-base leading-relaxed text-[var(--muted)]">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mx-auto max-w-3xl card-coaching p-6 sm:p-7">
            <h3 className="text-base font-bold text-[var(--ink)] mb-3">
              What Students &amp; Parents Can Expect in Every Batch
            </h3>
            <ul className="space-y-2.5 text-sm sm:text-base text-[var(--muted)]">
              {facultyTeachingHighlights.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-[var(--royal)] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="band-cta py-[56px] lg:py-[72px]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 text-center space-y-5">
          <h2 className="font-poster uppercase text-[34px] sm:text-[42px] leading-none text-white">
            Speak With Our Faculty Before Joining
          </h2>
          <p className="mx-auto max-w-xl text-base text-white/90">
            Message us on WhatsApp or call directly to discuss the right batch for your child or
            yourself.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openEnquiryModal()}
              className="btn-press inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-[var(--gold)] px-6 py-2.5 text-sm sm:text-base font-bold text-[var(--ink)] hover:brightness-95 cursor-pointer whitespace-nowrap"
            >
              <span>Enquire Now</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <a
              href={getTelHref(0)}
              className="btn-press inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-5 py-2.5 text-sm sm:text-base font-bold text-white hover:bg-white hover:text-[var(--ink)] whitespace-nowrap tabular-nums"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>{siteConfig.phones[0]}</span>
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-[var(--whatsapp)] px-5 py-2.5 text-sm sm:text-base font-bold text-[var(--ink)] hover:bg-[var(--whatsapp-hover)] whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
