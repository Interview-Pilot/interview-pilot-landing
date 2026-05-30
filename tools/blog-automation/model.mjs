function extractOutputText(response) {
  if (typeof response.output_text === 'string') return response.output_text

  const chunks = []
  for (const item of response.output || []) {
    for (const content of item.content || []) {
      if (content.type === 'output_text' && content.text) chunks.push(content.text)
    }
  }
  return chunks.join('\n')
}

export async function generateWithOpenAI({ settings, instructions, input }) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY. Set it before starting the blog automation.')
  }

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: settings.generation.model,
      instructions,
      input,
    }),
  })

  const raw = await response.text()
  if (!response.ok) {
    throw new Error(`OpenAI response failed: ${response.status} ${raw}`)
  }

  const json = JSON.parse(raw)
  const output = extractOutputText(json)
  if (!output.trim()) {
    throw new Error('OpenAI returned an empty article response')
  }

  return output
}
