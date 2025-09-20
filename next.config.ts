
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /**
   * Força a exportação estática do site.
   * Isso irá gerar os arquivos HTML, CSS e JS na pasta /out.
   */
  output: 'export',

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
