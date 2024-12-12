import React from 'react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

interface MapProviderProps {
  children: React.ReactNode;
}

export default function MapProvider({ children }: MapProviderProps) {
  const { isLoaded, error } = useGoogleMaps();

  if (error) {
    return <ErrorMessage message={error.message} onClose={() => {}} />;
  }

  if (!isLoaded) {
    return <LoadingSpinner message="جاري تحميل الخريطة..." />;
  }

  return <>{children}</>;
}