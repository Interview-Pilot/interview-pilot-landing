import fs from 'node:fs/promises'
import path from 'node:path'

export async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true })
}

export async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'))
  } catch (error) {
    if (error?.code === 'ENOENT') return fallback
    throw error
  }
}

export async function writeJson(filePath, value) {
  await ensureDir(path.dirname(filePath))
  const tmpPath = `${filePath}.tmp`
  await fs.writeFile(tmpPath, `${JSON.stringify(value, null, 2)}\n`)
  await fs.rename(tmpPath, filePath)
}

export async function appendJsonl(filePath, value) {
  await ensureDir(path.dirname(filePath))
  await fs.appendFile(filePath, `${JSON.stringify(value)}\n`)
}

export async function fileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}
