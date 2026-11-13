// dashAI Labs: guided ML cases, each with an importable .dashai session.
//
// This file holds only structural data. Every visible text (code, title,
// summary, concepts, modules, model names...) lives in the `labs` i18n
// namespace as `labs.item.<slug>.*`, in public/locales/<lang>/labs.json.
//
// To add a lab: add an entry here, add its `labs.item.<slug>.*` keys to the
// five labs.json files (`pnpm test` reports missing keys), and when its files
// exist copy them to public/labs/<slug>/ and set `ready: true`.

export type LabTask = 'Tabular Classification' | 'Regression' | 'Text Classification' | 'Forecasting' | 'Generative'

// Filter chip order on the catalog
export const LAB_TASKS: LabTask[] = ['Tabular Classification', 'Regression', 'Text Classification', 'Forecasting', 'Generative']

export type LabStatus = 'available' | 'soon'

export type LabFileKind = 'lab' | 'session' | 'dataset'

export interface LabFile {
  kind: LabFileKind
  // Real file name, shown as is (never translated)
  name: string
  // Relative to public/, e.g. 'labs/tutorias/sesion-tutorias.dashai'
  path: string
  bytes: number
  // false until the file is uploaded: the UI shows it as "en preparación"
  ready: boolean
}

export interface LabModelRow {
  // Model name lives at `labs.item.<slug>.model.<key>`
  key: string
  recall: number
  f1: number
  auc: number
  highlight?: boolean
}

export interface Lab {
  slug: string
  level: 1 | 2 | 3
  tasks: LabTask[]
  status: LabStatus
  minutes?: [number, number]
  // true when the lab has its own page at #labs/<slug>
  hasDetail: boolean
  files: LabFile[]
  // Detail page only
  models?: LabModelRow[]
  learnCount?: number
  moduleCount?: number
  minVersion?: string
}

const file = (slug: string, kind: LabFileKind, name: string, bytes: number): LabFile =>
  ({ kind, name, path: `labs/${slug}/${name}`, bytes, ready: false })

// Rendered in this order
export const LABS: Lab[] = [
  {
    slug: 'tutorias', level: 1, tasks: ['Tabular Classification', 'Generative'], status: 'available',
    minutes: [90, 120], hasDetail: true, minVersion: '0.11', learnCount: 6, moduleCount: 12,
    files: [
      file('tutorias', 'lab', 'tutorias.html', 2_500_000),
      file('tutorias', 'session', 'sesion-tutorias.dashai', 49_000),
      file('tutorias', 'dataset', 'historial_estadistica.csv', 38_000),
      file('tutorias', 'dataset', 'estudiantes_semestre_actual.csv', 5_000),
    ],
    // Validation metrics as computed by dashAI 0.11 (recall of the "fails" class)
    models: [
      { key: 'dummy',          recall: 0,      f1: 0,      auc: 0.5 },
      { key: 'logreg',         recall: 0.451,  f1: 0.5227, auc: 0.8217 },
      { key: 'tree3',          recall: 0.4706, f1: 0.5217, auc: 0.7727 },
      { key: 'tree20',         recall: 0.5686, f1: 0.5421, auc: 0.6797 },
      { key: 'rf',             recall: 0,      f1: 0,      auc: 0.8042 },
      { key: 'logregBalanced', recall: 0.7059, f1: 0.6154, auc: 0.8194, highlight: true },
    ],
  },
  { slug: 'caso-01', level: 1, tasks: ['Tabular Classification'], status: 'available', minutes: [90, 120], hasDetail: false, files: [] },
  { slug: 'caso-02', level: 1, tasks: ['Regression'],             status: 'soon', hasDetail: false, files: [] },
  { slug: 'caso-03', level: 2, tasks: ['Tabular Classification'], status: 'soon', hasDetail: false, files: [] },
  { slug: 'caso-04', level: 2, tasks: ['Text Classification'],    status: 'soon', hasDetail: false, files: [] },
  { slug: 'caso-05', level: 3, tasks: ['Forecasting'],            status: 'soon', hasDetail: false, files: [] },
  { slug: 'caso-06', level: 3, tasks: ['Tabular Classification'], status: 'soon', hasDetail: false, files: [] },
]
