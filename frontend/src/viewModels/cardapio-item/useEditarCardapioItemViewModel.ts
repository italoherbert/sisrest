import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { CardapioItemModel } from "../../models/CardapioItemModel";
import { extractErrorMessage } from "../../util/SistemaUtil";
import CardapioItem from "@/models/dtos/CardapioItem";



const useEditarCardapioItemViewModel = () => {

    const [errorMessage, setErrorMessage] = useState<string | null>( null );
    const [infoMessage, setInfoMessage] = useState<string | null>( null );
    const [loading, setLoading] = useState<boolean>( false );
    
    const {token} = useContext(AuthContext);

    const cardapioItemModel = new CardapioItemModel();

    const loadItem = async ( itemId : number ) => {
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

    const saveItem = async ( itemId : number, item : CardapioItem ) => {
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