import { useContext, useState } from "react";
import { LoginModel } from "../models/LoginModel";
import { extractErrorMessage } from "../util/SistemaUtil";
import { AuthContext } from "../context/AuthProvider";
import Login from "@/models/dtos/Login";

export const useLoginViewModel = () => {

    const [errorMessage, setErrorMessage] = useState<string | null>( null );
    const [infoMessage, setInfoMessage] = useState<string | null>( null );

    const [loading, setLoading] = useState<boolean>( false );

    const loginModel = new LoginModel();

    const {setToken} = useContext(AuthContext);

    const limpaToken = async () => {
        setToken( '' );
    };

    const logar = async ( loginObj : Login ) => { 
        setErrorMessage( null );
        setInfoMessage( null );
        setLoading( true );

        try {
            const response = await loginModel.login( loginObj );

            setLoading( false );
            setToken( response.data.token );
        } catch ( error ) {
            setErrorMessage( extractErrorMessage( error ) );
            setLoading( false );
            throw error;
        }
    };

    return { logar, limpaToken, errorMessage, infoMessage, loading };
    
};