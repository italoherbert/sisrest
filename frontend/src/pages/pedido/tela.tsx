import { useEffect, useState } from "react";

import InputText from "@/components/InputText";
import Label from "@/components/Label";
import MainLayout from "@/layouts/main/main-layout";
import PageTitle from "@/components/PageTitle";
import Painel from "@/components/Painel";

import useTelaPedidoViewModel from "@/viewModels/pedido/useTelaPedidoViewModel";
import Button from "@/components/buttons/Button";
import PainelItem from "@/components/PainelItem";
import { Chip } from "@/components/Chips";
import Message from "@/components/Message";
import { DivItemsCenter } from "@/components/Divs";
import Spinner from "@/components/Spinner";
import ActionItems from "@/components/ActionItems";
import ModalRemover from "@/components/ModalRemover";

const PedidoTela = () => {

    const [mesa, setMesa] = useState<string>('*');

    const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>( false );
    const [removerId, setRemoverId] = useState<number>( -1 );

    const { 
        loadPedidos, 
        loadPedidosPelaMesa,
        loadPedido,
        setAtendido,
        removePedido,
        limpaMessages,
        pedidos,  
        pedido,       
        loading, 
        errorMessage, 
        infoMessage,
        setErrorMessage 
    } = useTelaPedidoViewModel();

    useEffect( () => {
        onLoadPedidos();
    }, [] );

    const onLoadPedidos = async () => {
        limpaMessages();
        try {
            await loadPedidos();
        } catch ( error ) {
            console.error( error );
        }
    };

    const onListarPorMesa = async ( limparMessages : boolean ) => {
        if ( limparMessages === true )
            limpaMessages();

        try {
            if ( mesa === '*' ) {
                await loadPedidos();
            } else {
                const mesaNum = parseInt( mesa );
                if ( isNaN( mesaNum ) ) {
                    setErrorMessage( 'Informe um número de mesa numérico' );
                    return;
                }

                await loadPedidosPelaMesa( mesaNum );
            }
        } catch ( error ) {
            console.error( error );
        }
    };

    const onSetAtendido = async ( pedidoId : number, atendido : boolean ) => {
        limpaMessages();

        try {
            await setAtendido( pedidoId, !atendido );
            await onListarPorMesa( false );
        } catch ( error ) {
            console.error( error );
        }
    }

    const onRemover = async () => {
        limpaMessages();

        try {
            setDeleteModalVisible( false );

            await removePedido( removerId );

            await onListarPorMesa( false );
        } catch ( error ) {
            console.error( error );
        }
    };

    const onPerguntarSeRemover = async ( pedidoId : number ) => {
        limpaMessages();

        try {
            await loadPedido( pedidoId );
            
            setRemoverId( pedidoId );
            setDeleteModalVisible( true );
        } catch ( error ) {
            console.error( error );
        }        
    }

    return (
        <>
            <ModalRemover   
                    title="Remoção de pedido"
                    visible={deleteModalVisible}
                    setVisible={setDeleteModalVisible}
                    onRemover={onRemover}>
                Tem certeza que deseja remover o pedido selecionado?
                <br />
                <span className="font-bold">
                    Mesa: {pedido.mesa}
                </span>
                <br />
                <div className="flex flex-row items-center">                    
                    {pedido.items.map( (item, index) => (
                        <Chip bgColor="bg-green-200 mr-2" key={index}>
                            {item.cardapioItem.descricao} ({item.quantidade})
                        </Chip>
                    ))}
                </div>
            </ModalRemover>

            <MainLayout>
                <Painel className="w-300 p-3">
                    <PageTitle>Lista de pedidos</PageTitle>
                    
                    <br />
                    
                    <Painel className="w-full p-3">
                        <div className="flex flex-row items-center">
                            <Label>Mesa: </Label>
                            <div className="mx-2">
                                <InputText 
                                    placeholder="Número da mesa"
                                    value={mesa} 
                                    onChange={ (e) => setMesa( e.target.value ) } />
                            </div>
                            <Button onClick={() => onListarPorMesa( true )}>
                                Listar
                            </Button>
                        </div>
                    </Painel>

                    <div className="my-2">
                        <Message type="error" message={errorMessage} />
                        <Message type="info" message={infoMessage} />

                        <DivItemsCenter>
                            <Spinner visible={loading} />
                        </DivItemsCenter>
                    </div>

                    {pedidos.map( (pedido, index) => (
                        <PainelItem className="w-full px-3 py-1 mb-2 bg-gray-100" key={index}>
                            <h1 className="flex flex-row items-center">
                                <div className="font-bold">
                                    Mesa: <span className="rounded-xl bg-blue-200 text-blue-800 px-2 py-1">{pedido.mesa}</span>
                                </div>
                                <div className="inline-block px-5 mt-1">
                                    <ActionItems 
                                        editarHref={`/pedido/save/${pedido.id}`}
                                        removerOnClick={() => onPerguntarSeRemover( pedido.id )} />
                                </div>
                                <Button onClick={() => onSetAtendido( pedido.id, pedido.atendido ) }>
                                    {pedido.atendido === true ? "Desfazer atendido" : "Atender"}
                                </Button>
                            </h1>
                            <h1>Pedidos:</h1>
                            <div className="flex flex-row items-center">                                                      
                                {pedido.items.map( (item, index) => (
                                    <Chip key={index} className="mr-2 bg-green-400">
                                        {item.cardapioItem.descricao} ({item.quantidade})
                                    </Chip>
                                ) )}
                            </div>                            
                        </PainelItem>
                    ) )}
                </Painel>
            </MainLayout>
        </>
    )
};

export default PedidoTela;