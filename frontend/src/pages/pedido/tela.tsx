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
import SelectBox from "@/components/SelectBox";

const PedidoTela = () => {

    const [mesa, setMesa] = useState<string>('*');
    const [atendidoOption, setAtendidoOption] = useState<string>('');

    const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>( false );
    const [removerId, setRemoverId] = useState<number>( -1 );

    const { 
        loadOptions,
        filtraPedidos, 
        loadPedido,
        setAtendido,
        removePedido,
        limpaMessages,
        pedidos,  
        pedido,    
        atendidoOptions,   
        loading, 
        errorMessage, 
        infoMessage 
    } = useTelaPedidoViewModel();

    useEffect( () => {        
        onLoad();
    }, [] );

    const onLoad = async () => {
        limpaMessages();
        try {
            const resp = await loadOptions();
            const atenOpt = resp.atendidoOptions[ 0 ].value;
            setAtendidoOption( atenOpt );

            await filtraPedidos( '*', atenOpt );
        } catch ( error ) {
            console.error( error );
        }
    };

    const onFiltrar = async ( limparMessages : boolean ) => {
        if ( limparMessages === true )
            limpaMessages();

        try {
            await filtraPedidos( mesa, atendidoOption );            
        } catch ( error ) {
            console.error( error );
        }
    };

    const onSetAtendido = async ( pedidoId : number, atendido : boolean ) => {
        limpaMessages();

        try {
            await setAtendido( pedidoId, !atendido );
            await onFiltrar( false );
        } catch ( error ) {
            console.error( error );
        }
    }

    const onRemover = async () => {
        limpaMessages();

        try {
            setDeleteModalVisible( false );

            await removePedido( removerId );

            await onFiltrar( false );
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
                        <div className="mb-2">
                            <SelectBox 
                                    options={atendidoOptions} 
                                    onChange={(e) => setAtendidoOption( e.target.value )} />
                        </div>
                        <div className="flex flex-row items-center">
                            <Label>Mesa: </Label>
                            <div className="mx-2">
                                <InputText 
                                    placeholder="Número da mesa"
                                    value={mesa} 
                                    onChange={ (e) => setMesa( e.target.value ) } />
                            </div>
                            <Button onClick={() => onFiltrar( true )}>
                                Filtrar
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