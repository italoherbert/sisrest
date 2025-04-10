import { useContext, useState } from "react";
import { CardapioItem } from "@/models/dtos/CardapioItem";
import PedidoModel from "@/models/PedidoModel";
import { extractErrorMessage } from "@/util/SistemaUtil";
import { Pedido, SavePedido } from "@/models/dtos/Pedido";
import { AuthContext } from "@/context/AuthProvider";
import { CardapioItemModel } from "@/models/CardapioItemModel";
import { SavePedidoItem } from "@/models/dtos/PedidoItem";

const useSavePedidoViewModel = () => {

    const [errorMessage, setErrorMessage] = useState<string | null>( null );
    const [infoMessage, setInfoMessage] = useState<string | null>( null );
    const [loading, setLoading] = useState<boolean>( false );

    const [items, setItems] = useState<CardapioItem[]>([]);
    const [itemsFiltered, setItemsFiltered] = useState<CardapioItem[]>([]);
    const [itemsAdded, setItemsAdded] = useState<CardapioItem[]>([]);
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
        const list = [];

        let achou = false;
        for( let i = 0; i < itemsAdded.length; i++ ) {
            if ( itemsAdded[ i ].id === itemId ) {
                list.push( quantidade );
                achou = true;
            } else {
                list.push( itemsQuantsAdded[ i ] );
            }
        }        
        setItemsQuantsAdded( list );        

        if ( achou === true ) {
            setInfoMessage( "Quantidade alterada com sucesso.")
        } else {
            setErrorMessage( `O item de ID: ${itemId}, não foi encontrado.` );
        }        
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

    const loadAllCardapioItems = async () => {        
        setLoading( true );

        try {
            const response = await cardapioItemModel.filtra( "*", token );

            setItems( response.data );
            setItemsFiltered( response.data );
            setItemsQuantsAdded( [] );
            setItemsAdded( [] );
            
            setLoading( false );
        } catch ( error ) {
            setErrorMessage( extractErrorMessage( error ) );
            setLoading( false );
            throw error;
        }
    };

    const loadPedido = async ( pedidoId : number ) : Promise<Pedido> => {        
        setLoading( true );

        try {
            const resp = await cardapioItemModel.filtra( "*", token );
            const response = await pedidoModel.get( pedidoId, token );

            const cardapioItemList = resp.data;
            const itemsAddedList = [];
            const itemsQuantsAddedList = [];
            const pedido2 = response.data;

            for( let i = 0; i < pedido2.items.length; i++ ) {
                const cardapioItem = pedido2.items[ i ].cardapioItem;
                const quantidade = pedido2.items[ i ].quantidade;

                let achou = false;
                for( let j = 0; achou === false && j < cardapioItemList.length; j++ ) {
                    const cardapioItem2 = cardapioItemList[ j ];
                    if ( cardapioItem.id == cardapioItem2.id ) {
                        cardapioItemList.splice( j, 1 );
                        achou = true;
                    }
                }

                itemsAddedList.push( cardapioItem );
                itemsQuantsAddedList.push( quantidade );
            }

            setItems( cardapioItemList );
            setItemsFiltered( [...cardapioItemList] );
            setItemsAdded( itemsAddedList );
            setItemsQuantsAdded( itemsQuantsAddedList );

            setLoading( false );
            return pedido2;
        } catch ( error ) {
            setErrorMessage( extractErrorMessage( error ) );
            setLoading( false );
            throw error;
        }
    };

    const createPedido = async ( pedido : SavePedido ) => {        
        setLoading( true );

        try {
            await pedidoModel.novo( pedido, token );
            setInfoMessage( "Pedido registrado com sucesso." );
            setLoading( false );
        } catch ( error ) {
            setErrorMessage( extractErrorMessage( error ) );
            setLoading( false );
            throw error;
        }
    };

    const alteraPedido = async ( pedidoId : number, pedido : SavePedido ) => {        
        setLoading( true );

        try {
            await pedidoModel.altera( pedidoId, pedido, token );
            setInfoMessage( "Pedido atualizado com sucesso." );
            setLoading( false );
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
        loadAllCardapioItems,
        loadPedido,
        createPedido,
        alteraPedido,
        limpaItemsAdded,
        addItem,
        removeItem,
        filtraCardapioItems,
        geraSavePedidoItems,
        alterItemQuantidade,
        getItemDescricao,
        limpaMessages,
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

export default useSavePedidoViewModel;