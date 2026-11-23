import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { DEMO_VIDEO_ID, demoEmbedUrl } from '../lib/demo.ts'

test('demo embed uses the privacy-enhanced domain, starts at 0:00 and autoplays on play', () => {
  assert.equal(DEMO_VIDEO_ID, '66t_nVslDIo')
  const url = new URL(demoEmbedUrl())
  assert.equal(url.origin + url.pathname, 'https://www.youtube-nocookie.com/embed/66t_nVslDIo')
  assert.equal(url.searchParams.get('autoplay'), '1')
  assert.equal(url.searchParams.get('rel'), '0')
  assert.equal(url.searchParams.has('start'), false)
})

test('demo texts exist in all five languages', () => {
  for (const lang of ['es', 'en', 'pt', 'de', 'zh']) {
    const home = JSON.parse(readFileSync(new URL(`../public/locales/${lang}/home.json`, import.meta.url), 'utf8'))
    for (const key of ['hero.demo.title', 'about.demo.play', 'about.demo.cap', 'about.demo.src']) {
      assert.ok(home[key]?.trim(), `${lang}: ${key}`)
    }
  }
})
