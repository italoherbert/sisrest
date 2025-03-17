import { useEffect, useState } from "react";
import axios from "axios";

import { BASE_URL } from '../../constants/api-constants';

import Painel from "../../components/Painel";
import Message from "../../components/Message";
import { Paginator, Table, TableBody, TableHead, TableTD, TableTH, TableTHR, TableTR } from "../../components/Table";
import ButtonLink from "../../components/buttons/ButtonLink";
import PageTitle from '../../components/PageTitle';
import { RealFormatter } from "../../components/NumberFormatter";
import Spinner from "../../components/Spinner";

const CardapioItemTela = ({}) => {

    const [errorMessage, setErrorMessage] = useState( null );
    const [infoMessage, setInfoMessage] = useState( null );
    const [spinnerVisible, setSpinnerVisible] = useState( false );

    const [cardapioItemList, setCardapioItemList] = useState( [] );
    const [pageCardapioItemList, setPageCardapioItemList] = useState( [] );

    useEffect( () => {
        setErrorMessage( null );
        setInfoMessage( null );
        setSpinnerVisible( true );

        axios.get( BASE_URL + "/cardapioitem/list", { 
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
    }, [] );

    return (
        <Painel className="columns-1 w-2/3 p-5 bg-blue-50">
            <ButtonLink href="/cardapio-item/novo">
                Registrar
            </ButtonLink>
            <PageTitle>Cardápio</PageTitle>
            <br />

            <Message message={errorMessage} type="error" />
            <Message message={infoMessage} type="info" />

            <div class="flex justify-center">
                <Spinner visible={spinnerVisible} />
            </div>

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
                        <>
                            <TableTR bgColor="bg-white" textColor="text-gray-500">
                                <TableTD>{item.descricao}</TableTD>
                                <TableTD>
                                    <RealFormatter value={item.preco} />
                                </TableTD>
                                <TableTD>editar</TableTD>                    
                            </TableTR>
                        </>
                    ) ) }
                </TableBody>
            </Table>      
            <div className="flex justify-center mt-2">
                <Paginator 
                    datalist={cardapioItemList} 
                    pageSize={2} 
                    maxPagesGroupSize={3}
                    onUpdateDataList={ ( pageDataList ) => setPageCardapioItemList( pageDataList ) } />
            </div>     
        </Painel>
    )
};

export default CardapioItemTela;