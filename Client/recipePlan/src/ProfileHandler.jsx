import React, { use, useEffect, useState } from "react"
import { LoginPage } from "./LoginPage"
import { Profile } from "./UserProfile"

export const ProfileHandler = () => {
    const [token, setToken] = useState(() => localStorage.getItem("token") || "");
    
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token"); // Clean up if token is removed
        }
    }, [token]);
    
    return(
        <tokenContext.Provider value={[token,setToken]}>
        {token?<Profile/>:<LoginPage/>}
        </tokenContext.Provider>
        
)}

export const tokenContext = React.createContext()