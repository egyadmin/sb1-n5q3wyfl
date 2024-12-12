export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export interface MapMarker extends LatLngLiteral {
  title?: string;
  type?: 'default' | 'truck';
  rotation?: number;
}

export interface MapRoute {
  origin: LatLngLiteral;
  destination: LatLngLiteral;
  waypoints?: google.maps.DirectionsWaypoint[];
}