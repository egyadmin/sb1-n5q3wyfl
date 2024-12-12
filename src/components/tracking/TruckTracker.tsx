import React, { useState } from 'react';
import { Search, Filter, Truck, Phone, Mail, Calendar, Clock, Package, ArrowLeftRight } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { TruckRoute } from '../../types/tracking';
import { mockRoutes } from '../../data/mockRoutes';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icon
import { Icon } from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function TruckTracker() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRoute, setSelectedRoute] = useState<TruckRoute | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredRoutes = mockRoutes.filter(route => {
    const matchesSearch = 
      route.truckId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.driverName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || route.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: TruckRoute['status']) => {
    switch (status) {
      case 'en-route':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusText = (status: TruckRoute['status']) => {
    switch (status) {
      case 'en-route':
        return 'في الطريق';
      case 'delivered':
        return 'تم التوصيل';
      case 'delayed':
        return 'متأخر';
    }
  };

  const getShipmentTypeText = (type: TruckRoute['shipmentType']) => {
    return type === 'incoming' ? 'وارد' : 'صادر';
  };

  const mapCenter = { lat: 24.7136, lng: 46.6753 }; // Riyadh coordinates

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">تتبع الشاحنات</h2>
          <p className="mt-1 text-sm text-gray-500">
            متابعة وتتبع حركة الشاحنات في الوقت الفعلي
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="بحث عن شاحنة أو سائق..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">جميع الحالات</option>
                <option value="en-route">في الطريق</option>
                <option value="delivered">تم التوصيل</option>
                <option value="delayed">متأخر</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`${showDetails ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[600px]">
            <MapContainer
              center={[mapCenter.lat, mapCenter.lng]}
              zoom={6}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredRoutes.map((route) => (
                route.currentLocation && (
                  <Marker
                    key={route.id}
                    position={[route.currentLocation.lat, route.currentLocation.lng]}
                  >
                    <Popup>
                      <div className="text-right">
                        <h3 className="font-medium">{route.truckId}</h3>
                        <p className="text-sm text-gray-500">{route.driverName}</p>
                        <p className="text-sm text-gray-500">
                          {getStatusText(route.status)}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                )
              ))}
            </MapContainer>
          </div>
        </div>

        {showDetails && selectedRoute && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{selectedRoute.truckId}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRoute.status)}`}>
                  {getStatusText(selectedRoute.status)}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Truck className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">{selectedRoute.driverName}</p>
                    <p className="text-xs text-gray-500">{getShipmentTypeText(selectedRoute.shipmentType)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <p className="text-sm">{selectedRoute.driverPhone}</p>
                </div>

                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <p className="text-sm">{selectedRoute.driverEmail}</p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                    <ArrowLeftRight className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm">من: {selectedRoute.startLocation}</p>
                      <p className="text-sm">إلى: {selectedRoute.endLocation}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm">المغادرة: {format(new Date(selectedRoute.departureTime), 'PPp', { locale: ar })}</p>
                      <p className="text-sm">الوصول المتوقع: {format(new Date(selectedRoute.estimatedArrival), 'PPp', { locale: ar })}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Package className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm">{selectedRoute.cargo.type}</p>
                      <p className="text-sm text-gray-500">
                        {selectedRoute.cargo.quantity} وحدة • {selectedRoute.cargo.weight} كجم
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm">آخر تحديث</p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(selectedRoute.lastUpdate!), 'PPp', { locale: ar })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y">
          {filteredRoutes.map((route) => (
            <div
              key={route.id}
              className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedRoute?.id === route.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => {
                setSelectedRoute(route);
                setShowDetails(true);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Truck className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">{route.truckId}</p>
                    <p className="text-xs text-gray-500">{route.driverName}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(route.status)}`}>
                  {getStatusText(route.status)}
                </span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-500">
                <div>من: {route.startLocation}</div>
                <div>إلى: {route.endLocation}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}