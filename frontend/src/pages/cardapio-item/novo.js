import { useState } from "react";
import axios from "axios";

import { useRouter } from 'next/router';

import Form from "../../components/Form";
import InputText from "../../components/InputText";
import Label from "../../components/Label";
import Painel from "../../components/Painel";
import Message from "../../components/Message";
import Button from "../../components/buttons/Button";

import { BASE_URL } from "../../constants/api-constants";
import MainLayout from "../../components/layouts/main/main-layout";
import PageTitle from "../../components/PageTitle";
import ButtonOutline from "../../components/buttons/ButtonOutline";
import Spinner from "../../components/Spinner";

const CardapioItemNovo = () => {

    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState( null );
    const [infoMessage, setInfoMessage] = useState( null );
    const [spinnerVisible, setSpinnerVisible] = useState( false );

    const [descricao, setDescricao] = useState( '' );
    const [preco, setPreco] = useState( '' );

    const registrar = async () => {
        setInfoMessage( null );
        setErrorMessage( null );
        setSpinnerVisible( true );

        axios.post( BASE_URL + '/cardapioitem', {
            descricao: descricao,
            preco: preco
        }, { 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        } ).then( response => {
            setInfoMessage( "Item registrado com sucesso!")
            setSpinnerVisible( false );
        } ).catch( error => {
            setErrorMessage( error.response.data.mensagem );
            setSpinnerVisible( false );
        } );
    };

    return (
        <MainLayout>
            <Painel className="bg-white w-1/3 p-5">
                <PageTitle>Novo Item</PageTitle>
                <br />

                <Form>
                    <div className="columns-1">
                        <div className="py-2">
                            <Label>Descrição: </Label>
                            <InputText value={descricao} onChange={ (e) => setDescricao( e.target.value ) } />
                        </div>
                        <div className="py-2">
                            <Label>Preço: </Label>
                            <InputText type="number" value={preco} onChange={ (e) => setPreco( e.target.value ) } />
                        </div>
                        
                        <Message type="error" message={errorMessage} />
                        <Message type="info" message={infoMessage} />

                        <div className="flex justify-center">
                            <Spinner visible={spinnerVisible} />
                        </div>
                        
                        <div className="py-2">
                            <Button onClick={registrar}>
                                Registrar
                            </Button>
                        </div>
                        <div>
                            <ButtonOutline onClick={ () => router.back() }>
                                Voltar
                            </ButtonOutline>
                        </div>
                    </div>
                </Form>
            </Painel>
        </MainLayout>
    );
};

export default CardapioItemNovo;