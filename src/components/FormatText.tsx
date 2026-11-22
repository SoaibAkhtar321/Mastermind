import { Fragment } from 'react';

const ORDINAL_RE = /(\b\d+)(st|nd|rd|th)\b/gi;

/**
 * Renders plain text with proper superscript ordinal suffixes (e.g., 6th -> 6ᵗʰ, 10th -> 10ᵗʰ, 2nd -> 2ⁿᵈ).
 * Keeps semantic text intact for screen readers and search crawlers.
 */
export function FormatOrdinals({ text }: { text: string }) {
  const parts: Array<{ type: 'text'; value: string } | { type: 'ordinal'; num: string; suffix: string }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  ORDINAL_RE.lastIndex = 0;
  while ((match = ORDINAL_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: text.slice(lastIndex, match.index) });
    }
    parts.push({
      type: 'ordinal',
      num: match[1],
      suffix: match[2].toLowerCase(),
    });
    lastIndex = ORDINAL_RE.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', value: text.slice(lastIndex) });
  }

  return (
    <>
      {parts.map((part, idx) =>
        part.type === 'ordinal' ? (
          <Fragment key={idx}>
            {part.num}
            <sup className="relative -top-[0.42em] align-baseline text-[0.62em] leading-none lowercase font-semibold ml-[0.02em]">
              {part.suffix}
            </sup>
          </Fragment>
        ) : (
          <Fragment key={idx}>{part.value}</Fragment>
        )
      )}
    </>
  );
}
