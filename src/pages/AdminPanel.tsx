import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Layout } from '../components/Layout';
import { UserCheck, UserX } from 'lucide-react';

interface PendingUser {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
}

export function AdminPanel() {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const users = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()
        }))
        .filter(user => user.role === 'pending') as PendingUser[];
      setPendingUsers(users);
    });

    return () => unsubscribe();
  }, []);

  const handleApprove = async (email: string) => {
    await updateDoc(doc(db, 'users', email), {
      role: 'approved'
    });
  };

  const handleReject = async (email: string) => {
    await updateDoc(doc(db, 'users', email), {
      role: 'rejected'
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-teal-900">Pending Approvals</h2>
        <div className="bg-gradient-to-br from-teal-50 to-purple-50 rounded-xl border border-teal-100 overflow-hidden">
          {pendingUsers.length === 0 ? (
            <div className="p-8 text-center text-teal-600">
              No pending approvals
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-teal-200">
                <thead>
                  <tr className="bg-teal-500/10">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-teal-700">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-teal-700">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-teal-700">Requested</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-teal-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-100">
                  {pendingUsers.map((user) => (
                    <tr key={user.email} className="hover:bg-teal-500/5">
                      <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {user.createdAt?.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm space-x-2">
                        <button
                          onClick={() => handleApprove(user.email)}
                          className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                        >
                          <UserCheck className="w-4 h-4 mr-1" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(user.email)}
                          className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
                        >
                          <UserX className="w-4 h-4 mr-1" />
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}