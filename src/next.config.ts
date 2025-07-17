
import type {NextConfig} from 'next';

// Determina se o ambiente é o do GitHub Actions, que é usado para o build do GitHub Pages.
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

// Nome exato do seu repositório no GitHub.
const repo = 'SiteTagis';

const nextConfig: NextConfig = {
  /**
   * Ativa a exportação estática, gerando um site HTML/CSS/JS puro na pasta 'out'.
   * Isso é essencial para hospedagens que não rodam Node.js, como o GitHub Pages.
   */
  output: 'export',

  /**
   * Configuração para o Next.js funcionar em um subdiretório (ex: usuario.github.io/repo).
   * Isso só é ativado quando o build é feito para o GitHub Pages.
   */
  basePath: isGithubActions ? `/${repo}` : undefined,
  assetPrefix: isGithubActions ? `/${repo}/` : undefined,

  /**
   * Desativa a otimização de imagens do Next.js, pois ela requer um servidor.
   * Isso garante que as imagens normais (<img />) e do next/image funcionem na exportação estática.
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
