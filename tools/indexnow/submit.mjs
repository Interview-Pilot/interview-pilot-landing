const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'
const INDEXNOW_KEY = '79d47d4d02142eb9cf6034077f8a40dd'
const SITE_HOST = 'www.interviewpilot.app'
const KEY_LOCATION = `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`

const requestedUrls = process.argv.slice(2)

if (requestedUrls.length === 0) {
  console.error(
    'Usage: pnpm indexnow -- https://www.interviewpilot.app/page-to-submit',
  )
  process.exit(1)
}

if (requestedUrls.length > 10_000) {
  console.error('IndexNow accepts at most 10,000 URLs in one request.')
  process.exit(1)
}

const urlList = requestedUrls.map((value) => {
  let url

  try {
    url = new URL(value)
  } catch {
    throw new Error(`Invalid URL: ${value}`)
  }

  if (url.protocol !== 'https:' || url.hostname !== SITE_HOST) {
    throw new Error(
      `IndexNow URLs must use the canonical site host: https://${SITE_HOST}`,
    )
  }

  return url.href
})

const response = await fetch(INDEXNOW_ENDPOINT, {
  method: 'POST',
  headers: {
    'content-type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify({
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }),
})

if (response.status !== 200 && response.status !== 202) {
  const responseBody = await response.text()
  throw new Error(
    `IndexNow rejected the submission (${response.status} ${response.statusText})${
      responseBody ? `: ${responseBody}` : ''
    }`,
  )
}

console.log(
  `IndexNow accepted ${urlList.length} URL${urlList.length === 1 ? '' : 's'} (${response.status}).`,
)
