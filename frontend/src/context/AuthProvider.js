import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState( () => {
        if ( typeof window !== 'undefined' )
            return localStorage.getItem( 'token' );        
        return '';
    } );

    useEffect( () => {
        localStorage.setItem( 'token', token );
    }, [token] );

    return (
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    );
};