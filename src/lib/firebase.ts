// src/lib/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from "firebase/analytics";
// import { getAuth } from 'firebase/auth'; // Removido

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG6aUcxXo9DJ2bkoN30HDfFwRwyDmH81s",
  authDomain: "site-clinica-8a567.firebaseapp.com",
  projectId: "site-clinica-8a567",
  storageBucket: "site-clinica-8a567.firebasestorage.app",
  messagingSenderId: "957018589735",
  appId: "1:957018589735:web:66fd3b505e9def2a5c1c02",
  measurementId: "G-9NT3WDHV21"
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const db = getFirestore(app);
// const auth = getAuth(app); // Removido

// Initialize Firebase Analytics if supported
let analytics;
// Check if window is defined (to ensure it runs on client-side) before checking for support
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, analytics }; // auth removido da exportação
