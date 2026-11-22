import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { getSafeEmail, getTelHref, siteConfig } from '../data/siteConfig';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Layout } from '../components/Layout';
import { Reveal } from '../components/MotionPrimitives';
import { FormatOrdinals } from '../components/FormatText';

export function PrivacyPolicyPage() {
  const safeEmail = getSafeEmail();

  const breadcrumbs = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'Privacy Policy & DPDP Notice', path: '/privacy-policy' },
    ],
    []
  );

  useDocumentHead({
    path: '/privacy-policy',
    title: 'Privacy Policy & DPDP Act Notice | MASTERMIND ACADEMY',
    description:
      'Privacy Policy and Digital Personal Data Protection (DPDP) Act, 2023 notice for MASTERMIND ACADEMY, Nehru Nagar, 2nd Cross, Belagavi. Learn how enquiry data is handled and how to exercise your rights.',
    pageType: 'WebPage',
    breadcrumbs,
  });

  const dataPrincipalRights = [
    {
      section: 'Section 11',
      title: 'Right to Access Information',
      detail:
        'You may request a summary of the personal data we hold about you or your child, the purposes for which it is being processed, and any third parties with whom it has been shared.',
    },
    {
      section: 'Section 12',
      title: 'Right to Correction, Completion, Updating & Erasure',
      detail:
        'You may ask us to correct inaccurate or misleading personal data, complete incomplete details, update your contact information, or erase personal data that is no longer necessary for the stated purpose.',
    },
    {
      section: 'Section 6(4)',
      title: 'Right to Withdraw Consent',
      detail:
        'You may withdraw your consent at any time with the same ease as giving it by emailing our Help & Support desk or submitting a request through our Data Rights page. Upon withdrawal, we will stop processing and erase your enquiry records unless retention is required by Indian law.',
    },
    {
      section: 'Section 13',
      title: 'Right to Grievance Redressal',
      detail:
        'You have the right to a readily available mechanism to resolve any concern regarding your personal data with our Grievance & Support Contact before escalating to the Data Protection Board of India.',
    },
    {
      section: 'Section 14',
      title: 'Right to Nominate',
      detail:
        'You may nominate another individual to exercise your DPDP Act rights on your behalf in the event of death or incapacity.',
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
            <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>DPDP Act, 2023 Compliant Notice</span>
          </p>
          <h1 className="font-poster uppercase text-[38px] sm:text-[52px] leading-none text-white">
            Privacy Policy &amp; Data Protection Notice
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-white/90">
            How {siteConfig.name} in <FormatOrdinals text="Nehru Nagar, 2nd Cross, Belagavi" />{' '}
            handles personal data in accordance with India&rsquo;s Digital Personal Data Protection
            (DPDP) Act, 2023 and applicable Indian law.
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
            Last Updated: {siteConfig.lastUpdated}
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="py-[56px] lg:py-[88px]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-8">
          {/* 1. Data Fiduciary Identity */}
          <Reveal>
            <article className="card-coaching p-6 sm:p-8 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
                1. Data Fiduciary Identity &amp; Applicability
              </h2>
              <p className="text-base leading-relaxed text-[var(--muted)]">
                This Privacy Policy and Notice is issued under Section 5 of the{' '}
                <strong className="text-[var(--ink)]">
                  Digital Personal Data Protection Act, 2023 (DPDP Act)
                </strong>{' '}
                and the Information Technology Act, 2000 by{' '}
                <strong className="text-[var(--ink)]">{siteConfig.name}</strong> (the &ldquo;Data
                Fiduciary&rdquo;), located at <FormatOrdinals text={siteConfig.address.fullFormatted} />.
              </p>
              <p className="text-base leading-relaxed text-[var(--muted)]">
                It applies to students, parents, legal guardians, job seekers, and website visitors
                (&ldquo;Data Principals&rdquo;) who browse our website, submit a course enquiry via
                WhatsApp or email, call our helpline, or enrol in our offline or online classes.
              </p>
            </article>
          </Reveal>

          {/* 2. Itemised Notice of Personal Data & Purpose */}
          <Reveal>
            <article className="card-coaching p-6 sm:p-8 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
                2. Itemised Notice: Personal Data Collected &amp; Specific Purpose (Section 5)
              </h2>
              <p className="text-base leading-relaxed text-[var(--muted)]">
                Our website is an informational coaching portal. We do{' '}
                <strong className="text-[var(--ink)]">not</strong> store your enquiry form entries
                in a hidden website database, and we do{' '}
                <strong className="text-[var(--ink)]">not</strong> sell, rent, or trade personal
                data. When you voluntarily fill out an enquiry form, email us, or contact us on
                WhatsApp or by phone, the following limited details may be shared:
              </p>

              <div className="overflow-x-auto rounded-xl border border-[var(--hairline)]">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="bg-[var(--navy)] text-xs font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                    <tr>
                      <th className="px-4 py-3">Category of Personal Data</th>
                      <th className="px-4 py-3">Specific Purpose of Processing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--hairline)] bg-white text-[var(--muted)]">
                    <tr>
                      <td className="px-4 py-3 font-bold text-[var(--ink)]">
                        Full Name &amp; Role (Student / Parent)
                      </td>
                      <td className="px-4 py-3">
                        Addressing you accurately and verifying whether an enquiry for a minor is
                        submitted by a parent or legal guardian.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-[var(--ink)]">
                        Mobile / WhatsApp Number &amp; Email Address
                      </td>
                      <td className="px-4 py-3">
                        Responding to your course enquiry, sharing batch schedules, fee details,
                        online class links, and providing help and support.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-[var(--ink)]">
                        Course Preference, Class/Stream &amp; Optional Message
                      </td>
                      <td className="px-4 py-3">
                        <FormatOrdinals text="Recommending the suitable Spoken English level, Classes 6th to 10th all subjects batch, or B.E / B.Com / Diploma core subject batch." />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-[var(--ink)]">
                        Enrolment Records (Offline / Online Admission)
                      </td>
                      <td className="px-4 py-3">
                        Managing classroom attendance, academic progress, communication with
                        parents, and legal/accounting compliance if you enrol at the institute.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </Reveal>

          {/* 3. Consent & Lawful Processing */}
          <Reveal>
            <article className="card-coaching p-6 sm:p-8 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
                3. Lawful Basis &amp; Explicit Consent (Section 6)
              </h2>
              <p className="text-base leading-relaxed text-[var(--muted)]">
                We process your personal data strictly on the basis of your{' '}
                <strong className="text-[var(--ink)]">
                  voluntary, specific, informed, unconditional, and unambiguous consent
                </strong>{' '}
                indicated through a clear affirmative action (such as checking the unticked consent
                box before submitting an enquiry form, or voluntarily initiating a WhatsApp message,
                phone call, or email to our Help &amp; Support address), or for legitimate uses
                permitted under Section 7 of the DPDP Act, 2023.
              </p>
              <p className="text-base leading-relaxed text-[var(--muted)]">
                We will never bundle consent for unrelated promotional campaigns or process your
                data beyond the purpose for which you contacted {siteConfig.name}.
              </p>
            </article>
          </Reveal>

          {/* 4. Children's Personal Data */}
          <Reveal>
            <article className="card-coaching p-6 sm:p-8 space-y-4 border-l-4 border-l-[var(--royal)]">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--navy)] text-[var(--gold)]">
                  <UserCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
                    4. Protection of Children&rsquo;s Personal Data (Section 9)
                  </h2>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--gold-text)] mt-0.5">
                    Applies to Learners Under 18 Years of Age
                  </p>
                </div>
              </div>
              <p className="text-base leading-relaxed text-[var(--muted)]">
                Because {siteConfig.name} teaches school students (
                <FormatOrdinals text="Classes 6th to 10th" />) and the Kids Spoken English batch, we
                follow strict child data safeguards under Section 9 of the DPDP Act, 2023:
              </p>
              <ul className="space-y-2.5 text-sm sm:text-base text-[var(--muted)]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--royal)] mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-[var(--ink)]">Verifiable Parental Consent:</strong>{' '}
                    Before enrolling or processing personal data of any learner under 18 years of
                    age, verifiable consent from a parent or lawful guardian is required during
                    enquiry and admission.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--royal)] mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-[var(--ink)]">
                      No Tracking, Profiling or Targeted Ads:
                    </strong>{' '}
                    We strictly prohibit behavioural monitoring, cross-site tracking, or targeted
                    advertising directed at children.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--royal)] mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-[var(--ink)]">Parent Coordination (Online &amp; Offline):</strong>{' '}
                    <FormatOrdinals text="Both Online (across India) and Offline (at our Nehru Nagar, 2nd Cross, Belagavi centre) classes for learners under 18 are coordinated directly with parents or legal guardians." />
                  </span>
                </li>
              </ul>
            </article>
          </Reveal>

          {/* 5. Cookies, Local Storage & Third-Party Services */}
          <Reveal>
            <article className="card-coaching p-6 sm:p-8 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
                5. Cookies, Local Storage &amp; Third-Party Services
              </h2>
              <ul className="space-y-2.5 text-sm sm:text-base text-[var(--muted)]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--royal)] mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-[var(--ink)]">Zero Advertising Cookies:</strong> This
                    website does not place advertising, retargeting, or cross-site analytics
                    cookies on your device.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--royal)] mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-[var(--ink)]">Minimal Browser Storage:</strong> We do
                    not store your personal enquiry details or tracking profiles in browser cookies
                    or hidden databases.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--royal)] mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-[var(--ink)]">External Services You Invoke:</strong>{' '}
                    When you click a WhatsApp button, Google Maps directions link, or email link,
                    your browser opens WhatsApp (Meta Platforms), Google Maps, or your email client
                    under those providers&rsquo; respective privacy policies. Fonts are served via
                    Google Fonts.
                  </span>
                </li>
              </ul>
            </article>
          </Reveal>

          {/* 6. Data Retention & Security Safeguards */}
          <Reveal>
            <article className="card-coaching p-6 sm:p-8 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
                6. Data Security Safeguards, Retention &amp; Breach Notification (Section 8)
              </h2>
              <p className="text-base leading-relaxed text-[var(--muted)]">
                We maintain reasonable technical and organisational safeguards — including HTTPS
                encryption in transit, strict input sanitisation, minimal data collection, and
                restricted faculty access — to protect personal data against unauthorised access,
                disclosure, alteration, or loss.
              </p>
              <p className="text-base leading-relaxed text-[var(--muted)]">
                <strong className="text-[var(--ink)]">Retention &amp; Erasure:</strong> Enquiry
                messages are retained only as long as reasonably necessary to respond to your
                request and complete batch admission, or until you request erasure or withdraw
                consent, unless retention is mandated by applicable Indian law.
              </p>
              <p className="text-base leading-relaxed text-[var(--muted)]">
                <strong className="text-[var(--ink)]">Personal Data Breach Notification:</strong> In
                the unlikely event of a personal data breach affecting data under our control, we
                will notify the Data Protection Board of India and each affected Data Principal in
                the manner prescribed under the DPDP Act, 2023.
              </p>
            </article>
          </Reveal>

          {/* 7. Your Rights Under the DPDP Act */}
          <Reveal>
            <article className="card-coaching p-6 sm:p-8 space-y-5">
              <div className="space-y-1.5">
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
                  7. Your Rights as a Data Principal (Sections 11–14)
                </h2>
                <p className="text-base text-[var(--muted)]">
                  Under India&rsquo;s DPDP Act, 2023, you have the following rights at no charge:
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {dataPrincipalRights.map((right) => (
                  <div
                    key={right.title}
                    className="rounded-xl border border-[var(--hairline)] bg-[var(--cream)] p-4 space-y-1.5"
                  >
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--gold-text)]">
                      {right.section}
                    </p>
                    <h3 className="text-base font-bold text-[var(--ink)]">{right.title}</h3>
                    <p className="text-sm leading-relaxed text-[var(--muted)]">{right.detail}</p>
                  </div>
                ))}
              </div>

              <div className="pt-1">
                <Link
                  to="/data-rights"
                  className="btn-cta inline-flex min-h-[46px] items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold"
                >
                  <span>Exercise Your DPDP Data Rights</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              </div>
            </article>
          </Reveal>

          {/* 8. Duties of Data Principals */}
          <Reveal>
            <article className="card-coaching p-6 sm:p-8 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
                8. Duties of Data Principals (Section 15)
              </h2>
              <p className="text-base leading-relaxed text-[var(--muted)]">
                In accordance with Section 15 of the DPDP Act, 2023, users agree to provide
                verifiably authentic information when submitting an enquiry or rights request, not
                to impersonate another individual, not to suppress material information for official
                records, and not to register false or frivolous grievances.
              </p>
            </article>
          </Reveal>

          {/* 9. Grievance Redressal & Help / Support Contact */}
          <Reveal>
            <article className="card-coaching p-6 sm:p-8 space-y-4 bg-[var(--cream)]">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
                9. Help, Support &amp; Grievance Redressal Contact
              </h2>
              <p className="text-base leading-relaxed text-[var(--muted)]">
                For any privacy question, consent withdrawal, data correction/erasure request, or
                grievance regarding personal data, please reach our Help &amp; Support / Grievance
                Contact directly. We aim to acknowledge and respond promptly within reasonable
                timelines under the DPDP Act, 2023.
              </p>

              <div className="space-y-2.5 text-sm sm:text-base text-[var(--ink)]">
                <p className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-[var(--royal)] shrink-0 mt-1" aria-hidden="true" />
                  <span>
                    <strong>{siteConfig.name}</strong>,{' '}
                    <FormatOrdinals text={siteConfig.address.fullFormatted} /> (Open{' '}
                    {siteConfig.timings})
                  </span>
                </p>
                {safeEmail && (
                  <p className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-[var(--royal)] shrink-0" aria-hidden="true" />
                    <a
                      href={`mailto:${safeEmail}?subject=${encodeURIComponent(
                        'DPDP Privacy / Support Request — MASTERMIND ACADEMY'
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

              <p className="text-sm leading-relaxed text-[var(--muted)] border-t border-[var(--hairline)] pt-4">
                If a grievance remains unresolved after exhausting our internal grievance redressal
                channel, you have the right to lodge a complaint with the{' '}
                <strong className="text-[var(--ink)]">Data Protection Board of India</strong> in
                accordance with the DPDP Act, 2023.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  to="/data-rights"
                  className="btn-press inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-[var(--navy)] px-4 py-2 text-sm font-bold text-white hover:bg-[var(--royal)]"
                >
                  <span>Submit a Data Rights Request</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
                <Link
                  to="/terms-and-conditions"
                  className="btn-press inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-[var(--navy)] bg-white px-4 py-2 text-sm font-bold text-[var(--navy)] hover:bg-[var(--cream)]"
                >
                  <span>Read Terms &amp; Conditions</span>
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
