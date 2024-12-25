import React, { createContext } from 'react'
import { useState } from 'react'

export type UserType={
    username:string,
    email:string,
}

type UserContextProviderProps = {
  children: React.ReactNode
}

type UserContextType = {
    user: UserType | null
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>,
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const UserContext = createContext<UserContextType | null>(null)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser]=useState<UserType|null>(null);
    const [isLoggedIn, setIsLoggedIn]=useState<boolean>(false);

    // login Logic
    let res = fetch('http://loaclhost:5000/'){
        
    }

    // logout logic


    return (
    <UserContext.Provider value={{user,setUser,isLoggedIn,setIsLoggedIn}}>
        {children}
    </UserContext.Provider>
    )
}