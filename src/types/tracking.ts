export interface TruckRoute {
  id: string;
  truckId: string;
  driverName: string;
  driverPhone?: string;
  driverEmail?: string;
  shipmentType: 'incoming' | 'outgoing';
  status: 'en-route' | 'delivered' | 'delayed';
  startLocation: string;
  endLocation: string;
  currentLocation?: { lat: number; lng: number };
  startCoordinates?: { lat: number; lng: number };
  endCoordinates?: { lat: number; lng: number };
  estimatedArrival: string;
  departureTime: string;
  cargo: {
    type: string;
    quantity: number;
    weight?: number;
    temperature?: number;
  };
  route?: google.maps.LatLngLiteral[];
  lastUpdate?: string;
  notes?: string;
}

export interface TruckLocation {
  lat: number;
  lng: number;
  speed?: number;
  heading?: number;
  timestamp: string;
}