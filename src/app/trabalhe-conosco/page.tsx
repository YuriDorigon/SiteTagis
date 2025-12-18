// src/app/trabalhe-conosco/page.tsx
import SectionTitle from '@/components/shared/SectionTitle';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

export default function TrabalheConoscoPage() {
  const whatsappNumber = "5548991936045";
  const whatsappMessage = "Olá! Tenho interesse em uma vaga na Clinica Tagis e gostaria de enviar meu currículo.";

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <SectionTitle
        title="Trabalhe Conosco"
        subtitle="Faça parte de uma equipa dedicada a cuidar da saúde e bem-estar dos nossos pacientes."
      />

      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg text-center p-6 md:p-8">
            <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-headline">Envie a sua Candidatura via WhatsApp</CardTitle>
                <CardDescription className="text-lg">
                    O processo é simples e rápido. Clique no botão abaixo para iniciar uma conversa e enviar o seu currículo.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
                 <div className="space-y-4 text-left bg-secondary/50 p-6 rounded-lg border">
                    <h4 className="font-semibold text-primary">Nossa Cultura</h4>
                    <p className="text-foreground/80 leading-relaxed">
                        Na Clinica Tagis, valorizamos o trabalho em equipa, o desenvolvimento profissional e, acima de tudo, o cuidado humanizado. Procuramos talentos que partilhem da nossa paixão por fazer a diferença na vida das pessoas.
                    </p>
                    <p className="text-foreground/80 leading-relaxed">
                        Se você é uma pessoa proativa, dedicada e procura um ambiente de trabalho acolhedor e com oportunidades de crescimento, queremos conhecê-lo.
                    </p>
                 </div>

                <WhatsAppButton
                    phoneNumber={whatsappNumber}
                    message={whatsappMessage}
                    size="lg"
                    className="text-lg px-8 py-7 w-full sm:w-auto transform hover:scale-105 transition-transform duration-300"
                >
                    <MessageSquare className="mr-3 h-6 w-6" />
                    Enviar Currículo pelo WhatsApp
                </WhatsAppButton>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
