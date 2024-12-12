import React, { useState } from 'react';
import MapComponent from '../maps/GoogleMapComponent';
import { useLanguage } from '../../contexts/LanguageContext';

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface AddPartLocationProps {
  onLocationSelect: (location: Location) => void;
  initialLocation?: Location;
}

export default function AddPartLocation({ onLocationSelect, initialLocation }: AddPartLocationProps) {
  const { t } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(initialLocation || null);

  const handleLocationSelect = async (location: { lat: number; lng: number }) => {
    try {
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({ location });
      
      if (response.results[0]) {
        const newLocation = {
          ...location,
          address: response.results[0].formatted_address
        };
        setSelectedLocation(newLocation);
        onLocationSelect(newLocation);
      }
    } catch (error) {
      console.error('Error getting address:', error);
      setSelectedLocation(location);
      onLocationSelect(location);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4">{t('selectLocation')}</h3>
        <MapComponent
          center={selectedLocation || undefined}
          markers={selectedLocation ? [selectedLocation] : []}
          onLocationSelect={handleLocationSelect}
        />
        {selectedLocation && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">
              {t('selectedLocation')}:
            </p>
            <p className="text-sm font-medium mt-1">
              {selectedLocation.address || `${selectedLocation.lat}, ${selectedLocation.lng}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}