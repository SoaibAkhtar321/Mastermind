import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import {
  getDirectionsUrl,
  getOpenInMapsUrl,
  getSafeEmail,
  getTelHref,
  getWhatsAppUrl,
  siteConfig,
} from '../data/siteConfig';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Layout } from '../components/Layout';
import { WhatsAppEnquiryForm } from '../components/WhatsAppEnquiryForm';
import { FormatOrdinals } from '../components/FormatText';
import { AcademyLocationMap } from '../components/AcademyLocationMap';
import { SocialLinks } from '../components/SocialLinks';
import { Reveal } from '../components/MotionPrimitives';

export function ContactPage() {
  const breadcrumbs = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ],
    []
  );

  useDocumentHead({
    path: '/contact',
    title: 'Contact & Location | MASTERMIND ACADEMY Belagavi',
    description:
      'Visit MASTERMIND ACADEMY at Nehru Nagar, 2nd Cross, Belagavi (7:00 AM–8:30 PM) or join Online across India. View satellite map, call or WhatsApp us today.',
    pageType: 'ContactPage',
    breadcrumbs,
  });

  const safeEmail = getSafeEmail();
  const directionsUrl = getDirectionsUrl();
  const openMapsUrl = getOpenInMapsUrl();

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
            <FormatOrdinals text={`Nehru Nagar, 2nd Cross · Belagavi 590010 · Open ${siteConfig.timings}`} />
          </p>
          <h1 className="font-poster uppercase text-[40px] sm:text-[52px] leading-none text-white">
            Find MASTERMIND ACADEMY
          </h1>
          <p
            data-aeo-summary="true"
            className="mx-auto max-w-2xl text-base sm:text-lg text-white/90"
          >
            <FormatOrdinals text={`Visit our centre at Nehru Nagar, 2nd Cross, Belagavi (open ${siteConfig.timings}) or join Online from anywhere across India.`} />
          </p>
        </div>
      </section>

      {/* ADDRESS, SATELLITE MAP & DIRECT PHONE */}
      <section className="py-[56px] lg:py-[96px]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
            {/* Address, Directions & Interactive Google Maps Satellite View */}
            <Reveal className="lg:col-span-7">
              <div className="card-coaching p-6 sm:p-8 space-y-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--navy)] text-[var(--gold)]">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
                      <FormatOrdinals text="Nehru Nagar, 2nd Cross, Belagavi" />
                    </h2>
                    <p className="text-sm text-[var(--muted)]">
                      <FormatOrdinals text={siteConfig.areasServed} />
                    </p>
                  </div>
                </div>

                <address
                  data-aeo-summary="true"
                  className="not-italic space-y-1 text-base text-[var(--muted)]"
                >
                  <div className="font-bold text-[var(--ink)]">{siteConfig.name}</div>
                  <div>
                    <FormatOrdinals text={siteConfig.address.fullFormatted} />
                  </div>
                  <div className="text-xs sm:text-sm font-medium tabular-nums">
                    GPS: {siteConfig.location.latitude}, {siteConfig.location.longitude} ·{' '}
                    {siteConfig.location.plusCode}
                  </div>
                  {siteConfig.address.landmark.trim() && (
                    <div className="text-sm">
                      Landmark: <FormatOrdinals text={siteConfig.address.landmark.trim()} />
                    </div>
                  )}
                </address>

                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cta inline-flex min-h-[46px] items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold whitespace-nowrap"
                  >
                    <Navigation className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Get Directions</span>
                  </a>
                  <a
                    href={openMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-[var(--navy)] bg-white px-5 py-2.5 text-sm font-bold text-[var(--navy)] hover:bg-[var(--cream)] whitespace-nowrap"
                  >
                    <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Open in Google Maps</span>
                  </a>
                </div>

                <div className="pt-2">
                  <AcademyLocationMap heightClass="h-[300px] sm:h-[340px]" />
                </div>
              </div>
            </Reveal>

            {/* Direct Phone & WhatsApp Card */}
            <Reveal delay={0.06} className="lg:col-span-5">
              <div className="card-coaching p-6 sm:p-8 space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
                  Call or WhatsApp Us
                </h2>
                <p className="text-sm text-[var(--muted)]">
                  Tap any number below to call directly from your phone.
                </p>

                <div className="space-y-2.5 tabular-nums">
                  {siteConfig.phones.map((phoneNum, idx) => (
                    <a
                      key={phoneNum}
                      href={getTelHref(idx)}
                      className="flex min-h-[48px] items-center justify-between rounded-xl border border-[var(--hairline)] bg-[var(--cream)] px-4 py-2.5 text-base font-bold text-[var(--ink)] hover:border-[var(--royal)] hover:text-[var(--royal)] transition-colors"
                    >
                      <span className="inline-flex items-center gap-2.5">
                        <Phone className="h-4 w-4 text-[var(--royal)] shrink-0" aria-hidden="true" />
                        <span>{phoneNum}</span>
                      </span>
                      <span className="text-xs font-bold text-[var(--royal)]">Call</span>
                    </a>
                  ))}
                </div>

                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--whatsapp)] px-5 py-2.5 text-sm sm:text-base font-bold text-[var(--ink)] hover:bg-[var(--whatsapp-hover)]"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Chat on WhatsApp</span>
                </a>

                {safeEmail && (
                  <div className="border-t border-[var(--hairline)] pt-4 space-y-1.5">
                    <div className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--gold-text)]">
                      Help &amp; Support Email
                    </div>
                    <a
                      href={`mailto:${safeEmail}?subject=${encodeURIComponent(
                        'Help & Support — MASTERMIND ACADEMY'
                      )}`}
                      className="flex min-h-[46px] items-center justify-between gap-2 rounded-xl border border-[var(--hairline)] bg-[var(--cream)] px-4 py-2.5 text-sm font-bold text-[var(--ink)] hover:border-[var(--royal)] hover:text-[var(--royal)] transition-colors"
                    >
                      <span className="inline-flex items-center gap-2.5 min-w-0">
                        <Mail className="h-4 w-4 text-[var(--royal)] shrink-0" aria-hidden="true" />
                        <span className="break-all">{safeEmail}</span>
                      </span>
                      <span className="text-xs font-bold text-[var(--royal)] shrink-0">Email</span>
                    </a>
                  </div>
                )}

                {siteConfig.timings.trim() && (
                  <div className="border-t border-[var(--hairline)] pt-3.5 flex items-start gap-3 text-sm text-[var(--muted)]">
                    <Clock className="h-4 w-4 text-[var(--royal)] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <div className="font-bold text-[var(--ink)]">Institute Timings</div>
                      <div>Open: {siteConfig.timings.trim()}</div>
                    </div>
                  </div>
                )}

                <div className="border-t border-[var(--hairline)] pt-3.5 flex items-start gap-3 text-xs text-[var(--muted)]">
                  <ShieldCheck className="h-4 w-4 text-[var(--royal)] shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="leading-relaxed">
                    For privacy questions, consent withdrawal, or grievances under the DPDP Act,
                    2023, email our support desk above or visit{' '}
                    <Link
                      to="/data-rights"
                      className="font-bold text-[var(--royal)] underline underline-offset-2"
                    >
                      Data Rights &amp; Grievance
                    </Link>
                    .
                  </p>
                </div>

                <div className="border-t border-[var(--hairline)] pt-4 space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--gold-text)]">
                    Follow Us
                  </div>
                  <SocialLinks variant="light" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* "GOT ANY QUESTIONS?" FORM CARD */}
      <section className="bg-white py-[56px] lg:py-[96px] border-t border-[var(--hairline)]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <Reveal>
            <div className="rounded-[20px] border border-[var(--hairline)] bg-[var(--cream)] p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
                <div className="lg:col-span-5 space-y-3">
                  <h2 className="font-poster uppercase text-[36px] sm:text-[44px] leading-none text-[var(--ink)]">
                    Got Any Questions?
                  </h2>
                  <p className="text-base text-[var(--muted)]">
                    Fill the form and we will get in touch with you soon.
                  </p>
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
