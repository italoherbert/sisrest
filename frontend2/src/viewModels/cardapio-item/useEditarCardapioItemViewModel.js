import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { CardapioItemModel } from "../../models/CardapioItemModel";
import { extractErrorMessage } from "../../util/SistemaUtil";



const useEditarCardapioItemViewModel = () => {

    const [errorMessage, setErrorMessage] = useState( null );
    const [infoMessage, setInfoMessage] = useState( null );
    const [loading, setLoading] = useState( false );
    
    const {token} = useContext(AuthContext);

    const cardapioItemModel = new CardapioItemModel();

    const loadItem = async ( itemId ) => {
        setErrorMessage( null );
        setInfoMessage( null );
        setLoading( true );

        try {
            const response = await cardapioItemModel.get( itemId, token )

            setLoading( false );
            return response.data;
        } catch ( error ) {
            setErrorMessage( extractErrorMessage( error ) );
            setLoading( false );            
            throw error;
        }
    };

    const saveItem = async ( itemId, item ) => {
        setErrorMessage( null );
        setInfoMessage( null );
        setLoading( true );

        try {
            await cardapioItemModel.altera( itemId, item, token );
            setInfoMessage( 'Item salvo com sucesso.' );
            setLoading( false );
        } catch ( error ) {
            setErrorMessage( extractErrorMessage( error ) );
            setLoading( false );            
            throw error;
        }
    };

    return {
        loadItem,
        saveItem,
        errorMessage,
        infoMessage,
        loading
    }

};

export default useEditarCardapioItemViewModel;