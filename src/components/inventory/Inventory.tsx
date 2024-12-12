import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InventoryDashboard from './InventoryDashboard';
import InventoryList from './InventoryList';
import StockCount from './StockCount';
import LowStock from './LowStock';
import Transfers from './Transfers';

export default function Inventory() {
  return (
    <Routes>
      <Route index element={<InventoryDashboard />} />
      <Route path="list" element={<InventoryList />} />
      <Route path="stock-count" element={<StockCount />} />
      <Route path="low-stock" element={<LowStock />} />
      <Route path="transfers" element={<Transfers />} />
    </Routes>
  );
}