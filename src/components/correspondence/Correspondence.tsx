import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inbox from './Inbox';
import Outbox from './Outbox';
import Archive from './Archive';
import Tracking from './Tracking';

export default function Correspondence() {
  return (
    <Routes>
      <Route index element={<Inbox />} />
      <Route path="inbox" element={<Inbox />} />
      <Route path="outbox" element={<Outbox />} />
      <Route path="archive" element={<Archive />} />
      <Route path="tracking" element={<Tracking />} />
    </Routes>
  );
}