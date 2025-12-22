import { posts } from '#content'
import { getBaseUrl } from '#lib/utils'

/**
 * Generate RSS feed for the blog
 * Accessible at /feed.xml
 */
export async function GET() {
  const baseUrl = getBaseUrl()

  const publishedPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const rssItems = publishedPosts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slugAsParams}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slugAsParams}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${post.author || 'Interview Pilot Team'}</author>
      ${post.tags?.map((tag) => `<category>${tag}</category>`).join('\n      ') || ''}
    </item>`
    )
    .join('')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Interview Pilot Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Expert interview strategies, AI preparation tips, and career insights to help you land your dream job.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/static/images/interviewpilot_newlogo.png</url>
      <title>Interview Pilot Blog</title>
      <link>${baseUrl}/blog</link>
    </image>
    ${rssItems}
  </channel>
</rss>`

  return new Response(rssFeed.trim(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
