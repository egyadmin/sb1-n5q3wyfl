import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AssetList from './AssetList';
import MaintenanceSchedule from './MaintenanceSchedule';
import AssetLocations from './AssetLocations';

export default function Assets() {
  return (
    <Routes>
      <Route index element={<AssetList />} />
      <Route path="maintenance" element={<MaintenanceSchedule />} />
      <Route path="locations" element={<AssetLocations />} />
    </Routes>
  );
}