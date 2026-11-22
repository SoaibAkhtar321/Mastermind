import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import {
  ChevronDown,
  ChevronRight,
  Clock,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  Phone,
  X,
} from 'lucide-react';
import {
  getCorePrograms,
  getDirectionsUrl,
  getFilledSocialLinks,
  getSafeEmail,
  getTelHref,
  getWhatsAppUrl,
  siteConfig,
} from '../data/siteConfig';
import { useEnquiryModal } from '../context/EnquiryModalContext';
import { BrandLogo } from './BrandLogo';
import { EASE_OUT } from './MotionPrimitives';
import type { BreadcrumbItem } from '../lib/seo';

interface LayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  whatsappMessage?: string;
}

export function Layout({ children, breadcrumbs, whatsappMessage }: LayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const prefersReduced = useReducedMotion();
  const { openEnquiryModal } = useEnquiryModal();

  useEffect(() => {
    setMobileMenuOpen(false);
    setProgramsOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProgramsOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProgramsOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onOutsideClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onOutsideClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const socialLinks = getFilledSocialLinks();
  const safeEmail = getSafeEmail();
  const waHref = getWhatsAppUrl(whatsappMessage);
  const directionsHref = getDirectionsUrl();
  const corePrograms = getCorePrograms();
  const isProgramRoute = siteConfig.programs.some((p) => p.slug === location.pathname);

  const navItems = [
    { to: '/about', label: 'About' },
    { to: '/lecturers', label: 'Lecturers' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contact' },
  ];

  const tickerItems = siteConfig.tickerMessages;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--cream)] text-[var(--ink)] pb-[68px] md:pb-0">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-[var(--royal)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      {/* 1) TOP TICKER STRIP (32px, Navy bg, Soft Gold uppercase text, pauses on hover, stops under prefers-reduced-motion) */}
      {tickerItems.length > 0 && (
        <div
          role="region"
          aria-label="Institute highlights"
          className="ticker-wrap md:sticky md:top-0 z-50 h-8 w-full overflow-hidden bg-[var(--navy)] text-[var(--gold)] flex items-center"
        >
          {prefersReduced ? (
            <div className="mx-auto flex max-w-[1200px] items-center gap-4 overflow-x-auto px-4 text-[11px] font-bold uppercase tracking-[0.14em] whitespace-nowrap no-scrollbar">
              {tickerItems.map((msg, idx) => (
                <span key={`${msg}-${idx}`} className="inline-flex items-center gap-4 shrink-0">
                  <span>{msg}</span>
                  {idx < tickerItems.length - 1 && (
                    <span aria-hidden="true" className="text-white/40">
                      •
                    </span>
                  )}
                </span>
              ))}
            </div>
          ) : (
            <div className="ticker-track text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] whitespace-nowrap">
              {[0, 1].map((dup) => (
                <div
                  key={dup}
                  aria-hidden={dup === 1 ? 'true' : undefined}
                  className="flex shrink-0 items-center"
                >
                  {tickerItems.map((msg, idx) => (
                    <span key={`${dup}-${idx}`} className="inline-flex items-center">
                      <span className="px-5">{msg}</span>
                      <span aria-hidden="true" className="text-white/45">
                        ★
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2) STICKY HEADER (Under Ticker on Desktop, Top on Mobile; White with Thin Soft-Gold Line) */}
      <header
        className={`sticky top-0 md:top-8 z-40 bg-white border-b-2 border-[var(--gold)] transition-shadow duration-200 ${
          scrolled ? 'shadow-[0_8px_24px_-14px_rgba(16,28,58,0.18)]' : ''
        }`}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 h-14 lg:h-16">
          {/* Left: Official Logo on White Plate */}
          <Link
            to="/"
            className="shrink-0 whitespace-nowrap"
            aria-label={`${siteConfig.name} Home`}
          >
            <BrandLogo variant="compact" />
          </Link>

          {/* Centre: Desktop Single-Line Nav Links (Home, Programs, About, Lecturers, FAQ, Contact) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7 text-[15px] font-semibold text-[var(--ink)]"
          >
            <Link
              to="/"
              className={`relative whitespace-nowrap shrink-0 py-2 transition-colors hover:text-[var(--royal)] ${
                location.pathname === '/' ? 'text-[var(--royal)]' : ''
              }`}
            >
              Home
              {location.pathname === '/' && (
                <motion.span
                  layoutId="header-nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--gold)]"
                />
              )}
            </Link>

            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setProgramsOpen((prev) => !prev)}
                aria-expanded={programsOpen}
                aria-haspopup="true"
                className={`relative inline-flex items-center gap-1 whitespace-nowrap shrink-0 py-2 transition-colors hover:text-[var(--royal)] cursor-pointer ${
                  isProgramRoute ? 'text-[var(--royal)]' : ''
                }`}
              >
                Programs
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-150 ${
                    programsOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
                {isProgramRoute && (
                  <motion.span
                    layoutId="header-nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--gold)]"
                  />
                )}
              </button>

              {programsOpen && (
                <div
                  role="menu"
                  className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-[var(--hairline)] bg-white p-2 shadow-[0_16px_34px_-12px_rgba(16,28,58,0.18)]"
                >
                  {corePrograms.map((program) => (
                    <Link
                      key={program.id}
                      to={program.slug}
                      role="menuitem"
                      className={`block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-[var(--cream)] ${
                        location.pathname === program.slug ? 'bg-[var(--cream)] text-[var(--royal)]' : ''
                      }`}
                    >
                      <div className="text-sm font-bold text-[var(--ink)]">
                        {program.shortTitle}
                      </div>
                      <div className="mt-0.5 text-xs text-[var(--muted)]">{program.duration}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navItems.map((item) => {
              const active =
                location.pathname === item.to ||
                (item.to === '/lecturers' &&
                  (location.pathname.startsWith('/lecturers/') ||
                    location.pathname === '/faculty' ||
                    location.pathname.startsWith('/faculty/')));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative whitespace-nowrap shrink-0 py-2 transition-colors hover:text-[var(--royal)] ${
                    active ? 'text-[var(--royal)]' : ''
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="header-nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--gold)]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Desktop Phone Button (hidden on mobile where sticky bottom bar handles it) + Mobile Menu */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={getTelHref(0)}
              className="btn-press hidden lg:inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-[var(--navy)] px-4 py-2 text-sm font-bold text-white hover:bg-[var(--royal)] whitespace-nowrap shrink-0 tabular-nums"
            >
              <Phone className="h-4 w-4 text-[var(--gold)] shrink-0" aria-hidden="true" />
              <span>{siteConfig.phones[0]}</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex lg:hidden h-11 w-11 items-center justify-center rounded-xl border border-[var(--hairline)] bg-[var(--cream)] text-[var(--ink)]"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <nav
            id="mobile-nav-drawer"
            aria-label="Mobile Navigation"
            className="lg:hidden border-t border-[var(--hairline)] bg-white px-4 py-4 shadow-lg"
          >
            <div className="space-y-1">
              <Link
                to="/"
                className="flex min-h-[44px] items-center rounded-xl px-3.5 text-base font-semibold text-[var(--ink)] hover:bg-[var(--cream)]"
              >
                Home
              </Link>
              <div className="pt-2 pb-1 px-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[var(--gold-text)]">
                Programs
              </div>
              {corePrograms.map((program) => (
                <Link
                  key={program.id}
                  to={program.slug}
                  className="flex min-h-[44px] items-center justify-between rounded-xl px-3.5 text-sm font-medium text-[var(--ink)] hover:bg-[var(--cream)]"
                >
                  <span>{program.shortTitle}</span>
                  <ChevronRight className="h-4 w-4 text-[var(--gold-text)]" aria-hidden="true" />
                </Link>
              ))}
              <div className="my-2 border-t border-[var(--hairline)]" />
              <Link
                to="/about"
                className="flex min-h-[44px] items-center rounded-xl px-3.5 text-base font-semibold text-[var(--ink)] hover:bg-[var(--cream)]"
              >
                About
              </Link>
              <Link
                to="/lecturers"
                className="flex min-h-[44px] items-center rounded-xl px-3.5 text-base font-semibold text-[var(--ink)] hover:bg-[var(--cream)]"
              >
                Lecturers
              </Link>
              <Link
                to="/faq"
                className="flex min-h-[44px] items-center rounded-xl px-3.5 text-base font-semibold text-[var(--ink)] hover:bg-[var(--cream)]"
              >
                FAQ
              </Link>
              <Link
                to="/contact"
                className="flex min-h-[44px] items-center rounded-xl px-3.5 text-base font-semibold text-[var(--ink)] hover:bg-[var(--cream)]"
              >
                Contact
              </Link>
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openEnquiryModal();
                  }}
                  className="btn-cta flex min-h-[46px] w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-bold cursor-pointer"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Breadcrumb Bar on Subpages */}
      {breadcrumbs && breadcrumbs.length > 1 && (
        <div className="bg-[var(--cream-deep)] border-b border-[var(--hairline)]">
          <nav
            aria-label="Breadcrumb"
            className="mx-auto max-w-[1200px] px-4 sm:px-6 py-2.5 text-xs sm:text-sm text-[var(--muted)]"
          >
            <ol className="flex flex-wrap items-center gap-1.5">
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <li key={crumb.path} className="inline-flex items-center gap-1.5">
                    {idx > 0 && (
                      <ChevronRight className="h-3.5 w-3.5 text-[var(--gold-text)]" aria-hidden="true" />
                    )}
                    {isLast ? (
                      <span aria-current="page" className="font-semibold text-[var(--ink)]">
                        {crumb.name}
                      </span>
                    ) : (
                      <Link to={crumb.path} className="hover:text-[var(--royal)] transition-colors">
                        {crumb.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <motion.main
        id="main-content"
        key={location.pathname}
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.22, ease: EASE_OUT }}
        className="flex-1"
      >
        {children}
      </motion.main>

      {/* 12) FOOTER: Soft-Gold Quote & Tagline Strip + Navy Footer */}
      <div className="bg-[var(--gold)] py-4 px-4 text-center border-t border-[var(--hairline)]">
        <p className="font-poster uppercase text-xl sm:text-2xl tracking-[0.12em] text-[var(--ink)]">
          {siteConfig.subline}
        </p>
        <p className="mt-0.5 text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[var(--navy)]">
          {siteConfig.name} · {siteConfig.tagline}
        </p>
      </div>

      <footer className="bg-[var(--ink)] text-white">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-14 lg:py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            {/* Logo on White Plate */}
            <div className="md:col-span-4 space-y-4">
              <BrandLogo variant="full" className="max-w-[230px] w-full p-3" />
              <p className="text-sm leading-relaxed text-white/80 max-w-sm">
                {siteConfig.subline}. Small, personal classes in Nehru Nagar, Belagavi.
              </p>
            </div>

            {/* Programs */}
            <div className="md:col-span-3 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
                Programs
              </h2>
              <ul className="space-y-2 text-sm text-white/85">
                {corePrograms.map((program) => (
                  <li key={program.id}>
                    <Link
                      to={program.slug}
                      className="hover:text-[var(--gold)] transition-colors inline-block py-0.5"
                    >
                      {program.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Institute */}
            <div className="md:col-span-2 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
                Institute
              </h2>
              <ul className="space-y-2 text-sm text-white/85">
                <li>
                  <Link to="/about" className="hover:text-[var(--gold)] transition-colors inline-block py-0.5">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/lecturers" className="hover:text-[var(--gold)] transition-colors inline-block py-0.5">
                    Lecturers
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-[var(--gold)] transition-colors inline-block py-0.5">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[var(--gold)] transition-colors inline-block py-0.5">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-3 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
                Contact
              </h2>
              <address className="not-italic space-y-2.5 text-sm text-white/85">
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-[var(--gold)] shrink-0 mt-1" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-white">{siteConfig.name}</strong>
                    <br />
                    {siteConfig.address.fullFormatted}
                    {siteConfig.address.landmark.trim() ? (
                      <>
                        <br />
                        {siteConfig.address.landmark.trim()}
                      </>
                    ) : null}
                  </span>
                </p>

                <div className="space-y-1.5 pt-1 tabular-nums">
                  {siteConfig.phones.map((phone, idx) => (
                    <div key={phone}>
                      <a
                        href={getTelHref(idx)}
                        className="inline-flex items-center gap-2 hover:text-[var(--gold)] transition-colors"
                      >
                        <Phone className="h-4 w-4 text-[var(--gold)] shrink-0" aria-hidden="true" />
                        <span>{phone}</span>
                      </a>
                    </div>
                  ))}
                </div>

                {safeEmail && (
                  <p>
                    <a
                      href={`mailto:${safeEmail}`}
                      className="hover:text-[var(--gold)] underline-offset-2 hover:underline"
                    >
                      {safeEmail}
                    </a>
                  </p>
                )}

                {siteConfig.timings.trim() && (
                  <p className="flex items-center gap-2 pt-1 text-sm font-semibold text-[var(--gold)] tabular-nums">
                    <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Open: {siteConfig.timings.trim()}</span>
                  </p>
                )}
              </address>

              {socialLinks.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {socialLinks.map((item) => (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[36px] items-center rounded-lg border border-white/20 px-3 py-1 text-xs font-semibold text-white hover:border-[var(--gold)] hover:text-[var(--gold)]"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 border-t border-white/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/70">
            <p>{siteConfig.footer.copyright}</p>
            <p>{siteConfig.address.napLine}</p>
          </div>
        </div>
      </footer>

      {/* Desktop Floating Round WhatsApp Button (bottom-right) */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with MASTERMIND ACADEMY on WhatsApp"
        title="Chat on WhatsApp"
        className="btn-press hidden md:flex fixed bottom-6 right-6 z-40 h-14 w-14 items-center justify-center rounded-full bg-[var(--whatsapp)] text-[var(--ink)] shadow-[0_12px_26px_-6px_rgba(16,28,58,0.45)] hover:bg-[var(--whatsapp-hover)]"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </a>

      {/* Sticky White Mobile Bottom Bar (Call, WhatsApp, Directions — 44px+ tap targets) */}
      <div
        role="region"
        aria-label="Quick Contact Actions"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[var(--hairline)] px-2 pt-1.5 pb-[max(0.45rem,env(safe-area-inset-bottom))] shadow-[0_-6px_20px_rgba(16,28,58,0.08)]"
      >
        <div className="grid grid-cols-3 gap-1.5">
          <a
            href={getTelHref(0)}
            className="btn-press flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1 text-[11px] font-bold text-[var(--navy)] active:bg-[var(--cream)]"
          >
            <Phone className="h-4 w-4 text-[var(--royal)] shrink-0" aria-hidden="true" />
            <span>Call</span>
          </a>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-xl bg-[var(--whatsapp)] px-2 py-1 text-[11px] font-bold text-[var(--ink)] active:bg-[var(--whatsapp-hover)]"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>

          <a
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1 text-[11px] font-bold text-[var(--navy)] active:bg-[var(--cream)]"
          >
            <Navigation className="h-4 w-4 text-[var(--royal)] shrink-0" aria-hidden="true" />
            <span>Directions</span>
          </a>
        </div>
      </div>
    </div>
  );
}
