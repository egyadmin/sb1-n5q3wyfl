import React from 'react';
import { Clock, MapPin, User, FileText, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import type { Correspondence, TrackingEvent } from '../../types/correspondence';
import { getCategoryBadgeClasses } from '../../utils/correspondenceCategories';

interface CorrespondenceTrackerProps {
  correspondence: Correspondence;
}

export default function CorrespondenceTracker({ correspondence }: CorrespondenceTrackerProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'new':
        return {
          bg: 'bg-blue-500',
          text: 'text-blue-800',
          border: 'border-blue-200',
          light: 'bg-blue-50'
        };
      case 'in-progress':
        return {
          bg: 'bg-yellow-500',
          text: 'text-yellow-800',
          border: 'border-yellow-200',
          light: 'bg-yellow-50'
        };
      case 'completed':
        return {
          bg: 'bg-green-500',
          text: 'text-green-800',
          border: 'border-green-200',
          light: 'bg-green-50'
        };
      case 'archived':
        return {
          bg: 'bg-purple-500',
          text: 'text-purple-800',
          border: 'border-purple-200',
          light: 'bg-purple-50'
        };
      default:
        return {
          bg: 'bg-gray-500',
          text: 'text-gray-800',
          border: 'border-gray-200',
          light: 'bg-gray-50'
        };
    }
  };

  const formatDate = (date: string) => {
    return format(new Date(date), 'PPpp', { locale: ar });
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle2;
      case 'new':
      case 'in-progress':
        return Clock;
      default:
        return AlertTriangle;
    }
  };

  return (
    <div className="space-y-6 bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className={`p-2 rounded-lg ${getCategoryBadgeClasses(correspondence.category)}`}>
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{correspondence.subject}</h3>
            <p className="text-sm text-gray-500">
              رقم المعاملة: {correspondence.id}
            </p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(correspondence.status).light} ${getStatusColor(correspondence.status).text}`}>
          {correspondence.status === 'new' && 'جديد'}
          {correspondence.status === 'in-progress' && 'قيد المعالجة'}
          {correspondence.status === 'completed' && 'مكتمل'}
          {correspondence.status === 'archived' && 'مؤرشف'}
        </div>
      </div>

      {/* Current Location */}
      <div className={`p-4 rounded-lg ${getStatusColor(correspondence.status).light} border ${getStatusColor(correspondence.status).border}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <MapPin className={`w-5 h-5 ${getStatusColor(correspondence.status).text}`} />
            <div>
              <p className="font-medium">الموقع الحالي</p>
              <p className="text-sm text-gray-600">{correspondence.tracking.currentLocation}</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {formatDate(correspondence.tracking.history[0].date)}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pt-4">
        <div className="absolute top-0 bottom-0 right-4 w-0.5 bg-gradient-to-b from-blue-500 to-gray-200" />
        
        {correspondence.tracking.history.map((event: TrackingEvent, index: number) => {
          const StatusIcon = getStatusIcon(event.status);
          const colors = getStatusColor(event.status);
          
          return (
            <div key={index} className="relative flex items-start mb-8 last:mb-0 group">
              <div className={`absolute right-2 top-2 w-4 h-4 rounded-full border-2 border-white ${colors.bg} 
                transform transition-transform group-hover:scale-125`} />
              
              <div className={`mr-8 flex-1 bg-white rounded-lg border ${colors.border} p-4 
                hover:shadow-md transition-all duration-200 group-hover:translate-x-2`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <StatusIcon className={`w-5 h-5 ${colors.text}`} />
                    <span className={`font-medium ${colors.text}`}>{event.action}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(event.date)}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{event.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{event.user}</span>
                  </div>
                </div>

                {event.notes && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-sm text-gray-600">{event.notes}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}