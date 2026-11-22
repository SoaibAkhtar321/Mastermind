import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Phone, RefreshCw } from 'lucide-react';
import { getTelHref, siteConfig } from '../data/siteConfig';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // Kept silent in production UI to avoid exposing internal traces.
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)] flex items-center justify-center p-4">
          <div className="card-coaching max-w-md w-full p-8 text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--gold-text)]">
              {siteConfig.name}
            </p>
            <h1 className="font-poster uppercase text-3xl text-[var(--ink)]">
              Something Went Wrong
            </h1>
            <p className="text-sm sm:text-base text-[var(--muted)]">
              Please reload the page or call our Nehru Nagar, Belagavi centre directly for
              assistance.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn-cta inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                <span>Reload Page</span>
              </button>
              <a
                href={getTelHref(0)}
                className="btn-press inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[var(--navy)] bg-white px-5 py-2.5 text-sm font-bold text-[var(--navy)] tabular-nums"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>{siteConfig.phones[0]}</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
