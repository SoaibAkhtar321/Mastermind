import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Mail, MapPin, Phone } from 'lucide-react';
import { getSafeEmail, getTelHref, siteConfig } from '../data/siteConfig';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Layout } from '../components/Layout';
import { Reveal } from '../components/MotionPrimitives';

export function TermsPage() {
  const safeEmail = getSafeEmail();

  const breadcrumbs = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'Terms & Conditions', path: '/terms-and-conditions' },
    ],
    []
  );

  useDocumentHead({
    path: '/terms-and-conditions',
    title: 'Terms & Conditions | MASTERMIND ACADEMY, Belagavi',
    description:
      'Terms and Conditions for using the MASTERMIND ACADEMY website and enrolling in Spoken English, Classes 6th to 10th, and B.E/B.Com/Diploma classes in Belagavi.',
    pageType: 'WebPage',
    breadcrumbs,
  });

  const termsSections = [
    {
      title: '1. Acceptance of Terms',
      body: [
        `By accessing this website or enquiring about and enrolling in classes at ${siteConfig.name} (${siteConfig.address.fullFormatted}), you agree to be bound by these Terms and Conditions and our Privacy Policy & DPDP Act Notice.`,
        'If a student is under 18 years of age, a parent or legal guardian must review and accept these Terms and Conditions on the student’s behalf before admission.',
      ],
    },
    {
      title: '2. Programs & Batch Formats',
      body: [
        `${siteConfig.name} offers three core educational tracks: (1) Spoken English Classes across four levels (Kids, Beginners or Intermediates, Advanced Level, and Interview Mastery), (2) Classes 6th to 10th covering all core school subjects across CBSE, ICSE, KVS and State Board, and (3) Core Subjects for B.E, B.Com and Diploma college students.`,
        `Institute hours are ${siteConfig.timings}. Online batches are offered for Spoken English Beginners or Intermediates and Advanced Level; the Kids Spoken English batch and school/college classroom sessions are conducted offline at our Nehru Nagar, Belagavi centre.`,
      ],
    },
    {
      title: '3. Enrolment, Fees & Batch Timings',
      body: [
        'Submitting an enquiry through WhatsApp, phone, or email does not automatically guarantee a seat in a particular batch. Admission is confirmed only after direct communication with our faculty/administration and completion of centre enrolment formalities.',
        'Current fee structures, payment schedules, batch slots, and refund or transfer policies (if any) are communicated directly at the Nehru Nagar centre or through our official contact channels before enrolment. Please do not make payments to any unauthorised third party.',
      ],
    },
    {
      title: '4. Student Conduct & Attendance',
      body: [
        'Students attending offline classroom sessions or live online classes are expected to maintain respectful behaviour toward lecturers and fellow learners, arrive on time, and participate actively in speaking, writing, and revision exercises.',
        'For online Spoken English sessions, students must not record, redistribute, or share live class sessions or instructor materials without explicit written permission from MASTERMIND ACADEMY.',
      ],
    },
    {
      title: '5. Educational Disclaimer',
      body: [
        'Our faculty work closely with every student to build strong fundamentals, speaking fluency, and interview readiness. However, exam scores, school/university grades, and job placement outcomes depend on individual student effort, regular attendance, and consistent practice. MASTERMIND ACADEMY does not guarantee specific examination ranks or employment offers.',
      ],
    },
    {
      title: '6. Intellectual Property',
      body: [
        `The ${siteConfig.name} name, logo, website layout, written content, and teaching handouts belong to ${siteConfig.name} and may not be copied, republished, or used commercially without prior written consent.`,
      ],
    },
    {
      title: '7. Third-Party Links & External Platforms',
      body: [
        'This website includes links to external services such as WhatsApp and Google Maps for your convenience. Those services are operated by independent third parties under their own terms and privacy policies, and MASTERMIND ACADEMY is not responsible for their availability or external practices.',
      ],
    },
    {
      title: '8. Privacy & DPDP Act, 2023 Compliance',
      body: [
        'Personal data shared through enquiries, phone calls, emails, or admission records is processed strictly in accordance with our Privacy Policy and India’s Digital Personal Data Protection (DPDP) Act, 2023.',
      ],
    },
    {
      title: '9. Changes to Terms & Governing Law',
      body: [
        'MASTERMIND ACADEMY may update these Terms and Conditions from time to time to reflect operational or legal updates. The latest version is always published on this page with the updated date.',
        'These Terms and Conditions are governed by the laws of India. Any disputes arising out of or relating to this website or our coaching services shall be subject to the jurisdiction of the competent courts in Belagavi, Karnataka.',
      ],
    },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      {/* HEADER */}
      <section className="relative overflow-hidden bg-[var(--royal)] py-12 lg:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0F2A6B] via-[#1F4FB5] to-[#1A439B]"
        />
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 text-center space-y-3">
          <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
            <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Legal &amp; Enrolment Terms</span>
          </p>
          <h1 className="font-poster uppercase text-[38px] sm:text-[52px] leading-none text-white">
            Terms &amp; Conditions
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-white/90">
            Clear terms governing the use of the {siteConfig.name} website and coaching programs in
            Nehru Nagar, Belagavi.
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
            Last Updated: {siteConfig.lastUpdated}
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="py-[56px] lg:py-[88px]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-6">
          {termsSections.map((section) => (
            <Reveal key={section.title}>
              <article className="card-coaching p-6 sm:p-8 space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-relaxed text-[var(--muted)]">
                    {paragraph}
                  </p>
                ))}
              </article>
            </Reveal>
          ))}

          {/* Help & Support Box */}
          <Reveal>
            <article className="card-coaching p-6 sm:p-8 space-y-4 bg-[var(--cream)]">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
                10. Help &amp; Support Contact
              </h2>
              <p className="text-base leading-relaxed text-[var(--muted)]">
                If you have questions about these Terms and Conditions or need assistance regarding
                batches or enrolment, please contact our Help &amp; Support desk:
              </p>

              <div className="space-y-2.5 text-sm sm:text-base text-[var(--ink)]">
                <p className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-[var(--royal)] shrink-0 mt-1" aria-hidden="true" />
                  <span>
                    <strong>{siteConfig.name}</strong>, {siteConfig.address.fullFormatted} (Open{' '}
                    {siteConfig.timings})
                  </span>
                </p>
                {safeEmail && (
                  <p className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-[var(--royal)] shrink-0" aria-hidden="true" />
                    <a
                      href={`mailto:${safeEmail}?subject=${encodeURIComponent(
                        'Help & Support — MASTERMIND ACADEMY'
                      )}`}
                      className="font-bold text-[var(--royal)] underline underline-offset-2 break-all"
                    >
                      {safeEmail}
                    </a>
                  </p>
                )}
                <p className="flex items-center gap-2.5 tabular-nums">
                  <Phone className="h-4 w-4 text-[var(--royal)] shrink-0" aria-hidden="true" />
                  <span>
                    <a href={getTelHref(0)} className="font-bold hover:text-[var(--royal)]">
                      {siteConfig.phones[0]}
                    </a>{' '}
                    /{' '}
                    <a href={getTelHref(1)} className="font-bold hover:text-[var(--royal)]">
                      {siteConfig.phones[1]}
                    </a>
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/privacy-policy"
                  className="btn-press inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-[var(--navy)] px-4 py-2 text-sm font-bold text-white hover:bg-[var(--royal)]"
                >
                  <span>Read Privacy Policy &amp; DPDP Notice</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
                <Link
                  to="/data-rights"
                  className="btn-press inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-[var(--navy)] bg-white px-4 py-2 text-sm font-bold text-[var(--navy)] hover:bg-[var(--cream)]"
                >
                  <span>DPDP Data Rights &amp; Grievance</span>
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
