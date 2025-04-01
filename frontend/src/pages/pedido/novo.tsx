import BackButton from "@/components/buttons/BackButton";
import Button from "@/components/buttons/Button";
import SimpleButton from "@/components/buttons/SimpleButton";
import { Chip } from "@/components/Chips";
import { DivItemMX2, DivItemsCenter } from "@/components/Divs";
import Field from "@/components/Field";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import MainLayout from "@/components/layouts/main/main-layout";
import Message from "@/components/Message";
import PageTitle from "@/components/PageTitle";
import Paginator from "@/components/Paginator";
import Painel from "@/components/Painel";
import Spinner from "@/components/Spinner";
import { Table, TableBody, TableHead, TableTD, TableTH, TableTHR, TableTR } from "@/components/Table";
import { CardapioItem } from "@/models/dtos/CardapioItem";
import { SavePedido } from "@/models/dtos/Pedido";
import useNovoPedidoViewModel from "@/viewModels/pedido/useNovoPedidoViewModel";
import { ChangeEvent, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";


const PedidoNovo = () => {

    const [mesa, setMesa] = useState<string>( '' );
    const [filterDesc, setFilterDesc] = useState<string>( '' );
    const [quantidade, setQuantidade] = useState<string>( '' );
    const [selectedItemId, setSelectedItemId] = useState<number>(0);

    const [pageItemsFiltered, setPageItemsFiltered] = useState<CardapioItem[]>([]);

    const {
        createPedido,
        loadCardapioItems,
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
    } = useNovoPedidoViewModel();

    useEffect( () => {
        loadCardapioItems();
    }, [] );

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

        await createPedido( pedido );
    };

    const onSetQuantidade = async () => {        
        const quant = parseInt( quantidade  );
        if ( isNaN( quant ) ) {
            setErrorMessage( 'A quantidade deve ser um valor inteiro.' );
            return;
        }

        await alterItemQuantidade( selectedItemId, quant );
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
                                        text={`${item.descricao} (${itemsQuantsAdded[ index ]})`} 
                                        onSelect={() => setSelectedItemId( item.id )}
                                        onRemove={() => onRemoveItem( item.id )} />    
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
                            Criar pedido
                        </Button>
                    </div>

                    <BackButton />
                </Painel>
            </MainLayout>
        </>
    )
}

export default PedidoNovo;