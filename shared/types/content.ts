export interface ArticleSummary { id: string; title: string; slug: string; excerpt: string; category: string; publishedAt: string; cover?: string }
export interface SupporterGroup { tier: string; members: string[] }
export interface SupporterMonth { month: string; label: string; message: string; groups: SupporterGroup[] }
