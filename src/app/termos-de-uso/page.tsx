
// src/app/termos-de-uso/page.tsx
"use client";

import { useState, useEffect } from 'react';
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermosDeUsoPage() {
  const [lastUpdatedDate, setLastUpdatedDate] = useState('');

  useEffect(() => {
    setLastUpdatedDate(new Date().toLocaleDateString('pt-BR'));
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <SectionTitle
        title="Termos de Uso"
        subtitle="Leia atentamente nossos termos e condições."
      />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Última atualização: {lastUpdatedDate}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg leading-relaxed text-foreground/80">
          <p>Bem-vindo aos Termos de Uso da Tagis Clinic Hub. Ao acessar ou usar nosso site, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com estes Termos, não deverá usar nosso site.</p>
          
          <h3 className="text-xl font-semibold text-primary pt-4">1. Uso do Site</h3>
          <p>Você concorda em usar o site apenas para fins legais e de maneira que não infrinja os direitos de, restrinja ou iniba o uso e gozo do site por terceiros. Condutas proibidas incluem assediar ou causar angústia ou inconveniência a qualquer pessoa, transmitir conteúdo obsceno ou ofensivo ou interromper o fluxo normal de diálogo dentro do site.</p>
          <p>Este site e seu conteúdo são fornecidos "como estão" e "conforme disponíveis", sem quaisquer garantias de qualquer tipo, expressas ou implícitas.</p>

          <h3 className="text-xl font-semibold text-primary pt-4">2. Propriedade Intelectual</h3>
          <p>Todo o conteúdo incluído no site, como texto, gráficos, logotipos, ícones de botão, imagens, clipes de áudio, downloads digitais, compilações de dados e software, é propriedade da Tagis Clinic Hub ou de seus fornecedores de conteúdo e protegido pelas leis internacionais de direitos autorais.</p>

          <h3 className="text-xl font-semibold text-primary pt-4">3. Informações Médicas</h3>
          <p>O conteúdo fornecido neste site, incluindo todas as informações relacionadas à saúde e condições médicas, é apenas para fins informativos. Não se destina a substituir o aconselhamento médico profissional, diagnóstico ou tratamento. Sempre procure o conselho de seu médico ou outro profissional de saúde qualificado com quaisquer perguntas que você possa ter sobre uma condição médica.</p>

          <h3 className="text-xl font-semibold text-primary pt-4">4. Limitação de Responsabilidade</h3>
          <p>Em nenhuma circunstância a Tagis Clinic Hub será responsável por quaisquer danos diretos, indiretos, incidentais, especiais, consequenciais ou exemplares (mesmo que tenhamos sido avisados da possibilidade de tais danos), resultantes do uso ou da incapacidade de usar o site.</p>
          
          <h3 className="text-xl font-semibold text-primary pt-4">5. Links para Sites de Terceiros</h3>
          <p>Nosso site pode conter links para sites de terceiros que não são de propriedade ou controlados pela Tagis Clinic Hub. Não temos controle e não assumimos responsabilidade pelo conteúdo, políticas de privacidade ou práticas de quaisquer sites ou serviços de terceiros. Você reconhece e concorda que não seremos responsáveis, direta ou indiretamente, por qualquer dano ou perda causada ou alegadamente causada por ou em conexão com o uso ou confiança em qualquer conteúdo, bens ou serviços disponíveis em ou através de tais sites ou serviços.</p>

          <h3 className="text-xl font-semibold text-primary pt-4">6. Alterações aos Termos de Uso</h3>
          <p>Reservamo-nos o direito, a nosso exclusivo critério, de modificar ou substituir estes Termos a qualquer momento. Se uma revisão for material, tentaremos fornecer um aviso de pelo menos 30 dias antes que quaisquer novos termos entrem em vigor. O que constitui uma alteração material será determinado a nosso exclusivo critério.</p>
          <p>Ao continuar a acessar ou usar nosso Serviço após essas revisões entrarem em vigor, você concorda em ficar vinculado aos termos revisados. Se você não concordar com os novos termos, pare de usar o Serviço.</p>

          <h3 className="text-xl font-semibold text-primary pt-4">7. Contate-Nos</h3>
          <p>Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Por e-mail: <a href="mailto:termos@tagisclinic.com.br" className="text-primary hover:underline">termos@tagisclinic.com.br</a></li>
             <li>Pelo telefone: <a href="tel:+554830353377" className="text-primary hover:underline">(48) 3035-3377</a></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
