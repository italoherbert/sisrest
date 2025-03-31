import { createContext, ReactNode, useEffect, useState } from "react";

const tokenType = {
    token : '',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setToken: ( t:string ) => {}
}

export const AuthContext = createContext( tokenType );

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({children} : AuthProviderProps) => {
    const [token, setToken] = useState<string>( () => {
        if ( typeof window !== 'undefined' )
            return localStorage.getItem( 'token' )!;                            
        return '';
    } );

    useEffect( () => {
        localStorage.setItem( 'token', token! );
    }, [token] );

    return (
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    );
};