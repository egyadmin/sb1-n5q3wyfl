import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp, Menu, X, UserPlus, LogOut } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { authService } from '../api/services/authService';
import type { Module } from '../types';
import type { MenuItem } from '../types/menu';
import { menuItems } from '../config/menuItems';
import RegisterForm from './auth/RegisterForm';

interface SidebarProps {
  activeModule: Module;
  onModuleChange: (module: Module) => void;
}

export default function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleRegisterSubmit = async (data: any) => {
    try {
      console.log('Registering new user:', data);
      alert('تم تسجيل المستخدم بنجاح');
      setShowRegisterForm(false);
    } catch (error) {
      console.error('Registration error:', error);
      alert('حدث خطأ أثناء تسجيل المستخدم');
    }
  };

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.isExternal) {
      window.open(item.path, '_blank');
    } else if (item.subItems) {
      toggleMenu(item.id);
    } else {
      handleModuleChange(item.id as Module, item.path);
    }
  };

  const handleModuleChange = (moduleId: Module, path: string) => {
    onModuleChange(moduleId);
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 right-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:relative lg:w-64 lg:flex-shrink-0`}
      >
        {/* Logo Section */}
        <div className="h-40 flex flex-col items-center justify-center border-b space-y-4 bg-gradient-to-b from-white to-gray-50">
          <img 
            src="https://www2.0zz0.com/2024/11/20/07/988856043.png" 
            alt="Logo" 
            className="h-24 w-auto transform hover:scale-105 transition-transform duration-300"
          />
          <div className="text-center px-4">
            <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 text-sm">
              إدارة المحتوى المحلي
            </p>
            <p className="text-sm font-semibold text-gray-600 mt-1">
              شركة شبه الجزيرة
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-4 space-y-1 overflow-y-auto h-[calc(100vh-10rem)]">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleMenuItemClick(item)}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  item.isExternal ? item.color :
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <item.icon className="w-5 h-5 ml-2" />
                  <span>{item.label}</span>
                </div>
                {item.subItems && (
                  expandedMenus[item.id] ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )
                )}
              </button>

              {item.subItems && expandedMenus[item.id] && (
                <div className="mt-1 mr-4 space-y-1">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => handleModuleChange(item.id as Module, subItem.path)}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive(subItem.path)
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Register User Button */}
          <button
            onClick={() => setShowRegisterForm(true)}
            className="w-full flex items-center px-4 py-2 mt-4 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <UserPlus className="w-5 h-5 ml-2" />
            تسجيل مستخدم جديد
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 mt-4 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 ml-2" />
            تسجيل الخروج
          </button>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Register Form Modal */}
      {showRegisterForm && (
        <RegisterForm
          onSubmit={handleRegisterSubmit}
          onClose={() => setShowRegisterForm(false)}
        />
      )}
    </>
  );
}