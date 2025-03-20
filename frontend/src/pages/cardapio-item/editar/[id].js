import { useEffect, useState } from "react";
import axios from "axios";

import { BASE_URL } from "../../../constants/api-constants";

import MainLayout from "../../../components/layouts/main/main-layout";
import PageTitle from "../../../components/PageTitle";
import Painel from "../../../components/Painel";
import Form from '../../../components/Form';
import Label from '../../../components/Label';
import InputText from '../../../components/InputText';
import Message from "../../../components/Message";
import { DivItemsCenter } from "../../../components/Divs";
import Spinner from "../../../components/Spinner";
import Button from "../../../components/buttons/Button";
import BackButton from "../../../components/buttons/BackButton";
import InputReal from "../../../components/InputReal";

const CardapioItemEditar = (props) => {

    const [errorMessage, setErrorMessage] = useState( null );
    const [infoMessage, setInfoMessage] = useState( null );
    const [spinnerVisible, setSpinnerVisible] = useState( false );

    const [descricao, setDescricao] = useState( '' );
    const [preco, setPreco] = useState( 0 );

    useEffect( () => {
        setErrorMessage( null );
        setInfoMessage( null );
        setSpinnerVisible( true );

        const id = props.id;

        axios.get( BASE_URL + "/cardapioitem/"+id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem( 'token' ) }`
            }
        } ).then( response => {
            let item = response.data;
            setDescricao( item.descricao );
            setPreco( item.preco );

            setSpinnerVisible( false );
        } ).catch( error => {
            setErrorMessage( error.response.data.mensagem );
            setSpinnerVisible( false );
        } );
    }, [] );

    const salvar = async () => {
        setErrorMessage( null );
        setInfoMessage( null );
        setSpinnerVisible( true );

        const id = props.id;

        axios.put( BASE_URL + "/cardapioitem/"+id, {
            descricao: descricao,
            preco: preco
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem( 'token' )}`
            }
        }).then( response => {
            setInfoMessage( 'Item salvo com sucesso.' );
            setSpinnerVisible( false );
        } ).catch( error => {
            console.log( error );
            setErrorMessage( error.response.data.mensagem );
            setSpinnerVisible( false );
        } );
    };

    return (
        <MainLayout>
            <Painel className="w-2/3 p-3">
                <PageTitle>Editar item de cardápio</PageTitle>
                <br />

                <Form>
                    <div className="py-2">
                        <Label>Descrição:</Label>
                        <InputText type="text" value={descricao} onChange={ (e) => setDescricao( e.target.value ) } />
                    </div>
                    <div className="py-2">
                        <Label>Preço:</Label>
                        <InputReal value={preco} onValueChange={setPreco} placeholder="Preço" />
                    </div>

                    <Message type="error" message={errorMessage} />
                    <Message type="info" message={infoMessage} />

                    <DivItemsCenter>
                        <Spinner visible={spinnerVisible} />
                    </DivItemsCenter>

                    <div className="py-2">
                        <Button variant="default" onClick={salvar}>
                            Salvar
                        </Button>
                    </div>

                    <BackButton />
                </Form>
            </Painel>
        </MainLayout>
    )
};

CardapioItemEditar.getInitialProps = ({query}) => {
    return { 
        id : query.id 
    };
};

export default CardapioItemEditar;