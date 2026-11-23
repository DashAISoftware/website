import { test } from 'node:test'
import assert from 'node:assert/strict'
import { installers } from '../lib/github.ts'

const names = (list) => list.map((name) => ({ name, browser_download_url: name, size: 1 }))
const pick = (assets) => Object.fromEntries(Object.entries(installers(names(assets))).map(([k, v]) => [k, v.name]))

test('current installer names map to each platform', () => {
  assert.deepEqual(pick(['dashAI-0.11.0-arm-osx.dmg', 'dashAI-0.11.0-x64-linux.AppImage', 'dashAI-0.11.0-x64-windows.exe']), {
    windows: 'dashAI-0.11.0-x64-windows.exe',
    mac_arm: 'dashAI-0.11.0-arm-osx.dmg',
    linux: 'dashAI-0.11.0-x64-linux.AppImage',
  })
})

test('older names, including Intel Macs, are recognized', () => {
  assert.deepEqual(pick(['dashAI-0.9.6-x64-osx.dmg', 'DashAI-Installer.exe', 'DashAI-macos-arm64.dmg']), {
    windows: 'DashAI-Installer.exe',
    mac_arm: 'DashAI-macos-arm64.dmg',
    mac_intel: 'dashAI-0.9.6-x64-osx.dmg',
  })
  assert.deepEqual(pick(['DashAI-macos-x86_64.zip', 'DashAI-windows-cpu.zip']), {
    windows: 'DashAI-windows-cpu.zip',
    mac_intel: 'DashAI-macos-x86_64.zip',
  })
})

test('releases with only datasets have no installers', () => {
  assert.deepEqual(pick(['dashai_datasets.zip', 'example_datasets.zip']), {})
})
