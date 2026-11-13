import { test } from 'node:test'
import assert from 'node:assert/strict'
import { LABS } from '../data/labs.ts'
import { filterLabs, formatMetric, formatSize, fileHref, parseHash, getLab, sessionFile, otherLabs, labSearchText } from '../lib/labs.ts'

test('LABS has 7 unique slugs, only tutorias has a detail page, no file is ready yet', () => {
  const slugs = LABS.map(l => l.slug)
  assert.deepEqual(slugs, ['tutorias', 'caso-01', 'caso-02', 'caso-03', 'caso-04', 'caso-05', 'caso-06'])
  assert.deepEqual(LABS.filter(l => l.hasDetail).map(l => l.slug), ['tutorias'])
  assert.equal(LABS.flatMap(l => l.files).filter(f => f.ready).length, 0)
})

test('tutorias carries the session table from the mockup', () => {
  const lab = getLab('tutorias')
  assert.deepEqual(lab.models.map(m => m.key), ['dummy', 'logreg', 'tree3', 'tree20', 'rf', 'logregBalanced'])
  const best = lab.models.find(m => m.highlight)
  assert.deepEqual([best.key, best.recall, best.f1, best.auc], ['logregBalanced', 0.7059, 0.6154, 0.8194])
  assert.equal(sessionFile(lab).name, 'sesion-tutorias.dashai')
})

test('filterLabs by task', () => {
  assert.deepEqual(filterLabs(LABS, 'Generative', '', l => l.slug).map(l => l.slug), ['tutorias'])
  assert.equal(filterLabs(LABS, 'all', '', l => l.slug).length, 7)
})

test('filterLabs search ignores accents and case', () => {
  assert.equal(filterLabs(LABS, 'all', 'TUTORÍA', () => '¿A quién le ofrecemos tutoría?').length, 7)
  assert.equal(filterLabs(LABS, 'all', 'tutoria', () => 'Tutoría').length, 7)
  assert.equal(filterLabs(LABS, 'all', 'tutoria', () => 'x').length, 0)
})

test('formatMetric uses 4 decimals and the language separator', () => {
  assert.equal(formatMetric(0.451, 'es'), '0,4510')
  assert.equal(formatMetric(0.451, 'en'), '0.4510')
})

test('formatSize uses KB without decimals and MB with one', () => {
  assert.equal(formatSize(49000, 'es'), '49 KB')
  assert.equal(formatSize(2500000, 'es'), '2,5 MB')
  assert.equal(formatSize(2500000, 'en'), '2.5 MB')
})

test('fileHref only links ready files', () => {
  const f = { kind: 'dataset', name: 'a.csv', path: 'labs/tutorias/a.csv', bytes: 1, ready: false }
  assert.equal(fileHref(f), null)
  assert.equal(fileHref({ ...f, ready: true }), '/labs/tutorias/a.csv')
  assert.equal(fileHref(undefined), null)
})

test('parseHash routes lab detail only for labs with a detail page', () => {
  assert.deepEqual(parseHash('#labs/tutorias'), { route: 'labs', slug: 'tutorias', isSubAnchor: false })
  assert.deepEqual(parseHash('#labs/caso-02'), { route: 'labs', slug: null, isSubAnchor: false })
  assert.deepEqual(parseHash('#labs/nope'), { route: 'labs', slug: null, isSubAnchor: false })
  assert.deepEqual(parseHash('#labs'), { route: 'labs', slug: null, isSubAnchor: false })
})

test('parseHash keeps existing routing behaviour', () => {
  assert.deepEqual(parseHash(''), { route: 'home', slug: null, isSubAnchor: false })
  assert.deepEqual(parseHash('#faq-x'), { route: 'faq', slug: null, isSubAnchor: true })
  assert.deepEqual(parseHash('#guide-1'), { route: 'contribute', slug: null, isSubAnchor: true })
  assert.deepEqual(parseHash('#first-pr'), { route: 'contribute', slug: null, isSubAnchor: true })
  assert.deepEqual(parseHash('#models/knn'), { route: 'models/knn', slug: null, isSubAnchor: false })
})

test('otherLabs lists available labs first, skips the current one, max 2', () => {
  assert.deepEqual(otherLabs('tutorias').map(l => l.slug), ['caso-01', 'caso-02'])
  assert.deepEqual(otherLabs('caso-01').map(l => l.slug), ['tutorias', 'caso-02'])
  assert.equal(otherLabs('tutorias', 3).length, 3)
})

test('search text includes the visible card code and task names', () => {
  const fakeT = key => ({ 'labs.item.caso-03.code': 'Caso 03', 'labs.item.caso-03.title': '¿Qué tipo de asistente es?' })[key] ?? ''
  const text = labSearchText(getLab('caso-03'), fakeT)
  assert.equal(filterLabs(LABS, 'all', 'caso 03', l => labSearchText(l, fakeT)).map(l => l.slug).join(), 'caso-03')
  assert.ok(text.includes('Tabular Classification'))
})
