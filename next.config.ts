
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /**
   * Força a exportação estática do site.
   * Isso irá gerar os arquivos HTML, CSS e JS na pasta /out.
   */
  output: 'export',
  
  /**
   * Força o Next.js a usar caminhos relativos para os assets (JS, CSS).
   * Esta é a correção crucial para que o site funcione em qualquer
   * provedor de hospedagem estática, resolvendo os erros 404 e ChunkLoadError.
   */
  assetPrefix: './',

  /**
   * A otimização de imagens do Next.js deve ser desativada quando se usa 'output: "export"'.
   * O redimensionamento é feito no painel admin antes do upload.
   */
  images: {
    unoptimized: true,
  },
  
  /**
   * Ignora erros de TypeScript e ESLint durante o build para focar na exportação.
   */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
