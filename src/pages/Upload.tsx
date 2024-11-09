import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, FileSpreadsheet, AlertCircle } from 'lucide-react';
import * as XLSX from 'xlsx';

interface Attendee {
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  presence: number;
}

export function Upload() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);

        const newAttendees = new Map<string, Attendee>();
        let hasErrors = false;

        jsonData.forEach((row: any) => {
          if (!row.email) {
            hasErrors = true;
            return;
          }

          const email = row.email.toString().toLowerCase();
          newAttendees.set(email, {
            email,
            firstName: row.firstName || row['First Name'] || '',
            lastName: row.lastName || row['Last Name'] || '',
            phoneNumber: row.phoneNumber || row['Phone Number'] || '',
            presence: 0
          });
        });

        if (hasErrors) {
          setError('Some rows were skipped due to missing email addresses');
        } else {
          setError(null);
        }

        // Save to localStorage
        localStorage.setItem('attendees', JSON.stringify(Array.from(newAttendees.entries())));
        navigate('/dashboard');
      } catch (err) {
        setError('Error processing file. Please ensure it\'s a valid Excel file.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-teal-900">Upload Attendee List</h2>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 text-teal-600 hover:text-teal-700 transition-colors"
        >
          Back to Scanner
        </button>
      </div>

      <div className="bg-gradient-to-br from-teal-50 to-purple-50 rounded-xl border border-teal-100 p-8">
        <div className="max-w-xl mx-auto">
          <label className="flex flex-col items-center justify-center w-full h-64 px-4 transition bg-white border-2 border-dashed rounded-xl border-teal-200 hover:border-teal-400 cursor-pointer">
            <div className="flex flex-col items-center justify-center pt-7">
              <UploadIcon className="w-12 h-12 text-teal-500 mb-4" />
              <p className="text-xl font-semibold text-teal-700">Upload Excel File</p>
              <p className="pt-2 text-sm text-teal-500">Click to browse or drag and drop</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
            />
          </label>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="mt-8 space-y-4">
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="flex items-center gap-2 text-teal-700 font-medium mb-2">
                <FileSpreadsheet className="w-5 h-5" />
                Excel File Format
              </div>
              <p className="text-sm text-teal-600">
                Your Excel file should include the following columns:
              </p>
              <ul className="mt-2 text-sm text-teal-600 list-disc list-inside">
                <li>Email (required)</li>
                <li>First Name</li>
                <li>Last Name</li>
                <li>Phone Number</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}