import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, CheckCircle, AlertTriangle, Info, AlertCircle, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useNotifications } from '../../hooks/useNotifications';
import type { Notification } from '../../types/notification';
import { useNavigate } from 'react-router-dom';

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markAsRead, clearAll } = useNotifications();
  const notificationRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type: Notification['type'], isRead: boolean) => {
    if (!isRead) return 'bg-blue-50';
    switch (type) {
      case 'success':
        return 'hover:bg-green-50';
      case 'error':
        return 'hover:bg-red-50';
      case 'warning':
        return 'hover:bg-yellow-50';
      default:
        return 'hover:bg-blue-50';
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.link) {
      navigate(notification.link);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className="relative" ref={notificationRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={`الإشعارات (${unreadCount} غير مقروءة)`}
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full transform -translate-y-1/4 translate-x-1/4 animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-50 md:absolute md:inset-auto md:left-0 md:right-auto md:top-full md:mt-2 md:w-96"
          role="dialog"
          aria-modal="true"
          aria-label="مركز الإشعارات"
        >
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-25" aria-hidden="true" />
          
          <div className="relative bg-white rounded-t-lg md:rounded-lg shadow-xl border border-gray-200 max-h-[90vh] md:max-h-[600px] flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white rounded-t-lg z-10">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Bell className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">الإشعارات</h3>
                {unreadCount > 0 && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {unreadCount} جديد
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                {unreadCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    تحديد الكل كمقروء
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="md:hidden text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <button
                      key={notification.id}
                      className={`w-full text-right p-4 transition-colors ${
                        getBackgroundColor(notification.type, notification.read)
                      } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start space-x-3 rtl:space-x-reverse">
                        {getIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                                جديد
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <p className="text-xs text-gray-400">
                              {format(new Date(notification.timestamp), 'PPpp', { locale: ar })}
                            </p>
                            {notification.link && (
                              <ExternalLink className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <Bell className="w-12 h-12 text-gray-300 mb-4" />
                  <p>لا توجد إشعارات جديدة</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}