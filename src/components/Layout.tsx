import React from 'react';
import { useLocation } from 'react-router-dom';
import { QrCode, Upload as UploadIcon } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-teal-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              {location.pathname === '/upload' ? (
                <UploadIcon className="w-8 h-8 text-purple-500" />
              ) : (
                <QrCode className="w-8 h-8 text-purple-500" />
              )}
              <h1 className="text-3xl font-bold text-teal-900">
                QR Scanner
              </h1>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}