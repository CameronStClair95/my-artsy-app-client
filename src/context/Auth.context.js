import React, { useState, useEffect } from 'react';
import axios from "axios"
const API_URL = "http://localhost:3000"

const AuthContext = React.createContext()

function AuthProviderWrapper(props){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    function authenticateUser(){
        const storedToken = localStorage.getItem("authToken")

        if (storedToken){
            axios.get(`${API_URL}/auth/verify`, {headers: {Authorization: `Bearer ${storedToken}`}})
                .then((response) => {
                    const user = response.data
                    setIsLoggedIn(true);
                    setIsLoading(false);
                    setUser(user); 
                })
                .catch((error) => {
                    setIsLoggedIn(false);
                    setIsLoading(false);
                    setUser(null); 
                })
        } else {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);   
        }
    }

    function removeToken(){
        localStorage.removeItem("authToken")
    }

    function logOutUser(){
        removeToken()
        authenticateUser()
    }

    useEffect(() => {
        authenticateUser()
    },[])

    return (
        <AuthContext.Provider value={{isLoggedIn, isLoading, user, authenticateUser, logOutUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthProviderWrapper, AuthContext}