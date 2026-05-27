import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#003b4f',
          borderRadius: '14px',
        }}
      >
        {/* Cruz estilizada Tagis: 4 quadrantes branco/vermelho */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <div style={{ display: 'flex', gap: '3px' }}>
            <div style={{ width: 22, height: 22, background: 'white', borderRadius: '3px 3px 0 3px' }} />
            <div style={{ width: 22, height: 22, background: '#e31b23', borderRadius: '3px 3px 3px 0' }} />
          </div>
          <div style={{ display: 'flex', gap: '3px' }}>
            <div style={{ width: 22, height: 22, background: '#e31b23', borderRadius: '3px 0 3px 3px' }} />
            <div style={{ width: 22, height: 22, background: 'white', borderRadius: '0 3px 3px 3px' }} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
