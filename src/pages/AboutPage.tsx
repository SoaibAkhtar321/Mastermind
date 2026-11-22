import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import { getTelHref, getWhatsAppUrl, siteConfig } from '../data/siteConfig';
import { buildPersonSchemas } from '../lib/seo';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useEnquiryModal } from '../context/EnquiryModalContext';
import { Layout } from '../components/Layout';
import { BrandLogo } from '../components/BrandLogo';
import { SmartPhoto } from '../components/SmartPhoto';
import { Reveal, SectionHeading } from '../components/MotionPrimitives';

export function AboutPage() {
  const { openEnquiryModal } = useEnquiryModal();

  const breadcrumbs = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ],
    []
  );
  const schemas = useMemo(() => buildPersonSchemas(), []);

  useDocumentHead({
    path: '/about',
    title: 'About MASTERMIND ACADEMY | Nehru Nagar, Belagavi',
    description:
      'Learn about MASTERMIND ACADEMY in Nehru Nagar, Belagavi (open 7:00 AM to 8:30 PM) — Education is food to a hungry soul. Meet our experienced B.E lecturers.',
    pageType: 'AboutPage',
    breadcrumbs,
    schemas,
  });

  return (
    <Layout breadcrumbs={breadcrumbs}>
      {/* POSTER-STYLE ROYAL BLUE & SOFT GOLD HEADER */}
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

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 py-10 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                About MASTERMIND ACADEMY · Belagavi
              </p>
              <h1 className="font-poster uppercase text-[38px] sm:text-[50px] lg:text-[58px] leading-[0.98] text-white">
                Education is food to a hungry soul.
              </h1>
              <p className="text-sm sm:text-base font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
                {siteConfig.tagline}
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-white/95 max-w-2xl">
                {siteConfig.canonicalDescription}
              </p>
              <div className="pt-1">
                <BrandLogo variant="full" className="max-w-[200px] p-2.5" />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="mx-auto max-w-[380px] lg:max-w-none overflow-hidden rounded-[20px] border-4 border-white shadow-[0_18px_36px_-12px_rgba(15,42,107,0.45)]">
                <SmartPhoto
                  src={siteConfig.mediaSlots.aboutVisual}
                  alt="Learners studying and discussing notes around a bright wooden table"
                  width={960}
                  height={640}
                  aspectClass="aspect-[3/2]"
                  priority
                  placeholderLabel="MASTERMIND ACADEMY"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="py-[56px] lg:py-[96px]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 space-y-10">
          <Reveal>
            <SectionHeading
              title="How We Teach"
              subtitle={siteConfig.about.story}
            />
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {siteConfig.about.approach.map((step, idx) => (
              <Reveal key={step.title} delay={idx * 0.06}>
                <div className="card-coaching card-coaching-hover p-6 h-full text-center space-y-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--navy)] font-poster text-2xl text-[var(--gold)] tabular-nums">
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
        </div>
      </section>

      {/* WHO TEACHES */}
      <section className="bg-white py-[56px] lg:py-[96px] border-y border-[var(--hairline)]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 space-y-10">
          <Reveal>
            <SectionHeading
              title="Our Qualified Lecturers"
              subtitle={siteConfig.about.leadershipNote}
            />
          </Reveal>

          <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4 sm:gap-6">
            {siteConfig.lecturers.map((lecturer, idx) => (
              <Reveal key={lecturer.id} delay={idx * 0.06}>
                <Link
                  to={`/lecturers/${lecturer.id}`}
                  className="card-coaching card-coaching-hover group rounded-2xl border border-[var(--hairline)] bg-[var(--cream)] p-5 sm:p-6 flex flex-col items-center justify-between text-center gap-3 h-full"
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
                      {lecturer.bio.trim() && (
                        <p className="mt-2 text-xs leading-snug text-[var(--muted)] line-clamp-3">
                          {lecturer.bio.trim()}
                        </p>
                      )}
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

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--hairline)] pt-6">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--muted)]">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[var(--gold-text)] shrink-0" aria-hidden="true" />
                <span>
                  <strong className="font-bold text-[var(--ink)]">Areas served:</strong>{' '}
                  {siteConfig.areasServed}.
                </span>
              </p>
              {siteConfig.timings.trim() && (
                <p className="flex items-center gap-2 tabular-nums">
                  <Clock className="h-4 w-4 text-[var(--royal)] shrink-0" aria-hidden="true" />
                  <span>
                    <strong className="font-bold text-[var(--ink)]">Open:</strong>{' '}
                    {siteConfig.timings.trim()}
                  </span>
                </p>
              )}
            </div>
            <Link
              to="/lecturers"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-[var(--royal)] hover:underline"
            >
              <span>Meet Our Lecturers</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* COMPACT CTA BAND */}
      <section className="band-cta py-[56px] lg:py-[72px]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 text-center space-y-5">
          <h2 className="font-poster uppercase text-[34px] sm:text-[44px] leading-none text-white">
            Visit Our Centre in Nehru Nagar, Belagavi
          </h2>
          <p className="mx-auto max-w-xl text-base text-white/90">
            Open 7:00 AM to 8:30 PM. Speak with Laxmi or Pooja about Spoken English, Classes 6th to
            10th all core subjects, or B.E, B.Com &amp; Diploma core subjects.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
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
