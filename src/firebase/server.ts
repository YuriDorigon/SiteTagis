
// src/firebase/server.ts

// Este arquivo é para CÓDIGO DO LADO DO SERVIDOR.
// NÃO adicione 'use client' aqui.

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Não lançar erro no topo do módulo — isso quebra o pré-render do Next.js.
// O erro acontece apenas quando getFirebaseApp() é chamado em runtime.
function getFirebaseApp(): FirebaseApp {
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    throw new Error(
      'As variáveis de ambiente do Firebase não estão configuradas. ' +
      'Verifique seu arquivo .env ou as configurações de ambiente do servidor.'
    );
  }
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  }
  return getApp();
}

function getDb(): Firestore {
  return getFirestore(getFirebaseApp());
}

// Exporta getters lazy para uso em componentes de servidor.
export const app = { get instance() { return getFirebaseApp(); } };
export const db = { get instance() { return getDb(); } };

// Exporta funções diretas para quem usa app/db diretamente
export { getFirebaseApp, getDb };
