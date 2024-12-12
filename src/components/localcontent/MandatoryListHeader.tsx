import React from 'react';
import { ExternalLink, FileBarChart } from 'lucide-react';

interface Props {
  onDownload: () => void;
  onOpenLCGPA: () => void;
  isDownloading: boolean;
}

export default function MandatoryListHeader({ onDownload, onOpenLCGPA, isDownloading }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold">القائمة الإلزامية</h2>
          <p className="mt-1 text-sm text-gray-500">
            معلومات وتعليمات القائمة الإلزامية للمحتوى المحلي
          </p>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <button
            onClick={onOpenLCGPA}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ExternalLink className="w-4 h-4 ml-2" />
            موقع الهيئة
          </button>
          <button
            onClick={onDownload}
            disabled={isDownloading}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileBarChart className={`w-4 h-4 ml-2 ${isDownloading ? 'animate-spin' : ''}`} />
            {isDownloading ? 'جاري التحميل...' : 'تحميل القائمة الكاملة'}
          </button>
        </div>
      </div>
    </div>
  );
}