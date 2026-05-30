import { createMdx, normalizeMarkdownTables, slugify } from './lib/content.mjs'
import { generateWithOpenAI } from './model.mjs'

function today() {
  return new Date().toISOString().slice(0, 10)
}

function articleInstructions(settings) {
  return `You are the Interview Pilot editorial engine.

Write complete, publishable MDX blog articles for www.interviewpilot.app.

Hard requirements:
- Return ONLY valid JSON with keys: frontmatter, body.
- frontmatter must be an object.
- body must be a complete MDX markdown article.
- No placeholder text.
- No TODOs.
- No fake citations.
- No unsupported statistics.
- If sources are provided, use only those sources for current/news/data claims.
- If no sources are provided, write evergreen advice and avoid specific factual market claims.
- Include exactly one H1 at the top of body.
- Use practical candidate-facing advice.
- Use internal links naturally where relevant.
- Minimum body length target: ${settings.generation.minimumWordCount} words.
- Keep brand tone direct, useful, and credible.

Approved rich MDX components:
- <Callout type="quick-answer|tip|warning|mistake|takeaway|note" title="...">...</Callout>
- <AnswerBlock question="...">...</AnswerBlock>
- <TemplateBlock title="...">...</TemplateBlock>
- <Checklist title="...">...</Checklist>
- <StepList>...</StepList>
- <ExampleGrid><ExampleCard title="...">...</ExampleCard><ExampleCard title="...">...</ExampleCard></ExampleGrid>
- <StatCard label="..." value="..." source="...">...</StatCard>

Rich structure requirements:
- Use the approved components where they fit the search intent; do not invent new components.
- Use at least two rich structures in every article: approved MDX components, Markdown tables, or both.
- Use Markdown tables for comparisons, timelines, good vs bad examples, mistakes vs fixes, or decision criteria.
- Use AnswerBlock for interview-question posts and behavioral/sample-answer content.
- Use TemplateBlock for reusable scripts, emails, cover letters, LinkedIn summaries, resumes, or answer templates.
- Use Checklist or StepList for process and how-to content.
- Use Callout for the quick answer, key takeaway, warning, or common mistake.
- Use StatCard only when a source supports the claim. Never use StatCard for unsourced statistics.
- Keep components purposeful. Do not add decorative components just to satisfy formatting.

SEO and structure requirements:
- Write for the exact primary keyword and search intent in the topic.
- Make the H1 closely match the article title and primary keyword.
- Start with a short direct answer or practical summary within the first 120 words.
- Use clear H2 sections that match likely sub-questions users search.
- Use H3s only when they make the article easier to scan.
- Prefer concrete examples, scripts, templates, checklists, tables, and sample answers over generic advice.
- Include a practical "quick answer" or "key takeaways" section near the top when appropriate.
- Include 5-10 specific sections for long utility articles.
- For list posts, make every item useful and specific, not filler.
- For examples/templates posts, include complete usable examples.
- For interview-question posts, include sample answers and explanation of why each answer works.
- Avoid abstract commentary, vague trends, motivational filler, and generic career advice.
- Do not over-promote Interview Pilot; mention it only where naturally useful.
- End with a concise next-step section that points to relevant internal links.`
}

function articleInput({ topic, research, settings }) {
  return JSON.stringify(
    {
      task: 'Generate one complete Interview Pilot blog post.',
      topic,
      research,
      siteContext: {
        product: 'Interview Pilot',
        audience:
          'job seekers preparing for interviews, students, professionals, and candidates improving resumes, applications, and interview performance',
        corePages: topic.internalLinks || [],
      },
      outputContract: {
        frontmatter: {
          title: 'string, <= 70 chars when possible',
          date: today(),
          lastUpdated: today(),
          lastReviewedAt: today(),
          description: 'string, 120-165 chars when possible',
          author: 'Interview Pilot Editorial Team',
          category: topic.category,
          contentType: topic.contentType,
          primaryKeyword: topic.primaryKeyword,
          secondaryKeywords: topic.secondaryKeywords || [],
          searchIntent: topic.searchIntent || 'informational',
          uniqueAngle: topic.uniqueAngle,
          freshnessType: topic.freshnessType || 'evergreen',
          sources: research.sources?.map((source) => source.url) || [],
          internalLinks: topic.internalLinks || [],
          tags: [topic.category, topic.contentType, ...(topic.secondaryKeywords || []).slice(0, 3)],
          published: true,
        },
        body:
          'complete MDX markdown article with exactly one H1, multiple search-intent H2 sections, concrete examples/templates/checklists/tables, and at least two approved rich structures where useful',
      },
      approvedMdxComponents: {
        Callout:
          '<Callout type="quick-answer" title="Quick answer">Short practical answer.</Callout>',
        AnswerBlock:
          '<AnswerBlock question="Tell me about yourself">\\n**Sample answer:** ...\\n\\n**Why it works:** ...\\n\\n**Make it yours:** ...\\n</AnswerBlock>',
        TemplateBlock:
          '<TemplateBlock title="Follow-up email template">```text\\n...\\n```</TemplateBlock>',
        Checklist: '<Checklist title="Before the interview">\\n- Item one\\n- Item two\\n</Checklist>',
        StepList: '<StepList>\\n1. Step one\\n2. Step two\\n</StepList>',
        ExampleGrid:
          '<ExampleGrid><ExampleCard title="Weak answer">...</ExampleCard><ExampleCard title="Stronger answer">...</ExampleCard></ExampleGrid>',
        StatCard:
          '<StatCard label="Survey result" value="42%" source="Source name">Use only when sourced.</StatCard>',
      },
      settings: {
        minimumWordCount: settings.generation.minimumWordCount,
      },
    },
    null,
    2
  )
}

function parseJsonFromModel(output) {
  const trimmed = output.trim()
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/)
  const jsonText = fenced ? fenced[1] : trimmed
  return JSON.parse(jsonText)
}

export async function generateArticle({ topic, research, settings }) {
  const output = await generateWithOpenAI({
    settings,
    instructions: articleInstructions(settings),
    input: articleInput({ topic, research, settings }),
  })
  const parsed = parseJsonFromModel(output)

  if (!parsed.frontmatter || !parsed.body) {
    throw new Error(`Model output missing frontmatter/body for topic: ${topic.id}`)
  }

  const slug = slugify(topic.slug || parsed.frontmatter.slug || topic.primaryKeyword || topic.topic)
  const frontmatter = {
    ...parsed.frontmatter,
    date: parsed.frontmatter.date || today(),
    lastUpdated: parsed.frontmatter.lastUpdated || today(),
    lastReviewedAt: parsed.frontmatter.lastReviewedAt || today(),
    author: parsed.frontmatter.author || 'Interview Pilot Editorial Team',
    category: topic.category,
    contentType: topic.contentType,
    primaryKeyword: topic.primaryKeyword,
    secondaryKeywords: topic.secondaryKeywords || [],
    searchIntent: topic.searchIntent || 'informational',
    uniqueAngle: topic.uniqueAngle,
    freshnessType: topic.freshnessType || 'evergreen',
    sources: research.sources?.map((source) => source.url) || [],
    internalLinks: topic.internalLinks || [],
    published: true,
  }

  const body = normalizeMarkdownTables(parsed.body)

  return {
    topicId: topic.id,
    slug,
    frontmatter,
    body,
    mdx: createMdx(frontmatter, body),
    modelOutput: output,
  }
}
