'use client';

import { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow, Pin, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { destinations } from '@/src/data/travelData';
import Image from 'next/image';

const API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_PLATFORM_KEY ||
  (typeof window !== 'undefined' ? (window as any).GOOGLE_MAPS_PLATFORM_KEY : '') ||
  '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

function MarkerWithInfoWindow({ destination }: { destination: typeof destinations[0] }) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AdvancedMarker ref={markerRef} position={destination.coordinates} title={destination.name} onClick={() => setOpen((o) => !o)}>
        <Pin background="#ffffff" glyphColor="#000000" borderColor="#000000" />
      </AdvancedMarker>
      {open && (
        <InfoWindow anchor={marker} onCloseClick={() => setOpen(false)}>
          <div className="flex flex-col gap-3 min-w-[200px] p-1 font-sans">
            <div className="relative w-full h-32 rounded-lg overflow-hidden">
              <Image 
                src={destination.image} 
                alt={destination.name} 
                fill 
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm leading-tight">{destination.name}</h3>
              <p className="text-gray-500 text-xs">{destination.country}</p>
            </div>
            <p className="text-gray-700 text-xs leading-relaxed">{destination.description}</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export default function DestinationsMap() {
  if (!hasValidKey) {
    return (
      <div className="w-full flex items-center justify-center bg-zinc-900 rounded-[2rem] border border-white/5 py-12 px-6">
        <div className="text-center max-w-lg">
          <h2 className="text-xl font-bold text-white mb-4">Map Integration Required</h2>
          <p className="text-zinc-400 mb-6 leading-relaxed">
            Please add a Google Maps Platform API Key to view the destinations map. 
            Open Settings (gear icon) → Secrets → Add <code className="bg-black text-white px-2 py-1 rounded">NEXT_PUBLIC_GOOGLE_MAPS_PLATFORM_KEY</code> as a secret.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-lg border border-white/10 bg-transparent px-4 text-sm font-medium text-white hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              Get API Key
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[500px] rounded-[2rem] overflow-hidden border border-white/5 bg-zinc-900 relative">
      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          defaultCenter={{ lat: 38.0, lng: 15.0 }}
          defaultZoom={2}
          mapId="DEMO_MAP_ID"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
          gestureHandling="greedy"
          disableDefaultUI={true}
          zoomControl={true}
        >
          {destinations.map((dest) => (
            <MarkerWithInfoWindow key={dest.id} destination={dest} />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}
