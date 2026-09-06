export interface RichTextSpan { text: string; href?: string; bold?: boolean; italic?: boolean; code?: boolean }
export interface ArticleBlock { id: string; type: string; richText?: RichTextSpan[]; level?: number; url?: string; caption?: string; checked?: boolean; language?: string; children?: ArticleBlock[] }
export interface ArticleSummary { id: string; title: string; slug: string; excerpt: string; category: string; publishedAt: string; publishedAtIso?: string; updatedAt?: string; cover?: string }
export interface ArticleDetail extends ArticleSummary { blocks: ArticleBlock[]; seoTitle?: string; seoDescription?: string; noIndex?: boolean }
export interface SupporterGroup { tier: string; members: string[] }
export interface SupporterMonth { month: string; label: string; message: string; groups: SupporterGroup[] }
export interface SupporterProfile { id: string; name: string; supporterId: string; totalMonths: number; joinedAt?: string; lastSupported?: string; currentTier: string; highestTier?: string; emoji?: string; message?: string; badge: string; featured: boolean; order: number }
export interface SupporterOverview { profiles: SupporterProfile[]; earliestMonth: string }
