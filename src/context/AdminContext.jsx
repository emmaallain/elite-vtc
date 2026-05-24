import { useEffect, useMemo, useState } from 'react'
import { AdminContext } from './admin-context'
import { getSupabaseClient, isCloudStorageEnabled } from '../utils/cloudStorage'

const ADMIN_STORAGE_KEY = 'elite-vtc-admin-enabled'
const DEFAULT_ADMIN_CODE = 'emma'
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL?.trim().toLowerCase()
const ENABLE_LEGACY_CODE_FALLBACK =
  import.meta.env.DEV || import.meta.env.VITE_ENABLE_LEGACY_ADMIN_CODE === 'true'

function getExpectedCode() {
  const envCode = import.meta.env.VITE_ADMIN_CODE?.trim()
  return envCode || DEFAULT_ADMIN_CODE
}

function getInitialAdminState() {
  if (typeof window === 'undefined') {
    return false
  }

  return window.localStorage.getItem(ADMIN_STORAGE_KEY) === '1'
}

export function AdminProvider({ children }) {
  const [isLocalAdmin, setIsLocalAdmin] = useState(getInitialAdminState)
  const [sessionEmail, setSessionEmail] = useState('')
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false)
  const [adminCodeInput, setAdminCodeInput] = useState('')
  const [adminEmailInput, setAdminEmailInput] = useState('')
  const [adminPasswordInput, setAdminPasswordInput] = useState('')
  const [adminError, setAdminError] = useState('')
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false)
  const supabase = getSupabaseClient()
  const isSupabaseAuthEnabled = isCloudStorageEnabled()
  const canUseLegacyCodeMode = !isSupabaseAuthEnabled && ENABLE_LEGACY_CODE_FALLBACK

  const isSessionAdmin =
    Boolean(sessionEmail) && (!ADMIN_EMAIL || sessionEmail.toLowerCase() === ADMIN_EMAIL)
  const isAdmin = isSupabaseAuthEnabled ? isSessionAdmin : canUseLegacyCodeMode ? isLocalAdmin : false

  useEffect(() => {
    if (isSupabaseAuthEnabled || !canUseLegacyCodeMode) {
      return
    }

    window.localStorage.setItem(ADMIN_STORAGE_KEY, isLocalAdmin ? '1' : '0')
  }, [isLocalAdmin, isSupabaseAuthEnabled, canUseLegacyCodeMode])

  useEffect(() => {
    if (!isSupabaseAuthEnabled || !supabase) {
      return undefined
    }

    let isMounted = true

    const hydrate = async () => {
      const { data } = await supabase.auth.getSession()
      const currentEmail = data.session?.user?.email || ''

      if (isMounted) {
        setSessionEmail(currentEmail)
      }
    }

    hydrate()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionEmail(session?.user?.email || '')
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [isSupabaseAuthEnabled, supabase])

  const requestAdminAccess = () => {
    setAdminCodeInput('')
    setAdminEmailInput('')
    setAdminPasswordInput('')
    setAdminError('')
    setIsAdminDialogOpen(true)
    return true
  }

  const submitAdminCode = async () => {
    if (isSupabaseAuthEnabled && supabase) {
      const email = adminEmailInput.trim().toLowerCase()
      const password = adminPasswordInput

      if (!email || !password) {
        setAdminError('Email et mot de passe requis')
        return false
      }

      setIsSubmittingAuth(true)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      setIsSubmittingAuth(false)

      if (error) {
        setAdminError('Connexion admin invalide')
        return false
      }

      const signedEmail = data.user?.email?.toLowerCase() || ''

      if (ADMIN_EMAIL && signedEmail !== ADMIN_EMAIL) {
        await supabase.auth.signOut()
        setAdminError('Compte non autorise pour l admin')
        return false
      }

      setSessionEmail(signedEmail)
      setIsAdminDialogOpen(false)
      setAdminCodeInput('')
      setAdminEmailInput('')
      setAdminPasswordInput('')
      setAdminError('')
      return true
    }

    if (!canUseLegacyCodeMode) {
      setAdminError('Connexion admin uniquement via Supabase')
      return false
    }

    if (adminCodeInput.trim() === getExpectedCode()) {
      setIsLocalAdmin(true)
      setIsAdminDialogOpen(false)
      setAdminCodeInput('')
      setAdminEmailInput('')
      setAdminPasswordInput('')
      setAdminError('')
      return true
    }

    setAdminError('Code invalide')
    return false
  }

  const closeAdminDialog = () => {
    setIsAdminDialogOpen(false)
    setAdminCodeInput('')
    setAdminEmailInput('')
    setAdminPasswordInput('')
    setAdminError('')
    setIsSubmittingAuth(false)
  }

  const disableAdmin = async () => {
    if (isSupabaseAuthEnabled && supabase) {
      await supabase.auth.signOut()
      setSessionEmail('')
    } else if (canUseLegacyCodeMode) {
      setIsLocalAdmin(false)
    }

    closeAdminDialog()
  }

  const value = useMemo(
    () => ({
      isAdmin,
      adminSessionEmail: isSessionAdmin ? sessionEmail : '',
      isSupabaseAuthEnabled,
      canUseLegacyCodeMode,
      isAdminDialogOpen,
      adminCodeInput,
      adminEmailInput,
      adminPasswordInput,
      adminError,
      isSubmittingAuth,
      requestAdminAccess,
      setAdminCodeInput,
      setAdminEmailInput,
      setAdminPasswordInput,
      submitAdminCode,
      closeAdminDialog,
      disableAdmin,
    }),
    [
      isAdmin,
      sessionEmail,
      isSessionAdmin,
      isSupabaseAuthEnabled,
      canUseLegacyCodeMode,
      isAdminDialogOpen,
      adminCodeInput,
      adminEmailInput,
      adminPasswordInput,
      adminError,
      isSubmittingAuth,
    ],
  )

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}
