import { useCallback, useEffect, useState } from 'react';
import {
  APILoadingStatus,
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  useMap,
} from '@vis.gl/react-google-maps';
import { Crosshair, ExternalLink, MapPin, Navigation, Satellite } from 'lucide-react';
import { getDirectionsUrl, getOpenInMapsUrl, siteConfig } from '../data/siteConfig';
import { FormatOrdinals } from './FormatText';

const ACADEMY_POSITION = {
  lat: Number(siteConfig.location.latitude) || 15.879063,
  lng: Number(siteConfig.location.longitude) || 74.514022,
};

const EXACT_ZOOM = 20;

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
        title={`${siteConfig.name} — ${siteConfig.location.latitude}, ${siteConfig.location.longitude}`}
        onClick={() => setInfoOpen((prev) => !prev)}
      >
        <div className="flex flex-col items-center select-none">
          <div className="rounded-lg border-2 border-white bg-[#0F2A6B] px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-lg whitespace-nowrap">
            MASTERMIND ACADEMY
          </div>
          <div className="relative -mt-0.5 flex flex-col items-center">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#D62828] text-white shadow-lg">
              <MapPin className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="h-2 w-2 -mt-1 rotate-45 bg-[#D62828] border-r border-b border-white" />
          </div>
        </div>
      </AdvancedMarker>

      {infoOpen && marker && (
        <InfoWindow
          anchor={marker}
          maxWidth={270}
          onCloseClick={() => setInfoOpen(false)}
        >
          <div className="p-1 text-left text-[#101C3A] space-y-1.5">
            <p className="text-xs font-extrabold uppercase tracking-wide text-[#0F2A6B]">
              {siteConfig.name}
            </p>
            <p className="text-xs leading-snug text-[#46536E]">
              <FormatOrdinals text={siteConfig.address.fullFormatted} />
            </p>
            <p className="text-[11px] font-medium text-[#46536E] tabular-nums">
              {siteConfig.location.latitude}, {siteConfig.location.longitude} ·{' '}
              {siteConfig.location.plusCode}
            </p>
            <p className="text-[11px] font-semibold text-[#1F4FB5]">
              Open: {siteConfig.timings}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={getDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#D62828] underline underline-offset-2"
              >
                <Navigation className="h-3 w-3 shrink-0" aria-hidden="true" />
                <span>Get Directions</span>
              </a>
              <a
                href={getOpenInMapsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0F2A6B] underline underline-offset-2"
              >
                <span>Open Pin</span>
                <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

function MapPrecisionController({ recenterSignal }: { recenterSignal: number }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    map.setCenter(ACADEMY_POSITION);
    map.setZoom(EXACT_ZOOM);
    map.setTilt(0);
  }, [map, recenterSignal]);

  return null;
}

function InteractiveSatelliteCanvas({ heightClass }: { heightClass: string }) {
  const loadingStatus = useApiLoadingStatus();
  const [mapType, setMapType] = useState<'hybrid' | 'satellite' | 'roadmap'>('hybrid');
  const [recenterSignal, setRecenterSignal] = useState(0);

  const handleRecenter = useCallback(() => {
    setRecenterSignal((n) => n + 1);
  }, []);

  if (
    loadingStatus === APILoadingStatus.FAILED ||
    loadingStatus === APILoadingStatus.AUTH_FAILURE
  ) {
    return <MapFallbackSurface heightClass={heightClass} />;
  }

  return (
    <div className={`relative w-full min-h-[300px] ${heightClass}`}>
      <GoogleMap
        className="h-full w-full"
        mapId="DEMO_MAP_ID"
        defaultCenter={ACADEMY_POSITION}
        defaultZoom={EXACT_ZOOM}
        defaultTilt={0}
        tilt={0}
        mapTypeId={mapType}
        gestureHandling="cooperative"
        mapTypeControl={false}
        streetViewControl={true}
        fullscreenControl={true}
        zoomControl={true}
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
      >
        <MapPrecisionController recenterSignal={recenterSignal} />
        <AcademyMarkerWithInfo />
      </GoogleMap>

      {/* Top-left controls: Satellite view switcher + Re-center to exact coordinate pin */}
      <div className="absolute left-3 top-3 z-10 flex flex-wrap items-center gap-2">
        <div
          role="group"
          aria-label="Map view mode"
          className="inline-flex overflow-hidden rounded-xl border border-[#0F2A6B]/20 bg-white/95 p-0.5 shadow-md backdrop-blur-xs"
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

        <button
          type="button"
          onClick={handleRecenter}
          title="Center map on exact coaching centre pin"
          className="inline-flex items-center gap-1 rounded-xl border border-[#0F2A6B]/20 bg-white/95 px-2.5 py-1.5 text-xs font-bold text-[var(--navy)] shadow-md backdrop-blur-xs hover:bg-[var(--cream)] cursor-pointer"
        >
          <Crosshair className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>Exact Pin</span>
        </button>
      </div>
    </div>
  );
}

function MapFallbackSurface({ heightClass }: { heightClass: string }) {
  return (
    <div
      className={`flex w-full min-h-[300px] flex-col items-center justify-center bg-gradient-to-br from-[#0F2A6B] via-[#1A439B] to-[#0F2A6B] px-6 text-center text-white ${heightClass}`}
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
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
        <a
          href={getDirectionsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold"
        >
          <Navigation className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Get Directions</span>
        </a>
        <a
          href={getOpenInMapsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-white/35 bg-white/10 px-4 py-2 text-xs sm:text-sm font-bold text-white hover:bg-white/20"
        >
          <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Open Exact Pin</span>
        </a>
      </div>
    </div>
  );
}

export function AcademyLocationMap({
  heightClass = 'h-[320px] sm:h-[360px] lg:h-[390px]',
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

      {/* Exact Coordinates & Direct Pin/Directions Footer Bar */}
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
        <div className="flex items-center gap-3">
          <a
            href={getDirectionsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-[var(--red)] hover:underline underline-offset-2 whitespace-nowrap"
          >
            <Navigation className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Directions</span>
          </a>
          <a
            href={getOpenInMapsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-[var(--royal)] hover:underline underline-offset-2 whitespace-nowrap"
          >
            <span>Open Exact Pin</span>
            <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
