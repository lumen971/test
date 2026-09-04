import { mockArticles } from '../../utils/mock-content'
import { getArticle, notionClient } from '../../utils/notion'
export default defineCachedEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') || ''
  const config = useRuntimeConfig()
  const article = config.notionToken && config.notionArticlesDataSourceId
    ? await getArticle(notionClient(config.notionToken), config.notionArticlesDataSourceId, slug)
    : mockArticles.find(item => item.slug === slug)
  if (!article) throw createError({ statusCode: 404, statusMessage: 'Article not found' })
  return { ...article, blocks: 'blocks' in article ? article.blocks : [] }
}, { maxAge: 300, name: 'article-detail', getKey: event => getRouterParam(event, 'slug') || '' })
