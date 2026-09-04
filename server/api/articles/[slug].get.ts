import { mockArticles } from '../../utils/mock-content'
export default defineCachedEventHandler(async (event) => {
  const article = mockArticles.find(item => item.slug === getRouterParam(event, 'slug'))
  if (!article) throw createError({ statusCode: 404, statusMessage: 'Article not found' })
  return article
}, { maxAge: 300, name: 'article-detail', getKey: event => getRouterParam(event, 'slug') || '' })
