import { useEffect, useState } from "react";
import axios from "axios";

import { BASE_URL } from '../../constants/api-constants';

import Painel from "../../components/Painel";
import Message from "../../components/Message";
import { Table, TableBody, TableHead, TableTD, TableTH, TableTR } from "../../components/Table";

const CardapioItemTela = ({}) => {

    const [errorMessage, setErrorMessage] = useState( null );
    const [infoMessage, setInfoMessage] = useState( null );

    const [ cardapioItemList, setCardapioItemList ] = useState( [] );

    useEffect( () => {
        setErrorMessage( null );
        setInfoMessage( null );

        axios.get( BASE_URL + "/cardapioitem/list", { 
            headers: {
                Authorization: `Bearer ${localStorage.getItem( 'token' )}`
            }
        } ).then( response => {
            setCardapioItemList( response.data );
            alert( JSON.stringify( response.data ) );
        } ).catch( error => {
            setErrorMessage( error.response.data.mensagem );
        } );
    }, [] );

    return (
        <Painel className="columns-1 w-1/3 p-3">
            <Message message={errorMessage} type="error" />
            <Message message={infoMessage} type="info" />

            <Table>
                <TableHead>
                    <TableTR>
                        <TableTH>Descrição</TableTH>
                        <TableTH>Preço</TableTH>
                        <TableTH>Ações</TableTH>
                    </TableTR>                    
                </TableHead>
                <TableBody>
                    {cardapioItemList.map( (item, index) => (
                        <>
                            <TableTR>
                                <TableTD>{item.descricao}</TableTD>
                                <TableTD>{item.preco}</TableTD>
                                <TableTD>editar</TableTD>                    
                            </TableTR>
                        </>
                    ) ) }
                </TableBody>
            </Table>           
        </Painel>
    )
};

export default CardapioItemTela;