import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'

import { contentPostsDir, draftsDir, repoRoot } from './lib/paths.mjs'
import { ensureDir } from './lib/store.mjs'

function runGit(args) {
  return new Promise((resolve, reject) => {
    const child = spawn('git', args, { cwd: repoRoot })
    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString()
    })
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString()
    })
    child.on('close', (code) => {
      if (code === 0) resolve({ stdout, stderr })
      else reject(new Error(`git ${args.join(' ')} failed: ${stderr || stdout}`))
    })
  })
}

async function writeArticleFile(article, directory) {
  await ensureDir(directory)
  const filePath = path.join(directory, `${article.slug}.mdx`)
  await fs.writeFile(filePath, article.mdx)
  return filePath
}

function publicPathToFilePath(publicPath) {
  if (!publicPath || typeof publicPath !== 'string') return null
  if (!publicPath.startsWith('/')) return null
  return path.join(repoRoot, 'public', publicPath.replace(/^\/+/, ''))
}

async function collectExistingImageFiles(article) {
  const imagePaths = new Set()
  const heroImagePath = publicPathToFilePath(article.frontmatter?.image)

  if (heroImagePath) imagePaths.add(heroImagePath)

  for (const image of article.frontmatter?.generatedImages || []) {
    const imagePath = publicPathToFilePath(image.path)
    if (imagePath) imagePaths.add(imagePath)
  }

  const existingFiles = []
  for (const imagePath of imagePaths) {
    try {
      await fs.access(imagePath)
      existingFiles.push(imagePath)
    } catch {
      throw new Error(`Generated image is referenced but missing: ${path.relative(repoRoot, imagePath)}`)
    }
  }

  return existingFiles
}

export async function publishArticles({ articles, settings }) {
  const mode = settings.publishing.mode
  const targetDir = mode === 'draft-only' ? draftsDir : contentPostsDir
  const writtenFiles = []
  const imageFiles = []

  for (const article of articles) {
    writtenFiles.push(await writeArticleFile(article, targetDir))
    imageFiles.push(...(await collectExistingImageFiles(article)))
  }

  if (mode === 'draft-only') {
    return {
      mode,
      writtenFiles,
      imageFiles,
      committed: false,
      pushed: false,
    }
  }

  const filesToStage = Array.from(new Set([...writtenFiles, ...imageFiles]))

  await runGit(['add', ...filesToStage.map((filePath) => path.relative(repoRoot, filePath))])
  await runGit(['commit', '-m', settings.publishing.commitMessage])

  if (mode === 'commit-and-push') {
    await runGit(['push', 'origin', settings.publishing.branch])
  }

  return {
    mode,
    writtenFiles,
    imageFiles,
    committed: true,
    pushed: mode === 'commit-and-push',
  }
}
