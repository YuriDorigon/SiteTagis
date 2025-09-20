// scripts/seedDatabase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Configuração do Firebase - ATENÇÃO: Use as suas próprias credenciais aqui
// Pegue-as do seu console do Firebase ou do arquivo firebase.ts
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCG6aUcxXo9DJ2bkoN30HDfFwRwyDmH81s",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "site-clinica-8a567.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "site-clinica-8a567",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "site-clinica-8a567.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "957018589735",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:957018589735:web:66fd3b505e9def2a5c1c02",
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const specialties = [
  {
    name: 'Ortopedia e Traumatologia',
    iconName: 'Bone',
    description: 'Tratamento geral de lesões e doenças do sistema musculoesquelético, incluindo ossos, articulações, ligamentos e músculos.'
  },
  {
    name: 'Ortopedia - Cirurgia do Joelho',
    iconName: 'CircleDotDashed',
    description: 'Diagnóstico e tratamento de lesões e doenças específicas do joelho, como lesões de menisco, ligamentos e artrose.'
  },
s  {
    name: 'Ortopedia - Cirurgia do Ombro',
    iconName: 'Armchair',
    description: 'Especialidade focada em problemas no ombro e cotovelo, incluindo lesões do manguito rotador, luxações e bursites.'
  },
  {
    name: 'Ortopedia - Cirurgia da Coluna',
    iconName: 'AlignVerticalJustifyStart',
    description: 'Tratamento de patologias da coluna vertebral, como hérnias de disco, escoliose, estenose e fraturas vertebrais.'
  },
  {
    name: 'Ortopedia - Cirurgia do Quadril',
    iconName: 'CircleDot',
    description: 'Foco no tratamento de doenças e lesões da articulação do quadril, incluindo artrose, bursite e fraturas.'
  },
  {
    name: 'Ortopedia - Cirurgia da Mão',
    iconName: 'Hand',
    description: 'Diagnóstico e tratamento de problemas nas mãos, punhos e dedos, como síndrome do túnel do carpo e tendinites.'
  },
  {
    name: 'Ortopedia - Cirurgia do Pé e Tornozelo',
    iconName: 'Foot',
    description: 'Tratamento de condições que afetam os pés e tornozelos, como joanetes, fascite plantar, entorses e fraturas.'
  },
  {
    name: 'Ortopedia Pediátrica',
    iconName: 'Baby',
    description: 'Cuidado especializado para problemas ortopédicos em crianças e adolescentes, desde o nascimento até a fase de crescimento.'
  }
];

async function seedSpecialties() {
  const specialtiesCollection = collection(db, 'specialties');
  let addedCount = 0;

  console.log('Iniciando o processo de seeding de especialidades...');

  for (const specialty of specialties) {
    // Verifica se a especialidade já existe pelo nome
    const q = query(specialtiesCollection, where('name', '==', specialty.name));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Se não existir, adiciona
      try {
        await addDoc(specialtiesCollection, specialty);
        console.log(`✅ Especialidade "${specialty.name}" adicionada com sucesso.`);
        addedCount++;
      } catch (error) {
        console.error(`❌ Erro ao adicionar a especialidade "${specialty.name}":`, error);
      }
    } else {
      // Se já existir, informa
      console.log(`ℹ️ Especialidade "${specialty.name}" já existe. Pulando.`);
    }
  }
  
  console.log(`\nSeeding concluído! ${addedCount} novas especialidades foram adicionadas.`);
  
  // Encerra o processo para que o terminal seja liberado
  process.exit(0);
}

seedSpecialties().catch(error => {
  console.error('❌ Ocorreu um erro geral durante o seeding:', error);
  process.exit(1);
});
