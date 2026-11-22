import { useState } from 'react';
import { siteConfig } from '../data/siteConfig';

interface BrandLogoProps {
  variant?: 'full' | 'compact';
  className?: string;
  priority?: boolean;
}

/**
 * Official Mastermind Academy logo always mounted on a clean white plate.
 */
export function BrandLogo({
  variant = 'full',
  className = '',
  priority = false,
}: BrandLogoProps) {
  const [src, setSrc] = useState(siteConfig.brand.logoUrl);

  const handleError = () => {
    if (src !== siteConfig.brand.logoFallbackUrl) {
      setSrc(siteConfig.brand.logoFallbackUrl);
    }
  };

  if (variant === 'compact') {
    return (
      <span className={`inline-flex items-center gap-2 select-none ${className}`}>
        <span className="inline-flex items-center justify-center overflow-hidden rounded-lg border border-[var(--hairline)] bg-white px-1.5 py-0.5 shrink-0">
          <img
            src={src}
            onError={handleError}
            alt=""
            aria-hidden="true"
            width={52}
            height={36}
            referrerPolicy="no-referrer"
            className="h-7 sm:h-8 w-auto object-contain block"
          />
        </span>
        <span className="flex flex-col leading-none">
          <span className="font-poster uppercase text-[19px] sm:text-[21px] leading-none tracking-[0.03em] text-[var(--navy)] whitespace-nowrap">
            MASTERMIND
          </span>
          <span className="mt-0.5 inline-flex items-center gap-1 whitespace-nowrap">
            <span className="h-[1.5px] w-2 bg-[var(--gold)]" aria-hidden="true" />
            <span className="text-[9.5px] font-bold tracking-[0.2em] text-[var(--red)] uppercase">
              Academy
            </span>
            <span className="h-[1.5px] w-2 bg-[var(--gold)]" aria-hidden="true" />
          </span>
        </span>
      </span>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center rounded-2xl border border-[var(--hairline)] bg-white p-3.5 sm:p-4 shadow-xs ${className}`}
    >
      <img
        src={src}
        onError={handleError}
        alt={siteConfig.brand.logoAlt}
        width={360}
        height={240}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer"
        className="w-full h-auto max-w-[280px] object-contain block rounded-lg"
      />
    </div>
  );
}
