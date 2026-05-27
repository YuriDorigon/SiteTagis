'use client';

import { useState, useEffect } from 'react';
import { useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';
import type { ClinicConfig } from '@/lib/types';
import defaultConfig from '@/lib/data/clinicConfig.json';

const SETTINGS_DOC = { col: 'settings', id: 'clinic' };

type Section = {
  title: string;
  emoji: string;
  fields: { key: keyof ClinicConfig; label: string; hint?: string; multiline?: boolean }[];
};

const sections: Section[] = [
  {
    title: 'Contato Principal',
    emoji: '📞',
    fields: [
      { key: 'whatsapp', label: 'WhatsApp (somente números)', hint: 'Ex: 5548991936045' },
      { key: 'whatsappDisplay', label: 'WhatsApp (exibição)', hint: 'Ex: (48) 99193-6045' },
      { key: 'phone1', label: 'Telefone 1', hint: 'Ex: (48) 3035-3377' },
      { key: 'phone2', label: 'Telefone 2', hint: 'Ex: (48) 3241-1122' },
      { key: 'email', label: 'E-mail de contato' },
      { key: 'privacyEmail', label: 'E-mail LGPD / Privacidade' },
    ],
  },
  {
    title: 'Endereço',
    emoji: '📍',
    fields: [
      { key: 'addressStreet', label: 'Rua e número', hint: 'Ex: Av. Ver. Walter Borges, 157' },
      { key: 'addressCity', label: 'Cidade e estado', hint: 'Ex: Campinas, São José – SC' },
      { key: 'addressCep', label: 'CEP', hint: 'Ex: 88101-030' },
      { key: 'googleMapsLink', label: 'Link do Google Maps (Como chegar)', hint: 'URL que abre o app Maps com navegação' },
      { key: 'googleMapsEmbed', label: 'URL Embed Google Maps (iframe)', hint: 'URL do embed para aparecer no site', multiline: true },
    ],
  },
  {
    title: 'Horários de Atendimento',
    emoji: '🕐',
    fields: [
      { key: 'hoursWeekdays', label: 'Segunda a Sexta', hint: 'Ex: 07:30 – 18:00' },
      { key: 'hoursSaturday', label: 'Sábado', hint: 'Ex: 07:30 – 12:00' },
      { key: 'hoursSunday', label: 'Domingo', hint: 'Ex: Fechado' },
    ],
  },
  {
    title: 'Redes Sociais',
    emoji: '📱',
    fields: [
      { key: 'instagram', label: 'Instagram (URL completa)' },
      { key: 'facebook', label: 'Facebook (URL completa)' },
    ],
  },
  {
    title: 'Informações Legais',
    emoji: '🏢',
    fields: [
      { key: 'cnpj', label: 'CNPJ', hint: 'Ex: 26.393.262/0001-57' },
      { key: 'companyName', label: 'Razão Social' },
      { key: 'technicalResponsible', label: 'Responsável Técnico (nome completo)' },
      { key: 'technicalResponsibleCrm', label: 'CRM do Responsável Técnico', hint: 'Somente o número: Ex: 23051' },
    ],
  },
  {
    title: 'Página Inicial – Hero',
    emoji: '🏠',
    fields: [
      { key: 'heroHeadline', label: 'Título principal (headline)' },
      { key: 'heroSubtext', label: 'Subtítulo', multiline: true },
      { key: 'statSpecialties', label: 'Stat: Especialidades', hint: 'Ex: +30' },
      { key: 'statExams', label: 'Stat: Exames', hint: 'Ex: +50' },
      { key: 'statInsurance', label: 'Stat: Convênios', hint: 'Ex: +20' },
    ],
  },
];

export default function ManageSettings() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [config, setConfig] = useState<ClinicConfig>(defaultConfig as ClinicConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!firestore) return;
    const load = async () => {
      setIsLoading(true);
      try {
        const ref = doc(firestore, SETTINGS_DOC.col, SETTINGS_DOC.id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setConfig({ ...(defaultConfig as ClinicConfig), ...snap.data() as ClinicConfig });
        }
      } catch {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ operation: 'list', path: 'settings/clinic' }));
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [firestore]);

  const handleChange = (key: keyof ClinicConfig, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!firestore) return;
    setIsSaving(true);
    try {
      const ref = doc(firestore, SETTINGS_DOC.col, SETTINGS_DOC.id);
      await setDoc(ref, config, { merge: true });

      toast({
        title: 'Configurações salvas!',
        description: 'As alterações serão aplicadas no próximo deploy do site.',
      });
    } catch {
      errorEmitter.emit('permission-error', new FirestorePermissionError({ operation: 'update', path: 'settings/clinic' }));
      toast({ title: 'Erro ao salvar', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-primary/40" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-foreground/40 font-medium tracking-widest uppercase mb-1">Admin</p>
          <h1 className="text-2xl font-semibold text-primary font-headline">Configurações do Site</h1>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 bg-primary text-white font-medium py-2.5 px-6 rounded-xl text-sm hover:bg-primary/90 transition-all disabled:opacity-60"
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isSaving ? 'Salvando...' : 'Salvar tudo'}
        </button>
      </div>

      {sections.map((section) => (
        <div key={section.title} className="bg-white rounded-2xl border border-primary/8 overflow-hidden">
          <div className="px-6 py-4 border-b border-primary/6 bg-[#fafbfc]">
            <h2 className="text-sm font-semibold text-primary font-headline">
              {section.emoji} {section.title}
            </h2>
          </div>
          <div className="p-6 space-y-5">
            {section.fields.map(({ key, label, hint, multiline }) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-foreground/50 tracking-wide uppercase mb-1.5">
                  {label}
                </label>
                {multiline ? (
                  <textarea
                    value={config[key] ?? ''}
                    onChange={e => handleChange(key, e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2.5 rounded-xl border border-primary/15 bg-[#fafbfc] text-sm text-primary placeholder:text-foreground/25 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all resize-none"
                    placeholder={hint}
                  />
                ) : (
                  <input
                    type="text"
                    value={config[key] ?? ''}
                    onChange={e => handleChange(key, e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-primary/15 bg-[#fafbfc] text-sm text-primary placeholder:text-foreground/25 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
                    placeholder={hint}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-end pb-8">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 bg-primary text-white font-medium py-3 px-8 rounded-xl text-sm hover:bg-primary/90 transition-all disabled:opacity-60"
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isSaving ? 'Salvando...' : 'Salvar configurações'}
        </button>
      </div>
    </div>
  );
}
