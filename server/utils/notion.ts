import { Client } from '@notionhq/client'
import type { ArticleBlock, ArticleDetail, ArticleSummary, RichTextSpan, SupporterMonth, SupporterOverview, SupporterProfile } from '../../shared/types/content'

type NotionPage = Record<string, any>

function text(property: any): string {
  const values = property?.title || property?.rich_text || []
  const richTextValue = values.map((item: any) => item.plain_text || item.text?.content || '').join('').trim()
  return richTextValue || property?.select?.name?.trim() || property?.formula?.string?.trim() || ''
}

function propertyByName(properties: Record<string, any>, name: string): any {
  const expectedName = name.trim().toLocaleLowerCase('en-US')
  const matchedName = Object.keys(properties).find(key => key.trim().toLocaleLowerCase('en-US') === expectedName)
  return matchedName ? properties[matchedName] : undefined
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

async function resolveDataSourceId(client: Client, id: string): Promise<string> {
  try {
    await client.dataSources.retrieve({ data_source_id: id })
    return id
  } catch (dataSourceError) {
    try {
      const database: any = await client.databases.retrieve({ database_id: id })
      const dataSourceId = database.data_sources?.[0]?.id
      if (!dataSourceId) throw new Error('Database does not contain a data source')
      return dataSourceId
    } catch {
      throw dataSourceError
    }
  }
}

export async function getArticles(client: Client, dataSourceId: string): Promise<ArticleSummary[]> {
  const resolvedId = await resolveDataSourceId(client, dataSourceId)
  const pages = await listAll(client, resolvedId, {
    filter: { property: 'Status', status: { equals: 'Published' } },
    sorts: [{ property: 'Published At', direction: 'descending' }]
  })
  return pages.map(mapSummary).filter(item => item.title && item.slug)
}

export async function getArticle(client: Client, dataSourceId: string, slug: string): Promise<ArticleDetail | null> {
  const resolvedId = await resolveDataSourceId(client, dataSourceId)
  const pages = await listAll(client, resolvedId, {
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
  const resolvedId = await resolveDataSourceId(client, dataSourceId)
  const response: any = await client.dataSources.query({
    data_source_id: resolvedId,
    filter: { property: 'Published', checkbox: { equals: true } },
    sorts: [{ property: 'Month', direction: 'descending' }],
    page_size: 1
  })
  const latest = response.results?.[0]?.properties?.Month?.date?.start?.slice(0, 7)
  if (!latest) return null
  return getSupportersByMonth(client, resolvedId, latest, true)
}

function monthBounds(month: string) {
  const [year, monthNumber] = month.split('-').map(Number)
  const next = new Date(Date.UTC(year, monthNumber, 1))
  return { start: `${month}-01`, end: next.toISOString().slice(0, 10) }
}

export async function getSupportersByMonth(client: Client, dataSourceId: string, month: string, resolved = false): Promise<SupporterMonth | null> {
  const resolvedId = resolved ? dataSourceId : await resolveDataSourceId(client, dataSourceId)
  const bounds = monthBounds(month)
  const monthPages = await listAll(client, resolvedId, {
    filter: { and: [
      { property: 'Published', checkbox: { equals: true } },
      { property: 'Month', date: { on_or_after: bounds.start } },
      { property: 'Month', date: { before: bounds.end } }
    ] },
    sorts: [{ property: 'Order', direction: 'ascending' }]
  })
  if (!monthPages.length) return null
  const tierMap = new Map<string, string[]>()
  for (const page of monthPages) {
    const tier = page.properties?.Tier?.select?.name || '流明微光'
    const name = text(page.properties?.Name)
    if (name) tierMap.set(tier, [...(tierMap.get(tier) || []), name])
  }
  const label = new Intl.DateTimeFormat('zh-TW', { year: 'numeric', month: 'long', timeZone: 'Asia/Taipei' }).format(new Date(`${month}-01T00:00:00+08:00`))
  return { month, label, message: '謝謝每一道讓旅程得以延續的光。', groups: [...tierMap].map(([tier, members]) => ({ tier, members })) }
}

function rollupNumber(property: any): number { return property?.rollup?.number ?? property?.number ?? 0 }
function rollupDate(property: any): string | undefined { return property?.rollup?.date?.start || property?.date?.start || undefined }

function earnedBadge(months: number): string {
  if (months >= 48) return '傳說花火'
  if (months >= 36) return '不滅花火'
  if (months >= 24) return '永續星芒'
  if (months >= 12) return '一周年星辰'
  if (months >= 6) return '長明燭火'
  return '初燃微光'
}

function mapSupporterProfile(page: NotionPage): SupporterProfile {
  const properties = page.properties || {}
  const totalMonths = rollupNumber(properties['Total Months'])
  return {
    id: page.id,
    name: text(properties.Name),
    supporterId: text(properties['Supporter ID']),
    totalMonths,
    joinedAt: rollupDate(properties['Joined At']),
    lastSupported: rollupDate(properties['Last Supported']),
    currentTier: properties['Current Tier']?.select?.name || '流明微光',
    highestTier: properties['Highest Tier']?.select?.name || undefined,
    emoji: text(propertyByName(properties, 'Emoji')) || undefined,
    message: text(properties.Message) || undefined,
    badge: properties.Badge?.select?.name || earnedBadge(totalMonths),
    featured: properties.Featured?.checkbox || false,
    order: properties.Order?.number ?? 9999
  }
}

export async function getSupporterOverview(client: Client, dataSourceId: string): Promise<SupporterOverview> {
  const resolvedId = await resolveDataSourceId(client, dataSourceId)
  const pages = await listAll(client, resolvedId, {})
  const allProfiles = pages
    .filter(page => page.properties?.Public?.checkbox === true)
    .map(mapSupporterProfile)
    .filter(profile => profile.name)
  const profiles = allProfiles
    .filter(profile => profile.featured || profile.totalMonths >= 6)
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.totalMonths - a.totalMonths || a.order - b.order)
  const dates = allProfiles.map(profile => profile.joinedAt).filter((date): date is string => Boolean(date)).sort()
  return { profiles, earliestMonth: dates[0]?.slice(0, 7) || new Date().toISOString().slice(0, 7) }
}
