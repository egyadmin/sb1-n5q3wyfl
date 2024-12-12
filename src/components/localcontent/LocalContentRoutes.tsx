import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LocalContentDashboard from './LocalContentDashboard';
import LocalContentAnalysis from './LocalContentAnalysis';
import MandatoryList from './MandatoryList';
import ComplianceGuide from './ComplianceGuide';
import ReportTemplates from './ReportTemplates';
import ComplianceChecklist from './ComplianceChecklist';

function LocalContentRoutes() {
  return (
    <Routes>
      <Route index element={<LocalContentDashboard />} />
      <Route path="analysis" element={<LocalContentAnalysis />} />
      <Route path="mandatory-list" element={<MandatoryList />} />
      <Route path="compliance-guide" element={<ComplianceGuide />} />
      <Route path="report-templates" element={<ReportTemplates />} />
      <Route path="checklist" element={<ComplianceChecklist />} />
    </Routes>
  );
}

export default LocalContentRoutes;