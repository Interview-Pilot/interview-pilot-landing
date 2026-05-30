# Blog Automation System

The blog system is a local 24/7 automation service controlled by one dashboard.
It is not exposed publicly by the production website.

## Start Dashboard

```bash
cd /Users/jerryding123/Projects/interview-pilot/landing
pnpm blog:dashboard
```

Dashboard:

```text
http://127.0.0.1:7788
```

## Operator Model

The dashboard exposes:

- Start / Stop
- Generate Now
- Settings
- System status
- Run progress bar
- Topic queue
- Latest run report
- Logs

`Generate Now` runs one complete automation cycle immediately without requiring
the scheduler to be enabled. It still uses the same internal pipeline: topic
top-up, research, generation, quality checks, draft/publish, and preview.

During a run, the dashboard shows live progress for queue loading, topic
discovery, research, generation, validation, and draft writing. The page polls
the local `/status.json` endpoint while a run is active.

The dashboard does not expose separate internal buttons for research, quality
checks, or drafting. Those remain internal pipeline steps.

## Runtime Flow

When started, the daemon stays alive inside the dashboard process, begins one
run immediately, and then continues on the configured schedule:

```text
top up topic queue if below threshold
→ dedupe against queued topics, drafts, published posts, and history
→ research topic if required
→ generate full article with OpenAI Responses API
→ run quality gates
→ generate and optimize a hero image
→ run final quality gates
→ write MDX
→ optionally commit/push based on settings
```

If `OPENAI_API_KEY` is missing, the run fails explicitly. It does not generate
fake content.

## Topic Discovery

The topic queue is self-replenishing. Before each scheduled generation run, the
automation checks the number of eligible queued topics. If the queue is below
the configured threshold, it discovers new topics using:

- current Google News RSS inputs from `editorial/research-sources.json`;
- the existing topic queue;
- existing drafts and published posts;
- generation history;
- search-demand editorial instructions for interviews, recruiting, AI tools,
  career, research, and companies.

Discovered topics are validated, deduplicated, written back to
`editorial/topics.json`, and then consumed by the normal generation pipeline.
This is intentionally one automated system; topic discovery is not a separate
dashboard workflow.

## Generated Post Preview

Generated drafts and published posts appear in the dashboard under
`Generated Posts`. Each row has an `Open preview` link that renders the article
body locally without deploying it.

## Rich Article Structures

Generated posts are expected to use purposeful rich structures instead of plain
paragraphs and bullets only. The approved MDX components are:

- `Callout`: quick answers, warnings, common mistakes, and key takeaways.
- `AnswerBlock`: interview questions with sample answers and explanations.
- `TemplateBlock`: reusable emails, resume bullets, scripts, and templates.
- `Checklist`: preparation and review checklists.
- `StepList`: numbered workflows and how-to sequences.
- `ExampleGrid` and `ExampleCard`: compact side-by-side examples.
- `StatCard`: sourced statistics only.

Markdown tables are enabled through `remark-gfm` and styled in the blog MDX
renderer. The pipeline also normalizes blank lines inside generated Markdown
tables so they render as real HTML tables.

## Generated Images

Every generated post requires a hero image by default.

Image settings live in `editorial/settings.json` under `images`:

- `model`: primary OpenAI image model.
- `size`: requested generation size.
- `maxWidth`: final optimized asset width.
- `webpQuality`: final WebP compression quality.
- `outputDir`: local asset directory.
- `publicPath`: public URL path written into MDX frontmatter.

The pipeline generates one image after the article passes text quality gates,
optimizes it with `sharp`, writes it to `public/static/blog-generated`, and adds
`image`, `imageAlt`, `imagePrompt`, and `imageModel` to frontmatter. The
`public/static/blog` directory is reserved for Velite-managed assets and is
cleaned during builds, so generated images must not be stored there. If image
generation fails while images are required, the post is not written.

## Research Rules

Not every post requires research.

- `news-analysis`, `research-report`, and `trend-analysis` require sources.
- Evergreen candidate playbooks and how-to guides can run without external
  sources if they avoid factual news/statistical claims.
- Topic-level fields control this:
  - `researchRequired`
  - `sourceDepth`

## Publishing Modes

- `draft-only`: writes generated MDX to `editorial/drafts`.
- `commit-only`: writes generated MDX to `content/posts` and commits.
- `commit-and-push`: writes, commits, and pushes to GitHub.

## Required Environment

Create a local-only env file:

```bash
cd /Users/jerryding123/Projects/interview-pilot/landing
printf 'OPENAI_API_KEY=sk-...\n' > .env.local
```

Optional:

```bash
printf 'BLOG_DASHBOARD_PORT=7788\n' >> .env.local
```

`.env.local` is gitignored and is loaded only by the local blog automation
dashboard. Shell environment variables still work and take priority over the
file.

## Public Blog Routes

```text
/blog
/blog/interviews
/blog/recruiting
/blog/ai-tools
/blog/career
/blog/research
/blog/companies
/blog/[slug]
```

Category pages are SEO hubs. Tag pages are intentionally not generated.
