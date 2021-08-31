import { initializeApp } from "firebase/app";
import { getFirestore, getDoc,getDocs, doc, setDoc, collection, query, orderBy, limit } from 'firebase/firestore'
import { getAuth, signInWithPopup, signOut, GithubAuthProvider } from 'firebase/auth';

const FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
};

// Initialize Firebase
const app = initializeApp(FirebaseConfig);
const auth = getAuth();
const database = getFirestore();

export { 
  auth, 
  signInWithPopup, 
  GithubAuthProvider, 
  signOut, 
  database, 
  collection, 
  setDoc, 
  getDocs, 
  getDoc, 
  doc,
  query,
  orderBy,
  limit 
};

//import { database, getDocs, collection, query, limit, orderBy } from '../../service';
//import { auth, signInWithPopup, GithubAuthProvider } from '../service';