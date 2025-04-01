import BackButton from "@/components/buttons/BackButton";
import Button from "@/components/buttons/Button";
import SimpleButton from "@/components/buttons/SimpleButton";
import { Chip } from "@/components/Chips";
import { DivItemsCenter } from "@/components/Divs";
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

    const [pageItemsFiltered, setPageItemsFiltered] = useState<CardapioItem[]>([]);

    const {
        createPedido,
        loadCardapioItems,
        addItem,
        removeItem,
        filtraCardapioItems,
        itemsFiltered,
        itemsAdded,
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
        filtraCardapioItems( e.target.value );
    }

    const onAddItem = async ( itemId : number ) => {
        addItem( itemId );
        filtraCardapioItems( filterDesc );
    };

    const onRemoveItem = async ( itemId : number ) => {
        removeItem( itemId );
        filtraCardapioItems( filterDesc );
    };

    const onSave = async () => {
        const cardapioItemsIDs : number[] = [];
        itemsAdded.forEach( item => {
            cardapioItemsIDs.push( item.id );
        } );

        if ( isNaN( parseInt( mesa ) ) ) {
            setErrorMessage( 'Informe um número de mesa numérico.' );
            return;
        }

        const pedido : SavePedido = {            
            mesa : parseInt( mesa ),
            cardapioItems: cardapioItemsIDs
        }

        createPedido( pedido );
    };

    return (
        <>
            <MainLayout>
                <Painel className="w-300 p-3">
                    <PageTitle>Novo pedido</PageTitle>

                    <div className="my-2">
                        <Label>Mesa</Label>
                        <InputText value={mesa} onChange={(e) => setMesa( e.target.value ) } />
                    </div>

                    <Painel className="p-2 bg-blue-50">
                        <h1 className="text-2xl font-bold">Adicione os pratos</h1>
                        <br />

                        <Painel className="p-1">
                            <h1 className="text-3md font-bold">Pratos adicionados</h1>
                            { itemsAdded.map( (item, index) => (
                                <div key={index} className="inline-block mx-1">
                                    <Chip text={item.descricao} onRemove={() => onRemoveItem( item.id )} />    
                                </div>
                            ) ) }
                        </Painel>

                        <br />

                        <InputText value={filterDesc} onChange={onChangeFilterDesc} />

                        <Message type="error" message={errorMessage} />
                        <Message type="info" message={infoMessage} />

                        <DivItemsCenter>
                            <Spinner visible={loading} />
                        </DivItemsCenter>

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