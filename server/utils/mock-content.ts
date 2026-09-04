import type { ArticleSummary, SupporterMonth } from '../../shared/types/content'
export const mockArticles: ArticleSummary[] = [
  { id: '1', title: '當能量變得混亂：先別急著做任何事', slug: 'when-energy-feels-chaotic', excerpt: '在尋找解法之前，先辨認自己究竟正處於什麼狀態。', category: '能量覺察', publishedAt: '2026.09.01' },
  { id: '2', title: '新月不是許願機，而是一個重新對齊的節點', slug: 'new-moon-alignment', excerpt: '讓願望從逃離當下，轉變為與真實的自己建立連結。', category: '月相儀式', publishedAt: '2026.08.18' },
  { id: '3', title: '如何建立不消耗自己的靈性界線', slug: 'spiritual-boundaries', excerpt: '界線不是隔絕，而是讓交流能夠長久且清楚地發生。', category: '靈性日常', publishedAt: '2026.08.06' }
]
export const mockSupporters: SupporterMonth = { month: '2026-09', label: '二〇二六年九月', message: '因為你們的支持，我能持續創作、直播，也能把更多溫柔而清楚的靈性內容帶到這裡。', groups: [
  { tier: '月桂星冠', members: ['星野', '夜澄', '範例贊助人'] },
  { tier: '紫晶月光', members: ['霧島', '小暮', '範例名字 A', '範例名字 B'] },
  { tier: '流明微光', members: ['Hikari', 'Luna', '範例名字 C', '範例名字 D', '範例名字 E'] }
] }
