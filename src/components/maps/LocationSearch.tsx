import React from 'react';
import { Navigation } from 'lucide-react';

interface LocationSearchProps {
  onCurrentLocation: () => void;
  loading: boolean;
}

export default function LocationSearch({ onCurrentLocation, loading }: LocationSearchProps) {
  return (
    <div className="absolute top-4 right-4 z-10">
      <button
        onClick={onCurrentLocation}
        disabled={loading}
        className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-lg disabled:opacity-50"
      >
        <Navigation className="w-5 h-5" />
        موقعي الحالي
      </button>
    </div>
  );
}