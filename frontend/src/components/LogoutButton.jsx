import React from "react";
import { useAuthStore } from "../store/useAuthStore";


const LogoutButton = ({children, onClick, className, ...props})=>{
    const {logout} = useAuthStore()

    const handleLogout = async(e)=>{
        if(onClick) onClick(e);
        await logout();
    }

    return (
        <button className={className || "btn btn-primary"} onClick={handleLogout} {...props}> 
            {children}
        </button>
    )
}

export default LogoutButton;