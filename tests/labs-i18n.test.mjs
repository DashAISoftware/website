import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { LABS } from '../data/labs.ts'

const LANGS = ['es', 'en', 'pt', 'de', 'zh']
const load = (lang, ns) => JSON.parse(readFileSync(new URL(`../public/locales/${lang}/${ns}.json`, import.meta.url), 'utf8'))

test('the five labs.json files have exactly the same keys as es', () => {
  const base = Object.keys(load('es', 'labs')).sort()
  for (const lang of LANGS.slice(1)) {
    const keys = new Set(Object.keys(load(lang, 'labs')))
    const missing = base.filter(k => !keys.has(k))
    const extra = [...keys].filter(k => !base.includes(k))
    assert.deepEqual({ lang, missing, extra }, { lang, missing: [], extra: [] })
  }
})

test('no labs translation is empty', () => {
  for (const lang of LANGS) {
    const empty = Object.entries(load(lang, 'labs')).filter(([, v]) => typeof v !== 'string' || !v.trim()).map(([k]) => k)
    assert.deepEqual({ lang, empty }, { lang, empty: [] })
  }
})

test('every lab in LABS has its texts', () => {
  const es = load('es', 'labs')
  const need = []
  for (const lab of LABS) {
    const p = `labs.item.${lab.slug}`
    need.push(`${p}.code`, `${p}.title`, `${p}.summary`, `${p}.concepts`)
    if (lab.status === 'available') need.push(`${p}.includes`)
    if (lab.hasDetail) {
      need.push(`${p}.intro`, `${p}.langs`, `${p}.session`, `${p}.sessionNote`, `${p}.importOpen`, `${p}.teach`, `${p}.req`)
      for (let i = 1; i <= (lab.learnCount ?? 0); i++) need.push(`${p}.learn.${i}`)
      for (let i = 1; i <= (lab.moduleCount ?? 0); i++) need.push(`${p}.module.${i}`)
      for (const m of lab.models ?? []) need.push(`${p}.model.${m.key}`)
    }
  }
  assert.deepEqual(need.filter(k => !(k in es)), [])
})

test('navbar and footer have the Labs entries in every language', () => {
  for (const lang of LANGS) {
    const nav = load(lang, 'navbar')
    const ft = load(lang, 'footer')
    assert.ok(nav['nav.labs'] && ft['ft.labs'], `missing Labs nav/footer keys in ${lang}`)
  }
})
