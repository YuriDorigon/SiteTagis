
// scripts/seedDatabase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, writeBatch, addDoc } from 'firebase/firestore';
import dotenv from 'dotenv';
import { resolve } from 'path';

// Carrega as variáveis de ambiente do arquivo .env na raiz do projeto
dotenv.config({ path: resolve(process.cwd(), '.env') });

// Configuração do Firebase usando variáveis de ambiente
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validação para garantir que as variáveis foram carregadas
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error("Erro: As variáveis de ambiente do Firebase (NEXT_PUBLIC_FIREBASE_*) não foram encontradas. Verifique seu arquivo .env na raiz do projeto.");
  process.exit(1);
}

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
  {
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

const doctors = [
    {
        name: "Dr. Rafael Santos Souza",
        crm: "23051",
        imageUrl: "/doctors/rafael-santos.jpeg",
        bio: "Ortopedista especialista em cirurgia do joelho, tratando desde lesões esportivas a doenças degenerativas. Focado em devolver a mobilidade e qualidade de vida aos seus pacientes.",
        specialtyIds: ["id_ortopedia_geral", "id_ortopedia_joelho"],
        examIds: []
    },
    {
        name: "Dra. Juliana Moreira",
        crm: "24589",
        imageUrl: "/doctors/juliana-moreira.jpeg",
        bio: "Especialista em cirurgia do ombro e cotovelo, com vasta experiência em artroscopia e tratamento de lesões complexas. Comprometida com a recuperação funcional dos seus pacientes.",
        specialtyIds: ["id_ortopedia_geral", "id_ortopedia_ombro"],
        examIds: []
    }
];

const convenios = [
    { name: "Unimed", logoUrl: "/convenios/unimed.png" },
    { name: "Bradesco Saúde", logoUrl: "/convenios/bradesco.png" },
    { name: "Amil", logoUrl: "/convenios/amil.png" },
    { name: "SulAmérica", logoUrl: "/convenios/sulamerica.png" },
    { name: "CASSI", logoUrl: "/convenios/cassi.png" },
];

const testimonials = [
    { name: "Maria S.", quote: "Fui muito bem atendida pelo Dr. Rafael. Um excelente profissional, atencioso e muito competente. Recomendo!" },
    { name: "João P.", quote: "A estrutura da clínica é ótima e o atendimento é de primeira. Resolvi meu problema no ombro com a Dra. Juliana." },
    { name: "Ana L.", quote: "Agendamento rápido e fácil. A equipe toda está de parabéns pelo cuidado e atenção com os pacientes." },
];

const exams = [
    { name: "Ecocardiograma", iconName: "HeartPulse", description: "Avalia a estrutura e o funcionamento do coração." },
    { name: "Eletrocardiograma", iconName: "Activity", description: "Mede a atividade elétrica do coração para detectar irregularidades." },
    { name: "Ultrassonografia", iconName: "Waves", description: "Utiliza ondas sonoras para criar imagens de órgãos e tecidos." },
];

async function seedCollection<T>(collectionName: string, data: T[], uniqueField: keyof T) {
  const collectionRef = collection(db, collectionName);
  let addedCount = 0;
  
  console.log(`\nIniciando o seeding da coleção "${collectionName}"...`);

  // Usar um Map para garantir nomes únicos e associá-los aos IDs gerados
  const specialtyMap = new Map<string, string>();
  if (collectionName === 'doctors') {
    const specialtiesSnap = await getDocs(query(collection(db, 'specialties')));
    specialtiesSnap.forEach(doc => {
        specialtyMap.set(doc.data().name, doc.id);
    });
  }

  for (const item of data) {
    const q = query(collectionRef, where(uniqueField as string, '==', item[uniqueField]));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      try {
        let dataToAdd = { ...item };
        // Mapear Nomes de Especialidades para IDs se for um médico
        if (collectionName === 'doctors' && 'specialtyIds' in dataToAdd && Array.isArray(dataToAdd.specialtyIds)) {
            dataToAdd.specialtyIds = dataToAdd.specialtyIds.map((name: any) => specialtyMap.get(name) || name);
        }
        
        await addDoc(collectionRef, dataToAdd);
        console.log(`✅ Item "${(item as any)[uniqueField]}" adicionado a "${collectionName}".`);
        addedCount++;
      } catch (error) {
        console.error(`❌ Erro ao adicionar "${(item as any)[uniqueField]}" em "${collectionName}":`, error);
      }
    } else {
      console.log(`ℹ️ Item "${(item as any)[uniqueField]}" já existe em "${collectionName}". Pulando.`);
    }
  }

  console.log(`Seeding de "${collectionName}" concluído! ${addedCount} novos itens adicionados.`);
}


async function main() {
  await seedCollection('specialties', specialties, 'name');
  await seedCollection('doctors', doctors, 'name');
  await seedCollection('convenios', convenios, 'name');
  await seedCollection('testimonials', testimonials, 'name');
  await seedCollection('exams', exams, 'name');
  
  console.log("\nProcesso de seeding finalizado com sucesso.");
  process.exit(0);
}

main().catch(error => {
  console.error('❌ Ocorreu um erro geral durante o seeding:', error);
  process.exit(1);
});
