import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import { getTelHref, siteConfig } from '../data/siteConfig';
import { useEnquiryModal } from '../context/EnquiryModalContext';
import { SmartPhoto } from './SmartPhoto';
import { EASE_OUT } from './MotionPrimitives';
import { FormatOrdinals } from './FormatText';

const AUTOPLAY_INTERVAL_MS = 5000;

export function HeroBannerCarousel() {
  const slides = siteConfig.bannerSlides;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const prefersReduced = useReducedMotion();
  const { openEnquiryModal } = useEnquiryModal();
  const touchStartX = useRef<number | null>(null);

  const total = slides.length;

  const goToSlide = useCallback(
    (nextIdx: number) => {
      const normalized = ((nextIdx % total) + total) % total;
      setDirection(normalized >= activeIndex ? 1 : -1);
      setActiveIndex(normalized);
    },
    [activeIndex, total]
  );

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (prefersReduced || paused || total <= 1) return;
    const timer = window.setInterval(goNext, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [goNext, paused, prefersReduced, total]);

  const handleTouchStart = (e: TouchEvent<HTMLElement>) => {
    setPaused(true);
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLElement>) => {
    const startX = touchStartX.current;
    const endX = e.changedTouches[0]?.clientX ?? null;
    touchStartX.current = null;

    if (startX !== null && endX !== null) {
      const delta = startX - endX;
      if (Math.abs(delta) > 40) {
        if (delta > 0) goNext();
        else goPrev();
      }
    }
    setPaused(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    }
  };

  const slide = slides[activeIndex] ?? slides[0];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="MASTERMIND ACADEMY featured courses"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="bg-[var(--cream)] focus:outline-none"
    >
      {/* Full-Width Poster Banner Container — Fixed Explicit Height for Zero CLS */}
      <div className="relative w-full min-h-[410px] sm:min-h-[440px] lg:h-[500px] overflow-hidden bg-[var(--royal)]">
        {/* Deep Royal-to-Navy Directional Shading */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0F2A6B] via-[#1F4FB5] to-[#1A439B]"
        />

        {/* Large Soft-Gold Curved Organic Shape on the Right */}
        <svg
          aria-hidden="true"
          viewBox="0 0 720 480"
          preserveAspectRatio="none"
          className="pointer-events-none absolute right-0 top-0 h-full w-[50%] sm:w-[48%] lg:w-[46%]"
        >
          <path
            d="M230,0 C110,120 70,310 150,480 L720,480 L720,0 Z"
            fill="#E9BF5A"
          />
          <path
            d="M195,0 C75,130 35,315 115,480 L150,480 C70,310 110,120 230,0 Z"
            fill="#E9BF5A"
            fillOpacity="0.28"
          />
        </svg>

        {/* Subtle Geometric Dots Accent Top-Left */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-5 left-5 hidden lg:grid grid-cols-5 gap-2 opacity-20"
        >
          {Array.from({ length: 15 }).map((_, i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
          ))}
        </div>

        {/* Active Slide Content */}
        <div
          aria-live="polite"
          className="relative z-10 mx-auto h-[calc(100%-40px)] max-w-[1200px] px-4 sm:px-6"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.id}
              initial={
                prefersReduced
                  ? { opacity: 1 }
                  : { opacity: 0, x: direction > 0 ? 28 : -28 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={
                prefersReduced
                  ? { opacity: 0 }
                  : { opacity: 0, x: direction > 0 ? -24 : 24 }
              }
              transition={{ duration: 0.34, ease: EASE_OUT }}
              className="relative h-full w-full flex flex-col justify-between py-5 sm:py-7 lg:py-10 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8"
            >
              {/* Left Text & CTA Zone */}
              <div className="relative z-20 max-w-[68%] sm:max-w-[62%] lg:max-w-none lg:col-span-7 flex flex-col justify-between h-full lg:h-auto lg:justify-center gap-2.5 sm:gap-4 pb-10 lg:pb-0">
                <div className="space-y-2 sm:space-y-3">
                  <p className="inline-block rounded-md bg-[#0F2A6B]/55 px-2 py-0.5 sm:bg-transparent sm:p-0 text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[var(--gold)]">
                    <FormatOrdinals text={slide.eyebrow} />
                  </p>

                  {activeIndex === 0 ? (
                    <h1 className="font-poster uppercase text-[34px] min-[390px]:text-[38px] sm:text-[50px] lg:text-[64px] leading-[0.96] text-white drop-shadow-[0_2px_10px_rgba(15,42,107,0.35)]">
                      <FormatOrdinals text={slide.headline} />
                    </h1>
                  ) : (
                    <h2 className="font-poster uppercase text-[34px] min-[390px]:text-[38px] sm:text-[50px] lg:text-[64px] leading-[0.96] text-white drop-shadow-[0_2px_10px_rgba(15,42,107,0.35)]">
                      <FormatOrdinals text={slide.headline} />
                    </h2>
                  )}

                  <p className="text-[14px] sm:text-base lg:text-lg font-medium text-white/95 leading-snug max-w-xl">
                    <FormatOrdinals text={slide.subline} />
                  </p>

                  {/* Highlight Bullets */}
                  <ul className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5">
                    {slide.pills.slice(0, 4).map((pill) => (
                      <li
                        key={pill}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-[#0F2A6B]/65 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold text-white leading-tight"
                      >
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] shrink-0"
                        />
                        <span>
                          <FormatOrdinals text={pill} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Primary CTA Button positioned cleanly above the bottom phone strip */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => openEnquiryModal(slide.enquiryProgram)}
                    className="btn-cta inline-flex min-h-[44px] sm:min-h-[48px] items-center justify-center gap-2 rounded-xl px-4 sm:px-6 py-2.5 text-sm sm:text-base font-bold cursor-pointer whitespace-nowrap"
                  >
                    <span>{slide.ctaLabel}</span>
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </button>

                  <Link
                    to={slide.ctaHref}
                    className="hidden sm:inline-flex min-h-[48px] items-center gap-1.5 rounded-xl border border-white/40 bg-[#0F2A6B]/45 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-[var(--navy)] transition-colors whitespace-nowrap"
                  >
                    <span>Course Details</span>
                  </Link>
                </div>
              </div>

              {/* Right Student Photo Slot (Bottom-Right on Mobile overlapping gold curve; Large Right on Desktop) */}
              <div className="pointer-events-none absolute right-0 bottom-3 sm:bottom-4 lg:static lg:col-span-5 lg:flex lg:justify-end lg:items-center">
                <div
                  className={
                    slide.transparentCutout
                      ? 'w-[140px] min-[390px]:w-[155px] sm:w-[220px] lg:w-[370px] h-[180px] sm:h-[260px] lg:h-[360px]'
                      : 'w-[132px] min-[390px]:w-[146px] sm:w-[215px] lg:w-[390px] aspect-[4/4] sm:aspect-[4/3] lg:aspect-[5/4] overflow-hidden rounded-2xl lg:rounded-[22px] border-[3px] lg:border-4 border-white shadow-[0_18px_36px_-12px_rgba(15,42,107,0.4)] bg-[var(--sand-placeholder)]'
                  }
                >
                  <SmartPhoto
                    src={slide.image}
                    alt={slide.imageAlt}
                    width={960}
                    height={720}
                    aspectClass="h-full w-full"
                    priority={activeIndex === 0}
                    transparentCutout={slide.transparentCutout}
                    placeholderLabel={slide.headline}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Phone Strip anchored cleanly at base of the banner */}
        <div className="absolute bottom-0 inset-x-0 z-20 h-10 bg-[#0F2A6B]/95 border-t border-[var(--gold)]/45">
          <div className="mx-auto flex h-full max-w-[1200px] items-center justify-center sm:justify-between px-4 sm:px-6 text-xs sm:text-sm font-semibold text-white tabular-nums">
            <div className="inline-flex items-center gap-2 whitespace-nowrap">
              <Phone className="h-3.5 w-3.5 text-[var(--gold)] shrink-0" aria-hidden="true" />
              <span className="text-[var(--gold)] uppercase tracking-wider text-[11px] sm:text-xs">
                Call
              </span>
              <a
                href={getTelHref(0)}
                className="hover:text-[var(--gold)] transition-colors py-1"
              >
                {siteConfig.phones[0]}
              </a>
              <span aria-hidden="true" className="text-white/40">
                |
              </span>
              <a
                href={getTelHref(1)}
                className="hover:text-[var(--gold)] transition-colors py-1"
              >
                {siteConfig.phones[1]}
              </a>
            </div>
            <span className="hidden sm:inline text-xs font-medium text-white/85">
              <FormatOrdinals
                text={
                  siteConfig.timings.trim()
                    ? `Open ${siteConfig.timings.trim()} · ${siteConfig.address.fullFormatted}`
                    : siteConfig.address.fullFormatted
                }
              />
            </span>
          </div>
        </div>
      </div>

      {/* Arrows and Pagination Dots Below the Banner */}
      <div className="mx-auto flex max-w-[1200px] items-center justify-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous slide"
          className="btn-press inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline)] bg-white text-[var(--navy)] hover:border-[var(--royal)] hover:text-[var(--royal)] cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-1" role="tablist" aria-label="Banner slides">
          {slides.map((item, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Slide ${idx + 1}: ${item.headline}`}
                onClick={() => goToSlide(idx)}
                className="inline-flex h-11 min-w-[32px] items-center justify-center px-1 cursor-pointer"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-200 ${
                    active ? 'w-7 bg-[var(--royal)]' : 'w-2.5 bg-[var(--navy)]/25 hover:bg-[var(--navy)]/50'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className="btn-press inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline)] bg-white text-[var(--navy)] hover:border-[var(--royal)] hover:text-[var(--royal)] cursor-pointer"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
