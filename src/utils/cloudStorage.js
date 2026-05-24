import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.trim()
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()
const TABLE_NAME = 'elite_app_state'
const SUPABASE_SINGLETON_KEY = '__eliteVtcSupabaseClient__'

function isValidHttpUrl(value) {
  if (!value) {
    return false
  }

  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function getNormalizedHttpOrigin(value) {
  if (!value) {
    return null
  }

  try {
    const parsedUrl = new URL(value)
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return null
    }

    return parsedUrl.origin
  } catch {
    return null
  }
}

const normalizedSupabaseUrl = getNormalizedHttpOrigin(SUPABASE_URL)

function getOrCreateSupabaseClient() {
  if (!(isValidHttpUrl(SUPABASE_URL) && normalizedSupabaseUrl && SUPABASE_ANON_KEY)) {
    return null
  }

  const globalScope = globalThis
  const existingClient = globalScope[SUPABASE_SINGLETON_KEY]

  if (existingClient) {
    return existingClient
  }

  const client = createClient(normalizedSupabaseUrl, SUPABASE_ANON_KEY)
  globalScope[SUPABASE_SINGLETON_KEY] = client
  return client
}

const supabase = getOrCreateSupabaseClient()

export function getSupabaseClient() {
  return supabase
}

export function isCloudStorageEnabled() {
  return Boolean(supabase)
}

export async function readCloudArray(datasetKey) {
  if (!supabase) {
    return null
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('payload')
    .eq('id', datasetKey)
    .maybeSingle()

  if (error) {
    console.error('Cloud read failed:', error)
    return null
  }

  if (!data || !Array.isArray(data.payload)) {
    return null
  }

  return data.payload
}

export async function writeCloudArray(datasetKey, payload) {
  if (!supabase) {
    return
  }

  const { error } = await supabase.from(TABLE_NAME).upsert(
    {
      id: datasetKey,
      payload,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'id' },
  )

  if (error) {
    console.error('Cloud write failed:', error)
  }
}
