import { useEffect, useState } from "react";
import Link from 'next/link';
import axios from "axios";

import { BASE_URL } from '../../constants/api-constants';

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
import { FaCircleInfo, FaPenToSquare, FaX } from "react-icons/fa6";
import { DivItemsCenter } from "../../components/Divs";
import MainLayout from "../../components/layouts/main/main-layout";
import ActionItems from "../../components/ActionItems";

const CardapioItemTela = ({}) => {

    const [errorMessage, setErrorMessage] = useState( null );
    const [infoMessage, setInfoMessage] = useState( null );
    const [spinnerVisible, setSpinnerVisible] = useState( false );

    const [cardapioItemList, setCardapioItemList] = useState( [] );
    const [pageCardapioItemList, setPageCardapioItemList] = useState( [] );
    const [filterDescricao, setFilterDescricao] = useState( '*' );

    useEffect( () => {
        filtra();
    }, [] );

    const filtra = async () => {
        setErrorMessage( null );
        setInfoMessage( null );
        setSpinnerVisible( true );

        axios.get( BASE_URL + "/cardapioitem/filter?descricao="+filterDescricao, { 
            headers: {
                Authorization: `Bearer ${localStorage.getItem( 'token' )}`
            }
        } ).then( response => {
            setCardapioItemList( response.data );
            setSpinnerVisible( false );
        } ).catch( error => {
            setErrorMessage( error.response.data.mensagem );
            setSpinnerVisible( false );
        } );
    };

    const remover = async ( id ) => {
        setErrorMessage( null );
        setInfoMessage( null );
        setSpinnerVisible( true );

        axios.delete( BASE_URL + "/cardapioitem/"+id, { 
            headers: {
                Authorization: `Bearer ${localStorage.getItem( 'token' )}`
            }
        } ).then( response => {
            filtra();

            setInfoMessage( 'Item deletado com sucesso.')            
            setSpinnerVisible( false );
        } ).catch( error => {
            setErrorMessage( error.response.data.mensagem );
            setSpinnerVisible( false );
        } );
    };

    const perguntarSeRemover = async ( id ) => {

    };

    return (
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
                                        onChange={ (e) => setFilterDescricao( e.target.value ) } />
                            </span>
                            <span className="mx-2">
                                <Button variant="default" onClick={filtra}>
                                    Filtrar
                                </Button>
                            </span>
                        </div>                
                    </Painel>
                </DivItemsCenter>

                <Message message={errorMessage} type="error" />
                <Message message={infoMessage} type="info" />

                <DivItemsCenter>
                    <Spinner visible={spinnerVisible} />
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
                                        removerOnClick={() => perguntarSeRemover( item.id )} />                                    
                                </TableTD>                   
                            </TableTR>                        
                        ) ) }
                    </TableBody>
                </Table>      

                <DivItemsCenter className="mt-2">
                    <Paginator 
                        datalist={cardapioItemList} 
                        pageSize={2} 
                        maxPagesByGroup={3}
                        onUpdateDataList={ ( pageDataList ) => setPageCardapioItemList( pageDataList ) } />
                </DivItemsCenter>
            </Painel>
        </MainLayout>
    )
};

export default CardapioItemTela;