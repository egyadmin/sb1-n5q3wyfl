import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WorkOrderList from './WorkOrderList';
import WorkOrderCalendar from './WorkOrderCalendar';
import MaintenanceTeams from './MaintenanceTeams';

export default function WorkOrders() {
  return (
    <Routes>
      <Route index element={<WorkOrderList />} />
      <Route path="calendar" element={<WorkOrderCalendar />} />
      <Route path="teams" element={<MaintenanceTeams />} />
    </Routes>
  );
}