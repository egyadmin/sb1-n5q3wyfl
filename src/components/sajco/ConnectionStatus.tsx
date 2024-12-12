import React from 'react';
import { CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';

interface ConnectionStatusProps {
  status: {
    isConnected: boolean;
    message: string;
    timestamp: string;
  };
  isConnecting: boolean;
}

export default function ConnectionStatus({ status, isConnecting }: ConnectionStatusProps) {
  const animation = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' }
  });

  return (
    <animated.div 
      style={animation}
      className={`p-4 rounded-lg border ${
        isConnecting ? 'bg-blue-50 border-blue-200' :
        status.isConnected ? 'bg-green-50 border-green-200' : 
        'bg-red-50 border-red-200'
      }`}
    >
      <div className="flex items-center">
        {isConnecting ? (
          <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
        ) : status.isConnected ? (
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600" />
        )}
        <div className="mr-3">
          <p className={`font-medium ${
            isConnecting ? 'text-blue-700' :
            status.isConnected ? 'text-green-700' : 
            'text-red-700'
          }`}>
            {isConnecting ? 'جاري الاتصال...' : status.message}
          </p>
          {status.timestamp && (
            <p className="text-sm text-gray-500">
              آخر تحديث: {status.timestamp}
            </p>
          )}
        </div>
      </div>
    </animated.div>
  );
}