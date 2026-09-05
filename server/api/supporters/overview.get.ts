import type { SupporterOverview } from '../../../shared/types/content'
import { getSupporterOverview, notionClient } from '../../utils/notion'

export default defineCachedEventHandler(async (): Promise<SupporterOverview> => {
  const config = useRuntimeConfig()
  if (!config.notionToken || !config.notionSupporterProfilesDataSourceId) return { profiles: [], earliestMonth: new Date().toISOString().slice(0, 7) }
  return getSupporterOverview(notionClient(config.notionToken), config.notionSupporterProfilesDataSourceId)
}, { maxAge: 3600, name: 'supporters-overview' })
