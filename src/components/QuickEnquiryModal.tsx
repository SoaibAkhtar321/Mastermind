import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Phone, X } from 'lucide-react';
import { useEnquiryModal } from '../context/EnquiryModalContext';
import { getTelHref, siteConfig } from '../data/siteConfig';
import { EASE_OUT } from './MotionPrimitives';
import { WhatsAppEnquiryForm } from './WhatsAppEnquiryForm';
import { FormatOrdinals } from './FormatText';

export function QuickEnquiryModal() {
  const { isOpen, defaultProgram, closeEnquiryModal } = useEnquiryModal();
  const prefersReduced = useReducedMotion();
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      if (isOpen) {
        closeEnquiryModal();
      }
    }
  }, [location.pathname, isOpen, closeEnquiryModal]);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeEnquiryModal();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, closeEnquiryModal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-enquiry-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={closeEnquiryModal}
            className="fixed inset-0 bg-[#101C3A]/65 backdrop-blur-xs"
            aria-hidden="true"
          />

          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            className="relative z-10 flex max-h-[92dvh] w-full sm:max-w-lg flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border border-[var(--hairline)] bg-[var(--cream)] shadow-2xl"
          >
            <div className="bg-[var(--navy)] border-b-2 border-[var(--gold)] px-5 py-4 sm:px-6 text-white flex items-start justify-between gap-4 shrink-0">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                  {siteConfig.name} · <FormatOrdinals text="Nehru Nagar, 2nd Cross, Belagavi" /> ·
                  Online &amp; Offline
                </p>
                <h2
                  id="quick-enquiry-title"
                  className="font-poster uppercase mt-0.5 text-2xl tracking-wide text-white"
                >
                  Quick Course Enquiry
                </h2>
              </div>
              <button
                type="button"
                onClick={closeEnquiryModal}
                aria-label="Close enquiry form"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-4 sm:px-6 sm:py-5 bg-[var(--cream)]">
              <WhatsAppEnquiryForm defaultProgram={defaultProgram} compact />

              <div className="mt-4 border-t border-[var(--hairline)] pt-3.5 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-[var(--muted)] tabular-nums">
                <span>Call directly:</span>
                <div className="flex items-center gap-3">
                  <a
                    href={getTelHref(0)}
                    className="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-[var(--royal)] hover:underline"
                  >
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{siteConfig.phones[0]}</span>
                  </a>
                  <span aria-hidden="true" className="text-[var(--hairline)]">
                    |
                  </span>
                  <a
                    href={getTelHref(1)}
                    className="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-[var(--royal)] hover:underline"
                  >
                    <span>{siteConfig.phones[1]}</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
