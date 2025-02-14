import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {
  FIREBASE_KEY,
  FIREBASE_DOMAIN,
  FIREBASE_DATABASE,
  FIREBASE_PROJECT,
  FIREBASE_STORAGE,
  FIREBASE_MESSAGIN,
  FIREBASE_APP_ID,
  FIREBASE_MESSUREMENT,
} from '../../constants/envConsts';

export const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: FIREBASE_DOMAIN,
  databaseURL: FIREBASE_DATABASE,
  projectId: FIREBASE_PROJECT,
  storageBucket: FIREBASE_STORAGE,
  messagingSenderId: FIREBASE_MESSAGIN,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MESSUREMENT,
};

export const db = getFirestore(initializeApp(firebaseConfig));
export const auth = getAuth();
console.log(auth);
