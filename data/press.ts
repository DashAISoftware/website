export type PressType = 'prensa' | 'tv' | 'radio' | 'institucional'

export interface PressItem {
  id: string
  type: PressType
  outlet: string
  mark: string
  // ISO date; 'YYYY-MM' when the outlet doesn't publish the day
  date: string
  url: string
  // Call-to-action label: listen, watch or read
  action: 'listen' | 'watch' | 'read'
  // Language of the article; defaults to Spanish
  lang?: string
}

// Headlines and summaries live in the `news` namespace as
// `news.item.<id>.headline` / `.desc` (the es headline is the original title).
// Rendered in this order: keep it newest first.
export const PRESS: PressItem[] = [
  {
    id: 'cooperativa-congreso-futuro', type: 'radio', outlet: 'Radio Cooperativa', mark: 'RC', date: '2026-08-23', action: 'listen',
    url: 'https://www.cooperativa.cl/noticias/sociedad/ciencia/congreso-futuro/congreso-futuro-dashai-plataforma-de-la-u-chile-que-entrena-modelos/2026-08-23/120819.html',
  },
  {
    id: 'cooperativa-ciencia', type: 'radio', outlet: 'Cooperativa Ciencia', mark: 'CC', date: '2026-08-18', action: 'read',
    url: 'https://www.cooperativaciencia.cl/tecnologia/2026/08/18/u-de-chile-lanza-plataforma-gratuita-para-crear-ia-sin-saber-programar-y-con-total-privacidad/',
  },
  {
    id: 'radio-polar', type: 'radio', outlet: 'Radio Polar', mark: 'RP', date: '2026-08-16', action: 'read',
    url: 'https://www.radiopolar.com/universidad-chile-presenta-dashai-plataforma-gratuita-inteligencia-artificial-codigo-abierto',
  },
  {
    id: 'la-tercera-pulso', type: 'prensa', outlet: 'La Tercera | Pulso', mark: 'LT', date: '2026-08-13', action: 'read',
    url: 'https://www.latercera.com/pulso/noticia/dashai-inteligencia-artificial-desarrollada-en-chile-supera-las-20000-descargas-y-espera-apoyar-a-pymes-en-el-manejo-de-datos/',
  },
  {
    id: 'la-voz-de-maipu', type: 'prensa', outlet: 'La Voz de Maipú', mark: 'LVM', date: '2026-08-13', action: 'read',
    url: 'https://lavozdemaipu.cl/dashai-plataforma-ia-chilena-pymes/',
  },
  {
    id: 'radio-uchile', type: 'radio', outlet: 'Diario y Radio U. de Chile', mark: 'RUCH', date: '2026-08-12', action: 'read',
    url: 'https://radio.uchile.cl/2026/08/12/u-de-chile-presenta-dashai-primera-plataforma-chilena-de-inteligencia-artificial-de-codigo-abierto/',
  },
  {
    id: 'tvn-lanzamiento', type: 'tv', outlet: 'TVN | Exponencial', mark: 'TVN', date: '2026-08-07', action: 'watch',
    url: 'https://www.tvn.cl/exponencial/noticias/u-de-chile-celebra-el-lanzamiento-de-dashai-su-nueva-plataforma-de-ia',
  },
  {
    id: 'cenia-lanzamiento', type: 'institucional', outlet: 'CENIA', mark: 'CEN', date: '2026-08-07', action: 'read',
    url: 'https://cenia.cl/2026/08/07/presentan-dashai-plataforma-chilena-que-permite-trabajar-sin-entregar-datos/',
  },
  {
    id: 'uchile', type: 'institucional', outlet: 'Universidad de Chile', mark: 'UCH', date: '2026-08-06', action: 'read',
    url: 'https://uchile.cl/noticias/243234/u-de-chile-presento-dashai-plataforma-chilena-de-inteligencia-artificial',
  },
  {
    id: 'fcfm', type: 'institucional', outlet: 'FCFM, U. de Chile', mark: 'FCFM', date: '2026-08-06', action: 'read',
    url: 'https://ingenieria.uchile.cl/noticias/243214/u-de-chile-presento-dashai-plataforma-chilena-de-inteligencia-artificial',
  },
  {
    id: 'idia', type: 'institucional', outlet: 'IDIA, U. de Chile', mark: 'IDIA', date: '2026-08', action: 'read',
    url: 'https://idia.uchile.cl/2026/08/u-de-chile-presento-dashai-plataforma-chilena-que-permite-trabajar-sin-entregar-datos/',
  },
  {
    id: 'tvn-como-funciona', type: 'tv', outlet: 'TVN | Exponencial', mark: 'TVN', date: '2026-08-03', action: 'watch',
    url: 'https://www.tvn.cl/exponencial/noticias/dashai-la-app-chilena-para-usar-ia-sin-saber-programar',
  },
  {
    id: 'cenia-gigantes', type: 'institucional', outlet: 'CENIA', mark: 'CEN', date: '2025-12-02', action: 'read',
    url: 'https://cenia.cl/2025/12/02/dashai-la-herramienta-para-crear-ia-sin-saber-programar-logra-vincularse-con-gigantes-tecnologicos/',
  },
]

// The launch note highlighted at the top of the page
export const FEATURED_PRESS_ID = 'uchile'
