import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Assets from './components/assets/Assets';
import WorkOrders from './components/workorders/WorkOrders';
import Inventory from './components/inventory/Inventory';
import Reports from './components/reports/Reports';
import SpareParts from './components/spareparts/SpareParts';
import AllActivities from './components/activities/AllActivities';
import Warehouses from './components/warehouse/Warehouses';
import AttendanceDashboard from './components/attendance/AttendanceDashboard';
import UserManagement from './components/users/UserManagement';
import Correspondence from './components/correspondence/Correspondence';
import ProfilePage from './components/profile/ProfilePage';
import ProductionRoutes from './components/production/ProductionRoutes';
import SupplierRoutes from './components/suppliers/SupplierRoutes';
import LocalContentRoutes from './components/localcontent/LocalContentRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout>
              <DashboardLayout />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/assets/*" element={
          <ProtectedRoute>
            <MainLayout>
              <Assets />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/work-orders/*" element={
          <ProtectedRoute>
            <MainLayout>
              <WorkOrders />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/inventory/*" element={
          <ProtectedRoute>
            <MainLayout>
              <Inventory />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/reports/*" element={
          <ProtectedRoute>
            <MainLayout>
              <Reports />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/spare-parts/*" element={
          <ProtectedRoute>
            <MainLayout>
              <SpareParts />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/activities" element={
          <ProtectedRoute>
            <MainLayout>
              <AllActivities />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/warehouses/*" element={
          <ProtectedRoute>
            <MainLayout>
              <Warehouses />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/attendance" element={
          <ProtectedRoute>
            <MainLayout>
              <AttendanceDashboard />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/users" element={
          <ProtectedRoute>
            <MainLayout>
              <UserManagement />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/correspondence/*" element={
          <ProtectedRoute>
            <MainLayout>
              <Correspondence />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/production/*" element={
          <ProtectedRoute>
            <MainLayout>
              <ProductionRoutes />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/suppliers/*" element={
          <ProtectedRoute>
            <MainLayout>
              <SupplierRoutes />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/local-content/*" element={
          <ProtectedRoute>
            <MainLayout>
              <LocalContentRoutes />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;