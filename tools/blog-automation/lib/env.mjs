import fs from 'node:fs'
import path from 'node:path'

import { repoRoot } from './paths.mjs'

function parseEnvLine(line) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) return null

  const separatorIndex = trimmed.indexOf('=')
  if (separatorIndex === -1) return null

  const key = trimmed.slice(0, separatorIndex).trim()
  let value = trimmed.slice(separatorIndex + 1).trim()

  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) return null

  const quote = value[0]
  if ((quote === '"' || quote === "'") && value.at(-1) === quote) {
    value = value.slice(1, -1)
  }

  return [key, value]
}

export function loadLocalEnv() {
  const envPath = path.join(repoRoot, '.env.local')
  if (!fs.existsSync(envPath)) return false

  const contents = fs.readFileSync(envPath, 'utf8')
  for (const line of contents.split(/\r?\n/)) {
    const entry = parseEnvLine(line)
    if (!entry) continue

    const [key, value] = entry
    if (process.env[key] === undefined) {
      process.env[key] = value
    }
  }

  return true
}
