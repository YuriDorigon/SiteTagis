'use client';

import { firebaseConfig } from '@/firebase/server'; // Importar a configuração centralizada
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// A inicialização agora usa a configuração diretamente para maior estabilidade.
export function initializeFirebase() {
  if (!getApps().length) {
    const firebaseApp = initializeApp(firebaseConfig);
    return getSdks(firebaseApp);
  }
  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  const analytics = isSupported().then(yes => yes ? getAnalytics(firebaseApp) : null);
  
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
    analytics,
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
