import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../src/AppRoutes';
import {
  DEFAULT_INDEX_ROBOTS,
  NOINDEX_ROBOTS,
  SOCIAL_SHARE_IMAGE_PATH,
  buildBreadcrumbSchema,
  buildOrganizationSchema,
  buildWebPageSchema,
  buildWebSiteSchema,
  generateLlmsFullTxt,
  generateLlmsTxt,
  generateRobotsTxt,
  generateSitemapXml,
  getAllIndexablePageMeta,
  resolveFullUrl,
  type PageSeoMeta,
} from '../src/lib/seo';
import { safeJsonLdStringify } from '../src/lib/security';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function injectHeadAndHtml(template: string, route: PageSeoMeta, appHtml: string): string {
  const canonicalUrl = resolveFullUrl(route.path);
  const ogImageUrl = resolveFullUrl(SOCIAL_SHARE_IMAGE_PATH);
  const robotsDirective = route.robots || DEFAULT_INDEX_ROBOTS;
  const ogType = route.pageType === 'ProfilePage' ? 'profile' : 'website';

  const allSchemas = [
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    buildWebPageSchema(route),
    buildBreadcrumbSchema(route.breadcrumbs),
    ...(route.schemas || []),
  ];

  const jsonLdTags = allSchemas
    .map(
      (schema) =>
        `    <script type="application/ld+json" data-mma-jsonld="true">${safeJsonLdStringify(schema)}</script>`
    )
    .join('\n');

  const extraHead = [
    route.robots !== NOINDEX_ROBOTS
      ? `    <link rel="alternate" hreflang="en-IN" href="${escapeAttr(canonicalUrl)}" />`
      : '',
    route.robots !== NOINDEX_ROBOTS
      ? `    <link rel="alternate" hreflang="x-default" href="${escapeAttr(canonicalUrl)}" />`
      : '',
    route.robots !== NOINDEX_ROBOTS && canonicalUrl.startsWith('http')
      ? `    <link rel="canonical" href="${escapeAttr(canonicalUrl)}" />`
      : '',
    route.robots !== NOINDEX_ROBOTS && canonicalUrl.startsWith('http')
      ? `    <meta property="og:url" content="${escapeAttr(canonicalUrl)}" />`
      : '',
    jsonLdTags,
  ]
    .filter(Boolean)
    .join('\n');

  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(route.title)}</title>`);
  html = html.replace(
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${escapeAttr(route.description)}" />`
  );
  html = html.replace(
    /<meta\s+name="robots"[\s\S]*?\/>/,
    `<meta name="robots" content="${escapeAttr(robotsDirective)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:type" content="${ogType}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"[\s\S]*?\/>/,
    `<meta property="og:title" content="${escapeAttr(route.title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${escapeAttr(route.description)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image" content="${escapeAttr(ogImageUrl)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"[\s\S]*?\/>/,
    `<meta name="twitter:title" content="${escapeAttr(route.title)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"[\s\S]*?\/>/,
    `<meta name="twitter:description" content="${escapeAttr(route.description)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:image" content="${escapeAttr(ogImageUrl)}" />`
  );
  html = html.replace('</head>', `${extraHead}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  return html;
}

function main() {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error('dist/index.html not found. Run vite build before prerendering.');
  }

  const template = fs.readFileSync(indexHtmlPath, 'utf-8');
  const routes = getAllIndexablePageMeta();

  for (const route of routes) {
    const appHtml = renderToString(
      <MemoryRouter initialEntries={[route.path]}>
        <AppRoutes />
      </MemoryRouter>
    );

    const finalHtml = injectHeadAndHtml(template, route, appHtml);
    if (route.path === '/') {
      fs.writeFileSync(indexHtmlPath, finalHtml, 'utf-8');
    } else {
      const routeDir = path.join(distDir, route.path.replace(/^\/+/, ''));
      fs.mkdirSync(routeDir, { recursive: true });
      fs.writeFileSync(path.join(routeDir, 'index.html'), finalHtml, 'utf-8');
    }
  }

  // Generate 404.html with explicit noindex, follow directive
  const notFoundMeta: PageSeoMeta = {
    path: '/404',
    title: 'Page Not Found | MASTERMIND ACADEMY, Belagavi',
    description:
      'The page you looked for could not be found. Browse MASTERMIND ACADEMY courses in Nehru Nagar, Belagavi.',
    robots: NOINDEX_ROBOTS,
    breadcrumbs: [{ name: 'Home', path: '/' }],
    schemas: [],
  };
  const notFoundHtml = renderToString(
    <MemoryRouter initialEntries={['/404']}>
      <AppRoutes />
    </MemoryRouter>
  );
  fs.writeFileSync(
    path.join(distDir, '404.html'),
    injectHeadAndHtml(template, notFoundMeta, notFoundHtml),
    'utf-8'
  );

  // Generate and sync SEO/GEO files into both dist/ and public/
  const robotsTxt = generateRobotsTxt();
  const sitemapXml = generateSitemapXml();
  const llmsTxt = generateLlmsTxt();
  const llmsFullTxt = generateLlmsFullTxt();

  for (const targetDir of [distDir, publicDir]) {
    if (fs.existsSync(targetDir)) {
      fs.writeFileSync(path.join(targetDir, 'robots.txt'), robotsTxt, 'utf-8');
      fs.writeFileSync(path.join(targetDir, 'sitemap.xml'), sitemapXml, 'utf-8');
      fs.writeFileSync(path.join(targetDir, 'llms.txt'), llmsTxt, 'utf-8');
      fs.writeFileSync(path.join(targetDir, 'llms-full.txt'), llmsFullTxt, 'utf-8');
    }
  }

  console.log(
    `Prerendered ${routes.length} indexable routes + 404 + synced robots/sitemap/llms into dist/ and public/`
  );
}

main();
