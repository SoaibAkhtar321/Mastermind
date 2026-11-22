import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** Subtle Framer Motion fade-up on scroll (triggers once; disabled under prefers-reduced-motion). */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.45, delay: Math.min(delay, 0.2), ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Centred, bold, short section heading with subtle gold underline accent. */
export function SectionHeading({
  title,
  subtitle,
  tone = 'light',
  className = '',
}: {
  title: string;
  subtitle?: string;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const isDark = tone === 'dark';

  return (
    <div className={`mx-auto max-w-2xl text-center space-y-2.5 ${className}`}>
      <h2
        className={`text-[28px] sm:text-[36px] font-bold leading-[1.15] tracking-tight ${
          isDark ? 'text-white' : 'text-[var(--ink)]'
        }`}
      >
        {title}
      </h2>
      <div
        aria-hidden="true"
        className="mx-auto h-[3px] w-12 rounded-full bg-[var(--gold)]"
      />
      {subtitle && (
        <p
          className={`text-base leading-relaxed ${
            isDark ? 'text-white/90' : 'text-[var(--muted)]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/**
 * Numeric counter that animates once on scroll (respecting prefers-reduced-motion).
 * Supports plain display strings as well as optional prefix/suffix around an integer target.
 */
export function AnimatedCounter({
  display,
  target,
  prefix = '',
  suffix = '',
}: {
  display: string;
  target?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReduced = useReducedMotion();
  const [value, setValue] = useState<number>(target ?? 0);

  useEffect(() => {
    if (typeof target !== 'number' || prefersReduced || !inView) return;

    const startVal = 0;
    const duration = 650;
    const startTime = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (target - startVal) * eased);
      setValue(current);
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, prefersReduced, target]);

  if (typeof target !== 'number' || prefersReduced) {
    return (
      <span ref={ref} className="tabular-nums">
        {display}
      </span>
    );
  }

  return (
    <span ref={ref} className="tabular-nums">
      {inView ? `${prefix}${value}${suffix}` : display}
    </span>
  );
}
