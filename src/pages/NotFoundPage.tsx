import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone } from 'lucide-react';
import { getTelHref } from '../data/siteConfig';
import { NOINDEX_ROBOTS } from '../lib/seo';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Layout } from '../components/Layout';

export function NotFoundPage() {
  const breadcrumbs = useMemo(() => [{ name: 'Home', path: '/' }], []);

  useDocumentHead({
    path: '/404',
    title: 'Page Not Found | MASTERMIND ACADEMY, Belagavi',
    description:
      'The page you looked for could not be found. Browse MASTERMIND ACADEMY courses in Nehru Nagar, Belagavi.',
    robots: NOINDEX_ROBOTS,
    breadcrumbs,
  });

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <section className="py-[56px] lg:py-[96px]">
        <div className="mx-auto max-w-xl px-4 sm:px-6 text-center">
          <div className="card-coaching p-8 sm:p-10 space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--gold-text)]">
              Error 404
            </p>
            <h1 className="font-poster uppercase text-4xl text-[var(--ink)]">
              Page Not Found
            </h1>
            <p className="text-base text-[var(--muted)]">
              The link may have moved. Return to the MASTERMIND ACADEMY home page or call our Nehru
              Nagar, Belagavi centre directly.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/"
                className="btn-cta inline-flex min-h-[46px] items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Back to Home</span>
              </Link>
              <a
                href={getTelHref(0)}
                className="btn-press inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-[var(--navy)] bg-white px-5 py-2.5 text-sm font-bold text-[var(--navy)] hover:bg-[var(--cream)]"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>Call MASTERMIND ACADEMY</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
