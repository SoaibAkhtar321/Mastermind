import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Users,
} from 'lucide-react';
import {
  getCorePrograms,
  getLecturerById,
  getTelHref,
  getWhatsAppUrl,
  siteConfig,
  type ProgramItem,
} from '../data/siteConfig';
import { buildPersonSchema } from '../lib/seo';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useEnquiryModal } from '../context/EnquiryModalContext';
import { Layout } from '../components/Layout';
import { SmartPhoto } from '../components/SmartPhoto';
import { WhatsAppEnquiryForm } from '../components/WhatsAppEnquiryForm';
import { Reveal, SectionHeading } from '../components/MotionPrimitives';
import { NotFoundPage } from './NotFoundPage';

const programMeta: Record<
  ProgramItem['id'],
  { icon: typeof BookOpen; focusLine: string }
> = {
  'spoken-english': {
    icon: MessageSquare,
    focusLine: '4 levels: Kids, Beginners or Intermediates, Advanced Level & Interview Mastery',
  },
  'school-tuition': {
    icon: BookOpen,
    focusLine: 'All core subjects from Class 6th to 10th across CBSE, ICSE, KVS and State Board',
  },
  'interview-mastery': {
    icon: Briefcase,
    focusLine: '2-month practical mock interviews, GD, body language and grooming',
  },
  'be-bca-diploma': {
    icon: GraduationCap,
    focusLine: 'Core subjects for B.E, B.Com and Diploma college students',
  },
};

const classroomCommitments = [
  'Clear concepts explained in simple language rather than only dictating notes',
  'Small, personal batches where every student gets attention and every doubt is answered',
  'Regular speaking, writing and revision practice at each learner’s pace',
];

export function TeacherProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { openEnquiryModal } = useEnquiryModal();
  const lecturer = getLecturerById(id || '');

  const breadcrumbs = useMemo(
    () =>
      lecturer
        ? [
            { name: 'Home', path: '/' },
            { name: 'Faculty & Lecturers', path: '/lecturers' },
            {
              name: `${lecturer.name}, ${lecturer.qualification}`,
              path: `/lecturers/${lecturer.id}`,
            },
          ]
        : [
            { name: 'Home', path: '/' },
            { name: 'Faculty & Lecturers', path: '/lecturers' },
          ],
    [lecturer]
  );

  const schemas = useMemo(
    () => (lecturer ? [buildPersonSchema(lecturer)] : []),
    [lecturer]
  );

  useDocumentHead({
    path: lecturer ? `/lecturers/${lecturer.id}` : '/lecturers',
    title: lecturer
      ? `${lecturer.name}, ${lecturer.qualification} | Faculty · MASTERMIND ACADEMY, Belagavi`
      : 'Faculty & Lecturers | MASTERMIND ACADEMY, Belagavi',
    description: lecturer
      ? `${lecturer.name} (${lecturer.qualification}) — ${lecturer.experience} at MASTERMIND ACADEMY in Nehru Nagar, Belagavi. Focus: ${lecturer.focusArea}.`
      : 'Meet our qualified B.E graduate lecturers at MASTERMIND ACADEMY in Nehru Nagar, Belagavi.',
    pageType: 'ProfilePage',
    breadcrumbs,
    schemas,
  });

  if (!lecturer) {
    return <NotFoundPage />;
  }

  const corePrograms = getCorePrograms();
  const otherLecturers = siteConfig.lecturers.filter((l) => l.id !== lecturer.id);
  const directWhatsAppMessage = `Hello MASTERMIND ACADEMY, I would like to connect with ${lecturer.name} (${lecturer.qualification}) regarding classes in Nehru Nagar, Belagavi.`;
  const hasRealPhoto = Boolean(lecturer.photo?.trim());

  const quickFacts = [
    {
      label: 'Qualification',
      value: `Bachelor of Engineering (${lecturer.qualification})`,
    },
    {
      label: 'Experience',
      value: lecturer.experience,
    },
    {
      label: 'Primary Focus',
      value: lecturer.focusArea,
    },
    {
      label: 'Institute Hours',
      value: `${siteConfig.timings} · Nehru Nagar, Belagavi`,
    },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs} whatsappMessage={directWhatsAppMessage}>
      {/* POSTER-STYLE TEACHER PROFILE HERO */}
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
          <path d="M230,0 C115,120 80,280 155,420 L720,420 L720,0 Z" fill="#E9BF5A" />
        </svg>

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 pt-6 pb-10 lg:pt-10 lg:pb-14">
          {/* Back Link */}
          <div className="mb-6">
            <Link
              to="/lecturers"
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 text-[var(--gold)] shrink-0" aria-hidden="true" />
              <span>All Faculty &amp; Lecturers</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-center">
            {/* Portrait Frame (Real Portrait when provided, else Framed Academy Monogram) */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              {hasRealPhoto ? (
                <div className="w-[220px] sm:w-[260px] lg:w-[290px] overflow-hidden rounded-[22px] border-4 border-white shadow-[0_18px_36px_-12px_rgba(15,42,107,0.48)] bg-[var(--sand-placeholder)]">
                  <SmartPhoto
                    src={lecturer.photo!.trim()}
                    alt={`${lecturer.name}, ${lecturer.qualification} — ${lecturer.role}`}
                    width={580}
                    height={700}
                    aspectClass="aspect-[4/5]"
                    priority
                    placeholderLabel={`${lecturer.name}, ${lecturer.qualification}`}
                  />
                </div>
              ) : (
                <div className="relative w-[220px] sm:w-[256px] lg:w-[280px] rounded-[22px] border-4 border-white bg-[var(--navy)] p-6 text-center shadow-[0_18px_36px_-12px_rgba(15,42,107,0.48)]">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-3 rounded-[14px] border border-[var(--gold)]/40"
                  />
                  <div className="relative z-10 flex flex-col items-center justify-center py-4 space-y-4">
                    <div
                      aria-hidden="true"
                      className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-[var(--royal)]/40 font-poster text-[56px] sm:text-[64px] leading-none text-[var(--gold)] ring-2 ring-[var(--gold)] ring-offset-4 ring-offset-[var(--navy)]"
                    >
                      {lecturer.name.charAt(0)}
                    </div>
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-[var(--gold)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--ink)]">
                        <GraduationCap className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{lecturer.qualification} Graduate</span>
                      </span>
                      <p className="pt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75">
                        MASTERMIND ACADEMY
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Identity & Quick Actions */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                Faculty Profile · Nehru Nagar, Belagavi
              </p>

              <h1 className="font-poster uppercase text-[42px] sm:text-[54px] lg:text-[62px] leading-[0.96] text-white">
                {lecturer.name}, {lecturer.qualification}
              </h1>

              <p className="text-base sm:text-lg font-semibold text-white/95">
                {lecturer.role} · Bachelor of Engineering ({lecturer.qualification})
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--gold)] px-3.5 py-1 text-xs sm:text-sm font-bold text-[var(--ink)]">
                  <Briefcase className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{lecturer.experience}</span>
                </span>
              </div>

              <p className="mx-auto lg:mx-0 max-w-2xl text-sm sm:text-base leading-relaxed text-white/90">
                {lecturer.bio.trim()}
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => openEnquiryModal()}
                  className="btn-cta inline-flex min-h-[48px] items-center gap-2 rounded-xl px-6 py-2.5 text-sm sm:text-base font-bold cursor-pointer whitespace-nowrap"
                >
                  <span>Enquire About Batches</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </button>

                <a
                  href={getWhatsAppUrl(directWhatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-[var(--whatsapp)] px-5 py-2.5 text-sm sm:text-base font-bold text-[var(--ink)] hover:bg-[var(--whatsapp-hover)] whitespace-nowrap"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={getTelHref(0)}
                  className="btn-press inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-5 py-2.5 text-sm sm:text-base font-bold text-white hover:bg-white hover:text-[var(--ink)] whitespace-nowrap tabular-nums"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{siteConfig.phones[0]}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Phone Strip matching Home Banner */}
        <div className="relative z-10 border-t border-white/15 bg-[var(--navy)]/90 px-4 py-2.5 text-center text-xs sm:text-sm font-semibold text-white">
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-4 gap-y-1 tabular-nums">
            <span className="inline-flex items-center gap-1.5 text-[var(--gold)]">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{siteConfig.address.fullFormatted}</span>
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-white/35">
              |
            </span>
            <a href={getTelHref(0)} className="hover:text-[var(--gold)] transition-colors">
              Call {siteConfig.phones[0]}
            </a>
            <span aria-hidden="true" className="text-white/35">
              /
            </span>
            <a href={getTelHref(1)} className="hover:text-[var(--gold)] transition-colors">
              {siteConfig.phones[1]}
            </a>
          </div>
        </div>
      </section>

      {/* PROFILE AT A GLANCE */}
      <section className="py-[48px] lg:py-[64px]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <Reveal>
            <div className="card-coaching p-5 sm:p-7">
              <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {quickFacts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--gold-text)]">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-sm sm:text-base font-semibold leading-snug text-[var(--ink)]">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT {NAME} & TEACHING APPROACH */}
      <section className="pb-[56px] lg:pb-[96px]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left: About & Classroom Focus */}
            <Reveal className="lg:col-span-7">
              <div className="card-coaching p-6 sm:p-8 h-full space-y-5">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--gold-text)]">
                    About the Lecturer
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)]">
                    About {lecturer.name} ({lecturer.qualification})
                  </h2>
                </div>

                <p className="text-base leading-relaxed text-[var(--muted)]">
                  {lecturer.bio.trim()
                    ? lecturer.bio.trim()
                    : siteConfig.about.story}
                </p>

                <div className="border-t border-[var(--hairline)] pt-5">
                  <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--gold-text)] mb-3">
                    In Every Session With {lecturer.name}
                  </h3>
                  <ul className="space-y-2.5 text-sm sm:text-base text-[var(--ink)]">
                    {classroomCommitments.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="h-5 w-5 text-[var(--royal)] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Right: Learn · Practice · Excel */}
            <Reveal delay={0.06} className="lg:col-span-5">
              <div className="card-coaching p-6 sm:p-8 h-full space-y-5">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--gold-text)]">
                    Teaching Method
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)]">
                    {siteConfig.tagline}
                  </h2>
                </div>

                <div className="space-y-3">
                  {siteConfig.about.approach.map((step) => (
                    <div
                      key={step.step}
                      className="rounded-xl border border-[var(--hairline)] bg-[var(--cream)] p-4 flex items-start gap-3.5"
                    >
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--navy)] font-poster text-xl text-[var(--gold)] tabular-nums">
                        {step.step}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-[var(--ink)]">{step.title}</h3>
                        <p className="mt-0.5 text-sm leading-relaxed text-[var(--muted)]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* COURSES OFFERED AT MASTERMIND ACADEMY (3 Core Tracks) */}
      <section className="bg-white py-[56px] lg:py-[96px] border-y border-[var(--hairline)]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 space-y-10">
          <Reveal>
            <SectionHeading
              title="Programs at MASTERMIND ACADEMY"
              subtitle="Explore our three core offerings below to check levels, subjects, boards and enrolment details."
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
                        {program.shortTitle}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed text-[var(--muted)]">
                        {meta.focusLine}
                      </p>
                    </div>

                    <span className="mt-4 inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[var(--royal)]">
                      <span>View Course</span>
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* MEET OTHER FACULTY SWITCHER */}
      {otherLecturers.length > 0 && (
        <section className="py-[56px] lg:py-[72px]">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--gold-text)]">
                  MASTERMIND ACADEMY Faculty
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)]">
                  Meet Our Other Faculty Member
                </h2>
              </div>
              <Link
                to="/lecturers"
                className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-[var(--royal)] hover:underline whitespace-nowrap"
              >
                <Users className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>View All Faculty</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {otherLecturers.map((other) => (
                <Link
                  key={other.id}
                  to={`/lecturers/${other.id}`}
                  className="card-coaching card-coaching-hover group p-5 sm:p-6 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      aria-hidden="true"
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--navy)] font-poster text-2xl text-[var(--gold)] ring-2 ring-[var(--gold)] ring-offset-2 ring-offset-white"
                    >
                      {other.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-[var(--ink)] group-hover:text-[var(--royal)] truncate">
                        {other.name}, {other.qualification}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-[var(--royal)] truncate">
                        {other.experience}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1 text-xs sm:text-sm font-bold text-[var(--royal)]">
                    <span>View Profile</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ENQUIRE WITH FACULTY FORM */}
      <section className="bg-white py-[56px] lg:py-[96px] border-t border-[var(--hairline)]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <Reveal>
            <div className="rounded-[20px] border border-[var(--hairline)] bg-[var(--cream)] p-6 sm:p-8 lg:p-10 shadow-xs">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--gold-text)]">
                    Direct Enquiry · Nehru Nagar, Belagavi
                  </p>
                  <h2 className="font-poster uppercase text-[34px] sm:text-[44px] leading-none text-[var(--ink)]">
                    Ask {lecturer.name} About a Batch
                  </h2>
                  <p className="text-base leading-relaxed text-[var(--muted)]">
                    Send your preferred course and mode on WhatsApp, or call us directly to discuss
                    batch schedules and enrolment.
                  </p>

                  <div className="pt-2 space-y-2 text-sm font-semibold text-[var(--navy)] tabular-nums">
                    {siteConfig.phones.map((num, idx) => (
                      <div key={num}>
                        <a
                          href={getTelHref(idx)}
                          className="inline-flex min-h-[44px] items-center gap-2 hover:text-[var(--royal)]"
                        >
                          <Phone className="h-4 w-4 text-[var(--royal)] shrink-0" aria-hidden="true" />
                          <span>{num}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

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
