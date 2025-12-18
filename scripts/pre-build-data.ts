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

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error("Erro: As variáveis de ambiente do Firebase não foram encontradas. Verifique seu arquivo .env.");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const DATA_DIR = resolve(process.cwd(), 'src/lib/data');

async function fetchDataAndSave<T>(collectionName: string, fileName: string): Promise<T[]> {
  console.log(`Buscando dados da coleção: ${collectionName}...`);
  try {
    const colRef = collection(db, collectionName);
    const q = query(colRef, orderBy('name')); // Assumindo que a maioria tem 'name', ou ajustar conforme necessário
    const snapshot = await getDocs(q);
    const dataList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];

    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(resolve(DATA_DIR, fileName), JSON.stringify(dataList, null, 2));
    
    console.log(`✅ Dados de ${collectionName} salvos em ${fileName}. Total: ${dataList.length} itens.`);
    return dataList;
  } catch (error) {
    console.error(`❌ Erro ao buscar dados de ${collectionName}:`, error);
    // Se o arquivo já existir, usa ele como fallback
    try {
        const fallbackData = await fs.readFile(resolve(DATA_DIR, fileName), 'utf-8');
        console.log(`Usando dados de fallback de ${fileName}.`);
        return JSON.parse(fallbackData);
    } catch (fallbackError) {
        console.error(`Não foi possível ler o arquivo de fallback para ${collectionName}. Retornando array vazio.`);
        return [];
    }
  }
}

async function main() {
  console.log("Iniciando pré-build: buscando dados do Firestore...");
  
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
