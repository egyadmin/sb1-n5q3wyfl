import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import type { Asset } from '../../types';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface AssetTrackerProps {
  assets: Asset[];
  selectedAsset?: Asset;
  onLocationSelect?: (lat: number, lng: number) => void;
  isEditing?: boolean;
  height?: string;
}

export default function AssetTracker({ 
  assets, 
  selectedAsset, 
  onLocationSelect,
  isEditing = false,
  height = '500px'
}: AssetTrackerProps) {
  const center = selectedAsset?.coordinates || { lat: 24.7136, lng: 46.6753 };
  const zoom = selectedAsset ? 15 : 12;

  return (
    <div style={{ height, width: '100%' }}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        onClick={(e: any) => {
          if (isEditing && onLocationSelect) {
            onLocationSelect(e.latlng.lat, e.latlng.lng);
          }
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {assets.map((asset) => 
          asset.coordinates && (
            <Marker 
              key={asset.id}
              position={[asset.coordinates.lat, asset.coordinates.lng]}
            >
              <Popup>
                <div className="text-right">
                  <h3 className="font-medium">{asset.name}</h3>
                  <p className="text-sm text-gray-500">{asset.serialNumber}</p>
                  <p className="text-sm text-gray-500">{asset.location}</p>
                </div>
              </Popup>
            </Marker>
          )
        )}
        {selectedAsset?.coordinates && (
          <Marker position={[selectedAsset.coordinates.lat, selectedAsset.coordinates.lng]} />
        )}
      </MapContainer>
    </div>
  );
}