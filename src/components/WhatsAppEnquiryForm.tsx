import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../data/siteConfig';
import { sanitizeMultiLine, sanitizeSingleLine } from '../lib/security';

export const ENQUIRY_PROGRAM_OPTIONS = [
  'Competitive Exam English (Grammar & Language Skills)',
  'Spoken English (Kids)',
  'Spoken English (Beginners or Intermediates)',
  'Spoken English (Advanced Level)',
  'Spoken English (Interview Mastery with Personality Skill Development Program)',
  'B.E, B.Com & Diploma (Core Subjects)',
  'Classes 6th to 10th (All Subjects)',
  'General Enquiry',
] as const;

export const ENQUIRY_ROLE_OPTIONS = ['Student', 'Parent'] as const;

export const ENQUIRY_MODE_OPTIONS = [
  'Online (Across India)',
  'Offline (Nehru Nagar, 2nd Cross, Belagavi)',
  'Online and Offline (Not sure yet)',
] as const;

const DEFAULT_MODE = ENQUIRY_MODE_OPTIONS[0];
const SUBMIT_COOLDOWN_MS = 1500;

interface WhatsAppEnquiryFormProps {
  defaultProgram?: string;
  compact?: boolean;
  onSuccess?: () => void;
}

export function WhatsAppEnquiryForm({
  defaultProgram = '',
  compact = false,
  onSuccess,
}: WhatsAppEnquiryFormProps) {
  const uid = useId();
  const lastSubmitRef = useRef<number>(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<string>(ENQUIRY_ROLE_OPTIONS[0]);
  const [program, setProgram] = useState<string>(() => {
    if (defaultProgram) {
      const matched = ENQUIRY_PROGRAM_OPTIONS.find((opt) =>
        opt.toLowerCase().includes(defaultProgram.toLowerCase())
      );
      if (matched) return matched;
    }
    return ENQUIRY_PROGRAM_OPTIONS[0];
  });
  const [mode, setMode] = useState<string>(DEFAULT_MODE);
  const [message, setMessage] = useState('');
  const [whatsappConsent, setWhatsappConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState('');
  const [readyUrl, setReadyUrl] = useState('');

  useEffect(() => {
    if (defaultProgram) {
      const matched = ENQUIRY_PROGRAM_OPTIONS.find((opt) =>
        opt.toLowerCase().includes(defaultProgram.toLowerCase())
      );
      if (matched) setProgram(matched);
    }
  }, [defaultProgram]);

  const labelClass = 'block text-sm font-semibold text-[var(--ink)]';
  const inputClass =
    'mt-1.5 w-full min-h-[44px] rounded-xl border border-[var(--hairline)] bg-white px-3.5 py-2.5 text-base sm:text-sm text-[var(--ink)] placeholder:text-[var(--muted)]/75 focus:border-[var(--royal)] focus:outline-none';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Silent honeypot check for automated bots
    if (honeypot.trim().length > 0) {
      return;
    }

    const now = Date.now();
    if (now - lastSubmitRef.current < SUBMIT_COOLDOWN_MS) {
      return;
    }

    const cleanName = sanitizeSingleLine(name, 80);
    const cleanPhone = sanitizeSingleLine(phone, 20);
    const digits = cleanPhone.replace(/[^0-9]/g, '');
    const cleanMessage = sanitizeMultiLine(message, 500);

    if (cleanName.length < 2) {
      setError('Please enter your full name.');
      return;
    }
    if (digits.length < 10 || digits.length > 15) {
      setError('Please enter a valid 10-digit WhatsApp number.');
      return;
    }
    if (!whatsappConsent) {
      setError('Please tick the consent box to send your enquiry on WhatsApp.');
      return;
    }

    // Enforce allowlisted select values
    const safeRole = (ENQUIRY_ROLE_OPTIONS as readonly string[]).includes(role)
      ? role
      : ENQUIRY_ROLE_OPTIONS[0];
    const safeProgram = (ENQUIRY_PROGRAM_OPTIONS as readonly string[]).includes(program)
      ? program
      : ENQUIRY_PROGRAM_OPTIONS[0];
    const safeMode = (ENQUIRY_MODE_OPTIONS as readonly string[]).includes(mode)
      ? mode
      : DEFAULT_MODE;

    lastSubmitRef.current = now;
    setError('');

    const lines = [
      'Hello MASTERMIND ACADEMY,',
      `Name: ${cleanName}`,
      `Enquiring as: ${safeRole}`,
      `WhatsApp Number: ${cleanPhone}`,
      `Interested Program: ${safeProgram}`,
      `Preferred Mode: ${safeMode}`,
      ...(cleanMessage ? [`Message: ${cleanMessage}`] : []),
    ];

    const url = getWhatsAppUrl(lines.join('\n'));
    setReadyUrl(url);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={compact ? 'space-y-3' : 'space-y-4'}>
      {/* Hidden honeypot field to filter automated form submissions */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input
          id={`${uid}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className={labelClass}>
            Name <span className="text-[var(--red)]">*</span>
          </label>
          <input
            id={`${uid}-name`}
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={`${uid}-phone`} className={labelClass}>
            WhatsApp Number <span className="text-[var(--red)]">*</span>
          </label>
          <input
            id={`${uid}-phone`}
            type="tel"
            inputMode="tel"
            required
            maxLength={20}
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit mobile number"
            className={`${inputClass} tabular-nums`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-role`} className={labelClass}>
            Are you a Student or Parent?
          </label>
          <select
            id={`${uid}-role`}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={inputClass}
          >
            {ENQUIRY_ROLE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${uid}-program`} className={labelClass}>
            Interested Program
          </label>
          <select
            id={`${uid}-program`}
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className={inputClass}
          >
            {ENQUIRY_PROGRAM_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-mode`} className={labelClass}>
          Preferred Mode (Online and Offline available)
        </label>
        <select
          id={`${uid}-mode`}
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className={inputClass}
        >
          {ENQUIRY_MODE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${uid}-message`} className={labelClass}>
          Message <span className="font-normal text-[var(--muted)]">(optional)</span>
        </label>
        <textarea
          id={`${uid}-message`}
          rows={2}
          maxLength={500}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Class, school board, college course or preferred batch"
          className={`${inputClass} min-h-[72px]`}
        />
      </div>

      {/* Simple WhatsApp Consent Checkbox */}
      <label
        htmlFor={`${uid}-whatsapp-consent`}
        className="flex items-start gap-2.5 pt-0.5 cursor-pointer"
      >
        <input
          id={`${uid}-whatsapp-consent`}
          type="checkbox"
          checked={whatsappConsent}
          onChange={(e) => setWhatsappConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--hairline)] accent-[var(--royal)] cursor-pointer"
        />
        <span className="text-xs sm:text-sm leading-snug text-[var(--muted)]">
          I agree to send my enquiry details to MASTERMIND ACADEMY via WhatsApp.{' '}
          <span className="text-[var(--red)]">*</span>
        </span>
      </label>

      {error && (
        <p role="alert" className="text-sm font-semibold text-[var(--red)]">
          {error}
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
        <button
          type="submit"
          className="btn-cta inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-base font-bold cursor-pointer whitespace-nowrap"
        >
          <span>Submit on WhatsApp</span>
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </button>

        <span className="text-xs text-[var(--muted)]">
          Opens WhatsApp with your enquiry pre-filled.
        </span>
      </div>

      {readyUrl && (
        <div
          role="status"
          className="flex items-start gap-2.5 rounded-xl border border-[var(--hairline)] bg-white p-3.5 text-sm text-[var(--ink)]"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-[var(--whatsapp)]" aria-hidden="true" />
          <div className="space-y-1">
            <p className="font-semibold">Your WhatsApp enquiry is ready.</p>
            <a
              href={readyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-[var(--royal)] underline underline-offset-4"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Tap here if WhatsApp did not open automatically</span>
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
