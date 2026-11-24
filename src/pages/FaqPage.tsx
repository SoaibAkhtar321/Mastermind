import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, MessageCircle, Phone } from 'lucide-react';
import { getTelHref, getWhatsAppUrl, siteConfig, type FaqItem } from '../data/siteConfig';
import { buildFaqSchema } from '../lib/seo';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useEnquiryModal } from '../context/EnquiryModalContext';
import { Layout } from '../components/Layout';
import { FormatOrdinals } from '../components/FormatText';
import { EASE_OUT } from '../components/MotionPrimitives';

type FilterCategory = 'all' | FaqItem['category'];

const filterLabels: { id: FilterCategory; label: string }[] = [
  { id: 'all', label: 'All Questions' },
  { id: 'competitive-exam-english', label: 'Competitive Exam English' },
  { id: 'spoken-english', label: 'Spoken English' },
  { id: 'school-tuition', label: 'Classes 6th to 10th' },
  { id: 'interview-mastery', label: 'Interview Mastery with Personality Skill Development Program' },
  { id: 'general', label: 'General & Timings' },
];

export function FaqPage() {
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openEnquiryModal } = useEnquiryModal();

  const breadcrumbs = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'FAQ', path: '/faq' },
    ],
    []
  );
  const schemas = useMemo(() => [buildFaqSchema(siteConfig.faqs)], []);

  useDocumentHead({
    path: '/faq',
    title: 'Course & Enrolment FAQ | MASTERMIND ACADEMY Belagavi',
    description:
      'Get answers on Competitive Exam English, Spoken English, B.E/B.Com/Diploma, Classes 6th–10th, Online & Offline modes and timings at MASTERMIND ACADEMY.',
    pageType: 'WebPage',
    breadcrumbs,
    schemas,
  });

  const visibleFaqs = useMemo(() => {
    if (filter === 'all') return siteConfig.faqs;
    return siteConfig.faqs.filter((f) => f.category === filter);
  }, [filter]);

  return (
    <Layout breadcrumbs={breadcrumbs}>
      {/* POSTER-STYLE HEADER */}
      <section className="relative overflow-hidden bg-[var(--royal)] py-12 lg:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0F2A6B] via-[#1F4FB5] to-[#1A439B]"
        />
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 text-center space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
            Frequently Asked Questions
          </p>
          <h1 className="font-poster uppercase text-[40px] sm:text-[52px] leading-none text-white">
            Answers About Batches &amp; Enrolment
          </h1>
          <p
            data-aeo-summary="true"
            className="mx-auto max-w-2xl text-base sm:text-lg text-white/90"
          >
            <FormatOrdinals text="Clear answers on Competitive Exam English, Spoken English (4 levels), B.E, B.Com & Diploma core subjects, Classes 6th to 10th all subjects, Online & Offline classes across India, and timings (7:00 AM to 8:30 PM)." />
          </p>
        </div>
      </section>

      {/* FILTER TABS & ACCORDION */}
      <section className="py-[56px] lg:py-[96px]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 space-y-8">
          <div className="border-b border-[var(--hairline)]">
            <div
              role="tablist"
              aria-label="Filter FAQ by topic"
              className="flex items-center justify-start sm:justify-center gap-2 sm:gap-5 overflow-x-auto no-scrollbar -mb-px"
            >
              {filterLabels.map((tab) => {
                const active = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setFilter(tab.id);
                      setOpenIndex(0);
                    }}
                    className={`relative min-h-[48px] shrink-0 px-3 py-3 text-sm sm:text-base font-bold transition-colors whitespace-nowrap cursor-pointer ${
                      active ? 'text-[var(--royal)]' : 'text-[var(--muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    <FormatOrdinals text={tab.label} />
                    {active && (
                      <motion.span
                        layoutId="faq-page-underline"
                        transition={{ duration: 0.2, ease: EASE_OUT }}
                        className="absolute inset-x-0 bottom-0 h-[3px] rounded-t-full bg-[var(--royal)]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mx-auto max-w-3xl space-y-3">
            {visibleFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={faq.question} className="card-coaching overflow-hidden">
                  <h2 className="text-base font-bold text-[var(--ink)]">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
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
                  </h2>

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

          {/* Still Have a Question Card */}
          <div className="mx-auto max-w-3xl card-coaching p-6 sm:p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold text-[var(--ink)]">Still have a question?</h2>
            <p className="text-base text-[var(--muted)]">
              Message us on WhatsApp, call directly, or visit our{' '}
              <Link to="/contact" className="font-bold text-[var(--royal)] underline underline-offset-2">
                Contact page
              </Link>
              .
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => openEnquiryModal()}
                className="btn-cta inline-flex min-h-[46px] items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold cursor-pointer"
              >
                <span>Enquire Now</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <a
                href={getTelHref(0)}
                className="btn-press inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-[var(--navy)] bg-white px-5 py-2.5 text-sm font-bold text-[var(--navy)] hover:bg-[var(--cream)] tabular-nums"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>{siteConfig.phones[0]}</span>
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-[var(--whatsapp)] px-5 py-2.5 text-sm font-bold text-[var(--ink)] hover:bg-[var(--whatsapp-hover)]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
