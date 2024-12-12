import React from 'react';
import GoogleMapComponent, { GoogleMapComponentProps } from './GoogleMapComponent';

interface MapContainerProps extends Omit<GoogleMapComponentProps, 'onLoad' | 'onUnmount'> {
  className?: string;
}

export default function MapContainer({ className, ...props }: MapContainerProps) {
  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      <GoogleMapComponent {...props} />
    </div>
  );
}