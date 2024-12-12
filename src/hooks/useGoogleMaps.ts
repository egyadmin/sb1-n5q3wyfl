import { useState, useEffect } from 'react';
import { mapConfig } from '../config/maps';

interface UseGoogleMapsOptions {
  libraries?: ("places" | "geometry" | "drawing" | "visualization")[];
}

const SCRIPT_ID = 'google-maps-script';
let isLoading = false;
let loadPromise: Promise<void> | null = null;

const loadGoogleMapsScript = (apiKey: string, options: UseGoogleMapsOptions = {}): Promise<void> => {
  if (loadPromise) return loadPromise;
  if (window.google?.maps) return Promise.resolve();

  isLoading = true;
  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${
      options.libraries?.join(',') || 'places,geometry'
    }&language=${mapConfig.mapOptions.language}&region=${mapConfig.mapOptions.region}`;
    
    script.onload = () => {
      isLoading = false;
      resolve();
    };
    
    script.onerror = (error) => {
      isLoading = false;
      loadPromise = null;
      reject(error);
    };

    document.head.appendChild(script);
  });

  return loadPromise;
};

export const useGoogleMaps = (options: UseGoogleMapsOptions = {}) => {
  const [isLoaded, setIsLoaded] = useState(!!window.google?.maps);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (isLoaded) return;
    
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      setError(new Error('مفتاح Google Maps غير مكوّن'));
      return;
    }

    if (!isLoading && !loadPromise) {
      loadGoogleMapsScript(apiKey, options)
        .then(() => setIsLoaded(true))
        .catch((err) => setError(err));
    } else if (loadPromise) {
      loadPromise
        .then(() => setIsLoaded(true))
        .catch((err) => setError(err));
    }
  }, [options]);

  return { isLoaded, error };
};