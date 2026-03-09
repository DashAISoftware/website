/**
 * Centralized configuration of site URLs and links
 * 
 * This is the single source of truth for all external URLs.
 * Update these values to change links across the entire site.
 * 
 * To use environment variables, you can replace the URLs with:
 * typeof window !== 'undefined' ? window.env?.GITHUB_URL : "https://github.com/your-username/your-repo"
 * Or use process.env.NEXT_PUBLIC_* at build time
 */

const GITHUB_REPO_URL = "https://github.com/DashAISoftware/DashAI"

export const siteConfig = {
  // Repositorio de GitHub
  github: {
    url: GITHUB_REPO_URL,
    // URLs específicas de GitHub (se generan automáticamente desde la URL base)
    releases: `${GITHUB_REPO_URL}/releases`,
    issues: `${GITHUB_REPO_URL}/issues`,
    contribute: `${GITHUB_REPO_URL}/blob/production/CONTRIBUTING.rst`,
  },

  // Documentación
  docs: {
    url: "https://docs.dash-ai.com",
    pluginDocs: "https://docs.dashai.com/plugins",
    apiReference: "https://docs.dashai.com/api",
    tutorials: "https://docs.dashai.com/tutorials",
    examples: "https://docs.dashai.com/examples",
  },

  // Redes sociales y comunidad
  social: {
    // twitter: "https://twitter.com/dashai",
    // linkedin: "https://linkedin.com/company/dashai",
    // discord: "https://discord.gg/dashai",
  },

  // Recursos adicionales
  resources: {
    pluginHub: "https://plugins.dashai.com",
    changelog: `${GITHUB_REPO_URL}/blob/production/CHANGELOG.rst`,
    roadmap: `${GITHUB_REPO_URL}/projects`,
  },

  // Descargas
  downloads: {
    // Las URLs de descarga pueden venir de GitHub Releases o de otro CDN
    baseUrl: `${GITHUB_REPO_URL}/releases`,
  },
} as const

