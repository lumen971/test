import { getSupportersByMonth, notionClient } from '../../utils/notion'

export default defineCachedEventHandler(async (event) => {
  const month = getRouterParam(event, 'month') || ''
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) throw createError({ statusCode: 400, statusMessage: 'Invalid month' })
  const config = useRuntimeConfig()
  if (!config.notionToken || !config.notionSupportersDataSourceId) return null
  return getSupportersByMonth(notionClient(config.notionToken), config.notionSupportersDataSourceId, month)
}, { maxAge: 86400, name: 'supporters-history' })
