import test from 'node:test'
import assert from 'node:assert/strict'
import { legacyPath, routeOf } from '../lib/routes.ts'

test('old hash links point to the new pages', () => {
  assert.equal(legacyPath(''), null)
  assert.equal(legacyPath('#home'), null)
  assert.equal(legacyPath('#hm-cite'), null)
  assert.equal(legacyPath('#faq'), '/faq')
  assert.equal(legacyPath('#faq-install'), '/faq#faq-install')
  assert.equal(legacyPath('#contrib-core'), '/contribute#contrib-core')
  assert.equal(legacyPath('#guide-plugin'), '/contribute')
  assert.equal(legacyPath('#first-pr'), '/contribute')
  assert.equal(legacyPath('#download'), '/download')
  assert.equal(legacyPath('#nope'), null)
})

test('old lab links open a lab page only when it has one', () => {
  assert.equal(legacyPath('#labs'), '/labs')
  assert.equal(legacyPath('#labs/tutorias'), '/labs/tutorias')
  assert.equal(legacyPath('#labs/caso-02'), '/labs')
  assert.equal(legacyPath('#labs/nope'), '/labs')
})

test('routeOf maps a path to its navbar entry', () => {
  assert.equal(routeOf('/'), 'home')
  assert.equal(routeOf('/faq'), 'faq')
  assert.equal(routeOf('/labs/tutorias'), 'labs')
  assert.equal(routeOf('/whatever'), 'home')
})
