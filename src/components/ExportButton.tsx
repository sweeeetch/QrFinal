import React from 'react';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';

interface Attendee {
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  presence: number;
}

interface ExportButtonProps {
  attendees: Map<string, Attendee>;
}

export function ExportButton({ attendees }: ExportButtonProps) {
  const handleExport = () => {
    const data = Array.from(attendees.values()).map(({
      firstName,
      lastName,
      email,
      phoneNumber,
      presence
    }) => ({
      'First Name': firstName || '',
      'Last Name': lastName || '',
      'Email': email,
      'Phone Number': phoneNumber || '',
      'Presence Count': presence
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');

    const maxWidths = data.reduce((acc: { [key: string]: number }, row) => {
      Object.keys(row).forEach(key => {
        const cellLength = String(row[key as keyof typeof row]).length;
        acc[key] = Math.max(acc[key] || key.length, cellLength);
      });
      return acc;
    }, {});

    worksheet['!cols'] = Object.keys(maxWidths).map(key => ({
      wch: maxWidths[key] + 2
    }));

    XLSX.writeFile(workbook, 'attendance.xlsx');
  };

  return (
    <button
      onClick={handleExport}
      className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
    >
      <Download className="w-4 h-4" />
      Export Attendance
    </button>
  );
}