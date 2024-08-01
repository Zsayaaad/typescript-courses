import { fetchRecord } from './lib/registry'

const book = fetchRecord('book', 'bk_123')
const magazine = fetchRecord('magazine', 'bk_123')
const video = fetchRecord('video', 'bk_123')
