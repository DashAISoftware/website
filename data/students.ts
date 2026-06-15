export interface Student {
  initials: string
  name: string
  year: number
  desc: string
  fullDesc: string
  avatar?: string
}

export const STUDENTS: Student[] = [
  // 2023
  {
    initials: 'CV', name: 'César Véliz',           year: 2023,
    desc: 'Optimización hiperparámetros',
    fullDesc: 'Módulo de Optimización de Hiperparámetros para DashAI',
  },
  {
    initials: 'LC', name: 'Lucas Carrasco',        year: 2023,
    desc: 'Clasificación de imágenes',
    fullDesc: 'Clasificación de imágenes en DashAI',
    avatar: '/images/students/lucas_carrasco.jpg',
  },
  {
    initials: 'OA', name: 'Oziel Aguilera',        year: 2023,
    desc: 'Modelos y Tasks',
    fullDesc: 'Implementación de modelos de IA y Tasks en DashAI',
    avatar: '/images/students/oziel_aguilera.jpg',
  },
  // 2024
  {
    initials: 'DR', name: 'Daniel Roco',           year: 2024,
    desc: 'Rediseño de interfaz',
    fullDesc: 'Rediseño centrado en personas de la interfaz de DashAI',
  },
  {
    initials: 'FC', name: 'Felipe Cárdenas',       year: 2024,
    desc: 'Módulo de predicción',
    fullDesc: 'Módulo de predicción',
    avatar: '/images/students/felipe_cardenas.jpg',
  },
  {
    initials: 'FV', name: 'Florencia Valladares',  year: 2024,
    desc: 'Front-end plugins',
    fullDesc: 'Desarrollo front-end para el sistema de plugins de DashAI',
    avatar: '/images/students/florencia_valladares.jpg',
  },
  {
    initials: 'JL', name: 'Javiera Labrín',        year: 2024,
    desc: 'CV normalizado',
    fullDesc: 'Plataforma de Consolidación de Antecedentes para CV Normalizado en la Universidad de Chile',
    avatar: '/images/students/javiera_labrin.jpg',
  },
  {
    initials: 'NA', name: 'Natalia Abarca',        year: 2024,
    desc: 'Módulo de explicabilidad',
    fullDesc: 'Diseño e Implementación de un Módulo de Explicabilidad para DashAI',
  },
  {
    initials: 'NO', name: 'Nicolás Olguín',        year: 2024,
    desc: 'Exploración de datos',
    fullDesc: 'Implementar módulo de exploración y visualización de datos para DashAI',
  },
  {
    initials: 'VO', name: 'Vicente Olivares',      year: 2024,
    desc: 'Sistema de tipos',
    fullDesc: 'Mejorar sistema de tipos para atributos en DashAI',
  },
  // 2025
  {
    initials: 'CR', name: 'Camila Reyes',          year: 2025,
    desc: 'Modelos LLM',
    fullDesc: 'Integración de Modelos LLM en DashAI',
    avatar: '/images/students/camila_reyes.jpg',
  },
  {
    initials: 'CP', name: 'Camilo Polit',          year: 2025,
    desc: 'DataLoader e inferencia',
    fullDesc: 'Continuar con la mejora en el sistema de tipos de DashAI (DataLoader para archivos CSV que automatizaba la inferencia de imágenes)',
    avatar: '/images/students/camilo_polit.jpg',
  },
  {
    initials: 'ED', name: 'Emilio Díaz',           year: 2025,
    desc: 'Generación de imágenes',
    fullDesc: 'Generación de Imágenes para DashAI',
  },
  {
    initials: 'IV', name: 'Isaias Venegas',        year: 2025,
    desc: 'Módulo de converters',
    fullDesc: 'Módulo de converters, primera implementación',
    avatar: '/images/students/isaias_venegas_2.jpg',
  },
  {
    initials: 'SC', name: 'Sofía Chávez',          year: 2025,
    desc: 'Sistemas RAG no-code',
    fullDesc: 'Abstracción de sistemas RAG en un entorno no-code',
  },
]
