#!/usr/bin/env node
import fs from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import { URL } from 'node:url'

import { hydrateDaemonFromSettings, startDaemon, stopDaemon, triggerRunNow } from './daemon.mjs'
import {
  contentPostsDir,
  draftsDir,
  historyPath,
  logsDir,
  repoRoot,
  reportsDir,
  settingsPath,
  statePath,
  topicsPath,
} from './lib/paths.mjs'
import { readAllPosts } from './lib/content.mjs'
import { loadLocalEnv } from './lib/env.mjs'
import { ensureDir, readJson, writeJson } from './lib/store.mjs'

loadLocalEnv()

const portArg = process.argv.find((arg) => arg.startsWith('--port='))?.split('=')[1]
const PORT = Number.parseInt(portArg || process.env.BLOG_DASHBOARD_PORT || '7788', 10)
const publicDir = path.join(repoRoot, 'public')

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function checked(value) {
  return value ? 'checked' : ''
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noreferrer">$1</a>'
    )
}

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
}

function isTableSeparator(line) {
  return /^\|\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(String(line || '').trim())
}

function renderTable(tableLines) {
  const [headerLine, , ...bodyLines] = tableLines
  const headers = splitTableRow(headerLine)
  const rows = bodyLines.map(splitTableRow)

  return `<table><thead><tr>${headers
    .map((header) => `<th>${inlineMarkdown(header)}</th>`)
    .join('')}</tr></thead><tbody>${rows
    .map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join('')}</tr>`)
    .join('')}</tbody></table>`
}

function renderMarkdown(markdown) {
  const lines = String(markdown || '').split(/\r?\n/)
  const html = []
  let listType = null

  function closeList() {
    if (listType) {
      html.push(`</${listType}>`)
      listType = null
    }
  }

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const rawLine = lines[lineIndex]
    const line = rawLine.trim()
    if (!line) {
      closeList()
      continue
    }

    if (
      line.startsWith('|') &&
      line.endsWith('|') &&
      isTableSeparator(lines[lineIndex + 1])
    ) {
      closeList()
      const tableLines = [line, lines[lineIndex + 1]]
      lineIndex += 2
      while (lineIndex < lines.length && lines[lineIndex].trim().startsWith('|')) {
        tableLines.push(lines[lineIndex].trim())
        lineIndex += 1
      }
      lineIndex -= 1
      html.push(renderTable(tableLines))
      continue
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/)
    if (heading) {
      closeList()
      const level = heading[1].length
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`)
      continue
    }

    if (/^>\s+/.test(line)) {
      closeList()
      html.push(`<blockquote>${inlineMarkdown(line.replace(/^>\s+/, ''))}</blockquote>`)
      continue
    }

    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (image) {
      closeList()
      html.push(`<img src="${escapeHtml(image[2])}" alt="${escapeHtml(image[1])}" />`)
      continue
    }

    const unordered = line.match(/^[-*]\s+(.+)$/)
    if (unordered) {
      if (listType !== 'ul') {
        closeList()
        html.push('<ul>')
        listType = 'ul'
      }
      html.push(`<li>${inlineMarkdown(unordered[1])}</li>`)
      continue
    }

    const ordered = line.match(/^\d+\.\s+(.+)$/)
    if (ordered) {
      if (listType !== 'ol') {
        closeList()
        html.push('<ol>')
        listType = 'ol'
      }
      html.push(`<li>${inlineMarkdown(ordered[1])}</li>`)
      continue
    }

    closeList()
    html.push(`<p>${inlineMarkdown(line)}</p>`)
  }

  closeList()
  return html.join('\n')
}

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  if (ext === '.webp') return 'image/webp'
  if (ext === '.png') return 'image/png'
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg'
  if (ext === '.svg') return 'image/svg+xml'
  return 'application/octet-stream'
}

async function servePublicAsset(url, response) {
  const decodedPath = decodeURIComponent(url.pathname)
  const filePath = path.resolve(publicDir, decodedPath.replace(/^\/+/, ''))

  if (!filePath.startsWith(`${publicDir}${path.sep}`)) {
    response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Forbidden')
    return
  }

  try {
    const body = await fs.readFile(filePath)
    response.writeHead(200, {
      'Content-Type': contentTypeFor(filePath),
      'Cache-Control': 'public, max-age=31536000, immutable',
    })
    response.end(body)
  } catch (error) {
    if (error?.code === 'ENOENT') {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      response.end('Not found')
      return
    }
    throw error
  }
}

async function readLogs() {
  try {
    const raw = await fs.readFile(`${logsDir}/automation.jsonl`, 'utf8')
    return raw
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line)
        } catch {
          return { at: '', type: 'invalid_log_line', raw: line }
        }
      })
      .reverse()
      .slice(0, 80)
  } catch (error) {
    if (error?.code === 'ENOENT') return []
    throw error
  }
}

async function dashboardState() {
  const [settings, state, topics, history, posts, latestRun, logs] = await Promise.all([
    readJson(settingsPath, {}),
    readJson(statePath, {}),
    readJson(topicsPath, []),
    readJson(historyPath, []),
    readAllPosts(),
    readJson(`${reportsDir}/run-latest.json`, null),
    readLogs(),
  ])

  return {
    settings,
    state,
    topics,
    history,
    posts,
    latestRun,
    logs,
  }
}

function statusPayload(state) {
  const drafts = state.posts.filter((post) => post.source === 'draft')
  const published = state.posts.filter((post) => post.source === 'published')
  return {
    enabled: Boolean(state.settings.enabled),
    running: Boolean(state.state.running),
    currentStep: state.state.currentStep || 'idle',
    activeRunId: state.state.activeRunId || null,
    lastError: state.state.lastError || null,
    progress: state.state.progress || null,
    queued: state.topics.filter((topic) => topic.status === 'queued').length,
    drafts: drafts.length,
    published: published.length,
  }
}

function render(state) {
  const queued = state.topics.filter((topic) => topic.status === 'queued').length
  const generated = state.topics.filter((topic) => topic.status === 'generated').length
  const draftedTopics = state.topics.filter((topic) => topic.status === 'drafted').length
  const failed = state.topics.filter((topic) => topic.status === 'failed').length
  const drafts = state.posts.filter((post) => post.source === 'draft')
  const published = state.posts.filter((post) => post.source === 'published')
  const running = Boolean(state.settings.enabled)
  const active = Boolean(state.state.running)
  const progress = state.state.progress || {
    percent: active ? 1 : 0,
    label: active ? 'Starting' : 'Idle',
    detail: active ? state.state.currentStep : 'No active generation',
  }
  const topicDiscovery = {
    enabled: true,
    minQueuedTopics: 8,
    maxTopicsPerRun: 6,
    newsCandidatesPerRun: 8,
    evergreenCandidatesPerRun: 12,
    ...(state.settings.topicDiscovery || {}),
  }

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Interview Pilot Blog Automation</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #070707;
        --card: rgba(17, 17, 19, 0.9);
        --card-solid: #111113;
        --text: #fff;
        --muted: #a8a8ad;
        --border: rgba(255,255,255,0.12);
        --yellow: #FECC04;
        --green: #5ee28f;
        --red: #ff6b6b;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background:
          radial-gradient(circle at 50% -10%, rgba(254,204,4,0.13), transparent 34%),
          radial-gradient(circle at 15% 30%, rgba(255,255,255,0.06), transparent 26%),
          var(--bg);
        color: var(--text);
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      main { width: min(1180px, calc(100vw - 32px)); margin: 0 auto; padding: 40px 0 64px; }
      header { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; margin-bottom: 28px; }
      h1 { margin: 0 0 10px; font-size: clamp(36px, 5vw, 58px); letter-spacing: -0.05em; line-height: 0.95; }
      h2 { margin: 0 0 16px; font-size: 22px; letter-spacing: -0.02em; }
      h3 { margin: 0 0 6px; font-size: 15px; }
      p { margin: 0; color: var(--muted); line-height: 1.6; }
      .card {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 22px;
        padding: 20px;
      }
      .grid { display: grid; gap: 16px; }
      .metrics { grid-template-columns: repeat(5, minmax(0, 1fr)); margin-bottom: 16px; }
      .two { grid-template-columns: 0.9fr 1.1fr; margin-top: 16px; }
      .metric { font-size: 32px; font-weight: 850; letter-spacing: -0.05em; }
      .label { color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; }
      .progress-card {
        margin-bottom: 16px;
        display: grid;
        gap: 12px;
      }
      .progress-head {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 16px;
      }
      .progress-title {
        font-weight: 850;
        letter-spacing: -0.02em;
      }
      .progress-percent {
        color: ${progress.error ? 'var(--red)' : 'var(--yellow)'};
        font-weight: 850;
      }
      .progress-track {
        height: 12px;
        overflow: hidden;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: rgba(255,255,255,0.06);
      }
      .progress-fill {
        height: 100%;
        width: ${escapeHtml(progress.percent)}%;
        border-radius: inherit;
        background: ${progress.error ? 'var(--red)' : 'linear-gradient(90deg, #FECC04, #ffe889)'};
        transition: width 320ms ease;
      }
      .progress-detail {
        min-height: 20px;
        color: var(--muted);
        font-size: 14px;
        line-height: 1.45;
      }
      .status {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border: 1px solid var(--border);
        border-radius: 999px;
        padding: 8px 12px;
        color: ${running ? 'var(--green)' : 'var(--muted)'};
        background: rgba(255,255,255,0.05);
        font-weight: 750;
      }
      .dot { width: 8px; height: 8px; border-radius: 50%; background: ${running ? 'var(--green)' : 'var(--muted)'}; }
      button {
        appearance: none;
        border: 0;
        border-radius: 999px;
        padding: 14px 22px;
        background: ${running ? 'rgba(255,255,255,0.1)' : 'var(--yellow)'};
        color: ${running ? '#fff' : '#050505'};
        border: 1px solid ${running ? 'var(--border)' : 'transparent'};
        font-weight: 850;
        cursor: pointer;
        font-size: 15px;
      }
      button.secondary {
        background: rgba(255,255,255,0.08);
        color: #fff;
        border: 1px solid var(--border);
      }
      button.small {
        padding: 8px 12px;
        font-size: 12px;
      }
      button.danger {
        background: rgba(255, 107, 107, 0.1);
        color: #ffb3b3;
        border: 1px solid rgba(255, 107, 107, 0.35);
      }
      button:disabled {
        cursor: not-allowed;
        opacity: 0.55;
      }
      .actions {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }
      input, select {
        width: 100%;
        background: #080808;
        color: #fff;
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 10px 12px;
      }
      label { display: grid; gap: 6px; color: var(--muted); font-size: 13px; }
      .form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
      .category-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin-top: 12px; }
      .checkbox { display: flex; align-items: center; gap: 8px; }
      .checkbox input { width: auto; }
      table { width: 100%; border-collapse: collapse; }
      th, td { padding: 11px 8px; border-bottom: 1px solid var(--border); text-align: left; vertical-align: top; }
      th { color: var(--muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; }
      td { font-size: 13px; color: #e9e9e9; }
      .pill { display: inline-flex; padding: 4px 8px; border: 1px solid var(--border); border-radius: 999px; color: var(--muted); font-size: 12px; }
      pre { margin: 0; white-space: pre-wrap; word-break: break-word; color: #d9d9d9; font-size: 12px; line-height: 1.5; }
      .logs { max-height: 460px; overflow: auto; background: #050505; border-radius: 14px; padding: 14px; border: 1px solid var(--border); }
      .post-link {
        color: #fff;
        text-decoration: none;
        font-weight: 750;
      }
      .post-link:hover { color: var(--yellow); }
      .row-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }
      .inline-form {
        display: inline-flex;
        margin: 0;
      }
      .preview-shell {
        width: min(860px, calc(100vw - 32px));
        margin: 0 auto;
        padding: 36px 0 72px;
      }
      .preview-header {
        margin-bottom: 28px;
        padding-bottom: 24px;
        border-bottom: 1px solid var(--border);
      }
      .preview-header h1 {
        margin-top: 16px;
      }
      .article {
        background: rgba(17,17,19,0.76);
        border: 1px solid var(--border);
        border-radius: 24px;
        padding: clamp(24px, 5vw, 46px);
      }
      .hero-image {
        width: 100%;
        height: 400px;
        object-fit: cover;
        display: block;
        border: 1px solid var(--border);
        border-radius: 18px;
        margin-bottom: 22px;
        background: rgba(255,255,255,0.04);
      }
      .article img:not(.hero-image) {
        width: 100%;
        max-height: 360px;
        object-fit: cover;
        display: block;
        border: 1px solid var(--border);
        border-radius: 18px;
        margin: 18px 0 28px;
        background: rgba(255,255,255,0.04);
      }
      @media (max-width: 767px) {
        .hero-image {
          height: 220px;
        }
        .article img:not(.hero-image) {
          max-height: 240px;
        }
      }
      .article h1 {
        font-size: clamp(36px, 6vw, 58px);
        letter-spacing: -0.05em;
        line-height: 0.98;
        margin: 0 0 28px;
      }
      .article h2 {
        font-size: clamp(26px, 4vw, 34px);
        margin-top: 44px;
        margin-bottom: 14px;
      }
      .article h3 {
        font-size: 22px;
        margin-top: 30px;
      }
      .article p, .article li, .article blockquote {
        font-size: 18px;
        line-height: 1.78;
        color: #d8d8dc;
      }
      .article p { margin: 0 0 18px; }
      .article ul, .article ol { padding-left: 24px; margin: 0 0 20px; }
      .article li { margin-bottom: 10px; }
      .article a { color: var(--yellow); }
      .article blockquote {
        margin: 24px 0;
        padding: 18px 20px;
        border-left: 4px solid var(--yellow);
        background: rgba(255,255,255,0.05);
        border-radius: 14px;
      }
      .error { color: var(--red); }
      .success { color: var(--green); }
      .muted { color: var(--muted); }
      .section { margin-top: 16px; }
      @media (max-width: 900px) {
        header { flex-direction: column; }
        .metrics, .two, .form-grid { grid-template-columns: 1fr; }
        main { width: min(100vw - 24px, 1180px); padding-top: 24px; }
      }
    </style>
    <script>
      async function refreshStatus() {
        const response = await fetch('/status.json', { cache: 'no-store' })
        if (!response.ok) return

        const data = await response.json()
        const progress = data.progress || {}
        const percent = Math.max(0, Math.min(100, Number(progress.percent || 0)))

        document.getElementById('progress-label').textContent = progress.label || data.currentStep || 'Idle'
        document.getElementById('progress-percent').textContent = percent + '%'
        document.getElementById('progress-fill').style.width = percent + '%'
        document.getElementById('progress-detail').textContent = progress.detail || data.currentStep || ''

        if (data.running) {
          window.setTimeout(refreshStatus, 1500)
        } else if (document.getElementById('run-progress')?.dataset.running === 'true') {
          window.location.reload()
        }
      }

      window.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('run-progress')?.dataset.running === 'true') {
          refreshStatus()
        }
      })
    </script>
  </head>
  <body>
    <main>
      <header>
        <div>
          <div class="status"><span class="dot"></span>${running ? 'Automation enabled' : 'Automation stopped'}</div>
          <h1>Blog Automation</h1>
          <p>One local control for scheduled research, article generation, quality gates, and publishing.</p>
        </div>
        <div class="actions">
          <form method="post" action="/run-now">
            <button class="secondary" type="submit" ${active ? 'disabled' : ''}>Generate Now</button>
          </form>
          <form method="post" action="/toggle">
            <button type="submit">${running ? 'Stop' : 'Start'}</button>
          </form>
        </div>
      </header>

      <section class="grid metrics">
        <div class="card"><div class="metric">${queued}</div><div class="label">Queued</div></div>
        <div class="card"><div class="metric">${drafts.length}</div><div class="label">Drafts</div></div>
        <div class="card"><div class="metric">${published.length}</div><div class="label">Published</div></div>
        <div class="card"><div class="metric">${draftedTopics + generated}</div><div class="label">Completed Topics</div></div>
        <div class="card"><div class="metric">${failed}</div><div class="label">Failures</div></div>
      </section>

      <section class="card progress-card" id="run-progress" data-running="${active ? 'true' : 'false'}">
        <div class="progress-head">
          <div>
            <div class="label">${active ? 'Generation in progress' : 'Generation status'}</div>
            <div class="progress-title" id="progress-label">${escapeHtml(progress.label)}</div>
          </div>
          <div class="progress-percent" id="progress-percent">${escapeHtml(progress.percent)}%</div>
        </div>
        <div class="progress-track">
          <div class="progress-fill" id="progress-fill"></div>
        </div>
        <div class="progress-detail" id="progress-detail">${escapeHtml(progress.detail || state.state.currentStep || '')}</div>
      </section>

      <section class="grid two">
        <div class="card">
          <h2>System Status</h2>
          <table>
            <tbody>
              <tr><th>Current step</th><td>${escapeHtml(state.state.currentStep)}</td></tr>
              <tr><th>Active run</th><td>${escapeHtml(state.state.activeRunId || 'none')}</td></tr>
              <tr><th>Last run</th><td>${escapeHtml(state.state.lastRunAt || 'none')}</td></tr>
              <tr><th>Next run</th><td>${escapeHtml(state.state.nextRunAt || 'none')}</td></tr>
              <tr><th>Last error</th><td class="${state.state.lastError ? 'error' : ''}">${escapeHtml(state.state.lastError || 'none')}</td></tr>
            </tbody>
          </table>
        </div>

        <div class="card">
          <h2>Settings</h2>
          <form method="post" action="/settings">
            <div class="form-grid">
              <label>Posts per run
                <input name="postsPerRun" type="number" min="1" max="5" value="${escapeHtml(state.settings.generation.postsPerRun)}" />
              </label>
              <label>Run every hours
                <input name="runEveryHours" type="number" min="1" max="168" value="${escapeHtml(state.settings.schedule.runEveryHours)}" />
              </label>
              <label>Start hour local
                <input name="startHourLocal" type="number" min="0" max="23" value="${escapeHtml(state.settings.schedule.startHourLocal)}" />
              </label>
              <label>Minimum words
                <input name="minimumWordCount" type="number" min="800" max="5000" value="${escapeHtml(state.settings.generation.minimumWordCount)}" />
              </label>
              <label>Minimum queued topics
                <input name="minQueuedTopics" type="number" min="2" max="60" value="${escapeHtml(topicDiscovery.minQueuedTopics)}" />
              </label>
              <label>Max new topics per run
                <input name="maxTopicsPerRun" type="number" min="1" max="20" value="${escapeHtml(topicDiscovery.maxTopicsPerRun)}" />
              </label>
              <label>OpenAI model
                <input name="model" value="${escapeHtml(state.settings.generation.model)}" />
              </label>
              <label>Publish mode
                <select name="publishMode">
                  ${['draft-only', 'commit-only', 'commit-and-push']
                    .map(
                      (mode) =>
                        `<option value="${mode}" ${state.settings.publishing.mode === mode ? 'selected' : ''}>${mode}</option>`
                    )
                    .join('')}
                </select>
              </label>
            </div>
            <div class="category-grid">
              <label class="checkbox"><input type="checkbox" name="topicDiscoveryEnabled" ${checked(topicDiscovery.enabled)} /> Auto-discover topics</label>
              ${Object.entries(state.settings.categories || {})
                .map(
                  ([category, value]) =>
                    `<label class="checkbox"><input type="checkbox" name="category:${category}" ${checked(value)} /> ${escapeHtml(category)}</label>`
                )
                .join('')}
            </div>
            <div class="section">
              <button type="submit">Save Settings</button>
            </div>
          </form>
        </div>
      </section>

      <section class="card section">
        <h2>Topic Queue</h2>
        <table>
          <thead><tr><th>Status</th><th>Topic</th><th>Category</th><th>Research</th><th>Keyword</th></tr></thead>
          <tbody>
            ${state.topics
              .map(
                (topic) => `<tr>
                  <td><span class="pill">${escapeHtml(topic.status)}</span></td>
                  <td>${escapeHtml(topic.topic)}</td>
                  <td>${escapeHtml(topic.category)}</td>
                  <td>${topic.researchRequired ? 'required' : 'not required'} / ${escapeHtml(topic.sourceDepth)}</td>
                  <td>${escapeHtml(topic.primaryKeyword)}</td>
                </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </section>

      <section class="card section">
        <h2>Generated Posts</h2>
        ${
          [...drafts, ...published].length
              ? `<table>
                <thead><tr><th>Source</th><th>Title</th><th>Category</th><th>Words</th><th>Actions</th></tr></thead>
                <tbody>
                  ${[...drafts, ...published]
                    .map(
                      (post) => `<tr>
                        <td><span class="pill">${escapeHtml(post.source)}</span></td>
                        <td>${escapeHtml(post.frontmatter.title || post.slug)}</td>
                        <td>${escapeHtml(post.frontmatter.category || '')}</td>
                        <td>${escapeHtml(post.wordCount)}</td>
                        <td>
                          <div class="row-actions">
                            <a class="post-link" href="/preview?source=${encodeURIComponent(post.source)}&slug=${encodeURIComponent(post.slug)}">Preview</a>
                            ${
                              post.source === 'draft'
                                ? `<form class="inline-form" method="post" action="/posts/publish">
                                    <input type="hidden" name="slug" value="${escapeHtml(post.slug)}" />
                                    <button class="small" type="submit">Publish</button>
                                  </form>
                                  <form class="inline-form" method="post" action="/posts/delete">
                                    <input type="hidden" name="slug" value="${escapeHtml(post.slug)}" />
                                    <button class="small danger" type="submit">Delete</button>
                                  </form>`
                                : ''
                            }
                          </div>
                        </td>
                      </tr>`
                    )
                    .join('')}
                </tbody>
              </table>`
            : '<p>No generated posts yet. Generated drafts or published posts will appear here with rendered previews.</p>'
        }
      </section>

      <section class="grid two">
        <div class="card">
          <h2>Latest Run</h2>
          ${
            state.latestRun
              ? `<pre>${escapeHtml(JSON.stringify(state.latestRun, null, 2))}</pre>`
              : '<p>No run report yet.</p>'
          }
        </div>
        <div class="card">
          <h2>Logs</h2>
          <div class="logs">
            ${
              state.logs.length
                ? state.logs
                    .map(
                      (log) =>
                        `<pre>${escapeHtml(`${log.at || ''} ${log.type || ''} ${JSON.stringify(log)}`)}</pre>`
                    )
                    .join('')
                : '<p>No logs yet.</p>'
            }
          </div>
        </div>
      </section>
    </main>
  </body>
</html>`
}

async function readBody(request) {
  const chunks = []
  for await (const chunk of request) chunks.push(chunk)
  return Buffer.concat(chunks).toString('utf8')
}

function safeSlug(value) {
  const slug = String(value || '').trim()
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error('Invalid post slug')
  }
  return slug
}

async function updateTopicForPublishedPost(slug) {
  const topics = await readJson(topicsPath, [])
  const next = topics.map((topic) => {
    if (topic.generatedSlug !== slug && !String(topic.draftPath || '').endsWith(`${slug}.mdx`)) return topic

    return {
      ...topic,
      status: 'published',
      generatedSlug: slug,
      draftPath: undefined,
      draftedAt: undefined,
      publishedPath: `content/posts/${slug}.mdx`,
      publishedAt: new Date().toISOString(),
      lastError: null,
    }
  })

  await writeJson(topicsPath, next)
}

async function updateTopicForDeletedDraft(slug) {
  const topics = await readJson(topicsPath, [])
  const next = topics.filter(
    (topic) => topic.generatedSlug !== slug && !String(topic.draftPath || '').endsWith(`${slug}.mdx`)
  )

  await writeJson(topicsPath, next)
}

async function handlePublishPost(request, response) {
  const body = new URLSearchParams(await readBody(request))
  const slug = safeSlug(body.get('slug'))
  const draftPath = path.join(draftsDir, `${slug}.mdx`)
  const publishedPath = path.join(contentPostsDir, `${slug}.mdx`)

  await ensureDir(contentPostsDir)

  try {
    await fs.access(draftPath)
  } catch {
    throw new Error(`Draft not found: ${slug}`)
  }

  try {
    await fs.access(publishedPath)
    throw new Error(`Published post already exists: ${slug}`)
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error
  }

  await fs.rename(draftPath, publishedPath)
  await updateTopicForPublishedPost(slug)

  response.writeHead(303, { Location: '/' })
  response.end()
}

async function handleDeletePost(request, response) {
  const body = new URLSearchParams(await readBody(request))
  const slug = safeSlug(body.get('slug'))
  const draftPath = path.join(draftsDir, `${slug}.mdx`)

  try {
    await fs.unlink(draftPath)
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error
  }

  await updateTopicForDeletedDraft(slug)

  response.writeHead(303, { Location: '/' })
  response.end()
}

async function handleSettings(request, response) {
  const body = new URLSearchParams(await readBody(request))
  const settings = await readJson(settingsPath, {})
  const categories = { ...(settings.categories || {}) }
  for (const category of Object.keys(categories)) {
    categories[category] = body.get(`category:${category}`) === 'on'
  }

  const next = {
    ...settings,
    schedule: {
      ...settings.schedule,
      runEveryHours: Number.parseInt(body.get('runEveryHours') || settings.schedule.runEveryHours, 10),
      startHourLocal: Number.parseInt(body.get('startHourLocal') || settings.schedule.startHourLocal, 10),
    },
    generation: {
      ...settings.generation,
      postsPerRun: Number.parseInt(body.get('postsPerRun') || settings.generation.postsPerRun, 10),
      minimumWordCount: Number.parseInt(
        body.get('minimumWordCount') || settings.generation.minimumWordCount,
        10
      ),
      model: body.get('model') || settings.generation.model,
    },
    topicDiscovery: {
      enabled: body.get('topicDiscoveryEnabled') === 'on',
      minQueuedTopics: Number.parseInt(
        body.get('minQueuedTopics') || settings.topicDiscovery?.minQueuedTopics || 8,
        10
      ),
      maxTopicsPerRun: Number.parseInt(
        body.get('maxTopicsPerRun') || settings.topicDiscovery?.maxTopicsPerRun || 6,
        10
      ),
      newsCandidatesPerRun: settings.topicDiscovery?.newsCandidatesPerRun || 8,
      evergreenCandidatesPerRun: settings.topicDiscovery?.evergreenCandidatesPerRun || 12,
    },
    publishing: {
      ...settings.publishing,
      mode: body.get('publishMode') || settings.publishing.mode,
    },
    categories,
  }

  await writeJson(settingsPath, next)
  response.writeHead(303, { Location: '/' })
  response.end()
}

async function handleToggle(response) {
  const settings = await readJson(settingsPath, {})
  if (settings.enabled) await stopDaemon()
  else await startDaemon()
  response.writeHead(303, { Location: '/' })
  response.end()
}

async function handleRunNow(response) {
  await triggerRunNow('dashboard')
  response.writeHead(303, { Location: '/' })
  response.end()
}

async function renderPreviewPage(url, response) {
  const slug = url.searchParams.get('slug')
  const source = url.searchParams.get('source') || 'draft'
  const posts = await readAllPosts()
  const post = posts.find((candidate) => candidate.slug === slug && candidate.source === source)

  if (!post) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Post preview not found')
    return
  }

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(post.frontmatter.title || post.slug)}</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #070707;
        --text: #fff;
        --muted: #a8a8ad;
        --border: rgba(255,255,255,0.12);
        --yellow: #FECC04;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background:
          radial-gradient(circle at 50% -10%, rgba(254,204,4,0.13), transparent 34%),
          var(--bg);
        color: var(--text);
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      a { color: var(--yellow); }
      .preview-shell {
        width: min(860px, calc(100vw - 32px));
        margin: 0 auto;
        padding: 36px 0 72px;
      }
      .back {
        display: inline-flex;
        margin-bottom: 22px;
        color: var(--yellow);
        text-decoration: none;
        font-weight: 750;
      }
      .meta {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 20px;
      }
      .pill {
        display: inline-flex;
        padding: 5px 9px;
        border: 1px solid var(--border);
        border-radius: 999px;
        color: var(--muted);
        font-size: 12px;
      }
      .article {
        background: rgba(17,17,19,0.76);
        border: 1px solid var(--border);
        border-radius: 24px;
        padding: clamp(24px, 5vw, 46px);
      }
      .article h1 {
        font-size: clamp(36px, 6vw, 58px);
        letter-spacing: -0.05em;
        line-height: 0.98;
        margin: 0 0 28px;
      }
      .article h2 {
        font-size: clamp(26px, 4vw, 34px);
        letter-spacing: -0.03em;
        margin-top: 44px;
        margin-bottom: 14px;
      }
      .article h3 {
        font-size: 22px;
        margin-top: 30px;
      }
      .article p, .article li, .article blockquote {
        font-size: 18px;
        line-height: 1.78;
        color: #d8d8dc;
      }
      .article p { margin: 0 0 18px; }
      .article ul, .article ol { padding-left: 24px; margin: 0 0 20px; }
      .article li { margin-bottom: 10px; }
      .article strong { color: #fff; }
      .article table {
        display: block;
        width: 100%;
        max-width: 100%;
        overflow-x: auto;
        margin: 28px 0;
        border: 1px solid var(--border);
        border-radius: 16px;
        border-spacing: 0;
        border-collapse: separate;
      }
      .article th,
      .article td {
        min-width: 160px;
        padding: 12px 14px;
        border-right: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
        text-align: left;
        color: #d8d8dc;
      }
      .article th {
        color: #fff;
        background: rgba(255,255,255,0.08);
      }
      .article tr:last-child td {
        border-bottom: 0;
      }
      .article th:last-child,
      .article td:last-child {
        border-right: 0;
      }
      .article blockquote {
        margin: 24px 0;
        padding: 18px 20px;
        border-left: 4px solid var(--yellow);
        background: rgba(255,255,255,0.05);
        border-radius: 14px;
      }
    </style>
  </head>
  <body>
    <main class="preview-shell">
      <a href="/" class="back">Back to dashboard</a>
      <div class="meta">
        <span class="pill">${escapeHtml(post.source)}</span>
        <span class="pill">${escapeHtml(post.frontmatter.category || '')}</span>
        <span class="pill">${escapeHtml(post.wordCount)} words</span>
        <span class="pill">${escapeHtml(post.filePath)}</span>
      </div>
      <article class="article">
        ${
          post.frontmatter.image
            ? `<img class="hero-image" src="${escapeHtml(post.frontmatter.image)}" alt="${escapeHtml(post.frontmatter.imageAlt || post.frontmatter.title || post.slug)}" />`
            : ''
        }
        ${renderMarkdown(post.body)}
      </article>
    </main>
  </body>
</html>`

  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
  response.end(html)
}

await hydrateDaemonFromSettings()

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url || '/', `http://127.0.0.1:${PORT}`)

    if (request.method === 'POST' && url.pathname === '/toggle') {
      await handleToggle(response)
      return
    }

    if (request.method === 'POST' && url.pathname === '/run-now') {
      await handleRunNow(response)
      return
    }

    if (request.method === 'POST' && url.pathname === '/settings') {
      await handleSettings(request, response)
      return
    }

    if (request.method === 'POST' && url.pathname === '/posts/publish') {
      await handlePublishPost(request, response)
      return
    }

    if (request.method === 'POST' && url.pathname === '/posts/delete') {
      await handleDeletePost(request, response)
      return
    }

    if (request.method === 'GET' && url.pathname === '/preview') {
      await renderPreviewPage(url, response)
      return
    }

    if (request.method === 'GET' && url.pathname === '/status.json') {
      const state = await dashboardState()
      response.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      })
      response.end(JSON.stringify(statusPayload(state)))
      return
    }

    if (request.method === 'GET' && url.pathname.startsWith('/static/')) {
      await servePublicAsset(url, response)
      return
    }

    if (request.method !== 'GET' || url.pathname !== '/') {
      response.writeHead(404, { 'Content-Type': 'text/plain' })
      response.end('Not found')
      return
    }

    const state = await dashboardState()
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    response.end(render(state))
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end(error instanceof Error ? error.stack : String(error))
  }
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Blog automation dashboard running at http://127.0.0.1:${PORT}`)
})
