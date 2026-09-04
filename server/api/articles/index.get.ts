import { mockArticles } from '../../utils/mock-content'
export default defineCachedEventHandler(async () => {
  const config = useRuntimeConfig()
  if (!config.notionToken || !config.notionArticlesDataSourceId) return mockArticles
  // Notion mapper will replace this fallback after the Data Source is connected.
  return mockArticles
}, { maxAge: 300, name: 'articles-list' })
