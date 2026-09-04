import { mockArticles } from '../../utils/mock-content'
import { getArticles, notionClient } from '../../utils/notion'
export default defineCachedEventHandler(async () => {
  const config = useRuntimeConfig()
  if (!config.notionToken || !config.notionArticlesDataSourceId) return mockArticles
  return getArticles(notionClient(config.notionToken), config.notionArticlesDataSourceId)
}, { maxAge: 300, name: 'articles-list' })
