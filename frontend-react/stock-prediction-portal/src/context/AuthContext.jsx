import { createContext, useContext, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('access_token'))
  const navigate = useNavigate()

  const login = (access, refresh) => {
    Cookies.set('access_token', access, { secure: true, sameSite: 'Lax' })
    Cookies.set('refresh_token', refresh, { secure: true, sameSite: 'Lax' })
    setIsLoggedIn(true)
  }

  const logout = () => {
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
    setIsLoggedIn(false)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
