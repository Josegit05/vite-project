import { LoginContext } from "./LoginContext";
import { useState } from "react";

export const LoginProvider=({ children}) =>{
    const [loginData, setLoginData]= useState({
        username: "",
        email: "",
        password: "",
    });

    const updateLoginData= (data) => {
        setLoginData(data);
    };

    return(
        <LoginContext.Provider value={{ loginData, updateLoginData}}>
            {children}
        </LoginContext.Provider>
    );
};