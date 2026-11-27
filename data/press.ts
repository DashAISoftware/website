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
    id: 'imfd-futuria', type: 'institucional', outlet: 'IMFD', mark: 'IMFD', date: '2026-10-13', action: 'read',
    url: 'https://imfd.cl/el-origen-de-dashai-la-plataforma-de-ia-no-code-de-modelos-de-aprendizaje-automatico-hecha-en-chile/',
  },
  {
    id: 'ilia', type: 'institucional', outlet: 'Índice Latinoamericano de IA (ILIA)', mark: 'ILIA', date: '2026-10-01', action: 'read',
    url: 'https://indicelatam.cl/presentan-dashai-plataforma-chilena-que-permite-trabajar-sin-entregar-datos/',
  },
  {
    id: 'uchiletv-la-fuente', type: 'tv', outlet: 'UChile TV | La Fuente', mark: 'UTV', date: '2026-09-08', action: 'watch',
    url: 'https://www.youtube.com/watch?v=JByHu-ZdZDI&t=0s',
  },
  {
    id: 'anid', type: 'institucional', outlet: 'ANID', mark: 'ANID', date: '2026-08-24', action: 'read',
    url: 'https://anid.cl/plataforma-chilena-permite-trabajar-sin-entregar-datos/',
  },
  {
    id: 'cooperativa-congreso-futuro', type: 'radio', outlet: 'Radio Cooperativa', mark: 'RC', date: '2026-08-23', action: 'listen',
    url: 'https://www.cooperativa.cl/noticias/sociedad/ciencia/congreso-futuro/congreso-futuro-dashai-plataforma-de-la-u-chile-que-entrena-modelos/2026-08-23/120819.html',
  },
  {
    id: 't13-radio', type: 'radio', outlet: 'T13 Radio', mark: 'T13', date: '2026-08-18', action: 'watch',
    url: 'https://www.youtube.com/watch?v=abeeuAvJeSM',
  },
  {
    id: 'cooperativa-ciencia', type: 'radio', outlet: 'Cooperativa Ciencia', mark: 'CC', date: '2026-08-18', action: 'read',
    url: 'https://www.cooperativaciencia.cl/tecnologia/2026/08/18/u-de-chile-lanza-plataforma-gratuita-para-crear-ia-sin-saber-programar-y-con-total-privacidad/',
  },
  {
    id: 'cooperativa-ciencia-entrevista', type: 'radio', outlet: 'Cooperativa Ciencia', mark: 'CC', date: '2026-08-17', action: 'watch',
    url: 'https://www.youtube.com/watch?v=m-EM58_LNxA&t=3s',
  },
  {
    id: 'lun', type: 'prensa', outlet: 'Las Últimas Noticias', mark: 'LUN', date: '2026-08-16', action: 'read',
    url: 'https://public.izimedia.io/viewNewsPr/PR&F40CE20D9A0511F199F60EB07535E017',
  },
  {
    id: 'tvn-ia-se-apaga', type: 'tv', outlet: 'TVN | Exponencial', mark: 'TVN', date: '2026-08-16', action: 'watch',
    url: 'https://public.izimedia.io/viewNewsPr/PR&F40CEAD09A0511F199F60EB07535E017',
  },
  {
    id: 'radio-polar', type: 'radio', outlet: 'Radio Polar', mark: 'RP', date: '2026-08-16', action: 'read',
    url: 'https://www.radiopolar.com/universidad-chile-presenta-dashai-plataforma-gratuita-inteligencia-artificial-codigo-abierto',
  },
  {
    id: 'ecosistema-startup', type: 'prensa', outlet: 'Ecosistema Startup', mark: 'ES', date: '2026-08-16', action: 'read',
    url: 'https://ecosistemastartup.com/dashai-76-modelos-de-ia-sin-codigo-de-la-universidad-de-chile-para-startups/',
  },
  {
    id: 'diario-sustentable', type: 'prensa', outlet: 'Diario Sustentable', mark: 'DS', date: '2026-08-16', action: 'watch',
    url: 'https://www.instagram.com/p/DcGoapcDP30/',
  },
  {
    id: 'uestv', type: 'tv', outlet: 'UES TV', mark: 'UES', date: '2026-08-14', action: 'read',
    url: 'https://www.uestv.cl/uchile-presenta-dashai-su-nueva-plataforma-de-ia/',
  },
  {
    id: 'tvn-entrevista', type: 'tv', outlet: 'TVN | Exponencial', mark: 'TVN', date: '2026-08-13', action: 'watch',
    url: 'https://www.tvn.cl/exponencial/noticias/entrevista-dash-ai-la-primera-plataforma-chilena-para-crear-ia',
  },
  {
    id: 'la-tercera-pulso', type: 'prensa', outlet: 'La Tercera | Pulso', mark: 'LT', date: '2026-08-13', action: 'read',
    url: 'https://www.latercera.com/pulso/noticia/dashai-inteligencia-artificial-desarrollada-en-chile-supera-las-20000-descargas-y-espera-apoyar-a-pymes-en-el-manejo-de-datos/',
  },
  {
    id: 'el-conquistador', type: 'radio', outlet: 'El Conquistador FM', mark: 'ECFM', date: '2026-08-13', action: 'read',
    url: 'https://www.elconquistadorfm.net/noticia/dashai-inteligencia-artificial-desarrollada-en-chile-supera-las-20-000-242c77',
  },
  {
    id: 'la-voz-de-maipu', type: 'prensa', outlet: 'La Voz de Maipú', mark: 'LVM', date: '2026-08-13', action: 'read',
    url: 'https://lavozdemaipu.cl/dashai-plataforma-ia-chilena-pymes/',
  },
  {
    id: 'diario-financiero', type: 'prensa', outlet: 'Diario Financiero | DF Lab', mark: 'DF', date: '2026-08-12', action: 'read',
    url: 'https://www.df.cl/df-lab/tech-empresas/lanzan-software-para-entrenar-modelos-de-machine-learning-sin-depender-de',
  },
  {
    id: 'tvn-via-publica', type: 'tv', outlet: 'TVN | Vía Pública', mark: 'TVN', date: '2026-08-12', action: 'watch',
    url: 'https://www.24horas.cl/programas/via-publica/via-publica-miercoles-12-de-agosto-2026-',
  },
  {
    id: 'radio-uchile', type: 'radio', outlet: 'Diario y Radio U. de Chile', mark: 'RUCH', date: '2026-08-12', action: 'read',
    url: 'https://radio.uchile.cl/2026/08/12/u-de-chile-presenta-dashai-primera-plataforma-chilena-de-inteligencia-artificial-de-codigo-abierto/',
  },
  {
    id: 'bachillerato', type: 'institucional', outlet: 'Bachillerato, U. de Chile', mark: 'BACH', date: '2026-08-11', action: 'read',
    url: 'https://www.bachillerato.uchile.cl/destacados/u-de-chile-presento-dashai-plataforma-chilena-que-permite-trabajar-sin-entregar-datos/',
  },
  {
    id: 'efecto-ciencia', type: 'radio', outlet: 'Efecto Ciencia', mark: 'EFC', date: '2026-08-11', action: 'watch',
    url: 'https://www.instagram.com/p/Db5ATZCy2sl/',
  },
  {
    id: 'contingencia-chile', type: 'radio', outlet: 'Contingencia Chile Radio', mark: 'CCR', date: '2026-08-09', action: 'watch',
    url: 'https://www.instagram.com/p/Db05KHHhcDO/',
  },
  {
    id: 'iymagazine', type: 'prensa', outlet: 'IyM Magazine (España)', mark: 'IYM', date: '2026-08-08', action: 'read',
    url: 'https://iymagazine.es/noticia/38059/iberoamerica/universidad-de-chile-lanza-dashai-la-plataforma-que-democratiza-el-acceso-a-la-inteligencia-artificial-sin-necesidad-de-programar.html',
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
    id: 'dcc', type: 'institucional', outlet: 'DCC, U. de Chile', mark: 'DCC', date: '2026-08', action: 'read',
    url: 'https://comunicaciones.dcc.uchile.cl/news/1224-u-de-chile-presento-dashai-plataforma-chilena-que-permite-trabajar-sin-entregar-datos/',
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
