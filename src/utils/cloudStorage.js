import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.trim()
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()
const TABLE_NAME = 'elite_app_state'

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

const supabase =
  isValidHttpUrl(SUPABASE_URL) && normalizedSupabaseUrl && SUPABASE_ANON_KEY
    ? createClient(normalizedSupabaseUrl, SUPABASE_ANON_KEY)
    : null

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
