// src/components/contact/MapEmbed.tsx
interface MapEmbedProps {
  embedUrl?: string;
}

export default function MapEmbed({ embedUrl }: MapEmbedProps) {
  if (!embedUrl) {
    return (
      <div className="w-full h-full min-h-[400px] bg-primary/5 flex items-center justify-center rounded-2xl border border-primary/8">
        <p className="text-foreground/40 text-sm">Mapa indisponível no momento.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[500px] lg:min-h-full rounded-2xl overflow-hidden border border-primary/8 shadow-sm">
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: '500px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Localização da Clínica Tagis"
      />
    </div>
  );
}
