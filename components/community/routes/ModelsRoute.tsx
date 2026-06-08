'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import '@/app/i18n'

const COUNTS: Record<string, number> = {
  all: 59,
  tabular: 29,
  nlp: 15,
  translation: 9,
  gen: 5,
  vision: 11,
}

interface ModelRow {
  category: string
  name: string
  id: string
  descKey: string
  descFallback: string
  base: string
  tagClass: string
  tagKey: string
  tagFallback: string
}

const MODEL_ROWS: ModelRow[] = [
  // tabular
  { category: 'tabular', name: 'RandomForestClassifier', id: '#models/random-forest', descKey: 'r.rf', descFallback: 'Bosque aleatorio sobre scikit-learn. HPO nativo.', base: 'BaseModel · sklearn', tagClass: 'tabular', tagKey: 'tag.tab', tagFallback: 'tabular' },
  { category: 'tabular', name: 'LightGBM', id: '#models/lightgbm', descKey: 'r.lgbm', descFallback: 'GBM de Microsoft. Histogramas eficientes.', base: 'BaseModel · lightgbm', tagClass: 'tabular', tagKey: 'tag.tab', tagFallback: 'tabular' },
  { category: 'tabular', name: 'SVMClassifier', id: '#models/svm', descKey: 'r.svm', descFallback: 'Support Vector Machines con kernels lineales y RBF.', base: 'BaseModel · sklearn', tagClass: 'tabular', tagKey: 'tag.tab', tagFallback: 'tabular' },
  { category: 'tabular', name: 'MLPClassifier', id: '#models/mlp', descKey: 'r.mlp', descFallback: 'Red neuronal multicapa. Punto de entrada al deep learning tabular.', base: 'BaseModel · sklearn', tagClass: 'tabular', tagKey: 'tag.tab', tagFallback: 'tabular' },
  { category: 'tabular', name: 'KNeighborsClassifier', id: '#models/knn', descKey: 'r.knn', descFallback: 'k-Nearest Neighbors. Baseline no paramétrico.', base: 'BaseModel · sklearn', tagClass: 'tabular', tagKey: 'tag.tab', tagFallback: 'tabular' },
  { category: 'tabular', name: 'LogisticRegression', id: '#models/logreg', descKey: 'r.lr', descFallback: 'Regresión logística regularizada. Interpretable.', base: 'BaseModel · sklearn', tagClass: 'tabular', tagKey: 'tag.tab', tagFallback: 'tabular' },
  { category: 'tabular', name: 'RidgeRegressor', id: '#models/ridge', descKey: 'r.rg', descFallback: 'Regresión lineal L2. Estable en alta colinealidad.', base: 'BaseModel · sklearn', tagClass: 'tabular', tagKey: 'tag.tab', tagFallback: 'tabular' },
  { category: 'tabular', name: '+22 modelos tabulares', id: '15 clasificadores · 15 regresores', descKey: 'r.mt.d', descFallback: 'DecisionTree, GradientBoosting, AdaBoost, ExtraTrees, Lasso, ElasticNet, NaiveBayes y otros.', base: 'BaseModel · varios', tagClass: 'tabular', tagKey: 'tag.tab', tagFallback: 'tabular' },
  // nlp
  { category: 'nlp', name: 'DistilBERT', id: '#models/distilbert', descKey: 'r.db', descFallback: 'BERT destilado, más rápido. Clasificación de texto.', base: 'BaseModel · HF transformers', tagClass: 'nlp', tagKey: 'tag.nlp', tagFallback: 'NLP' },
  { category: 'nlp', name: 'DeBERTa-v3', id: '#models/deberta-v3', descKey: 'r.de', descFallback: 'Encoder con disentangled attention. Estado del arte en GLUE.', base: 'BaseModel · HF transformers', tagClass: 'nlp', tagKey: 'tag.nlp', tagFallback: 'NLP' },
  { category: 'nlp', name: 'ModernBERT', id: '#models/modernbert', descKey: 'r.mb', descFallback: 'Encoder moderno con context length de 8k tokens.', base: 'BaseModel · HF transformers', tagClass: 'nlp', tagKey: 'tag.nlp', tagFallback: 'NLP' },
  { category: 'nlp', name: '+12 modelos NLP', id: 'RoBERTa, ALBERT, XLM-R y otros', descKey: 'r.mn.d', descFallback: 'Familia completa de encoders en HuggingFace Transformers.', base: 'BaseModel · HF transformers', tagClass: 'nlp', tagKey: 'tag.nlp', tagFallback: 'NLP' },
  // translation
  { category: 'translation', name: 'NLLB', id: '#models/nllb', descKey: 'r.nl', descFallback: 'No Language Left Behind, 200+ idiomas. Seq2seq.', base: 'BaseModel · HF transformers', tagClass: 'translation', tagKey: 'tag.tr', tagFallback: 'traducción' },
  { category: 'translation', name: 'OpusMT', id: '#models/opus-mt', descKey: 'r.op', descFallback: 'Modelos Marian pre-entrenados por Helsinki-NLP.', base: 'BaseModel · HF transformers', tagClass: 'translation', tagKey: 'tag.tr', tagFallback: 'traducción' },
  { category: 'translation', name: '+7 modelos de traducción', id: 'métricas BLEU · ChrF · TER nativas', descKey: 'r.mtr.d', descFallback: 'M2M-100, mBART y variantes especializadas por dominio.', base: 'BaseModel · HF transformers', tagClass: 'translation', tagKey: 'tag.tr', tagFallback: 'traducción' },
  // gen
  { category: 'gen', name: 'Llama', id: '#models/llama', descKey: 'r.lla', descFallback: 'LLM open-weights de Meta. Inferencia local.', base: 'BaseGenerativeModel', tagClass: 'gen', tagKey: 'tag.gen', tagFallback: 'LLM' },
  { category: 'gen', name: 'Mistral', id: '#models/mistral', descKey: 'r.mi', descFallback: '7B open-weights eficiente. Sliding window attention.', base: 'BaseGenerativeModel', tagClass: 'gen', tagKey: 'tag.gen', tagFallback: 'LLM' },
  { category: 'gen', name: 'Mixtral', id: '#models/mixtral', descKey: 'r.mx', descFallback: 'Mixture of Experts. Calidad GPT-3.5 con costo menor.', base: 'BaseGenerativeModel', tagClass: 'gen', tagKey: 'tag.gen', tagFallback: 'LLM' },
  { category: 'gen', name: 'Qwen', id: '#models/qwen', descKey: 'r.qw', descFallback: 'LLM de Alibaba con soporte multilingüe sólido.', base: 'BaseGenerativeModel', tagClass: 'gen', tagKey: 'tag.gen', tagFallback: 'LLM' },
  { category: 'gen', name: 'SmolLM', id: '#models/smollm', descKey: 'r.sm', descFallback: 'LLM compacto para hardware modesto. 135M–1.7B.', base: 'BaseGenerativeModel', tagClass: 'gen', tagKey: 'tag.gen', tagFallback: 'LLM' },
  // vision
  { category: 'vision', name: 'PixArt-Sigma', id: '#models/pixart-sigma', descKey: 'r.px', descFallback: 'Diffusion transformer eficiente para 4K.', base: 'BaseGenerativeModel', tagClass: 'vision', tagKey: 'tag.vis', tagFallback: 'text-to-image' },
  { category: 'vision', name: 'SDXL', id: '#models/sdxl', descKey: 'r.sdxl', descFallback: 'Stable Diffusion XL. Calidad fotorrealista.', base: 'BaseGenerativeModel', tagClass: 'vision', tagKey: 'tag.vis', tagFallback: 'text-to-image' },
  { category: 'vision', name: 'Stable Diffusion v3', id: '#models/sd-v3', descKey: 'r.sd3', descFallback: 'Versión 3 con MMDiT — mejor adherencia al prompt.', base: 'BaseGenerativeModel', tagClass: 'vision', tagKey: 'tag.vis', tagFallback: 'text-to-image' },
  { category: 'vision', name: 'Stable Diffusion v2', id: '#models/sd-v2', descKey: 'r.sd2', descFallback: 'SD v2 con OpenCLIP. Generación 512×512 / 768×768.', base: 'BaseGenerativeModel', tagClass: 'vision', tagKey: 'tag.vis', tagFallback: 'text-to-image' },
  { category: 'vision', name: 'ControlNet', id: '#models/controlnet', descKey: 'r.cn', descFallback: 'Condicionamiento espacial sobre modelos de difusión.', base: 'BaseGenerativeModel', tagClass: 'vision', tagKey: 'tag.vis', tagFallback: 'text-to-image' },
  { category: 'vision', name: '+6 modelos de visión generativa', id: '', descKey: 'r.mv.d', descFallback: 'Variantes de inpainting, img2img y modelos en preparación.', base: 'BaseGenerativeModel', tagClass: 'vision', tagKey: 'tag.vis', tagFallback: 'text-to-image' },
]

const ABSTRACTIONS = [
  { idKey: 'a1.i', idFallback: '01 / paradigma', name: 'BaseTask', descKey: 'a1.d', descFallback: 'Clasificación, regresión, NLP, traducción, generación.' },
  { idKey: 'a2.i', idFallback: '02 / modelo predictivo', name: 'BaseModel', descKey: 'a2.d', descFallback: 'Random Forest hasta transformers. Subclass + schema, listo para HPO.' },
  { idKey: 'a3.i', idFallback: '03 / modelo generativo', name: 'BaseGenerativeModel', descKey: 'a3.d', descFallback: 'LLMs e imagen como ciudadanía de primera.' },
  { idKey: 'a4.i', idFallback: '04 / métrica', name: 'BaseMetric', descKey: 'a4.d', descFallback: 'Clasificación, regresión, traducción. Auto-aparece en UI.' },
  { idKey: 'a5.i', idFallback: '05 / HPO', name: 'BaseOptimizer', descKey: 'a5.d', descFallback: 'Optuna + HyperOpt. Estrategias bayesianas, evolutivas, QMC.' },
  { idKey: 'a6.i', idFallback: '06 / loader', name: 'BaseDataLoader', descKey: 'a6.d', descFallback: 'CSV, JSON, imágenes, audio. Cada loader declara su formato.' },
  { idKey: 'a7.i', idFallback: '07 / EDA', name: 'BaseExplorer', descKey: 'a7.d', descFallback: 'Visualizaciones, profiling, distribuciones — tipadas.' },
  { idKey: 'a8.i', idFallback: '08 / conversión', name: 'BaseConverter', descKey: 'a8.d', descFallback: 'Transformaciones tipadas entre formatos y representaciones.' },
  { idKey: 'a9.i', idFallback: '09 / XAI global', name: 'BaseGlobalExplainer', descKey: 'a9.d', descFallback: 'Permutation importance, surrogate, partial dependence.' },
  { idKey: 'a10.i', idFallback: '10 / XAI local', name: 'BaseLocalExplainer', descKey: 'a10.d', descFallback: 'SHAP, LIME, contrafactuales con abstracción dedicada.' },
  { idKey: 'a11.i', idFallback: '11 / orquestación', name: 'BaseJob', descKey: 'a11.d', descFallback: 'Train, predict, explain, explore, convert, generate, evaluate, optimize.' },
  { idKey: 'a12.i', idFallback: '12 / tarea generativa', name: 'BaseGenerativeTask', descKey: 'a12.d', descFallback: 'Generación condicional, text-to-image, seq-to-seq.' },
]

export function ModelsRoute() {
  const { t, i18n } = useTranslation('models')
  const th = (key: string) => ({ __html: t(key) })

  const [filter, setFilter] = useState<string>('all')

  const count = COUNTS[filter] ?? 60

  return (
    <>
      {/* HERO */}
      <section className="contrib-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <svg className="wm wm-tr" viewBox="0 0 218.96 237.04" aria-hidden="true">
          <use href="#dashai-mark" />
        </svg>
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="eyebrow">
            <span className="num">[ /models ]</span>
            {' '}&nbsp;{' '}
            <span>{t('cat.ey')}</span>
          </div>
          <h1 style={{ marginTop: 18 }} dangerouslySetInnerHTML={th('cat.h')} />
          <p className="lead" dangerouslySetInnerHTML={th('cat.lead')} />
        </div>
      </section>

      {/* CATALOG SECTION */}
      <section className="section section--tight" style={{ borderTop: 'none' }}>
        <div className="wrap">

          {/* Toolbar */}
          <div className="cat-toolbar">
            <div className="cat-filters">
              <button
                className={`f-btn${filter === 'all' ? ' is-on' : ''}`}
                data-filter="all"
                onClick={() => setFilter('all')}
              >
                <span>{t('cat.f.all')}</span> <span className="n">59</span>
              </button>
              <button
                className={`f-btn${filter === 'tabular' ? ' is-on' : ''}`}
                data-filter="tabular"
                onClick={() => setFilter('tabular')}
              >
                <span>{t('cat.f.tab')}</span> <span className="n">29</span>
              </button>
              <button
                className={`f-btn${filter === 'nlp' ? ' is-on' : ''}`}
                data-filter="nlp"
                onClick={() => setFilter('nlp')}
              >
                NLP <span className="n">15</span>
              </button>
              <button
                className={`f-btn${filter === 'translation' ? ' is-on' : ''}`}
                data-filter="translation"
                onClick={() => setFilter('translation')}
              >
                <span>{t('cat.f.tr')}</span> <span className="n">9</span>
              </button>
              <button
                className={`f-btn${filter === 'gen' ? ' is-on' : ''}`}
                data-filter="gen"
                onClick={() => setFilter('gen')}
              >
                LLMs <span className="n">5</span>
              </button>
              <button
                className={`f-btn${filter === 'vision' ? ' is-on' : ''}`}
                data-filter="vision"
                onClick={() => setFilter('vision')}
              >
                Vision <span className="n">11</span>
              </button>
            </div>
            <div className="cat-count">
              <span>{t('cat.show')}</span>{' '}
              <span id="model-count">{count}</span>
              {' · '}
              <span>{t('cat.sort')}</span>
            </div>
          </div>

          {/* Model table */}
          <div className="model-table" id="model-list">
            {/* Header */}
            <div className="model-row head">
              <div>{t('cat.col.m')}</div>
              <div>{t('cat.col.d')}</div>
              <div>{t('cat.col.a')}</div>
              <div style={{ textAlign: 'right' }}>{t('cat.col.t')}</div>
            </div>

            {/* Rows */}
            {MODEL_ROWS.map((row, i) => {
              const visible = filter === 'all' || row.category === filter
              return (
                <div
                  key={i}
                  className="model-row"
                  data-cat={row.category}
                  style={{ display: visible ? '' : 'none' }}
                >
                  <div>
                    <div className="m-name">{t(row.name) !== row.name ? t(row.name) : row.name}</div>
                    <div className="m-id">{row.id}</div>
                  </div>
                  <div className="m-desc">{t(row.descKey) || row.descFallback}</div>
                  <div className="m-base">{row.base}</div>
                  <div className="m-task">
                    <span className={`tag ${row.tagClass}`}>
                      {t(row.tagKey) || row.tagFallback}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12,
              color: 'var(--ink-3)',
              marginTop: 18,
            }}
            dangerouslySetInnerHTML={th('cat.note')}
          />
        </div>
      </section>

      {/* ABSTRACTIONS SECTION */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div className="left">
              <div className="eyebrow">
                <span className="num">[ /models/abstractions ]</span>
              </div>
              <h2 dangerouslySetInnerHTML={th('abs.h')} />
              <p className="lead">{t('abs.lead')}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            {ABSTRACTIONS.map((abs, i) => (
              <div className="feat-card" key={i}>
                <div className="id">{t(abs.idKey) || abs.idFallback}</div>
                <div className="name">{abs.name}</div>
                <div
                  className="m-desc"
                  style={{ fontSize: 13, color: 'var(--ink-2)' }}
                >
                  {t(abs.descKey) || abs.descFallback}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
