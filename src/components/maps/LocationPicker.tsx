import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import MapContainer from './MapContainer';
import type { LatLngLiteral } from '../../types/maps';

interface LocationPickerProps {
  value?: LatLngLiteral;
  onChange: (location: LatLngLiteral) => void;
  defaultCenter?: LatLngLiteral;
  height?: string;
  className?: string;
}

export default function LocationPicker({
  value,
  onChange,
  defaultCenter = { lat: 24.7136, lng: 46.6753 }, // Riyadh coordinates
  height = '300px',
  className = ''
}: LocationPickerProps) {
  const [address, setAddress] = useState<string>('');

  const handleLocationSelect = async (location: LatLngLiteral) => {
    onChange(location);
    
    // Get address from coordinates using Google Geocoding service
    try {
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({ location });
      
      if (response.results?.[0]) {
        setAddress(response.results[0].formatted_address);
      }
    } catch (error) {
      console.error('Error getting address:', error);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="border rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h3 className="font-medium text-gray-900">تحديد الموقع على الخريطة</h3>
          <p className="mt-1 text-sm text-gray-500">انقر على الخريطة لتحديد الموقع</p>
        </div>
        
        <div style={{ height }}>
          <MapContainer
            center={value || defaultCenter}
            zoom={12}
            markers={value ? [{ ...value, title: 'الموقع المحدد' }] : []}
            onLocationSelect={handleLocationSelect}
            isEditing={true}
          />
        </div>

        {value && (
          <div className="p-4 bg-gray-50 border-t space-y-2">
            {address && (
              <div className="flex items-start space-x-2 rtl:space-x-reverse">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <p className="text-sm text-gray-600">{address}</p>
              </div>
            )}
            <p className="text-sm text-gray-600">
              الإحداثيات: {value.lat.toFixed(6)}, {value.lng.toFixed(6)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}