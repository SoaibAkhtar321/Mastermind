import { useEffect } from 'react';
import {
  DEFAULT_INDEX_ROBOTS,
  buildBreadcrumbSchema,
  buildOrganizationSchema,
  buildWebPageSchema,
  buildWebSiteSchema,
  resolveFullUrl,
  type PageSeoMeta,
} from '../lib/seo';
import { safeJsonLdStringify } from '../lib/security';
import { siteConfig } from '../data/siteConfig';

function upsertMeta(attrName: 'name' | 'property', attrValue: string, content: string) {
  let el = document.head.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, extraAttrs?: Record<string, string>) {
  const selector = extraAttrs?.hreflang
    ? `link[rel="${rel}"][hreflang="${extraAttrs.hreflang}"]`
    : `link[rel="${rel}"]`;
  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (extraAttrs) {
      for (const [k, v] of Object.entries(extraAttrs)) {
        el.setAttribute(k, v);
      }
    }
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function useDocumentHead(meta: PageSeoMeta) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.title = meta.title;
    const canonicalUrl = resolveFullUrl(meta.path);
    const ogImageUrl = resolveFullUrl('/og-image.svg');
    const robotsDirective = meta.robots || DEFAULT_INDEX_ROBOTS;

    upsertMeta('name', 'description', meta.description);
    upsertMeta('name', 'robots', robotsDirective);
    upsertMeta('name', 'author', siteConfig.name);
    upsertMeta('name', 'geo.region', 'IN-KA');
    upsertMeta('name', 'geo.placename', 'Nehru Nagar, Belagavi, Karnataka');

    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:site_name', siteConfig.name);
    upsertMeta('property', 'og:type', meta.pageType === 'ProfilePage' ? 'profile' : 'website');
    upsertMeta('property', 'og:locale', 'en_IN');
    upsertMeta('property', 'og:image', ogImageUrl);
    upsertMeta('property', 'og:image:alt', `${siteConfig.name}, Nehru Nagar, Belagavi: ${siteConfig.tagline}`);

    if (canonicalUrl.startsWith('http')) {
      upsertMeta('property', 'og:url', canonicalUrl);
      upsertLink('canonical', canonicalUrl);
      upsertLink('alternate', canonicalUrl, { hreflang: 'en-IN' });
    } else {
      upsertLink('alternate', meta.path, { hreflang: 'en-IN' });
    }

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);
    upsertMeta('name', 'twitter:image', ogImageUrl);
    upsertMeta('name', 'twitter:image:alt', `${siteConfig.name}, Nehru Nagar, Belagavi: ${siteConfig.tagline}`);

    // Replace previous dynamic JSON-LD nodes with current route schemas
    const existing = document.head.querySelectorAll('script[data-mma-jsonld="true"]');
    existing.forEach((node) => node.remove());

    const allSchemas: Record<string, unknown>[] = [
      buildOrganizationSchema(),
      buildWebSiteSchema(),
      buildWebPageSchema(meta),
      buildBreadcrumbSchema(meta.breadcrumbs),
      ...(meta.schemas || []),
    ];

    for (const schema of allSchemas) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-mma-jsonld', 'true');
      script.textContent = safeJsonLdStringify(schema);
      document.head.appendChild(script);
    }
  }, [meta.path, meta.title, meta.description, meta.robots, meta.pageType, meta.breadcrumbs, meta.schemas]);
}
