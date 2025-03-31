import { useContext, useState } from "react";
import { LoginModel } from "../models/LoginModel";
import { extractErrorMessage } from "../util/SistemaUtil";
import { AuthContext } from "../context/AuthProvider";

export const useLoginViewModel = () => {

    const [errorMessage, setErrorMessage] = useState( null );
    const [infoMessage, setInfoMessage] = useState( null );

    const [loading, setLoading] = useState( false );

    const loginModel = new LoginModel();

    const {setToken} = useContext(AuthContext);

    const limpaToken = async () => {
        setToken( null );
    };

    const logar = async ( loginObj ) => { 
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