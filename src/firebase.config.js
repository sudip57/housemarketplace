import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBneOd_ORDmvxD1WarHAjJ4nkrbKJ4Rs4E',
  authDomain: 'house-marketplace-6e91d.firebaseapp.com',
  projectId: 'house-marketplace-6e91d',
  storageBucket: 'house-marketplace-6e91d.appspot.com',
  messagingSenderId: '42760688185',
  appId: '1:42760688185:web:3c110d2536bade5e1f33e8',
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
