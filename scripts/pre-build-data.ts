// scripts/pre-build-data.ts
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
import dotenv from 'dotenv';
import { resolve } from 'path';
import { promises as fs } from 'fs';
import type { Specialty, Exam, Convenio, Testimonial, Doctor } from '@/lib/types';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config({ path: resolve(process.cwd(), '.env') });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const hasFirebaseConfig = firebaseConfig.apiKey && firebaseConfig.projectId;

if (!hasFirebaseConfig) {
  console.warn("Aviso: As variáveis de ambiente do Firebase não foram encontradas. O script de pré-build tentará usar os dados de fallback locais.");
}

const app = hasFirebaseConfig ? initializeApp(firebaseConfig) : null;
const db = app ? getFirestore(app) : null;

const DATA_DIR = resolve(process.cwd(), 'src/lib/data');

async function fetchDataAndSave<T>(collectionName: string, fileName: string): Promise<T[]> {
  console.log(`Verificando dados para a coleção: ${collectionName}...`);
  try {
    // Se não houver configuração do Firebase, pula a busca e vai direto para o fallback.
    if (!db) {
        throw new Error("Configuração do Firebase não disponível para busca de dados.");
    }
    
    console.log(`Buscando dados da coleção: ${collectionName}...`);
    const colRef = collection(db, collectionName);
    // Ordena por nome se possível, caso contrário, busca sem ordenação.
    // A coleção 'testimonials' pode não ter 'name', então tratamos isso.
    const q = collectionName !== 'testimonials' ? query(colRef, orderBy('name')) : query(colRef);
    const snapshot = await getDocs(q);
    const dataList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];

    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(resolve(DATA_DIR, fileName), JSON.stringify(dataList, null, 2));
    
    console.log(`✅ Dados de ${collectionName} salvos em ${fileName}. Total: ${dataList.length} itens.`);
    return dataList;
  } catch (error: any) {
    console.warn(`⚠️ Aviso ao buscar dados de ${collectionName}: ${error.message}`);
    // Se a busca falhar (por falta de config ou erro de permissão), tenta usar o arquivo local como fallback.
    try {
        const fallbackData = await fs.readFile(resolve(DATA_DIR, fileName), 'utf-8');
        console.log(`Usando dados de fallback existentes em ${fileName}.`);
        return JSON.parse(fallbackData);
    } catch (fallbackError) {
        console.error(`❌ Não foi possível ler o arquivo de fallback para ${collectionName}. Criando arquivo vazio para evitar quebra no build.`);
        await fs.mkdir(DATA_DIR, { recursive: true });
        await fs.writeFile(resolve(DATA_DIR, fileName), '[]');
        return [];
    }
  }
}

async function main() {
  console.log("Iniciando pré-build: buscando ou verificando dados locais...");
  
  await Promise.all([
    fetchDataAndSave<Specialty>('specialties', 'specialties.json'),
    fetchDataAndSave<Exam>('exams', 'exams.json'),
    fetchDataAndSave<Convenio>('convenios', 'convenios.json'),
    fetchDataAndSave<Testimonial>('testimonials', 'testimonials.json'),
    fetchDataAndSave<Doctor>('doctors', 'doctors.json'),
  ]);

  console.log("Pré-build de dados concluído com sucesso!");
  // Encerra o processo para que o build do Next.js possa continuar
  process.exit(0);
}

main();
