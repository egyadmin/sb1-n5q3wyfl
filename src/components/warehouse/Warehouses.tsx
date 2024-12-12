import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WarehouseList from './WarehouseList';
import WarehouseDetails from './WarehouseDetails';
import WarehouseInventory from './WarehouseInventory';
import TruckTracker from '../tracking/TruckTracker';

export default function Warehouses() {
  return (
    <Routes>
      <Route index element={<WarehouseList />} />
      <Route path=":id" element={<WarehouseDetails />} />
      <Route path=":id/inventory" element={<WarehouseInventory />} />
      <Route path="tracking" element={<TruckTracker />} />
    </Routes>
  );
}