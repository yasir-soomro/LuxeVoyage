'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Coordinates = { lat: number; lng: number };

type MapContextType = {
  focusLocation: Coordinates | null;
  setFocusLocation: (loc: Coordinates | null) => void;
};

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
  const [focusLocation, setFocusLocation] = useState<Coordinates | null>(null);

  return (
    <MapContext.Provider value={{ focusLocation, setFocusLocation }}>
      {children}
    </MapContext.Provider>
  );
}

export function useMapFocus() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMapFocus must be used within MapProvider');
  }
  return context;
}
