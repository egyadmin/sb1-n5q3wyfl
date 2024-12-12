import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductionDashboard from './ProductionDashboard';
import CrushersList from './CrushersList';
import ProductionInventory from './ProductionInventory';
import FuelConsumption from './FuelConsumption';

function ProductionRoutes() {
  return (
    <Routes>
      <Route index element={<ProductionDashboard />} />
      <Route path="crushers" element={<CrushersList />} />
      <Route path="inventory" element={<ProductionInventory />} />
      <Route path="fuel" element={<FuelConsumption />} />
    </Routes>
  );
}

export default ProductionRoutes;