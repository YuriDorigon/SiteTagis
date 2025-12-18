
// src/firebase/server.ts

// Este arquivo é para CÓDIGO DO LADO DO SERVIDOR.
// NÃO adicione 'use client' aqui.

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// A configuração da Firebase está agora centralizada aqui.
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Validação das variáveis de ambiente
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error("As variáveis de ambiente do Firebase não estão configuradas. Verifique seu arquivo .env ou as configurações de ambiente do seu servidor.");
}

// Inicializa o Firebase de forma segura para o ambiente de servidor
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const db = getFirestore(app);

// Exporta a instância do Firestore para uso em componentes de servidor.
export { app, db };
