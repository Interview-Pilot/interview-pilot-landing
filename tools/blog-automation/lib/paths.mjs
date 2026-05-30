import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const repoRoot = path.resolve(__dirname, '../../..')
export const contentPostsDir = path.join(repoRoot, 'content/posts')
export const generatedBlogImagesDir = path.join(repoRoot, 'public/static/blog-generated')
export const editorialDir = path.join(repoRoot, 'editorial')
export const draftsDir = path.join(editorialDir, 'drafts')
export const reportsDir = path.join(editorialDir, 'reports')
export const logsDir = path.join(editorialDir, 'logs')
export const topicsPath = path.join(editorialDir, 'topics.json')
export const historyPath = path.join(editorialDir, 'history.json')
export const settingsPath = path.join(editorialDir, 'settings.json')
export const statePath = path.join(editorialDir, 'state.json')
export const researchSourcesPath = path.join(editorialDir, 'research-sources.json')
