import React, { useEffect, useState } from 'react';
import { QrCode, Upload as UploadIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Scanner } from '../components/Scanner';
import { AttendanceStatus } from '../components/AttendanceStatus';
import { AttendeeList } from '../components/AttendeeList';
import { ExportButton } from '../components/ExportButton';

interface Attendee {
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  presence: number;
  lastScanned?: Date;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [attendees, setAttendees] = useState<Map<string, Attendee>>(() => {
    const saved = localStorage.getItem('attendees');
    return saved ? new Map(JSON.parse(saved)) : new Map();
  });
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    email: string;
    status: 'success' | 'error';
    message: string;
  } | null>(null);

  useEffect(() => {
    localStorage.setItem('attendees', JSON.stringify(Array.from(attendees.entries())));
  }, [attendees]);

  const handleScanSuccess = async (decodedText: string) => {
    const email = decodedText.trim().toLowerCase();
    const now = new Date();
    
    if (attendees.has(email)) {
      const attendee = attendees.get(email)!;
      
      if (!attendee.lastScanned || (now.getTime() - attendee.lastScanned.getTime()) > 60000) {
        const updatedAttendee = {
          ...attendee,
          presence: (attendee.presence || 0) + 1,
          lastScanned: now
        };
        
        setAttendees(new Map(attendees.set(email, updatedAttendee)));
        
        setScanResult({
          email,
          status: 'success',
          message: `Attendance recorded for ${attendee.firstName} ${attendee.lastName}! Count: ${updatedAttendee.presence}`
        });
      } else {
        setScanResult({
          email,
          status: 'error',
          message: 'Already scanned! Please wait before scanning again.'
        });
      }
    } else {
      setScanResult({
        email,
        status: 'error',
        message: 'Email not registered in the system'
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {!isScanning ? (
          <div className="w-full sm:w-auto flex gap-2">
            <button
              onClick={() => setIsScanning(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-lg hover:from-teal-700 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl"
            >
              <QrCode className="w-5 h-5" />
              Scan QR Code
            </button>
            <button
              onClick={() => navigate('/upload')}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
            >
              <UploadIcon className="w-5 h-5" />
              Upload List
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsScanning(false)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all shadow-lg hover:shadow-xl"
          >
            Close Scanner
          </button>
        )}
        <ExportButton attendees={attendees} />
      </div>

      {isScanning && (
        <div className="bg-gradient-to-br from-teal-50 to-purple-50 p-6 rounded-xl border border-teal-100 shadow-inner">
          <Scanner
            onScanSuccess={handleScanSuccess}
            isScanning={isScanning}
          />
        </div>
      )}

      <AttendanceStatus scanResult={scanResult} />
      <AttendeeList attendees={attendees} />
    </div>
  );
}