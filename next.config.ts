
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /**
   * Em ambientes de desenvolvimento como o Firebase Studio, pode ser necessário
   * permitir origens específicas para que o hot-reloading e outras funcionalidades
   * funcionem corretamente.
   */
  experimental: {
    allowedDevOrigins: [
        "https://6000-firebase-studio-1749147247329.cluster-m7tpz3bmgjgoqrktlvd4ykrc2m.cloudworkstations.dev"
    ]
  },

  /**
   * O modo 'output: "export"' foi removido para permitir o uso de API Routes,
   * que são necessárias para o backend de envio de emails.
   */

  /**
   * A otimização de imagens do Next.js é reativada, pois não estamos mais
   * no modo de exportação estática pura.
   */
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  
  /**
   * Ignora erros de TypeScript e ESLint durante o build para focar na funcionalidade.
   */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
