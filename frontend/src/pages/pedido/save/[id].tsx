import BackButton from "@/components/buttons/BackButton";
import Button from "@/components/buttons/Button";
import SimpleButton from "@/components/buttons/SimpleButton";
import { Chip } from "@/components/Chips";
import { DivItemMX2, DivItemsCenter } from "@/components/Divs";
import Field from "@/components/Field";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import MainLayout from "@/layouts/main/main-layout";
import Message from "@/components/Message";
import PageTitle from "@/components/PageTitle";
import Paginator from "@/components/Paginator";
import Painel from "@/components/Painel";
import Spinner from "@/components/Spinner";
import { Table, TableBody, TableHead, TableTD, TableTH, TableTHR, TableTR } from "@/components/Table";
import { CardapioItem } from "@/models/dtos/CardapioItem";
import { SavePedido } from "@/models/dtos/Pedido";
import useSavePedidoViewModel from "@/viewModels/pedido/useSavePedidoViewModel";
import { ChangeEvent, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { NextPageContext } from "next";

interface Props {
    id : string;
}

const PedidoSave = ( { id } : Props ) => {

    const [mesa, setMesa] = useState<string>( '' );
    const [filterDesc, setFilterDesc] = useState<string>( '' );
    const [quantidade, setQuantidade] = useState<string>( '' );
    const [selectedItemId, setSelectedItemId] = useState<number>(0);

    const [pageItemsFiltered, setPageItemsFiltered] = useState<CardapioItem[]>([]);

    const {
        createPedido,
        alteraPedido,
        loadAllCardapioItems,
        loadPedido,
        addItem,
        removeItem,
        filtraCardapioItems,
        geraSavePedidoItems,
        alterItemQuantidade,
        getItemDescricao,
        itemsFiltered,
        itemsAdded,
        itemsQuantsAdded,
        errorMessage,
        infoMessage,
        loading,
        setErrorMessage
    } = useSavePedidoViewModel();

    useEffect( () => {
        onLoad();
    }, [] );

    const onLoad = async () => {
        const pedidoId = parseInt( id );
        try {
            if ( pedidoId === -1 ) {
                await loadAllCardapioItems();
            } else {
                const pedido = await loadPedido( pedidoId );
                setMesa( pedido.mesa.toString() );
            }
        } catch ( error ) {
            console.error( error );    
        }
    };

    const onSave = async () => {
        if ( isNaN( parseInt( mesa ) ) ) {
            setErrorMessage( 'Informe um número de mesa numérico.' );
            return;
        }

        const pedidoItems = await geraSavePedidoItems();

        const pedido : SavePedido = {            
            mesa : parseInt( mesa ),
            items: pedidoItems
        }

        try {
            const pedidoId = parseInt( id );
            if ( pedidoId === -1 ) {
                await createPedido( pedido );
            } else {
                await alteraPedido( pedidoId, pedido );
            }
        } catch ( error ) {
            console.error( error );
        }
    };

    const onChangeFilterDesc = async ( e : ChangeEvent<HTMLInputElement>) => {
        setFilterDesc( e.target.value );
        await filtraCardapioItems( e.target.value );
    }

    const onAddItem = async ( itemId : number ) => {
        await addItem( itemId );
        await filtraCardapioItems( filterDesc );
    };

    const onRemoveItem = async ( itemId : number ) => {
        await removeItem( itemId );
        await filtraCardapioItems( filterDesc );
    };

    const onSetQuantidade = async () => {        
        const quant = parseInt( quantidade  );
        if ( isNaN( quant ) ) {
            setErrorMessage( 'A quantidade deve ser um valor inteiro.' );
            return;
        }

        await alterItemQuantidade( selectedItemId, quant );

        setQuantidade( '' );
    };

    return (
        <>
            <MainLayout>
                <Painel className="w-200 p-3">
                    <PageTitle>Novo pedido</PageTitle>

                    <div className="my-2">
                        <Label>Mesa</Label>
                        <InputText value={mesa} onChange={(e) => setMesa( e.target.value ) } />
                    </div>

                    <Painel className="p-2 bg-gray-50">
                        <h1 className="text-2xl font-bold">Adicione os pratos</h1>
                        <br />

                        <Painel className="p-1 bg-blue-50">
                            <h1 className="text-3md font-bold">Pratos adicionados</h1>
                            { itemsAdded.map( (item, index) => (
                                <div key={index} className="inline-block mx-1">
                                    <Chip 
                                        onClick={() => setSelectedItemId( item.id )}
                                        onRemove={() => onRemoveItem( item.id )}>
                                            {`${item.descricao} (${itemsQuantsAdded[ index ]})`}
                                    </Chip>    
                                </div>
                            ) ) }
                            <br />
                            <div>
                                <Field name="Item selecionado: ">                                  
                                    <span className="mx-2">
                                        { selectedItemId > 0 
                                            ? getItemDescricao( selectedItemId ) 
                                            : "Nenhum item selecionado." }
                                    </span>
                                </Field>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-row items-center my-2">
                                    <Label>Quantidade: </Label>
                                    <DivItemMX2>
                                        <InputText width="w-50" value={quantidade} onChange={(e) => setQuantidade( e.target.value )} />
                                    </DivItemMX2>
                                </div>
                                <div>
                                <Button onClick={onSetQuantidade}>
                                    Alterar quantidade
                                </Button>
                                </div>
                            </div>
                        </Painel>

                        <Message type="error" message={errorMessage} />
                        <Message type="info" message={infoMessage} />

                        <DivItemsCenter>
                            <Spinner visible={loading} />
                        </DivItemsCenter>

                        <br />

                        <InputText value={filterDesc} onChange={onChangeFilterDesc} />

                        <Table>
                            <TableHead>
                                <TableTHR>
                                    <TableTH> </TableTH>
                                    <TableTH>Descrição</TableTH>
                                    <TableTH>Preço</TableTH>
                                </TableTHR>                            
                            </TableHead>
                            <TableBody>
                                { pageItemsFiltered.map( (item, index) => (
                                    <TableTR key={index}> 
                                        <TableTD> 
                                            <SimpleButton onClick={() => onAddItem( item.id ) }>
                                                <FaPlus />
                                            </SimpleButton>
                                        </TableTD>
                                        <TableTD>{item.descricao}</TableTD>
                                        <TableTD>{item.preco}</TableTD>
                                    </TableTR>
                                ) ) }
                                
                            </TableBody>
                        </Table>
                        
                        <br />

                        <DivItemsCenter>
                            <Paginator 
                                datalist={itemsFiltered} 
                                pageSize={4}
                                maxPagesByGroup={3} 
                                onUpdateDataList={(pageDataList : CardapioItem[]) => setPageItemsFiltered( pageDataList )} />
                        </DivItemsCenter>
                    </Painel>

                    <Message type="error" message={errorMessage} />
                    <Message type="info" message={infoMessage} />

                    <DivItemsCenter>
                        <Spinner visible={loading} />
                    </DivItemsCenter>

                    <div className="py-2">
                        <Button onClick={onSave}>
                            Salvar pedido
                        </Button>
                    </div>

                    <BackButton />
                </Painel>
            </MainLayout>
        </>
    )
};

PedidoSave.getInitialProps = async ( { query } : NextPageContext ) => {
    return {
        id : query.id        
    }
}

export default PedidoSave;