import { useContext, useState } from "react";
import { CardapioItem } from "@/models/dtos/CardapioItem";
import PedidoModel from "@/models/PedidoModel";
import { extractErrorMessage } from "@/util/SistemaUtil";
import { SavePedido } from "@/models/dtos/Pedido";
import { AuthContext } from "@/context/AuthProvider";
import { CardapioItemModel } from "@/models/CardapioItemModel";
import { SavePedidoItem } from "@/models/dtos/PedidoItem";

const useNovoPedidoViewModel = () => {

    const [errorMessage, setErrorMessage] = useState<string | null>( null );
    const [infoMessage, setInfoMessage] = useState<string | null>( null );
    const [loading, setLoading] = useState<boolean>( false );

    const [items, setItems] = useState<CardapioItem[]>([]);
    const [itemsFiltered, setItemsFiltered] = useState<CardapioItem[]>([]);
    const [itemsAdded] = useState<CardapioItem[]>([]);
    const [itemsQuantsAdded, setItemsQuantsAdded] = useState<number[]>([]);

    const pedidoModel = new PedidoModel();
    const cardapioItemModel = new CardapioItemModel();

    const {token} = useContext(AuthContext);

    const limpaItemsAdded = async () => {
        while( items.length > 0 )
            items.splice( 0, 1 );
    };

    const addItem = async ( itemId : number ) => {
        let added = false;
        for( let i = 0; added === false && i < items.length; i++ ) {
            if ( items[ i ].id === itemId ) {
                const item = items[ i ];
                items.splice( i, 1 );
                itemsAdded.push( item );
                itemsQuantsAdded.push( 1 );
                added = true;
            }
        }
    };

    const removeItem = async ( itemId : number ) => {
        let removed = false;
        for( let i = 0; removed === false && i < itemsAdded.length; i++ ) {
            if ( itemsAdded[ i ].id === itemId ) {
                const item = itemsAdded[ i ];
                itemsAdded.splice( i, 1 );
                itemsQuantsAdded.splice( i, 1 );                
                items.push( item );
                removed = true;
            }
        }
    }

    const alterItemQuantidade = async ( itemId : number, quantidade : number ) => {
        setErrorMessage( null );
        setInfoMessage( null );

        for( let i = 0; i < itemsAdded.length; i++ ) {
            if ( itemsAdded[ i ].id == itemId ) {
                itemsQuantsAdded[ i ] = quantidade;
                setInfoMessage( "Quantidade alterada com sucesso.")
                return;
            }
        }
        setErrorMessage( `O item de ID: ${itemId}, não foi encontrado.` );
    };

    const getItemDescricao = ( itemId : number ) : string => {
        for( let i = 0; i < itemsAdded.length; i++ )
            if ( itemsAdded[ i ].id == itemId )
                return itemsAdded[ i ].descricao;            
        return 'Descrição desconhecida!';
    };

    const geraSavePedidoItems = async () : Promise<SavePedidoItem[]> => {
        const pedidoItems : SavePedidoItem[] = [];
        
        itemsAdded.forEach( ( item, index ) => {     
            const quantidade = itemsQuantsAdded[ index ];      
            pedidoItems.push( {
                cardapioItemId: item.id,
                quantidade: quantidade
            } );
        } );

        return pedidoItems;
    };

    const filtraCardapioItems = async ( itemDesc : string ) => {
        const list : CardapioItem[] = [];
        for( let i = 0; i < items.length; i++ )
            if ( new RegExp( itemDesc, "gi" ).test( items[ i ].descricao ) === true )
                list.push( items[ i ] );                    

        itemsAdded.forEach( item => {
            let removido = false;
            for( let i = 0; removido === false && i < list.length; i++ ) {
                if ( item.descricao === list[ i ].descricao ) {
                    list.splice( i, 1 );
                    removido = true;
                }
            }
        } );

        setItemsFiltered( list );
    };

    const loadCardapioItems = async () => {
        setErrorMessage( null );
        setInfoMessage( null );
        setLoading( true );

        try {
            const response = await cardapioItemModel.filtra( "*", token );

            setItems( response.data );
            setItemsFiltered( response.data );
            setItemsQuantsAdded( [] );
            
            setLoading( false );
        } catch ( error ) {
            setErrorMessage( extractErrorMessage( error ) );
            setLoading( false );
        }
    }

    const createPedido = async ( pedido : SavePedido ) => {
        setErrorMessage( null );
        setInfoMessage( null );
        setLoading( true );

        try {
            await pedidoModel.novo( pedido, token );
            setInfoMessage( "Pedido registrado com sucesso." );
            setLoading( false );
        } catch ( error ) {
            setErrorMessage( extractErrorMessage( error ) );
            setLoading( false );
        }
    };

    return {
        loadCardapioItems,
        createPedido,
        limpaItemsAdded,
        addItem,
        removeItem,
        filtraCardapioItems,
        geraSavePedidoItems,
        alterItemQuantidade,
        getItemDescricao,
        items,
        itemsFiltered,
        itemsAdded,
        itemsQuantsAdded,
        errorMessage,
        infoMessage,
        loading,
        setErrorMessage
    }

};

export default useNovoPedidoViewModel;