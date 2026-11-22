import { useEffect, useState } from 'react';
import {
  APILoadingStatus,
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
} from '@vis.gl/react-google-maps';
import { ExternalLink, MapPin, Navigation, Satellite } from 'lucide-react';
import { getDirectionsUrl, siteConfig } from '../data/siteConfig';
import { FormatOrdinals } from './FormatText';

const ACADEMY_POSITION = {
  lat: Number(siteConfig.location.latitude) || 15.879063,
  lng: Number(siteConfig.location.longitude) || 74.514022,
};

interface AcademyLocationMapProps {
  heightClass?: string;
}

function AcademyMarkerWithInfo() {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={ACADEMY_POSITION}
        title={`${siteConfig.name} — ${siteConfig.address.fullFormatted}`}
        onClick={() => setInfoOpen((prev) => !prev)}
      >
        <Pin
          background="#D62828"
          borderColor="#0F2A6B"
          glyphColor="#FFFFFF"
          scale={1.15}
        />
      </AdvancedMarker>

      {infoOpen && marker && (
        <InfoWindow
          anchor={marker}
          maxWidth={260}
          onCloseClick={() => setInfoOpen(false)}
        >
          <div className="p-1 text-left text-[#101C3A] space-y-1.5">
            <p className="text-xs font-extrabold uppercase tracking-wide text-[#0F2A6B]">
              {siteConfig.name}
            </p>
            <p className="text-xs leading-snug text-[#46536E]">
              <FormatOrdinals text={siteConfig.address.fullFormatted} />
            </p>
            <p className="text-[11px] font-semibold text-[#1F4FB5]">
              Open: {siteConfig.timings}
            </p>
            <a
              href={getDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 pt-0.5 text-xs font-bold text-[#D62828] underline underline-offset-2"
            >
              <span>Get Directions</span>
              <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

function InteractiveSatelliteCanvas({ heightClass }: { heightClass: string }) {
  const loadingStatus = useApiLoadingStatus();
  const [mapType, setMapType] = useState<'hybrid' | 'satellite' | 'roadmap'>('hybrid');

  if (
    loadingStatus === APILoadingStatus.FAILED ||
    loadingStatus === APILoadingStatus.AUTH_FAILURE
  ) {
    return <MapFallbackSurface heightClass={heightClass} />;
  }

  return (
    <div className={`relative w-full ${heightClass}`}>
      <GoogleMap
        className="h-full w-full"
        mapId="DEMO_MAP_ID"
        defaultCenter={ACADEMY_POSITION}
        defaultZoom={19}
        mapTypeId={mapType}
        gestureHandling="cooperative"
        mapTypeControl={false}
        streetViewControl={true}
        fullscreenControl={true}
        zoomControl={true}
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
      >
        <AcademyMarkerWithInfo />
      </GoogleMap>

      {/* Clean view-mode switcher defaulting to Google Maps Satellite View */}
      <div
        role="group"
        aria-label="Map view mode"
        className="absolute left-3 top-3 z-10 inline-flex overflow-hidden rounded-xl border border-[#0F2A6B]/20 bg-white/95 p-0.5 shadow-md backdrop-blur-xs"
      >
        <button
          type="button"
          onClick={() => setMapType('hybrid')}
          className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            mapType === 'hybrid'
              ? 'bg-[var(--navy)] text-white'
              : 'text-[var(--ink)] hover:bg-[var(--cream)]'
          }`}
        >
          Satellite
        </button>
        <button
          type="button"
          onClick={() => setMapType('satellite')}
          className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            mapType === 'satellite'
              ? 'bg-[var(--navy)] text-white'
              : 'text-[var(--ink)] hover:bg-[var(--cream)]'
          }`}
        >
          Aerial
        </button>
        <button
          type="button"
          onClick={() => setMapType('roadmap')}
          className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            mapType === 'roadmap'
              ? 'bg-[var(--navy)] text-white'
              : 'text-[var(--ink)] hover:bg-[var(--cream)]'
          }`}
        >
          Map
        </button>
      </div>
    </div>
  );
}

function MapFallbackSurface({ heightClass }: { heightClass: string }) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center bg-gradient-to-br from-[#0F2A6B] via-[#1A439B] to-[#0F2A6B] px-6 text-center text-white ${heightClass}`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--gold)] text-[var(--ink)] shadow-md">
        <MapPin className="h-6 w-6" aria-hidden="true" />
      </span>
      <p className="mt-3 text-base sm:text-lg font-bold">
        {siteConfig.name} · <FormatOrdinals text="Nehru Nagar, 2nd Cross" />
      </p>
      <p className="mt-1 text-xs sm:text-sm text-white/85 tabular-nums">
        {siteConfig.location.latitude}, {siteConfig.location.longitude} ·{' '}
        {siteConfig.location.plusCode}
      </p>
      <a
        href={siteConfig.location.googleMapsSatelliteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-cta mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold"
      >
        <Navigation className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>Open Satellite View in Google Maps</span>
      </a>
    </div>
  );
}

export function AcademyLocationMap({
  heightClass = 'h-[310px] sm:h-[360px] lg:h-[380px]',
}: AcademyLocationMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const apiKey =
    typeof import.meta !== 'undefined' && import.meta.env
      ? (import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '').trim()
      : '';

  return (
    <div className="overflow-hidden rounded-[20px] border border-[var(--hairline)] bg-white shadow-sm">
      {isMounted && apiKey ? (
        <APIProvider
          apiKey={apiKey}
          libraries={['marker']}
          language="en"
          region="IN"
        >
          <InteractiveSatelliteCanvas heightClass={heightClass} />
        </APIProvider>
      ) : (
        <MapFallbackSurface heightClass={heightClass} />
      )}

      {/* Exact Coordinates & Satellite View Footer Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--hairline)] bg-[var(--cream)] px-4 py-2.5 text-xs text-[var(--muted)]">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 tabular-nums">
          <span className="inline-flex items-center gap-1.5 font-bold text-[var(--ink)]">
            <Satellite className="h-3.5 w-3.5 text-[var(--royal)] shrink-0" aria-hidden="true" />
            <span>
              {siteConfig.location.latitude}, {siteConfig.location.longitude}
            </span>
          </span>
          <span className="text-[var(--muted)]">{siteConfig.location.plusCode}</span>
        </div>
        <a
          href={siteConfig.location.googleMapsSatelliteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-bold text-[var(--royal)] hover:underline underline-offset-2 whitespace-nowrap"
        >
          <span>Full Satellite View</span>
          <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
