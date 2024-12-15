import { useState } from "react";
import { userStoreContext } from "./userContext";

type UserStoreType = {
    user: String;
    setUser: (user:String)=>void;
}

function UserStore({children}:any) {
    let [user,setUser] = useState<String>("");
    return (
        <userStoreContext.Provider value={{user,setUser}}>
            {children}
        </userStoreContext.Provider>
    )
}
export default UserStore


/*

import React, { useState, ReactNode } from "react";
import { userStoreContext, UserStoreType } from "./userContext";

// The provider component
function UserStore({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<string>("");

    // Create the context value
    const contextValue: UserStoreType = { user, setUser };

    return (
        <userStoreContext.Provider value={contextValue}>
            {children}
        </userStoreContext.Provider>
    );
}

export default UserStore;

*/



// import React, { createContext, Dispatch, SetStateAction } from 'react';

// // Define the type for the context's state
// interface UserContextType {
//   user: string;
//   setUser: Dispatch<SetStateAction<string>>;
// }

// // Create the context with default values (for type safety)
// export const userStoreContext = createContext<UserContextType | undefined>(undefined);



// import React, { useState } from "react";
// import { userStoreContext } from "./userContext";

// // Define the type for the props of the component
// interface UserStoreProps {
//   children: React.ReactNode;
// }

// function UserStore({ children }: UserStoreProps) {
//   const [user, setUser] = useState<string>("");

//   return (
//     <userStoreContext.Provider value={{ user, setUser }}>
//       {children}
//     </userStoreContext.Provider>
//   );
// }

// export default UserStore;
