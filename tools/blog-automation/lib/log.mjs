import path from 'node:path'

import { appendJsonl } from './store.mjs'
import { logsDir } from './paths.mjs'

export async function logEvent(event) {
  const entry = {
    at: new Date().toISOString(),
    ...event,
  }
  await appendJsonl(path.join(logsDir, 'automation.jsonl'), entry)
  return entry
}
