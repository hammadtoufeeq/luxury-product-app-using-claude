import { useState } from 'react'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [notice, setNotice] = useState(null)

  function login(email) {
    setUserEmail(email)
    setIsLoggedIn(true)
  }

  function logout() {
    setIsLoggedIn(false)
    setUserEmail('')
  }

  function requireLogin() {
    if (isLoggedIn) return true
    setNotice({ key: Date.now() })
    return false
  }

  function dismissNotice() {
    setNotice(null)
  }

  const value = {
    isLoggedIn,
    userEmail,
    login,
    logout,
    requireLogin,
    notice,
    dismissNotice,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
