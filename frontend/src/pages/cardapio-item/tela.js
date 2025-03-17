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
import Label from "../../components/Label";
import InputText from "../../components/InputText";
import Button from "../../components/buttons/Button";
import SimpleButton from "../../components/buttons/SimpleButton";

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

    return (
        <Painel className="columns-1 w-2/3 p-5 bg-blue-50">
            <ButtonLink href="/cardapio-item/novo">
                Registrar
            </ButtonLink>
            <PageTitle>Cardápio</PageTitle>
            <br />

            <div className="flex justify-center">
                <Painel className="d-inline w-1/2 p-3 bg-white mb-3">                
                    <div className="flex flex-row items-center">
                        <span className="mx-2">
                            <Label>Descrição: </Label>
                        </span>
                        <span className="mx-2 w-full">
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
            </div>

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
                                <TableTD>
                                </TableTD>                   
                            </TableTR>
                        </>
                    ) ) }
                </TableBody>
            </Table>      
            <div className="flex justify-center mt-2">
                <Paginator 
                    datalist={cardapioItemList} 
                    pageSize={2} 
                    maxPagesByGroup={3}
                    onUpdateDataList={ ( pageDataList ) => setPageCardapioItemList( pageDataList ) } />
            </div>     
        </Painel>
    )
};

export default CardapioItemTela;