import { AuthContext } from "@/context/AuthProvider";
import { Pedido } from "@/models/dtos/Pedido";
import PedidoModel from "@/models/PedidoModel";
import TypesModel from "@/models/TypesModel";
import { extractErrorMessage } from "@/util/SistemaUtil";
import { useContext, useState } from "react";
import SelectOption from "@/models/dtos/SelectOption";

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

    const [atendidoOptions, setAtendidoOptions] = useState<SelectOption[]>([]);

    const {token} = useContext(AuthContext);

    const pedidoModel = new PedidoModel();
    const typesModel = new TypesModel();

    const filtraPedidos = async ( mesa : string, atendidoOption : string ) => {
        setLoading( true );

        try {
            const response = await pedidoModel.filtrar( mesa, atendidoOption, token );            
            setPedidos( response.data );
            setLoading( false );            
        } catch ( error ) {
            setErrorMessage( extractErrorMessage( error ) );
            setLoading( false );
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

    const loadOptions = async () : Promise<{atendidoOptions: SelectOption[]}>=> {
        setLoading( true );
        try {
            const response = await typesModel.getAtendidoTypes( token );

            const atenOptions : SelectOption[] = [];
            response.data.forEach( ( op ) => {
                atenOptions.push( { label : op.label, value : op.name } )
            } );
            setAtendidoOptions( atenOptions );

            setLoading( false );

            return {
                atendidoOptions : atenOptions
            }
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
        loadOptions,
        filtraPedidos,
        setAtendido,
        removePedido,
        loadPedido,
        limpaMessages,
        pedidos,
        pedido,
        atendidoOptions,
        errorMessage,
        infoMessage,
        loading
    }

};

export default useTelaPedidoViewModel;
