import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCy0QmFRWx3-cvtGkSHlMlgMmLblfTvoo4",
  authDomain: "bkform-d309e.firebaseapp.com",
  projectId: "bkform-d309e",
  storageBucket: "bkform-d309e.firebasestorage.app",
  messagingSenderId: "691160228613",
  appId: "1:691160228613:web:1b0330df219ea144ff4d6c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);