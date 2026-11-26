import { getFilledSocialLinks } from '../data/siteConfig';

export function InstagramIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function FacebookIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
    </svg>
  );
}

function SocialPlatformIcon({ id, className }: { id: string; className?: string }) {
  if (id === 'instagram') return <InstagramIcon className={className} />;
  if (id === 'facebook') return <FacebookIcon className={className} />;
  return null;
}

interface SocialLinksProps {
  variant?: 'header' | 'footer' | 'light' | 'drawer';
  className?: string;
}

export function SocialLinks({ variant = 'light', className = '' }: SocialLinksProps) {
  const socialLinks = getFilledSocialLinks();
  if (socialLinks.length === 0) return null;

  if (variant === 'header') {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        {socialLinks.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow MASTERMIND ACADEMY on ${item.label}`}
            title={`Follow us on ${item.label}`}
            className={`btn-press inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--hairline)] bg-[var(--cream)] text-[var(--navy)] transition-colors ${
              item.id === 'instagram'
                ? 'hover:border-[#E1306C]/40 hover:bg-[#E1306C]/10 hover:text-[#C13584]'
                : item.id === 'facebook'
                  ? 'hover:border-[#1877F2]/40 hover:bg-[#1877F2]/10 hover:text-[#1877F2]'
                  : 'hover:border-[var(--royal)] hover:text-[var(--royal)]'
            }`}
          >
            <SocialPlatformIcon id={item.id} className="h-[18px] w-[18px]" />
          </a>
        ))}
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        {socialLinks.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow MASTERMIND ACADEMY on ${item.label}`}
            className="btn-press inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white hover:border-[var(--gold)] hover:bg-white/10 hover:text-[var(--gold)] transition-colors"
          >
            <SocialPlatformIcon id={item.id} className="h-4 w-4 text-[var(--gold)] shrink-0" />
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    );
  }

  if (variant === 'drawer') {
    return (
      <div className={`grid grid-cols-2 gap-2 ${className}`}>
        {socialLinks.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow MASTERMIND ACADEMY on ${item.label}`}
            className="btn-press inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[var(--hairline)] bg-[var(--cream)] px-3 py-2 text-sm font-bold text-[var(--navy)] hover:border-[var(--royal)] hover:text-[var(--royal)] transition-colors"
          >
            <SocialPlatformIcon
              id={item.id}
              className={`h-4 w-4 shrink-0 ${
                item.id === 'instagram'
                  ? 'text-[#C13584]'
                  : item.id === 'facebook'
                    ? 'text-[#1877F2]'
                    : 'text-[var(--royal)]'
              }`}
            />
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {socialLinks.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow MASTERMIND ACADEMY on ${item.label}`}
          className={`btn-press inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[var(--hairline)] bg-white px-4 py-2 text-sm font-bold text-[var(--ink)] transition-colors ${
            item.id === 'instagram'
              ? 'hover:border-[#E1306C]/45 hover:text-[#C13584]'
              : item.id === 'facebook'
                ? 'hover:border-[#1877F2]/45 hover:text-[#1877F2]'
                : 'hover:border-[var(--royal)] hover:text-[var(--royal)]'
          }`}
        >
          <SocialPlatformIcon
            id={item.id}
            className={`h-4 w-4 shrink-0 ${
              item.id === 'instagram'
                ? 'text-[#C13584]'
                : item.id === 'facebook'
                  ? 'text-[#1877F2]'
                  : 'text-[var(--royal)]'
            }`}
          />
          <span>{item.label}</span>
        </a>
      ))}
    </div>
  );
}
