import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const alt = 'Tagis Medicina e Diagnóstico — São José · SC';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const logoBuffer = readFileSync(join(process.cwd(), 'public', 'logo.svg'));
  const logoSrc = `data:image/svg+xml;base64,${logoBuffer.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#003049',
          padding: '80px',
          gap: '64px',
        }}
      >
        <img src={logoSrc} width={220} height={220} />

        <div style={{ width: '2px', height: '200px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ color: 'white', fontSize: 82, fontWeight: 700, letterSpacing: '-2px', lineHeight: '1', display: 'flex' }}>
            Tagis
          </div>
          <div style={{ color: '#22d3ee', fontSize: 34, display: 'flex' }}>
            Medicina e Diagnóstico
          </div>
          <div style={{ color: '#7fb3c2', fontSize: 24, marginTop: '16px', display: 'flex' }}>
            +30 Especialidades · +50 Exames · São José SC
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
