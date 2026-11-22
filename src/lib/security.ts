/**
 * Input, URL, and structured-data sanitization utilities for Mastermind Academy.
 * Pure, zero-dependency guards to prevent unsafe URLs, malformed inputs, and
 * script-breakout inside JSON-LD blocks.
 */

const GOOGLE_MAPS_EMBED_HOSTS = new Set([
  'www.google.com',
  'maps.google.com',
  'google.com',
]);

const BASIC_EMAIL_RE = /^[^\s@<>()[\]\\,;:"']+@[^\s@<>()[\]\\,;:"']+\.[^\s@<>()[\]\\,;:"']{2,}$/;

/**
 * Validates and normalizes an external HTTPS URL.
 * Rejects javascript:, data:, vbscript:, credentials-in-URL, and non-HTTPS schemes.
 */
export function sanitizeExternalUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:') return '';
    if (parsed.username || parsed.password) return '';
    return parsed.toString();
  } catch {
    return '';
  }
}

/**
 * Strictly validates a Google Maps iframe embed URL before rendering in an <iframe>.
 */
export function sanitizeGoogleMapsEmbedUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:') return '';
    if (parsed.username || parsed.password) return '';
    const host = parsed.hostname.toLowerCase();
    if (!GOOGLE_MAPS_EMBED_HOSTS.has(host)) return '';
    if (!parsed.pathname.startsWith('/maps/embed')) return '';
    return parsed.toString();
  } catch {
    return '';
  }
}

/**
 * Validates image/media src paths: allows safe root-relative paths (no // or ..)
 * or strict HTTPS URLs.
 */
export function sanitizeMediaUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('/')) {
    if (trimmed.startsWith('//')) return '';
    if (trimmed.includes('..') || /[\u0000-\u001f\u007f]/.test(trimmed)) return '';
    return trimmed;
  }
  return sanitizeExternalUrl(trimmed);
}

/**
 * Sanitizes a phone number into a strict tel: href (optional leading + and digits only).
 */
export function sanitizeTelHref(rawPhone: string): string {
  const trimmed = rawPhone.trim();
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/[^0-9]/g, '');
  if (!digits) return 'tel:+919019416236';
  return `tel:${hasPlus ? '+' : ''}${digits}`;
}

/**
 * Validates an email address and blocks CR/LF or header-injection characters.
 */
export function sanitizeEmail(rawEmail: string): string {
  const trimmed = rawEmail.trim();
  if (!trimmed || /[\r\n<>]/.test(trimmed)) return '';
  return BASIC_EMAIL_RE.test(trimmed) ? trimmed : '';
}

/**
 * Strips non-printable control characters and enforces a maximum length for single-line fields.
 */
export function sanitizeSingleLine(value: string, maxLength: number): string {
  return value
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

/**
 * Strips non-printable control characters (preserving newlines) and enforces max length.
 */
export function sanitizeMultiLine(value: string, maxLength: number): string {
  return value
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, '')
    .trim()
    .slice(0, maxLength);
}

/**
 * Safely serializes JSON-LD so `<`, `>`, `&`, and line separators can never break out
 * of a `<script type="application/ld+json">` tag.
 */
export function safeJsonLdStringify(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
