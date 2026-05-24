import { useEffect, useMemo, useState } from 'react'
import { AdminContext } from './admin-context'

const ADMIN_STORAGE_KEY = 'elite-vtc-admin-enabled'
const DEFAULT_ADMIN_CODE = 'emma'

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
  const [isAdmin, setIsAdmin] = useState(getInitialAdminState)
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false)
  const [adminCodeInput, setAdminCodeInput] = useState('')
  const [adminError, setAdminError] = useState('')

  useEffect(() => {
    window.localStorage.setItem(ADMIN_STORAGE_KEY, isAdmin ? '1' : '0')
  }, [isAdmin])

  const requestAdminAccess = () => {
    setAdminCodeInput('')
    setAdminError('')
    setIsAdminDialogOpen(true)
    return true
  }

  const submitAdminCode = () => {
    if (adminCodeInput.trim() === getExpectedCode()) {
      setIsAdmin(true)
      setIsAdminDialogOpen(false)
      setAdminCodeInput('')
      setAdminError('')
      return true
    }

    setAdminError('Code invalide')
    return false
  }

  const closeAdminDialog = () => {
    setIsAdminDialogOpen(false)
    setAdminCodeInput('')
    setAdminError('')
  }

  const disableAdmin = () => {
    setIsAdmin(false)
    closeAdminDialog()
  }

  const value = useMemo(
    () => ({
      isAdmin,
      isAdminDialogOpen,
      adminCodeInput,
      adminError,
      requestAdminAccess,
      setAdminCodeInput,
      submitAdminCode,
      closeAdminDialog,
      disableAdmin,
    }),
    [isAdmin, isAdminDialogOpen, adminCodeInput, adminError],
  )

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}
