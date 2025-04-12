import { useContext, useState } from "react";
import PedidoModel from "@/models/PedidoModel";
import { AuthContext } from "@/context/AuthProvider";
import { extractErrorMessage } from "@/util/SistemaUtil";
import MesaItem from "@/models/dtos/MesaItem";

const useMesaAtendimentoViewModel = () => {

    const [errorMessage, setErrorMessage] = useState<string | null>( null );
    const [infoMessage, setInfoMessage] = useState<string | null>( null );
    const [loading, setLoading] = useState<boolean>( false );

    const [mesaItems, setMesaItems] = useState<MesaItem[]>([]);   
    const [total, setTotal] = useState<number>( 0 );

    const {token} = useContext(AuthContext);

    const pedidoModel = new PedidoModel();

    const loadMesa = async ( mesa : number ) : Promise<boolean> => {
        setLoading( true );
        try {
            const resp = await pedidoModel.listarPorMesa( mesa, token );

            const items : MesaItem[] = [];
            let tot = 0;

            resp.data.forEach( ( pedido ) => {
                if ( pedido.atendido === false ) {
                    pedido.items.forEach( ( item ) => {
                        tot += item.cardapioItem.preco * item.quantidade;
                        items.push( { 
                            descricao: item.cardapioItem.descricao,
                            preco: item.cardapioItem.preco,
                            quantidade: item.quantidade
                        } );
                    } );
                }
            } );

            setMesaItems( items );
            setTotal( tot );

            if ( resp.data.length === 0 )
                setInfoMessage( `Nenhum pedido para mesa: ${mesa}`)

            setLoading( false );

            return ( resp.data.length > 0 );
        } catch ( error ) {
            setErrorMessage( extractErrorMessage( error ) );
            setLoading( false );
            throw error;
        }
    };

    const limpaMessages = () => {
        setErrorMessage( null );
        setInfoMessage( null );
    }

    return {
        loadMesa,
        limpaMessages,
        mesaItems,
        total,
        errorMessage,
        infoMessage,
        loading,
        setErrorMessage
    }

};

export default useMesaAtendimentoViewModel;