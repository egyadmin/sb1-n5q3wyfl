import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SuppliersList from './SuppliersList';
import SupplierTransactions from './SupplierTransactions';

export default function SupplierRoutes() {
  return (
    <Routes>
      <Route index element={<SuppliersList />} />
      <Route path="transactions" element={<SupplierTransactions />} />
    </Routes>
  );
}