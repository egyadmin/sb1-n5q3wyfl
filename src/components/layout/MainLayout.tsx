import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import AIAssistant from '../ai/AIAssistant';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Module } from '../../types';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const [activeModule, setActiveModule] = useState<Module>('dashboard');
  const { dir } = useLanguage();

  return (
    <div className="flex h-screen bg-gray-100" dir={dir}>
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <AIAssistant />
    </div>
  );
}

export default MainLayout;