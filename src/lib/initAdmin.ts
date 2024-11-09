import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function initializeAdmin() {
  const adminEmail = 'saimzair5@gmail.com';
  
  try {
    await setDoc(doc(db, 'users', adminEmail), {
      email: adminEmail,
      role: 'admin',
      name: 'Admin User',
      createdAt: new Date(),
      presence: 0
    }, { merge: true });
    
    console.log('Admin user initialized successfully');
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
}