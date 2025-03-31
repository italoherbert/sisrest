import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { CardapioItemModel } from "../../models/CardapioItemModel";
import { extractErrorMessage } from "../../util/SistemaUtil";

const useTelaCardapioItemViewModel = () => {
    
    const [errorMessage, setErrorMessage] = useState<string | null>( null );
    const [infoMessage, setInfoMessage] = useState<string | null>( null );
    const [loading, setLoading] = useState<boolean>( false );

    const {token} = useContext(AuthContext);

    const cardapioItemModel = new CardapioItemModel();

    const filtra = async ( filterDescricao : string ) => {
        setInfoMessage( null );
        setErrorMessage( null );
        return apenasFiltra( filterDescricao );
    };

    const apenasFiltra = async ( filterDescricao : string ) => {
        setLoading( true );

        try {
            const response = await cardapioItemModel.filtra( filterDescricao, token );
            setLoading( false );
            return response.data;
        } catch ( error ) {
            setErrorMessage( extractErrorMessage( error ) );
            setLoading( false );
            throw error;
        }
    };

    const remove = async ( itemId : number ) => {
        setErrorMessage( null );
        setInfoMessage( null );
        setLoading( true );

        try {
            await cardapioItemModel.deleta( itemId, token );
                       
            setInfoMessage( 'Item deletado com sucesso.');            
            setLoading( false );
        } catch( error ) {
            setErrorMessage( extractErrorMessage( error ) );
            setLoading( false );
            throw error;
        }
    };

    const buscaDescricao = async ( itemId : number ) => {
        setErrorMessage( null );
        setInfoMessage( null );
        setLoading( true );

        try {
            const response = await cardapioItemModel.get( itemId, token );                      
            
            setLoading( false );
            return response.data.descricao;
        } catch( error ) {
            setErrorMessage( extractErrorMessage( error ) );
            setLoading( false );            
            throw error;
        };
    };

    return {
        filtra,
        apenasFiltra,
        remove,
        buscaDescricao,
        errorMessage,
        infoMessage,
        loading
    }

};

export default useTelaCardapioItemViewModel;