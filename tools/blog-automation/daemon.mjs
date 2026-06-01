import { runBlogAutomationOnce } from './pipeline.mjs'
import { logEvent } from './lib/log.mjs'
import { settingsPath, statePath } from './lib/paths.mjs'
import { readJson, writeJson } from './lib/store.mjs'

let timer = null
let runningPromise = null

function nextRunFromSettings(settings) {
  const now = new Date()
  const next = new Date(now)
  next.setHours(settings.schedule.startHourLocal, 0, 0, 0)
  if (next <= now) {
    next.setHours(next.getHours() + settings.schedule.runEveryHours)
  }
  return next
}

async function writeState(patch) {
  const state = await readJson(statePath, {})
  const next = { ...state, ...patch }
  await writeJson(statePath, next)
  return next
}

async function scheduleNext() {
  clearTimeout(timer)
  timer = null

  const settings = await readJson(settingsPath, null)
  if (!settings?.enabled) {
    await writeState({ enabled: false, running: false, currentStep: 'stopped', nextRunAt: null })
    return
  }

  const nextRun = nextRunFromSettings(settings)
  await writeState({
    enabled: true,
    currentStep: 'waiting',
    nextRunAt: nextRun.toISOString(),
  })

  const delay = Math.max(1000, nextRun.getTime() - Date.now())
  timer = setTimeout(async () => {
    await runNow('scheduled')
    await scheduleNext()
  }, delay)
}

export async function startDaemon() {
  const settings = await readJson(settingsPath, null)
  if (!settings) throw new Error('Missing editorial/settings.json')
  await writeJson(settingsPath, { ...settings, enabled: true })
  await logEvent({ type: 'daemon_started' })
  await scheduleNext()
}

export async function triggerRunNow(reason = 'dashboard') {
  if (runningPromise) {
    await logEvent({ type: 'manual_run_ignored', reason: 'already_running' })
    return false
  }

  void runNow(reason).then(scheduleNext).catch(async (error) => {
    const message = error instanceof Error ? error.message : String(error)
    await logEvent({ type: 'manual_run_failed', error: message })
    await writeState({ running: false, currentStep: 'error', lastError: message })
    await scheduleNext()
  })

  return true
}

export async function stopDaemon() {
  clearTimeout(timer)
  timer = null
  const settings = await readJson(settingsPath, null)
  if (settings) await writeJson(settingsPath, { ...settings, enabled: false })
  await writeState({ enabled: false, running: false, currentStep: 'stopped', nextRunAt: null })
  await logEvent({ type: 'daemon_stopped' })
}

export async function runNow(reason = 'manual') {
  if (runningPromise) {
    throw new Error('Blog automation is already running')
  }

  runningPromise = runBlogAutomationOnce({ reason })
  try {
    return await runningPromise
  } finally {
    runningPromise = null
  }
}

export async function hydrateDaemonFromSettings() {
  const settings = await readJson(settingsPath, null)
  if (settings?.enabled) await scheduleNext()
}
