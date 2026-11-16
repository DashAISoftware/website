import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { demoEmbedUrl } from '../lib/demo.ts'

test('carousel demo plays the YouTube demo from 0:00 on the no-cookie domain', () => {
  const url = new URL(demoEmbedUrl())
  assert.equal(url.origin + url.pathname, 'https://www.youtube-nocookie.com/embed/66t_nVslDIo')
  assert.equal(url.searchParams.get('autoplay'), '1')
  assert.equal(url.searchParams.has('start'), false)
})

test('carousel demo poster is served by the site, not loaded from YouTube', () => {
  assert.ok(existsSync(new URL('../public/images/demo-poster.jpg', import.meta.url)))
})

test('carousel demo texts exist in all five languages', () => {
  for (const lang of ['es', 'en', 'pt', 'de', 'zh']) {
    const home = JSON.parse(readFileSync(new URL(`../public/locales/${lang}/home.json`, import.meta.url), 'utf8'))
    for (const key of ['sho.tab.demo', 'mock.tab.demo', 'mock.demo.play', 'mock.demo.title']) {
      assert.ok(home[key]?.trim(), `${lang}: ${key}`)
    }
  }
})
