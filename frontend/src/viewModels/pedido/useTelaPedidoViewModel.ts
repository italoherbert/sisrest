import { AuthContext } from "@/context/AuthProvider";
import { Pedido } from "@/models/dtos/Pedido";
import PedidoModel from "@/models/PedidoModel";
import { extractErrorMessage } from "@/util/SistemaUtil";
import { useContext, useState } from "react";

const useTelaPedidoViewModel = () => {

    const [errorMessage, setErrorMessage] = useState<string | null>( null );
    const [infoMessage, setInfoMessage] = useState<string | null>( null );
    const [loading, setLoading] = useState<boolean>( false );

    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [pedido, setPedido] = useState<Pedido>({
        id: 0,
        mesa: 0,
        atendido: false,
        items: []
    });

    const {token} = useContext(AuthContext);

    const pedidoModel = new PedidoModel();

    const loadPedidos = async () => {        
        setLoading( true );

        try {
            const response = await pedidoModel.listar( token );
            setPedidos( response.data );
            setLoading( false );
        } catch ( error ) {
            setErrorMessage( extractErrorMessage( error ) );
            setLoading( false );
            throw error;
        }
    };

    const loadPedidosPelaMesa = async ( mesa : number ) => {        
        setLoading( true );

        try {
            const response = await pedidoModel.listarPorMesa( mesa, token );
            setPedidos( response.data );
            setLoading( false );
        } catch ( error ) {
            setErrorMessage( extractErrorMessage( error ) );
            setLoading( false );
            throw error;
        }
    };

    const setAtendido = async ( pedidoId : number, atendido : boolean ) => {        
        setLoading( true );

        try {
            await pedidoModel.setAtendido( pedidoId, atendido, token );

            if ( atendido === true )
                setInfoMessage( "Pedido atendido com sucesso." );
            else setInfoMessage( "Pedido atendido desmarcado com sucesso." );

            setLoading( false );
        } catch ( error ) {
            setErrorMessage( extractErrorMessage( error ) );
            setLoading( false );
            throw error;
        }
    }

    const removePedido = async ( pedidoId : number ) => {        
        setLoading( true );

        try {
            await pedidoModel.delete( pedidoId, token );

            setInfoMessage( "Pedido deletado com sucesso." );
            setLoading( false );
        } catch ( error ) {
            setErrorMessage( extractErrorMessage( error ) );
            setLoading( false );
            throw error;
        }
    }

    const loadPedido = async ( pedidoId : number ) => {
        setLoading( true )  
        
        try {
            const response = await pedidoModel.get( pedidoId, token );
            setPedido( response.data );
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
        loadPedidos,
        loadPedidosPelaMesa,
        setAtendido,
        removePedido,
        loadPedido,
        limpaMessages,
        pedidos,
        pedido,
        errorMessage,
        infoMessage,
        loading,
        setErrorMessage
    }

};

export default useTelaPedidoViewModel;