import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore';
import { getDb } from '@/firebase/server';
import type { Specialty, Exam, Convenio, Testimonial, Doctor, ClinicConfig } from '@/lib/types';
import defaultConfig from '@/lib/data/clinicConfig.json';

async function fetchCollection<T>(collectionName: string, ordered = true): Promise<T[]> {
  const db = getDb();
  const colRef = collection(db, collectionName);
  const q = ordered ? query(colRef, orderBy('name')) : colRef;
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as T));
}

export async function getSpecialties(): Promise<Specialty[]> {
  try {
    return await fetchCollection<Specialty>('specialties');
  } catch {
    return [];
  }
}

export async function getExams(): Promise<Exam[]> {
  try {
    const all = await fetchCollection<Exam>('exams');
    return all.filter(e => e.active !== false);
  } catch {
    return [];
  }
}

export async function getConvenios(): Promise<Convenio[]> {
  try {
    return await fetchCollection<Convenio>('convenios');
  } catch {
    return [];
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    return await fetchCollection<Testimonial>('testimonials', false);
  } catch {
    return [];
  }
}

export async function getDoctors(): Promise<Doctor[]> {
  try {
    const all = await fetchCollection<Doctor>('doctors');
    return all.filter(d => d.active !== false);
  } catch {
    return [];
  }
}

export async function getClinicConfig(): Promise<ClinicConfig> {
  try {
    const db = getDb();
    const snap = await getDoc(doc(db, 'settings', 'clinic'));
    if (snap.exists()) {
      return { ...(defaultConfig as ClinicConfig), ...snap.data() as ClinicConfig };
    }
    return defaultConfig as ClinicConfig;
  } catch {
    return defaultConfig as ClinicConfig;
  }
}
