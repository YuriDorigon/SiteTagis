
// src/app/politica-de-privacidade/page.tsx
"use client";

import { useState, useEffect } from 'react';
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PoliticaDePrivacidadePage() {
  const [lastUpdatedDate, setLastUpdatedDate] = useState('');

  useEffect(() => {
    setLastUpdatedDate(new Date().toLocaleDateString('pt-BR'));
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <SectionTitle
        title="Política de Privacidade"
        subtitle="Sua privacidade é importante para nós."
      />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Última atualização: {lastUpdatedDate}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg leading-relaxed text-foreground/80">
          <p>Bem-vindo à Política de Privacidade da Tagis Clinic Hub. Esta página informa sobre nossas políticas relativas à coleta, uso e divulgação de informações pessoais quando você usa nosso Serviço.</p>
          
          <h3 className="text-xl font-semibold text-primary pt-4">Coleta e Uso de Informações</h3>
          <p>Coletamos vários tipos diferentes de informações para diversos fins, a fim de fornecer e melhorar nosso Serviço para você.</p>
          
          <h4 className="text-lg font-semibold text-primary">Tipos de Dados Coletados</h4>
          <p><strong>Dados Pessoais:</strong> Ao usar nosso Serviço, podemos solicitar que você nos forneça certas informações de identificação pessoal que podem ser usadas para contatá-lo ou identificá-lo ("Dados Pessoais"). Informações de identificação pessoal podem incluir, mas não estão limitadas a: endereço de e-mail, nome e sobrenome, número de telefone, endereço, estado, província, CEP/código postal, cidade, cookies e dados de uso.</p>
          <p><strong>Dados de Uso:</strong> Também podemos coletar informações sobre como o Serviço é acessado e usado ("Dados de Uso"). Estes Dados de Uso могут включать такую информацию, как IP-адрес вашего компьютера, тип браузера, версия браузера, страницы нашего Сервиса, которые вы посещаете, время и дата вашего посещения, время, проведенное на этих страницах, уникальные идентификаторы устройств и другие диагностические данные.</p>

          <h3 className="text-xl font-semibold text-primary pt-4">Uso de Dados</h3>
          <p>A Tagis Clinic Hub usa os dados coletados para diversos fins:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Para fornecer e manter nosso Serviço;</li>
            <li>Para notificá-lo sobre alterações em nosso Serviço;</li>
            <li>Para permitir que você participe de recursos interativos de nosso Serviço quando você optar por fazê-lo;</li>
            <li>Para fornecer atendimento e suporte ao cliente;</li>
            <li>Para fornecer análises ou informações valiosas para que possamos melhorar o Serviço;</li>
            <li>Para monitorar o uso do Serviço;</li>
            <li>Para detectar, prevenir e resolver problemas técnicos.</li>
          </ul>

          <h3 className="text-xl font-semibold text-primary pt-4">Segurança dos Dados</h3>
          <p>A segurança dos seus dados é importante para nós, mas lembre-se de que nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro. Embora nos esforcemos para usar meios comercialmente aceitáveis para proteger seus Dados Pessoais, não podemos garantir sua segurança absoluta.</p>

          <h3 className="text-xl font-semibold text-primary pt-4">Alterações a Esta Política de Privacidade</h3>
          <p>Podemos atualizar nossa Política de Privacidade de tempos em tempos. Notificaremos você sobre quaisquer alterações publicando a nova Política de Privacidade nesta página.</p>
          <p>Aconselhamos que você revise esta Política de Privacidade periodicamente para quaisquer alterações. As alterações a esta Política de Privacidade entram em vigor quando são publicadas nesta página.</p>

          <h3 className="text-xl font-semibold text-primary pt-4">Contate-Nos</h3>
          <p>Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Por e-mail: <a href="mailto:privacidade@tagisclinic.com.br" className="text-primary hover:underline">privacidade@tagisclinic.com.br</a></li>
            <li>Pelo telefone: <a href="tel:+554830353377" className="text-primary hover:underline">(48) 3035-3377</a></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
