// src/app/icon.tsx
import { ImageResponse } from 'next/og'
import AppLogo from '@/components/shared/AppLogo'

// Tell Next.js to render this route at build time for static export
export const dynamic = 'force-static'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // JSX para a imagem do ícone
      <div
        style={{
          background: '#003049', // Cor primária do tema
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
        }}
      >
        <AppLogo style={{ width: '22px', height: '22px', color: 'white' }} />
      </div>
    ),
    // Opções da ImageResponse
    {
      ...size,
    }
  )
}
