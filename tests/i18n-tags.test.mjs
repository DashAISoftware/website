import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

// i18next parses Trans strings as HTML, so a tag named after a void element
// (<link>, <img>, <br>, <input>, ...) never wraps its text: the link renders empty.
const VOID = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']

test('Trans tags in locales never use void HTML element names', () => {
  const root = 'public/locales'
  const langs = fs.readdirSync(root).filter((d) => fs.statSync(path.join(root, d)).isDirectory())
  for (const lang of langs) {
    for (const file of fs.readdirSync(path.join(root, lang)).filter((f) => f.endsWith('.json'))) {
      const text = fs.readFileSync(path.join(root, lang, file), 'utf8')
      for (const tag of VOID) {
        assert.ok(!text.includes(`</${tag}>`), `${lang}/${file} wraps text in <${tag}>`)
      }
    }
  }
})
