import { useId, useMemo, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { getSafeEmail, getTelHref, getWhatsAppUrl, siteConfig } from '../data/siteConfig';
import { sanitizeMultiLine, sanitizeSingleLine } from '../lib/security';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Layout } from '../components/Layout';
import { Reveal } from '../components/MotionPrimitives';

const DPDP_REQUEST_TYPES = [
  'Withdraw Consent (Section 6(4))',
  'Access Summary of My Personal Data (Section 11)',
  'Correct / Update My Personal Data (Section 12)',
  'Erase / Delete My Personal Data (Section 12)',
  'Register a Grievance Redressal Request (Section 13)',
  'Nominate an Authorised Representative (Section 14)',
  'Parent / Guardian Request for a Minor Under 18 (Section 9)',
] as const;

const SUBMIT_COOLDOWN_MS = 1500;

export function DataRightsPage() {
  const uid = useId();
  const safeEmail = getSafeEmail();
  const lastSubmitRef = useRef<number>(0);

  const [fullName, setFullName] = useState('');
  const [contactDetail, setContactDetail] = useState('');
  const [requestType, setRequestType] = useState<string>(DPDP_REQUEST_TYPES[0]);
  const [details, setDetails] = useState('');
  const [authenticityConfirmed, setAuthenticityConfirmed] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState('');
  const [readyMailto, setReadyMailto] = useState('');
  const [readyWhatsApp, setReadyWhatsApp] = useState('');

  const breadcrumbs = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'Privacy Policy', path: '/privacy-policy' },
      { name: 'DPDP Data Rights & Grievance', path: '/data-rights' },
    ],
    []
  );

  useDocumentHead({
    path: '/data-rights',
    title: 'DPDP Data Rights & Grievance | MASTERMIND ACADEMY',
    description:
      'Exercise your DPDP Act, 2023 rights at MASTERMIND ACADEMY Belagavi—withdraw consent, request data access, correction or erasure, or contact our support desk.',
    pageType: 'WebPage',
    breadcrumbs,
  });

  const inputClass =
    'mt-1.5 w-full min-h-[44px] rounded-xl border border-[var(--hairline)] bg-white px-3.5 py-2.5 text-base sm:text-sm text-[var(--ink)] placeholder:text-[var(--muted)]/75 focus:border-[var(--royal)] focus:outline-none';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (honeypot.trim().length > 0) return;

    const now = Date.now();
    if (now - lastSubmitRef.current < SUBMIT_COOLDOWN_MS) return;

    const cleanName = sanitizeSingleLine(fullName, 80);
    const cleanContact = sanitizeSingleLine(contactDetail, 80);
    const cleanDetails = sanitizeMultiLine(details, 600);

    if (cleanName.length < 2) {
      setError('Please enter your full name.');
      return;
    }
    if (cleanContact.length < 5) {
      setError('Please enter the phone number or email address used for your enquiry.');
      return;
    }
    if (!authenticityConfirmed) {
      setError(
        'Please confirm that the information provided is accurate as required under Section 15 of the DPDP Act, 2023.'
      );
      return;
    }

    const safeType = (DPDP_REQUEST_TYPES as readonly string[]).includes(requestType)
      ? requestType
      : DPDP_REQUEST_TYPES[0];

    lastSubmitRef.current = now;
    setError('');

    const subject = `DPDP Act Request: ${safeType} — ${cleanName}`;
    const bodyLines = [
      'To: Grievance & Support Contact, MASTERMIND ACADEMY (Nehru Nagar, 2nd Cross, Belagavi)',
      '',
      `Request Type: ${safeType}`,
      `Data Principal / Parent Name: ${cleanName}`,
      `Contact Phone / Email Used: ${cleanContact}`,
      ...(cleanDetails ? [`Additional Details: ${cleanDetails}`] : []),
      '',
      'Submitted under the Digital Personal Data Protection (DPDP) Act, 2023.',
    ];
    const bodyText = bodyLines.join('\n');

    const mailtoHref = safeEmail
      ? `mailto:${safeEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`
      : '';
    const waHref = getWhatsAppUrl(bodyText);

    setReadyMailto(mailtoHref);
    setReadyWhatsApp(waHref);

    if (mailtoHref) {
      const anchor = document.createElement('a');
      anchor.href = mailtoHref;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }
  };

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
            <span>DPDP Act, 2023 · Data Principal Rights</span>
          </p>
          <h1 className="font-poster uppercase text-[38px] sm:text-[52px] leading-none text-white">
            Data Rights &amp; Grievance Redressal
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-white/90">
            Withdraw consent, request access, correction, or erasure of your personal data, or raise
            a privacy grievance with {siteConfig.name}.
          </p>
        </div>
      </section>

      {/* REQUEST FORM & DIRECT GRIEVANCE CONTACT */}
      <section className="py-[56px] lg:py-[88px]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            {/* Left Info */}
            <Reveal className="lg:col-span-5 space-y-5">
              <div className="card-coaching p-6 sm:p-7 space-y-4">
                <h2 className="text-xl font-bold text-[var(--ink)]">
                  Grievance &amp; Help Support Desk
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-[var(--muted)]">
                  Under Sections 6(4) and 11–14 of India&rsquo;s Digital Personal Data Protection
                  (DPDP) Act, 2023, you can withdraw consent or submit a data rights or grievance
                  request directly via email, phone, or WhatsApp.
                </p>

                <div className="space-y-3 border-t border-[var(--hairline)] pt-4 text-sm text-[var(--ink)]">
                  {safeEmail && (
                    <div className="flex items-start gap-2.5">
                      <Mail className="h-4 w-4 text-[var(--royal)] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--gold-text)]">
                          Help, Support &amp; Grievance Email
                        </div>
                        <a
                          href={`mailto:${safeEmail}?subject=${encodeURIComponent(
                            'DPDP Data Rights Request — MASTERMIND ACADEMY'
                          )}`}
                          className="font-bold text-[var(--royal)] underline underline-offset-2 break-all"
                        >
                          {safeEmail}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-2.5 tabular-nums">
                    <Phone className="h-4 w-4 text-[var(--royal)] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--gold-text)]">
                        Direct Helpline ({siteConfig.timings})
                      </div>
                      <div className="font-bold">
                        <a href={getTelHref(0)} className="hover:text-[var(--royal)]">
                          {siteConfig.phones[0]}
                        </a>{' '}
                        /{' '}
                        <a href={getTelHref(1)} className="hover:text-[var(--royal)]">
                          {siteConfig.phones[1]}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-[var(--muted)] border-t border-[var(--hairline)] pt-3">
                  Read our complete{' '}
                  <Link
                    to="/privacy-policy"
                    className="font-bold text-[var(--royal)] underline underline-offset-2"
                  >
                    Privacy Policy &amp; DPDP Act Notice
                  </Link>{' '}
                  for full details on retention, children&rsquo;s data safeguards, and escalation to
                  the Data Protection Board of India.
                </p>
              </div>
            </Reveal>

            {/* Right Interactive Request Builder */}
            <Reveal delay={0.06} className="lg:col-span-7">
              <div className="card-coaching p-6 sm:p-8 bg-[var(--cream)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
                  Submit a DPDP Rights or Consent Withdrawal Request
                </h2>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  This form prepares a structured request in your email client (or WhatsApp) with no
                  hidden data stored on the website.
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
                  <div aria-hidden="true" className="hidden">
                    <label htmlFor={`${uid}-hp`}>Website</label>
                    <input
                      id={`${uid}-hp`}
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor={`${uid}-type`} className="block text-sm font-semibold text-[var(--ink)]">
                      Type of Request <span className="text-[var(--red)]">*</span>
                    </label>
                    <select
                      id={`${uid}-type`}
                      value={requestType}
                      onChange={(e) => setRequestType(e.target.value)}
                      className={inputClass}
                    >
                      {DPDP_REQUEST_TYPES.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor={`${uid}-name`} className="block text-sm font-semibold text-[var(--ink)]">
                        Your Full Name <span className="text-[var(--red)]">*</span>
                      </label>
                      <input
                        id={`${uid}-name`}
                        type="text"
                        required
                        maxLength={80}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Student or parent / guardian name"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor={`${uid}-contact`} className="block text-sm font-semibold text-[var(--ink)]">
                        Phone Number or Email Used <span className="text-[var(--red)]">*</span>
                      </label>
                      <input
                        id={`${uid}-contact`}
                        type="text"
                        required
                        maxLength={80}
                        value={contactDetail}
                        onChange={(e) => setContactDetail(e.target.value)}
                        placeholder="Mobile number or email address"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${uid}-details`} className="block text-sm font-semibold text-[var(--ink)]">
                      Request Details <span className="font-normal text-[var(--muted)]">(optional)</span>
                    </label>
                    <textarea
                      id={`${uid}-details`}
                      rows={3}
                      maxLength={600}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Describe the data to access, correct, erase, or the grievance you want resolved"
                      className={`${inputClass} min-h-[88px]`}
                    />
                  </div>

                  <div className="rounded-xl border border-[var(--hairline)] bg-white p-3.5">
                    <label htmlFor={`${uid}-confirm`} className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        id={`${uid}-confirm`}
                        type="checkbox"
                        checked={authenticityConfirmed}
                        onChange={(e) => setAuthenticityConfirmed(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-[var(--hairline)] accent-[var(--royal)] shrink-0 cursor-pointer"
                      />
                      <span className="text-xs sm:text-sm leading-snug text-[var(--muted)]">
                        I confirm that the details above are authentic and that I am the Data
                        Principal (or parent / lawful guardian of a learner under 18) making this
                        request under the DPDP Act, 2023.
                      </span>
                    </label>
                  </div>

                  {error && (
                    <p role="alert" className="text-sm font-semibold text-[var(--red)]">
                      {error}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="submit"
                      className="btn-cta inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm sm:text-base font-bold cursor-pointer"
                    >
                      <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Prepare Email Request</span>
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </button>
                  </div>

                  {(readyMailto || readyWhatsApp) && (
                    <div
                      role="status"
                      className="rounded-xl border border-[var(--hairline)] bg-white p-4 space-y-2.5 text-sm text-[var(--ink)]"
                    >
                      <div className="flex items-start gap-2">
                        <CheckCircle2
                          className="h-5 w-5 text-[var(--whatsapp)] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <p className="font-semibold">
                          Your DPDP request is ready. Choose your preferred channel below if your
                          email app did not open automatically:
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3 pl-7">
                        {readyMailto && (
                          <a
                            href={readyMailto}
                            className="inline-flex items-center gap-1.5 font-bold text-[var(--royal)] underline underline-offset-2"
                          >
                            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                            <span>Open in Email ({safeEmail})</span>
                          </a>
                        )}
                        {readyWhatsApp && (
                          <a
                            href={readyWhatsApp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-bold text-[var(--navy)] underline underline-offset-2"
                          >
                            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                            <span>Send via WhatsApp</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
