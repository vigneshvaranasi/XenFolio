import { createContext } from "react";
export const userStoreContext = createContext(null);

/*
import { createContext, useContext } from "react";

// Type definition for the context value
export type UserStoreType = {
    user: string;
    setUser: (user: string) => void;
};

// Create the context with an undefined default
export const userStoreContext = createContext<UserStoreType | undefined>(undefined);

// Custom hook to access the context
export const useUserStore = () => {
    const context = useContext(userStoreContext);
    if (!context) {
        throw new Error("useUserStore must be used within a UserStore");
    }
    return context;
};

*/