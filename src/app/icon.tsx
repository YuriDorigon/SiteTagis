import { ImageResponse } from 'next/og';

export const size = { width: 192, height: 192 };
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
          borderRadius: '40px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ width: 72, height: 72, background: 'white', borderRadius: '10px 10px 0 10px' }} />
            <div style={{ width: 72, height: 72, background: '#e31b23', borderRadius: '10px 10px 10px 0' }} />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ width: 72, height: 72, background: '#e31b23', borderRadius: '10px 0 10px 10px' }} />
            <div style={{ width: 72, height: 72, background: 'white', borderRadius: '0 10px 10px 10px' }} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
