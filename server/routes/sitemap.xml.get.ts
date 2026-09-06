import { getArticles, notionClient } from '../utils/notion'
import { mockArticles } from '../utils/mock-content'

function escapeXml(value: string): string {
  return value.replace(/[<>&'\"]/g, character => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[character] || character)
}

export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = String(config.public.siteUrl || 'https://witchlumen.com').replace(/\/$/, '')
  const articles = config.notionToken && config.notionArticlesDataSourceId
    ? await getArticles(notionClient(config.notionToken), config.notionArticlesDataSourceId)
    : mockArticles
  const staticPages = ['/', '/about', '/articles', '/events', '/supporters', '/2026-blessing-light']
  const urls = [
    ...staticPages.map(path => ({ loc: `${siteUrl}${path}`, lastmod: undefined })),
    ...articles.map(article => ({ loc: `${siteUrl}/articles/${article.slug}`, lastmod: article.updatedAt || article.publishedAtIso }))
  ]
  const entries = urls.map(item => `  <url>\n    <loc>${escapeXml(item.loc)}</loc>${item.lastmod ? `\n    <lastmod>${escapeXml(item.lastmod)}</lastmod>` : ''}\n  </url>`).join('\n')
  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`
}, { maxAge: 3600, name: 'sitemap' })
