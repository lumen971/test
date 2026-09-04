import { Client } from '@notionhq/client'
import type { ArticleBlock, ArticleDetail, ArticleSummary, RichTextSpan, SupporterMonth } from '../../shared/types/content'

type NotionPage = Record<string, any>

function text(property: any): string {
  const values = property?.title || property?.rich_text || []
  return values.map((item: any) => item.plain_text || item.text?.content || '').join('').trim()
}

function richText(values: any[] = []): RichTextSpan[] {
  return values.map(item => ({
    text: item.plain_text || item.text?.content || '',
    href: item.href || item.text?.link?.url || undefined,
    bold: item.annotations?.bold || undefined,
    italic: item.annotations?.italic || undefined,
    code: item.annotations?.code || undefined
  }))
}

function fileUrl(property: any): string | undefined {
  const file = property?.files?.[0]
  return file?.file?.url || file?.external?.url
}

function dateLabel(value?: string): string {
  if (!value) return ''
  return new Intl.DateTimeFormat('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Taipei' }).format(new Date(value)).replaceAll('/', '.')
}

function mapSummary(page: NotionPage): ArticleSummary {
  const properties = page.properties || {}
  return {
    id: page.id,
    title: text(properties.Title),
    slug: text(properties.Slug),
    excerpt: text(properties.Excerpt),
    category: properties.Category?.select?.name || '靈性札記',
    publishedAt: dateLabel(properties['Published At']?.date?.start || page.created_time),
    cover: fileUrl(properties.Cover) || page.cover?.external?.url || page.cover?.file?.url
  }
}

async function listAll(client: Client, dataSourceId: string, body: Record<string, any>) {
  const results: any[] = []
  let cursor: string | undefined
  do {
    const response: any = await client.dataSources.query({ data_source_id: dataSourceId, ...body, start_cursor: cursor })
    results.push(...response.results)
    cursor = response.has_more ? response.next_cursor : undefined
  } while (cursor)
  return results
}

async function children(client: Client, blockId: string): Promise<ArticleBlock[]> {
  const raw: any[] = []
  let cursor: string | undefined
  do {
    const response: any = await client.blocks.children.list({ block_id: blockId, start_cursor: cursor, page_size: 100 })
    raw.push(...response.results)
    cursor = response.has_more ? response.next_cursor : undefined
  } while (cursor)

  return Promise.all(raw.map(async block => {
    const value = block[block.type] || {}
    const mapped: ArticleBlock = { id: block.id, type: block.type }
    if (value.rich_text) mapped.richText = richText(value.rich_text)
    if (block.type.startsWith('heading_')) mapped.level = Number(block.type.slice(-1))
    if (block.type === 'image') {
      mapped.url = value.file?.url || value.external?.url
      mapped.caption = value.caption?.map((item: any) => item.plain_text).join('')
    }
    if (block.type === 'to_do') mapped.checked = value.checked
    if (block.type === 'code') mapped.language = value.language
    if (block.has_children) mapped.children = await children(client, block.id)
    return mapped
  }))
}

export function notionClient(token: string) {
  return new Client({ auth: token, notionVersion: '2026-03-11' })
}

export async function getArticles(client: Client, dataSourceId: string): Promise<ArticleSummary[]> {
  const pages = await listAll(client, dataSourceId, {
    filter: { property: 'Status', status: { equals: 'Published' } },
    sorts: [{ property: 'Published At', direction: 'descending' }]
  })
  return pages.map(mapSummary).filter(item => item.title && item.slug)
}

export async function getArticle(client: Client, dataSourceId: string, slug: string): Promise<ArticleDetail | null> {
  const pages = await listAll(client, dataSourceId, {
    filter: { and: [
      { property: 'Status', status: { equals: 'Published' } },
      { property: 'Slug', rich_text: { equals: slug } }
    ] },
    page_size: 1
  })
  const page = pages[0]
  if (!page) return null
  const properties = page.properties || {}
  return {
    ...mapSummary(page),
    blocks: await children(client, page.id),
    seoTitle: text(properties['SEO Title']) || undefined,
    seoDescription: text(properties['SEO Description']) || undefined,
    noIndex: properties['No Index']?.checkbox || false
  }
}

export async function getLatestSupporters(client: Client, dataSourceId: string): Promise<SupporterMonth | null> {
  const pages = await listAll(client, dataSourceId, {
    filter: { property: 'Published', checkbox: { equals: true } },
    sorts: [{ property: 'Month', direction: 'descending' }, { property: 'Order', direction: 'ascending' }]
  })
  const latest = pages[0]?.properties?.Month?.date?.start?.slice(0, 7)
  if (!latest) return null
  const monthPages = pages.filter(page => page.properties?.Month?.date?.start?.startsWith(latest))
  const tierMap = new Map<string, string[]>()
  for (const page of monthPages) {
    const tier = page.properties?.Tier?.select?.name || '流明微光'
    const name = text(page.properties?.Name)
    if (name) tierMap.set(tier, [...(tierMap.get(tier) || []), name])
  }
  const label = new Intl.DateTimeFormat('zh-TW', { year: 'numeric', month: 'long', timeZone: 'Asia/Taipei' }).format(new Date(`${latest}-01T00:00:00+08:00`))
  return { month: latest, label, message: '謝謝每一道讓旅程得以延續的光。', groups: [...tierMap].map(([tier, members]) => ({ tier, members })) }
}
