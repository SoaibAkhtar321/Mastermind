import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { sanitizeMediaUrl } from '../lib/security';

interface SmartPhotoProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  aspectClass?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Set true if supplying a transparent cutout PNG/WebP (removes background plate) */
  transparentCutout?: boolean;
  placeholderLabel?: string;
}

/**
 * Resilient WebP photo slot:
 * - explicit width/height for near-zero CLS
 * - eager/high-priority for above-the-fold slide 1, lazy below the fold
 * - validates image src via sanitizeMediaUrl
 * - sand-coloured placeholder (#EDE4CC) when an image file is missing
 */
export function SmartPhoto({
  src,
  alt,
  width,
  height,
  aspectClass = 'aspect-[16/10]',
  className = '',
  imgClassName = '',
  priority = false,
  transparentCutout = false,
  placeholderLabel,
}: SmartPhotoProps) {
  const safeSrc = sanitizeMediaUrl(src);
  const [failed, setFailed] = useState(!safeSrc);

  const bgClass = transparentCutout ? 'bg-transparent' : 'bg-[var(--sand-placeholder)]';

  return (
    <div className={`relative overflow-hidden ${bgClass} ${aspectClass} ${className}`}>
      {failed || !safeSrc ? (
        <div
          role="img"
          aria-label={alt}
          className="flex h-full w-full flex-col items-center justify-center bg-[var(--sand-placeholder)] p-4 text-center"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)] bg-[var(--cream)] text-[var(--navy)]">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
          </span>
          {placeholderLabel && (
            <span className="mt-2 text-xs font-semibold text-[var(--ink)]">
              {placeholderLabel}
            </span>
          )}
        </div>
      ) : (
        <img
          src={safeSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className={`h-full w-full ${
            transparentCutout ? 'object-contain object-bottom' : 'object-cover'
          } ${imgClassName}`}
        />
      )}
    </div>
  );
}
