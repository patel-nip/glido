// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC1KeqP9nO2H09GrwTpSDCtSooAgyio-Js",
    authDomain: "glido-b8dba.firebaseapp.com",
    projectId: "glido-b8dba",
    storageBucket: "glido-b8dba.firebasestorage.app",
    messagingSenderId: "1067778322762",
    appId: "1:1067778322762:web:f314bef36577c7ababd1b3",
    measurementId: "G-SMJK98E3W8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Google Provider for Google Sign-In
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore Database
export const db = getFirestore(app);

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);

export default app;
