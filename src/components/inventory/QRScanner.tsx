import React, { useEffect, useRef, useState } from 'react';
import { Camera, X, Image, AlertCircle } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { initializeScanner, stopScanner } from '../../utils/qrScanner';

interface QRScannerProps {
  onScan: (decodedText: string) => void;
  onClose: () => void;
}

export default function QRScanner({ onScan, onClose }: QRScannerProps) {
  const [error, setError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scannerRef = useRef<any>(null);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { tension: 280, friction: 20 }
  });

  useEffect(() => {
    // Initialize scanner
    const scanner = initializeScanner(
      'qr-reader',
      async (decodedText) => {
        if (isProcessing) return;
        setIsProcessing(true);
        
        try {
          // Provide feedback
          if ('vibrate' in navigator) {
            navigator.vibrate(200);
          }

          // Play success sound
          const audio = new Audio('/assets/scan-success.mp3');
          await audio.play().catch(() => {});

          // Pass data back
          onScan(decodedText);
          onClose();
        } catch (error) {
          console.error('QR scan error:', error);
          setError(error instanceof Error ? error.message : 'خطأ في قراءة الرمز');
          
          // Play error sound
          const audio = new Audio('/assets/scan-error.mp3');
          await audio.play().catch(() => {});
        } finally {
          setIsProcessing(false);
        }
      },
      (errorMessage) => {
        setError(errorMessage);
      }
    );

    scannerRef.current = scanner;

    // Cleanup
    return () => {
      if (scannerRef.current) {
        stopScanner(scannerRef.current);
      }
    };
  }, [onScan, onClose, isProcessing]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <animated.div style={fadeIn} className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Camera className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-lg font-medium">مسح رمز QR</h3>
              <p className="text-sm text-gray-500">قم بتوجيه الكاميرا نحو الرمز</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div id="qr-reader" className="w-full"></div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center">
              <AlertCircle className="w-4 h-4 ml-2 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="mt-4 flex justify-center">
            <label className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
              <Image className="w-4 h-4 ml-2" />
              <span>تحميل صورة QR</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file && scannerRef.current) {
                    scannerRef.current.clear();
                    const reader = new FileReader();
                    reader.onload = () => {
                      const img = new Image();
                      img.onload = () => {
                        try {
                          scannerRef.current.scanFile(file, true)
                            .then(onScan)
                            .catch(() => setError('فشل في قراءة الملف'));
                        } catch (error) {
                          setError('فشل في معالجة الصورة');
                        }
                      };
                      img.src = reader.result as string;
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>
        </div>
      </animated.div>
    </div>
  );
}