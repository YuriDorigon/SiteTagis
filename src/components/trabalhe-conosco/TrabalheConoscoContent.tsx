"use client";

import { useState } from 'react';
import { Heart, TrendingUp, Users, MapPin, MessageSquare, CheckCircle2 } from 'lucide-react';

const BENEFITS = [
  {
    icon: Heart,
    title: 'Ambiente humanizado',
    description: 'Cuidamos dos colaboradores com o mesmo zelo que oferecemos aos nossos pacientes.',
  },
  {
    icon: TrendingUp,
    title: 'Crescimento profissional',
    description: 'Investimos no desenvolvimento da equipe com capacitações e oportunidades reais.',
  },
  {
    icon: Users,
    title: 'Equipe multidisciplinar',
    description: 'Trabalhe ao lado de especialistas de diversas áreas da saúde.',
  },
  {
    icon: MapPin,
    title: 'Localização central',
    description: 'Situados em Campinas, São José – SC, com fácil acesso por transporte público.',
  },
];

type FormState = { name: string; phone: string; message: string };

export default function TrabalheConoscoContent() {
  const [form, setForm] = useState<FormState>({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const lines = [
      'Olá! Gostaria de me candidatar a uma vaga na Clínica Tagis.',
      '',
      `*Nome:* ${form.name}`,
      `*Telefone:* ${form.phone}`,
      ...(form.message ? [`*Mensagem:* ${form.message}`] : []),
      '',
      'Em seguida, enviarei meu currículo.',
    ];

    const url = `https://wa.me/5548991936045?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank');
    setSubmitted(true);
  }

  function reset() {
    setForm({ name: '', phone: '', message: '' });
    setSubmitted(false);
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-primary py-20 lg:py-28">
        <div className="container mx-auto px-6 md:px-10 lg:px-20">
          <div className="flex items-center gap-3 mb-6" data-aos="fade-up">
            <div className="h-px w-10 bg-accent" />
            <span className="text-accent text-[11px] font-medium tracking-[0.25em] uppercase">
              Carreiras
            </span>
          </div>

          <h1
            className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.05] max-w-2xl"
            data-aos="fade-up"
            data-aos-delay="80"
          >
            Faça parte da nossa{' '}
            <em className="italic font-normal text-accent">equipe</em>
          </h1>

          <p
            className="text-white/55 text-base md:text-lg font-light mt-6 max-w-xl leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="160"
          >
            Na Tagis buscamos profissionais que compartilhem da nossa paixão por fazer a
            diferença na saúde das pessoas.
          </p>
        </div>
      </section>

      {/* ── Conteúdo principal ───────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-10 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Benefícios */}
            <div data-aos="fade-up">
              <h2 className="font-display text-3xl md:text-4xl font-light text-primary leading-snug mb-10">
                Por que trabalhar{' '}
                <em className="italic font-normal text-accent">na Tagis?</em>
              </h2>

              <div className="space-y-7">
                {BENEFITS.map((b) => (
                  <div key={b.title} className="flex gap-4 group">
                    <div className="w-11 h-11 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-accent/20 transition-colors duration-300">
                      <b.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary text-sm mb-1">{b.title}</h3>
                      <p className="text-foreground/55 text-sm font-light leading-relaxed">
                        {b.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detalhe decorativo */}
              <div className="mt-12 pt-10 border-t border-primary/8">
                <p className="text-xs text-foreground/35 font-medium tracking-widest uppercase mb-3">
                  Processo seletivo
                </p>
                <ol className="space-y-2">
                  {[
                    'Preencha o formulário ao lado',
                    'Envie seu currículo pelo WhatsApp',
                    'Aguarde o contato da nossa equipe',
                  ].map((step, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-foreground/60 font-light">
                      <span className="w-5 h-5 rounded-full bg-primary/8 flex items-center justify-center text-[10px] font-semibold text-primary flex-shrink-0">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Formulário */}
            <div data-aos="fade-up" data-aos-delay="100">
              <div className="rounded-3xl border border-primary/10 shadow-[0_8px_40px_-12px_rgba(0,59,79,0.12)] p-8 lg:p-10 bg-white">
                {!submitted ? (
                  <>
                    <div className="mb-8">
                      <h2 className="font-display text-2xl font-light text-primary mb-2">
                        Envie sua candidatura
                      </h2>
                      <p className="text-foreground/45 text-sm font-light leading-relaxed">
                        Preencha o formulário — você será redirecionado ao WhatsApp para
                        enviar seu currículo.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Nome */}
                      <div>
                        <label className="block text-[10px] font-semibold text-primary/60 uppercase tracking-widest mb-2">
                          Nome completo *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Seu nome completo"
                          className="w-full px-4 py-3 rounded-xl border border-primary/15 bg-white text-primary text-sm placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-accent/25 focus:border-accent transition-all duration-200"
                        />
                      </div>

                      {/* WhatsApp */}
                      <div>
                        <label className="block text-[10px] font-semibold text-primary/60 uppercase tracking-widest mb-2">
                          WhatsApp / Telefone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="(48) 99999-9999"
                          className="w-full px-4 py-3 rounded-xl border border-primary/15 bg-white text-primary text-sm placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-accent/25 focus:border-accent transition-all duration-200"
                        />
                      </div>

                      {/* Mensagem */}
                      <div>
                        <label className="block text-[10px] font-semibold text-primary/60 uppercase tracking-widest mb-2">
                          Mensagem{' '}
                          <span className="text-foreground/35 normal-case font-normal tracking-normal">
                            (opcional)
                          </span>
                        </label>
                        <textarea
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Conte um pouco sobre você ou suas experiências…"
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-primary/15 bg-white text-primary text-sm placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-accent/25 focus:border-accent transition-all duration-200 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2.5 bg-accent hover:bg-accent/90 text-white font-semibold py-4 px-8 rounded-full text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-accent/20 mt-2"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Enviar pelo WhatsApp
                      </button>

                      <p className="text-center text-[11px] text-foreground/30 font-light">
                        Você será redirecionado ao WhatsApp para enviar o currículo.
                      </p>
                    </form>
                  </>
                ) : (
                  /* Estado de sucesso */
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="font-display text-2xl font-light text-primary mb-3">
                      WhatsApp aberto!
                    </h3>
                    <p className="text-foreground/50 text-sm font-light leading-relaxed mb-8 max-w-xs mx-auto">
                      Sua mensagem foi preparada. Agora é só enviar seu currículo pelo
                      WhatsApp.
                    </p>
                    <button
                      onClick={reset}
                      className="text-accent text-sm font-medium hover:underline underline-offset-4"
                    >
                      Enviar outra candidatura
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
