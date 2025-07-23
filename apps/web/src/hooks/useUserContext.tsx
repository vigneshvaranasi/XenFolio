import { useContext } from "react"
import { UserContext } from "../store/UserStore/UserContext"

export const useUserContext=()=>{
    const context = useContext(UserContext);
    if(context===null){
        throw new Error("useUserContext must be used within a UserContextProvider")
    }
    return context;
}

