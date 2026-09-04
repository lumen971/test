import { mockSupporters } from '../../utils/mock-content'
export default defineCachedEventHandler(async () => mockSupporters, { maxAge: 300, name: 'supporters-latest' })
