
// src/components/contact/MapEmbed.tsx
interface MapEmbedProps {
  embedUrl?: string; 
}

export default function MapEmbed({ embedUrl }: MapEmbedProps) {
  if (!embedUrl) {
    return (
      <div className="w-full h-64 md:h-96 bg-muted flex items-center justify-center rounded-lg shadow-sm">
        <p className="text-muted-foreground">Mapa indisponível no momento.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg border border-border">
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Localização da Clínica Tagis"
      ></iframe>
    </div>
  );
}
