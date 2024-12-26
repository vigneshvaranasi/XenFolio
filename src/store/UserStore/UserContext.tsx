import React, { createContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
console.log(CLIENT_ID)
export type UserType = {
    username: string|null,
}

type UserContextType = {
    user: UserType | null
    setUser: React.Dispatch<React.SetStateAction<UserType>>,
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    handleLogin: ({ }) => Promise<void>,
    handleLogout: () => Promise<void>,
    code: string | null,
    setCode: React.Dispatch<React.SetStateAction<string | null>>,
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>,
    accessToken: string | null,
}

export const UserContext = createContext<UserContextType | null>(null)

type UserContextProviderProps = {
    children: React.ReactNode
}


export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState<UserType>({ username: null });
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [code, setCode] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const savedCode = new URLSearchParams(window.location.search).get('code');
        if (savedCode && !code) {
          setCode(savedCode);
          setIsLoggedIn(true);
        }
      }, [code]);

    const handleLogin = async ({ }) => {
        console.log('clientID: ', CLIENT_ID);
        // const redirectURI = 'https://4cfw3zvk-8888.inc1.devtunnels.ms/';
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo,user,workflow`;
        // setIsLoggedIn(true);        
    }

    const handleLogout = async () => {
        setUser({ username: null });
        setIsLoggedIn(false);
        setCode(null);
    }

    return (
        <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, handleLogin, handleLogout, code, setCode, setAccessToken, accessToken }}>
            {children}
        </UserContext.Provider>
    )
}