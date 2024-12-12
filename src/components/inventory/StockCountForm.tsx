import React, { useState } from 'react';
import { X, Search, Package, Camera, Save, QrCode } from 'lucide-react';
import QRScanner from './QRScanner';
import { useSpring, animated } from '@react-spring/web';
import { generateQRCode, parseQRData } from '../../utils/qrGenerator';

interface StockCountFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export default function StockCountForm({ onSubmit, onClose }: StockCountFormProps) {
  const [items, setItems] = useState([
    { id: 1, name: 'قطع غيار محركات', expected: 100, actual: 0, location: 'رف A1' },
    { id: 2, name: 'مواد خام', expected: 150, actual: 0, location: 'رف B2' },
    { id: 3, name: 'مواد تغليف', expected: 75, actual: 0, location: 'رف C3' },
  ]);
  const [showScanner, setShowScanner] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastScanned, setLastScanned] = useState<string | null>(null);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { duration: 300 }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ items });
  };

  const handleCountUpdate = (id: number, value: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, actual: value } : item
    ));
  };

  const handleQRScan = async (result: string) => {
    try {
      const scannedData = parseQRData(result);
      
      // Find matching item
      const item = items.find(i => i.id.toString() === scannedData.id);
      if (item) {
        handleCountUpdate(item.id, scannedData.quantity || 0);
        setLastScanned(JSON.stringify(scannedData, null, 2));
        
        // Vibrate if supported
        if ('vibrate' in navigator) {
          navigator.vibrate(200);
        }

        // Play success sound
        const audio = new Audio('/assets/scan-success.mp3');
        await audio.play();
      }
    } catch (error) {
      console.error('Invalid QR code data:', error);
      // Play error sound
      const audio = new Audio('/assets/scan-error.mp3');
      await audio.play();
    }
    setShowScanner(false);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <animated.div style={fadeIn} className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">جرد المخزون</h2>
            <p className="text-sm text-gray-500 mt-1">قم بإدخال العدد الفعلي لكل صنف</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <div className="relative flex-1 max-w-lg">
              <input
                type="text"
                placeholder="بحث عن منتج..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <button
              onClick={() => setShowScanner(true)}
              className="mr-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <QrCode className="w-4 h-4 ml-2" />
              مسح QR
            </button>
          </div>

          {lastScanned && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-800">آخر مسح:</span>
                <button
                  onClick={() => setLastScanned(null)}
                  className="text-green-600 hover:text-green-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <pre className="mt-2 text-xs bg-white p-2 rounded border border-green-100 overflow-auto">
                {lastScanned}
              </pre>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المنتج
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الموقع
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      العدد المتوقع
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      العدد الفعلي
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الفرق
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          <Package className="w-5 h-5 text-gray-400 ml-2" />
                          {item.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.expected}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          value={item.actual}
                          onChange={(e) => handleCountUpdate(item.id, parseInt(e.target.value))}
                          className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                        item.actual - item.expected === 0
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}>
                        {item.actual - item.expected}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end space-x-3 rtl:space-x-reverse">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                <Save className="w-4 h-4 ml-2 inline-block" />
                حفظ الجرد
              </button>
            </div>
          </form>
        </div>
      </animated.div>

      {showScanner && (
        <QRScanner
          onScan={handleQRScan}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
}