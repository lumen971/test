import { mockSupporters } from '../../utils/mock-content'
import { getLatestSupporters, notionClient } from '../../utils/notion'
export default defineCachedEventHandler(async () => {
  const config = useRuntimeConfig()
  if (!config.notionToken || !config.notionSupportersDataSourceId) return mockSupporters
  return await getLatestSupporters(notionClient(config.notionToken), config.notionSupportersDataSourceId) || mockSupporters
}, { maxAge: 300, name: 'supporters-latest' })
