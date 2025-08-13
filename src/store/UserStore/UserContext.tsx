import React, { createContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { BACKEND_URL, FRONTEND_URL } from '../../config'
import { User } from '../../types/user'
import { CLIENT_ID } from '../../config'
// console.log(CLIENT_ID)

type UserContextType = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  handleLogin: ({}) => Promise<void>
  handleLogout: () => Promise<void>
  code: string | null
  setCode: React.Dispatch<React.SetStateAction<string | null>>
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
  accessToken: string | null
  loading: boolean
}

export const UserContext = createContext<UserContextType | null>(null)

type UserContextProviderProps = {
  children: React.ReactNode
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [code, setCode] = useState<string | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  
  useEffect(() => {
    const savedCode = new URLSearchParams(window.location.search).get('code')
    if (savedCode && !code) {
      setCode(savedCode)
      setLoading(true)
      setIsLoggedIn(true)
    }
    if (localStorage.getItem('accessToken')) {
      let currToken = localStorage.getItem('accessToken')!
      let headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Accept', 'application/json')
      headers.append('Origin', FRONTEND_URL)
      headers.append('token', currToken)
      setAccessToken(localStorage.getItem('accessToken'))
      // setIsLoggedIn(true);
      fetch(`${BACKEND_URL}/auth/verify`, {
        method: 'POST',
        headers: headers
      })
        .then(response => response.json())
        .then(data => {
          // console.log(data.success);
          if (data.success) {
            // console.log('Access Token: ', data.message);
            setAccessToken(data.message)
            localStorage.setItem('accessToken', data.message)
            setUser({
              username: data.dbData.username,
              avatar_url: data.dbData.avatar,
              isRecentConfig: data.dbData.isRecentConfig,
              craftBenches: data.dbData.craftBenches
            })
            setIsLoggedIn(true)            
          } else {
            console.error('Error: ', data)
            setIsLoggedIn(false)
          }
        })
        .catch(error => console.error('Error fetching access token:', error))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const handleLogin = async ({}) => {
    // console.log('clientID: ', CLIENT_ID);
    // const redirectURI = 'https://4cfw3zvk-8888.inc1.devtunnels.ms/';
    window.location.href = 
    `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo,user,workflow,delete_repo`
    // setIsLoggedIn(true);
  }

  const handleLogout = async () => {
    setUser(null)
    
    setIsLoggedIn(false)
    setCode(null)
    localStorage.clear()
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        handleLogin,
        handleLogout,
        code,
        setCode,
        setAccessToken,
        accessToken,
        loading
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
