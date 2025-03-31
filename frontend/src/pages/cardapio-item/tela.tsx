import { useEffect, useState } from "react";

import useTelaCardapioItemViewModel from "../../viewModels/cardapio-item/useTelaCardapioItemViewModel";

import Painel from "../../components/Painel";
import Message from "../../components/Message";
import { Table, TableBody, TableHead, TableTD, TableTH, TableTHR, TableTR } from "../../components/Table";
import ButtonLink from "../../components/buttons/ButtonLink";
import PageTitle from '../../components/PageTitle';
import { RealFormatter } from "../../components/NumberFormatter";
import Spinner from "../../components/Spinner";
import Label from "../../components/Label";
import InputText from "../../components/InputText";
import Button from "../../components/buttons/Button";
import Paginator from "../../components/Paginator";
import { DivItemsCenter } from "../../components/Divs";
import MainLayout from "../../components/layouts/main/main-layout";
import ActionItems from "../../components/ActionItems";
import CardapioItemRemover from "./ModalRemover";
import { CardapioItem } from "@/models/dtos/CardapioItem";

const CardapioItemTela = ({}) => {

    const [cardapioItemList, setCardapioItemList] = useState<CardapioItem[]>( [] );
    const [pageCardapioItemList, setPageCardapioItemList] = useState<CardapioItem[]>( [] );
    const [filterDescricao, setFilterDescricao] = useState<string>( '*' );

    const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>( false );
    const [deleteId, setDeleteId] = useState<number>( -1 );
    const [deleteCardapioItemDescricao, setDeleteCardapioItemDescricao] = useState<string>( '' );

    const { filtra, apenasFiltra, remove, buscaDescricao, errorMessage, infoMessage, loading} = useTelaCardapioItemViewModel();

    useEffect( () => {
        onFiltrar();
    }, [] );

    const onFiltrar = async () => {
        try {
            const items : CardapioItem[] = await filtra( filterDescricao );
            setCardapioItemList( items );
        } catch ( error ) {
            console.error( error );
        }       
    };

    const onRemover = async () => {
        try {
            await remove( deleteId );
            
            const items = await apenasFiltra( filterDescricao );            
            setCardapioItemList( items );

            setDeleteModalVisible( false );
        } catch ( error ) {
            console.error( error );
        }        
    };

    const onPerguntarSeRemover = async ( id : number ) => {
        try {
            const response = await buscaDescricao( id );
            setDeleteCardapioItemDescricao( response );
            setDeleteId( id );
            setDeleteModalVisible( true ); 
        } catch ( error ) {
            console.error( error );
        }
    };

    return (
        <>
            <CardapioItemRemover 
                visible={deleteModalVisible}
                setVisible={setDeleteModalVisible}
                itemDesc={deleteCardapioItemDescricao}
                onRemover={onRemover} />
           
            <MainLayout>            
                <Painel className="columns-1 w-2/3 p-5 bg-blue-50">
                    <ButtonLink href="/cardapio-item/novo">
                        Registrar
                    </ButtonLink>
                    <PageTitle>Cardápio</PageTitle>
                    <br />

                    <DivItemsCenter>
                        <Painel className="w-1/2 p-3 bg-white mb-3">                
                            <div className="flex flex-row items-center">
                                <span className="mx-2">
                                    <Label>Descrição: </Label>
                                </span>
                                <span className="mx-2">
                                    <InputText type="text" 
                                            value={filterDescricao} 
                                            onEnterTyped={ () => onFiltrar() } 
                                            onChange={ (e) => setFilterDescricao( e.target.value ) } />
                                </span>
                                <span className="mx-2">
                                    <Button onClick={onFiltrar}>
                                        Filtrar
                                    </Button>
                                </span>
                            </div>                
                        </Painel>
                    </DivItemsCenter>

                    <Message message={errorMessage} type="error" />
                    <Message message={infoMessage} type="info" />

                    <DivItemsCenter>
                        <Spinner visible={loading} />
                    </DivItemsCenter>

                    <Table>
                        <TableHead>
                            <TableTHR bgColor="bg-blue-200" textColor="text-gray-500">
                                <TableTH>Descrição</TableTH>
                                <TableTH>Preço</TableTH>
                                <TableTH>Ações</TableTH>
                            </TableTHR>                    
                        </TableHead>
                        <TableBody>
                            {pageCardapioItemList.map( (item, index) => (
                                <TableTR key={index} bgColor="bg-white" textColor="text-gray-500">
                                    <TableTD>{item.descricao}</TableTD>
                                    <TableTD>
                                        <RealFormatter value={item.preco} />
                                    </TableTD>
                                    <TableTD>
                                        <ActionItems 
                                            detailsHref={`/cardapio-item/detalhes/${item.id}`} 
                                            editarHref={`/cardapio-item/editar/${item.id}`} 
                                            removerOnClick={() => onPerguntarSeRemover( item.id )} />                                    
                                    </TableTD>                   
                                </TableTR>                        
                            ) ) }
                        </TableBody>
                    </Table>      

                    <DivItemsCenter className="mt-2">
                        <Paginator
                            datalist={cardapioItemList} 
                            pageSize={5} 
                            maxPagesByGroup={3}
                            onUpdateDataList={ ( pageDataList : CardapioItem[] ) => setPageCardapioItemList( pageDataList ) } />
                    </DivItemsCenter>
                </Painel>            
            </MainLayout>
        </>
    )
};

export default CardapioItemTela;