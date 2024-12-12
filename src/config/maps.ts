import { Libraries } from '@react-google-maps/api';

export const mapConfig = {
  defaultCenter: {
    lat: 24.7136, // Riyadh coordinates
    lng: 46.6753
  },
  defaultZoom: 12,
  libraries: ['places', 'geometry'] as Libraries,
  mapOptions: {
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: true,
    fullscreenControl: true,
    language: 'ar',
    region: 'SA',
    styles: [
      {
        featureType: 'administrative',
        elementType: 'labels.text',
        stylers: [{ color: '#333333' }]
      },
      {
        featureType: 'landscape',
        elementType: 'all',
        stylers: [{ color: '#f2f2f2' }]
      },
      {
        featureType: 'poi',
        elementType: 'all',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'road',
        elementType: 'all',
        stylers: [{ saturation: -100 }, { lightness: 45 }]
      },
      {
        featureType: 'transit',
        elementType: 'all',
        stylers: [{ visibility: 'off' }]
      }
    ]
  }
};

export const validateGoogleMapsKey = (key: string | undefined): boolean => {
  if (!key) return false;
  return key.length > 20 && key.startsWith('AIza');
};

export const handleMapsError = (error: Error): string => {
  console.error('Google Maps Error:', error);
  return error.message.includes('InvalidKeyMapError') 
    ? 'مفتاح Google Maps غير صالح'
    : 'حدث خطأ أثناء تحميل الخريطة';
};