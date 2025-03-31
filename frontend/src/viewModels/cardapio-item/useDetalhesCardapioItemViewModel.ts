import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { extractErrorMessage } from "../../util/SistemaUtil";
import { CardapioItemModel } from "../../models/CardapioItemModel";
import { CardapioItem } from "@/models/dtos/CardapioItem";

const useDetalhesCardapioItemViewModel = () => {

    const [errorMessage, setErrorMessage] = useState<string | null>( null );
    const [loading, setLoading] = useState<boolean>( false );

    const [item, setItem] = useState<CardapioItem>( { id : 0, descricao: '', preco: 0 } ); 
    
    const {token} = useContext(AuthContext);

    const cardapioItemModel = new CardapioItemModel();

    const loadItem = async (itemId : number) => {
        try {
            const response = await cardapioItemModel.get( itemId, token );
            setItem( response.data );
            setLoading( false );
        } catch ( error ) {
            setErrorMessage( extractErrorMessage( error ) );
            setLoading( false );
            throw error;
        }
    };

    return {
        loadItem,
        item,
        errorMessage,
        loading
    }

};

export default useDetalhesCardapioItemViewModel;