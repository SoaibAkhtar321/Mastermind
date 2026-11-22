import { useMemo } from 'react';
import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from 'lucide-react';
import {
  getDirectionsUrl,
  getFilledSocialLinks,
  getOpenInMapsUrl,
  getSafeEmail,
  getSafeGoogleMapsEmbedUrl,
  getTelHref,
  getWhatsAppUrl,
  siteConfig,
} from '../data/siteConfig';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Layout } from '../components/Layout';
import { WhatsAppEnquiryForm } from '../components/WhatsAppEnquiryForm';
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
    title: 'Contact & Location | MASTERMIND ACADEMY, Belagavi',
    description:
      'Visit MASTERMIND ACADEMY in Nehru Nagar, Belagavi 590010 (open 7:00 AM to 8:30 PM). Get directions, call 90194 16236 / 81239 50627, or WhatsApp us.',
    pageType: 'ContactPage',
    breadcrumbs,
  });

  const socialLinks = getFilledSocialLinks();
  const safeEmail = getSafeEmail();
  const safeMapEmbedUrl = getSafeGoogleMapsEmbedUrl();
  const hasEmbedMap = Boolean(safeMapEmbedUrl);
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
            Nehru Nagar · Belagavi 590010 · Open {siteConfig.timings}
          </p>
          <h1 className="font-poster uppercase text-[40px] sm:text-[52px] leading-none text-white">
            Find MASTERMIND ACADEMY
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-white/90">
            Visit our centre in Nehru Nagar, Belagavi (open {siteConfig.timings}), call directly, or
            send a WhatsApp enquiry.
          </p>
        </div>
      </section>

      {/* ADDRESS, DIRECT PHONE & OPTIONAL EMBED MAP (Hides Map Card if Embed URL is Empty) */}
      <section className="py-[56px] lg:py-[96px]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
            {/* Address & Directions Card */}
            <Reveal className={hasEmbedMap ? 'lg:col-span-6' : 'lg:col-span-7'}>
              <div className="card-coaching p-6 sm:p-8 space-y-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--navy)] text-[var(--gold)]">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
                      Nehru Nagar, Belagavi
                    </h2>
                    <p className="text-sm text-[var(--muted)]">{siteConfig.areasServed}</p>
                  </div>
                </div>

                <address className="not-italic space-y-1 text-base text-[var(--muted)]">
                  <div className="font-bold text-[var(--ink)]">{siteConfig.name}</div>
                  <div>{siteConfig.address.fullFormatted}</div>
                  {siteConfig.address.landmark.trim() && (
                    <div className="text-sm">Landmark: {siteConfig.address.landmark.trim()}</div>
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

                {hasEmbedMap && (
                  <div className="pt-2">
                    <div className="overflow-hidden rounded-2xl border border-[var(--hairline)] aspect-[16/10] w-full bg-[var(--cream)]">
                      <iframe
                        title="MASTERMIND ACADEMY, Nehru Nagar, Belagavi Map"
                        src={safeMapEmbedUrl}
                        className="h-full w-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        sandbox="allow-scripts allow-same-origin allow-popups"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>
            </Reveal>

            {/* Direct Phone & WhatsApp Card */}
            <Reveal delay={0.06} className={hasEmbedMap ? 'lg:col-span-6' : 'lg:col-span-5'}>
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
                  <div className="border-t border-[var(--hairline)] pt-3.5 flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-[var(--royal)] shrink-0" aria-hidden="true" />
                    <a
                      href={`mailto:${safeEmail}`}
                      className="font-bold text-[var(--ink)] hover:text-[var(--royal)] underline underline-offset-2"
                    >
                      {safeEmail}
                    </a>
                  </div>
                )}

                {siteConfig.timings.trim() && (
                  <div className="border-t border-[var(--hairline)] pt-3.5 flex items-start gap-3 text-sm text-[var(--muted)]">
                    <Clock className="h-4 w-4 text-[var(--royal)] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <div className="font-bold text-[var(--ink)]">Timings</div>
                      <div>{siteConfig.timings.trim()}</div>
                    </div>
                  </div>
                )}

                {socialLinks.length > 0 && (
                  <div className="border-t border-[var(--hairline)] pt-3.5 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--gold-text)]">
                      Follow us
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {socialLinks.map((item) => (
                        <a
                          key={item.id}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[44px] items-center rounded-xl border border-[var(--hairline)] bg-[var(--cream)] px-3.5 py-1.5 text-xs font-bold text-[var(--ink)] hover:border-[var(--royal)] hover:text-[var(--royal)]"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
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
