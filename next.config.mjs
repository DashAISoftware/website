/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Si tu repositorio NO es username.github.io sino username.github.io/repo-name
  // descomenta y ajusta las siguientes líneas:
  // basePath: '/dashai-website',
  // assetPrefix: '/dashai-website',
}

export default nextConfig
