export interface Student {
  initials: string
  name: string
  year: number
  descKey: string
  fullDesc: string
  avatar?: string
}

export const STUDENTS: Student[] = [
  // 2023
  {
    initials: 'CV', name: 'César Véliz',           year: 2023,
    descKey: 'abt.students.cesar-veliz.desc',
    fullDesc: 'Módulo de Optimización de Hiperparámetros para DashAI',
  },
  {
    initials: 'LC', name: 'Lucas Carrasco',        year: 2023,
    descKey: 'abt.students.lucas-carrasco.desc',
    fullDesc: 'Clasificación de imágenes en DashAI',
    avatar: '/images/students/lucas_carrasco.jpg',
  },
  {
    initials: 'OA', name: 'Oziel Aguilera',        year: 2023,
    descKey: 'abt.students.oziel-aguilera.desc',
    fullDesc: 'Implementación de modelos de IA y Tasks en DashAI',
    avatar: '/images/students/oziel_aguilera.jpg',
  },
  // 2024
  {
    initials: 'CP', name: 'Camilo Huerta',          year: 2024,
    descKey: 'abt.students.camilo-huerta.desc',
    fullDesc: 'Continuar con la mejora en el sistema de tipos de DashAI (DataLoader para archivos CSV que automatizaba la inferencia de imágenes)',
    avatar: '/images/students/camilo_huerta.jpg',
  },
  {
    initials: 'DR', name: 'Daniel Roco',           year: 2024,
    descKey: 'abt.students.daniel-roco.desc',
    fullDesc: 'Rediseño centrado en personas de la interfaz de DashAI',
  },
  {
    initials: 'FC', name: 'Felipe Cárdenas',       year: 2024,
    descKey: 'abt.students.felipe-cardenas.desc',
    fullDesc: 'Módulo de predicción',
    avatar: '/images/students/felipe_cardenas.jpg',
  },
  {
    initials: 'FV', name: 'Florencia Valladares',  year: 2024,
    descKey: 'abt.students.florencia-valladares.desc',
    fullDesc: 'Desarrollo front-end para el sistema de plugins de DashAI',
    avatar: '/images/students/florencia_valladares.jpg',
  },
  {
    initials: 'JL', name: 'Javiera Labrín',        year: 2024,
    descKey: 'abt.students.javiera-labrin.desc',
    fullDesc: 'Plataforma de Consolidación de Antecedentes para CV Normalizado en la Universidad de Chile',
    avatar: '/images/students/javiera_labrin.jpg',
  },
  {
    initials: 'NA', name: 'Natalia Abarca',        year: 2024,
    descKey: 'abt.students.natalia-abarca.desc',
    fullDesc: 'Diseño e Implementación de un Módulo de Explicabilidad para DashAI',
  },
  {
    initials: 'NO', name: 'Nicolás Olguín',        year: 2024,
    descKey: 'abt.students.nicolas-olguin.desc',
    fullDesc: 'Implementar módulo de exploración y visualización de datos para DashAI',
  },
  {
    initials: 'VO', name: 'Vicente Olivares',      year: 2024,
    descKey: 'abt.students.vicente-olivares.desc',
    fullDesc: 'Mejorar sistema de tipos para atributos en DashAI',
  },
  // 2025
  {
    initials: 'CR', name: 'Camila Reyes',          year: 2025,
    descKey: 'abt.students.camila-reyes.desc',
    fullDesc: 'Integración de Modelos LLM en DashAI',
    avatar: '/images/students/camila_reyes.jpg',
  },

  {
    initials: 'ED', name: 'Emilio Díaz',           year: 2025,
    descKey: 'abt.students.emilio-diaz.desc',
    fullDesc: 'Generación de Imágenes para DashAI',
  },
  {
    initials: 'IV', name: 'Isaias Venegas',        year: 2025,
    descKey: 'abt.students.isaias-venegas.desc',
    fullDesc: 'Módulo de converters, primera implementación',
    avatar: '/images/students/isaias_venegas_2.jpg',
  },
  {
    initials: 'SC', name: 'Sofía Chávez',          year: 2025,
    descKey: 'abt.students.sofia-chavez.desc',
    fullDesc: 'Abstracción de sistemas RAG en un entorno no-code',
  },
]
