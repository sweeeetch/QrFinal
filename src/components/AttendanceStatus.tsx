import React from 'react';
import { UserCheck, UserX } from 'lucide-react';

interface StatusProps {
  scanResult: {
    email: string;
    status: 'success' | 'error';
    message: string;
  } | null;
}

export function AttendanceStatus({ scanResult }: StatusProps) {
  if (!scanResult) return null;

  return (
    <div className={`p-4 rounded-xl border ${
      scanResult.status === 'success' 
        ? 'bg-gradient-to-r from-green-50 to-teal-50 border-green-200' 
        : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200'
    }`}>
      <div className="flex items-center gap-2">
        {scanResult.status === 'success' ? (
          <UserCheck className="w-5 h-5 text-green-600" />
        ) : (
          <UserX className="w-5 h-5 text-red-600" />
        )}
        <p className="font-medium">{scanResult.email}</p>
      </div>
      <p className="mt-1 text-gray-700">{scanResult.message}</p>
    </div>
  );
}