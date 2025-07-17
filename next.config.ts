
import type {NextConfig} from 'next';

// Verifica se o build é para o GitHub Pages através de uma variável de ambiente
const isGithubBuild = process.env.BUILD_FOR_GITHUB === 'true';

// Nome exato do seu repositório no GitHub.
const repo = 'SiteTagis';

const nextConfig: NextConfig = {
  /**
   * Ativa a exportação estática, gerando um site HTML/CSS/JS puro na pasta 'out'.
   * Essencial para hospedagens estáticas.
   */
  output: 'export',

  /**
   * Configuração para o Next.js funcionar em um subdiretório (ex: usuario.github.io/repo).
   * Isso só é ativado quando o build é feito para o GitHub Pages.
   */
  basePath: isGithubBuild ? `/${repo}` : undefined,
  assetPrefix: isGithubBuild ? `/${repo}/` : undefined,

  /**
   * Desativa a otimização de imagens do Next.js (requer um servidor) e permite domínios externos.
   * Isso garante que as imagens funcionem na exportação estática.
   */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tagismd.com.br',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  /**
   * Desativa a barra de ferramentas de desenvolvimento do Next.js no build final.
   */
  devIndicators: {
    devTools: {
      devToolbar: false,
    },
  },

  // Ignora erros de TypeScript e ESLint durante o build para focar na exportação.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
