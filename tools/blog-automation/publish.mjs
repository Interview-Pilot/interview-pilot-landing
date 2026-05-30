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

export async function publishArticles({ articles, settings }) {
  const mode = settings.publishing.mode
  const targetDir = mode === 'draft-only' ? draftsDir : contentPostsDir
  const writtenFiles = []

  for (const article of articles) {
    writtenFiles.push(await writeArticleFile(article, targetDir))
  }

  if (mode === 'draft-only') {
    return {
      mode,
      writtenFiles,
      committed: false,
      pushed: false,
    }
  }

  await runGit(['add', ...writtenFiles.map((filePath) => path.relative(repoRoot, filePath))])
  await runGit(['commit', '-m', settings.publishing.commitMessage])

  if (mode === 'commit-and-push') {
    await runGit(['push', 'origin', settings.publishing.branch])
  }

  return {
    mode,
    writtenFiles,
    committed: true,
    pushed: mode === 'commit-and-push',
  }
}
