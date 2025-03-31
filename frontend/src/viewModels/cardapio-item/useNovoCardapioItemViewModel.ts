import { useContext, useState } from "react";
import { CardapioItemModel } from "../../models/CardapioItemModel";
import { AuthContext } from "../../context/AuthProvider";
import { extractErrorMessage } from "../../util/SistemaUtil";
import { SaveCardapioItem } from "@/models/dtos/CardapioItem";

const useNovoCardapioItemViewModel = () => {

    const [errorMessage, setErrorMessage] = useState<string | null>( null );
    const [infoMessage, setInfoMessage] = useState<string | null>( null );
    const [loading, setLoading] = useState<boolean>( false );

    const cardapioItemModel = new CardapioItemModel();

    const {token} = useContext(AuthContext);

    const save = async ( item : SaveCardapioItem ) => {
        setInfoMessage( null );
        setErrorMessage( null );
        setLoading( true );

        try {
            await cardapioItemModel.novo( item, token );

            setInfoMessage( "Item registrado com sucesso!")
            setLoading( false );
        } catch( error ) {
            setErrorMessage( extractErrorMessage( error ) );
            setLoading( false );
            throw error;
        }
    }

    return {
        save,
        errorMessage,
        infoMessage,
        loading
    }

};

export default useNovoCardapioItemViewModel;