import fs from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

import { countWords, createMdx, extractHeadings } from './lib/content.mjs'
import { generatedBlogImagesDir } from './lib/paths.mjs'
import { ensureDir, fileExists } from './lib/store.mjs'

const DEFAULT_IMAGE_SETTINGS = {
  enabled: true,
  required: true,
  model: 'gpt-image-2',
  size: '1536x1024',
  quality: 'medium',
  format: 'webp',
  maxWidth: 1400,
  webpQuality: 78,
  outputDir: generatedBlogImagesDir,
  publicPath: '/static/blog-generated',
  minPerPost: 1,
  maxPerPost: 3,
  inline: {
    enabled: true,
    minWordCount: 1600,
    secondImageMinWordCount: 3200,
  },
}

function imageSettings(settings) {
  const configured = settings.images || {}
  const resolved = {
    ...DEFAULT_IMAGE_SETTINGS,
    ...configured,
    inline: {
      ...DEFAULT_IMAGE_SETTINGS.inline,
      ...(configured.inline || {}),
    },
  }

  const outputDir = path.isAbsolute(resolved.outputDir)
    ? resolved.outputDir
    : path.resolve(process.cwd(), resolved.outputDir)
  const veliteAssetsDir = path.join(process.cwd(), 'public/static/blog')

  if (outputDir === veliteAssetsDir || outputDir.startsWith(`${veliteAssetsDir}${path.sep}`)) {
    throw new Error(
      'Blog generated image outputDir cannot be inside public/static/blog because Velite cleans that directory during build. Use public/static/blog-generated instead.'
    )
  }

  return resolved
}

function safeImageSlug(slug) {
  return String(slug)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function imageFileName(article, slotId) {
  const slug = safeImageSlug(article.slug)
  return slotId === 'hero' ? `${slug}.webp` : `${slug}-${slotId}.webp`
}

function buildImagePrompt({ article, topic }) {
  const title = article.frontmatter.title || topic.topic
  const category = article.frontmatter.category || topic.category
  const keyword = article.frontmatter.primaryKeyword || topic.primaryKeyword
  const description = article.frontmatter.description || topic.searchIntent || ''

  return [
    'Create a premium editorial hero image for an Interview Pilot blog article.',
    `Article title: ${title}`,
    `Primary keyword: ${keyword}`,
    `Category: ${category}`,
    `Article summary: ${description}`,
    '',
    'Visual direction:',
    '- Modern job interview, recruiting, career, or AI assistant editorial concept.',
    '- Premium dark background with subtle warm yellow Interview Pilot accent lighting.',
    '- Clean composition with strong focal point and generous negative space.',
    '- Suitable as a website blog hero image.',
    '- No readable text, captions, words, logos, brand marks, app-store badges, watermarks, or UI screenshots.',
    '- Avoid fake statistics, recognizable celebrities, copyrighted characters, and competitor branding.',
  ].join('\n')
}

function buildInlineImagePrompt({ article, topic, slot }) {
  const title = article.frontmatter.title || topic.topic
  const keyword = article.frontmatter.primaryKeyword || topic.primaryKeyword

  return [
    'Create a premium editorial inline image for an Interview Pilot blog article section.',
    `Article title: ${title}`,
    `Primary keyword: ${keyword}`,
    `Section title: ${slot.heading}`,
    `Image purpose: ${slot.purpose}`,
    '',
    'Visual direction:',
    '- Modern editorial illustration for a career, interview, recruiting, or AI workplace article.',
    '- Premium dark background with subtle warm yellow Interview Pilot accent lighting.',
    '- Clear single idea that supports the section, not a generic stock image.',
    '- No readable text, captions, words, logos, brand marks, app-store badges, watermarks, or UI screenshots.',
    '- Avoid fake statistics, recognizable celebrities, copyrighted characters, and competitor branding.',
  ].join('\n')
}

function imageAltText({ article, topic }) {
  const title = article.frontmatter.title || topic.topic
  return `Editorial illustration for ${title}`
}

function inlineImageAltText({ article, slot }) {
  const title = article.frontmatter.title || 'Interview Pilot article'
  return `Illustration for ${slot.heading} in ${title}`
}

function sectionLooksVisual(heading) {
  return /\b(example|examples|template|templates|checklist|steps|framework|questions|answers|mistakes|resume|cover letter|linkedin|salary|timeline|process|strategy|comparison|data|research)\b/i.test(
    heading
  )
}

function shouldSkipHeading(heading) {
  return /\b(introduction|conclusion|final thoughts|next steps|quick answer|key takeaways|faq|frequently asked)\b/i.test(
    heading
  )
}

function selectInlineImageSlots({ article, settings }) {
  const inlineSettings = settings.inline || {}
  if (!inlineSettings.enabled) return []

  const maxInlineImages = Math.max(0, (settings.maxPerPost || 1) - 1)
  if (maxInlineImages === 0) return []

  const wordCount = countWords(article.body)
  if (wordCount < inlineSettings.minWordCount) return []

  const h2s = extractHeadings(article.body)
    .filter((heading) => heading.depth === 2)
    .map((heading) => heading.text)
    .filter((heading) => heading && !shouldSkipHeading(heading))

  if (!h2s.length) return []

  const targetCount =
    wordCount >= inlineSettings.secondImageMinWordCount
      ? Math.min(2, maxInlineImages)
      : Math.min(1, maxInlineImages)

  const visualHeadings = h2s.filter(sectionLooksVisual)
  const candidates = [...visualHeadings, ...h2s.filter((heading) => !visualHeadings.includes(heading))]
  const selected = []

  for (const heading of candidates) {
    if (selected.includes(heading)) continue
    selected.push(heading)
    if (selected.length >= targetCount) break
  }

  return selected.map((heading, index) => ({
    id: `inline-${index + 1}`,
    type: 'inline',
    heading,
    purpose: `Support the section "${heading}" with a useful editorial visual.`,
  }))
}

async function requestImage({ prompt, settings, model }) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY. Set it before generating blog images.')
  }

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      prompt,
      size: settings.size,
      quality: settings.quality,
      output_format: settings.format,
      n: 1,
    }),
  })

  const raw = await response.text()
  if (!response.ok) {
    const error = new Error(`OpenAI image generation failed for ${model}: ${response.status} ${raw}`)
    error.status = response.status
    error.raw = raw
    throw error
  }

  const json = JSON.parse(raw)
  const image = json.data?.[0]
  if (image?.b64_json) return Buffer.from(image.b64_json, 'base64')

  if (image?.url) {
    const imageResponse = await fetch(image.url)
    if (!imageResponse.ok) {
      throw new Error(`OpenAI image URL fetch failed: ${imageResponse.status}`)
    }
    return Buffer.from(await imageResponse.arrayBuffer())
  }

  throw new Error('OpenAI image generation returned no image data')
}

async function generateImageBuffer({ prompt, settings }) {
  return {
    model: settings.model,
    buffer: await requestImage({ prompt, settings, model: settings.model }),
  }
}

async function optimizeAndWriteImage({ inputBuffer, article, settings, slotId }) {
  const fileName = imageFileName(article, slotId)
  const outputDir = path.isAbsolute(settings.outputDir)
    ? settings.outputDir
    : path.resolve(process.cwd(), settings.outputDir)
  const outputPath = path.join(outputDir, fileName)

  await ensureDir(outputDir)

  await sharp(inputBuffer)
    .rotate()
    .resize({
      width: settings.maxWidth,
      withoutEnlargement: true,
    })
    .webp({
      quality: settings.webpQuality,
      effort: 6,
    })
    .toFile(outputPath)

  const publicPath = `${settings.publicPath.replace(/\/$/, '')}/${fileName}`
  return { outputPath, publicPath }
}

export async function attachGeneratedImage({ article, topic, settings }) {
  const resolvedSettings = imageSettings(settings)
  if (!resolvedSettings.enabled) return article

  const imagePrompt = buildImagePrompt({ article, topic })
  const imageAlt = imageAltText({ article, topic })
  const imagePath = `${resolvedSettings.publicPath.replace(/\/$/, '')}/${imageFileName(article, 'hero')}`
  const absolutePath = path.join(
    path.isAbsolute(resolvedSettings.outputDir)
      ? resolvedSettings.outputDir
      : path.resolve(process.cwd(), resolvedSettings.outputDir),
    imageFileName(article, 'hero')
  )

  let generatedModel = article.frontmatter.imageModel
  if (!(await fileExists(absolutePath))) {
    const generated = await generateImageBuffer({ prompt: imagePrompt, settings: resolvedSettings })
    const written = await optimizeAndWriteImage({
      inputBuffer: generated.buffer,
      article,
      settings: resolvedSettings,
      slotId: 'hero',
    })
    generatedModel = generated.model

    const exists = await fileExists(written.outputPath)
    if (!exists) {
      throw new Error(`Generated image was not written for ${article.slug}`)
    }
  }

  const generatedImages = [
    {
      type: 'hero',
      path: imagePath,
      alt: imageAlt,
      model: generatedModel || resolvedSettings.model,
      prompt: imagePrompt,
    },
  ]
  let body = article.body

  for (const slot of selectInlineImageSlots({ article, settings: resolvedSettings })) {
    const prompt = buildInlineImagePrompt({ article, topic, slot })
    const alt = inlineImageAltText({ article, slot })
    const publicPath = `${resolvedSettings.publicPath.replace(/\/$/, '')}/${imageFileName(article, slot.id)}`
    const outputPath = path.join(
      path.isAbsolute(resolvedSettings.outputDir)
        ? resolvedSettings.outputDir
        : path.resolve(process.cwd(), resolvedSettings.outputDir),
      imageFileName(article, slot.id)
    )

    let model = resolvedSettings.model
    if (!(await fileExists(outputPath))) {
      const generated = await generateImageBuffer({ prompt, settings: resolvedSettings })
      const written = await optimizeAndWriteImage({
        inputBuffer: generated.buffer,
        article,
        settings: resolvedSettings,
        slotId: slot.id,
      })
      model = generated.model

      const exists = await fileExists(written.outputPath)
      if (!exists) {
        throw new Error(`Generated inline image was not written for ${article.slug}: ${slot.id}`)
      }
    }

    const imageMarkdown = `![${alt}](${publicPath})`
    const headingPattern = new RegExp(`(^##\\s+${slot.heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$)`, 'm')
    body = body.replace(headingPattern, `$1\n\n${imageMarkdown}`)

    generatedImages.push({
      type: 'inline',
      id: slot.id,
      section: slot.heading,
      path: publicPath,
      alt,
      model,
      prompt,
    })
  }

  const frontmatter = {
    ...article.frontmatter,
    image: imagePath,
    imageAlt,
    imagePrompt,
    imageModel: generatedModel || resolvedSettings.model,
    generatedImages,
  }

  return {
    ...article,
    body,
    frontmatter,
    mdx: createMdx(frontmatter, body),
  }
}

export async function removeGeneratedImageForSlug(slug, settings) {
  const resolvedSettings = imageSettings(settings)
  const outputDir = path.isAbsolute(resolvedSettings.outputDir)
    ? resolvedSettings.outputDir
    : path.resolve(process.cwd(), resolvedSettings.outputDir)
  const outputPath = path.join(outputDir, `${safeImageSlug(slug)}.webp`)
  try {
    await fs.unlink(outputPath)
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error
  }
}
