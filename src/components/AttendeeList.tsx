import React from 'react';
import type { Attendee } from '../App';

interface AttendeeListProps {
  attendees: Map<string, Attendee>;
}

export function AttendeeList({ attendees }: AttendeeListProps) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-teal-800 mb-4 flex items-center gap-2">
        Registered Attendees
        <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
          {attendees.size}
        </span>
      </h3>
      <div className="bg-gradient-to-br from-teal-50 to-purple-50 rounded-xl border border-teal-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-teal-200">
            <thead>
              <tr className="bg-teal-500/10">
                <th className="px-4 py-3 text-left text-sm font-semibold text-teal-700">First Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-teal-700">Last Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-teal-700">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-teal-700">Phone Number</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-teal-700">Presence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-teal-100">
              {Array.from(attendees.values()).map((attendee) => (
                <tr key={attendee.email} className="hover:bg-teal-500/5 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-800">{attendee.firstName || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{attendee.lastName || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{attendee.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{attendee.phoneNumber || '-'}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                      {attendee.presence}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}