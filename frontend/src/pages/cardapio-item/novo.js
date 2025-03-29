import { useContext, useState } from "react";
import axios from "axios";

import Form from "../../components/Form";
import InputText from "../../components/InputText";
import Label from "../../components/Label";
import Painel from "../../components/Painel";
import Message from "../../components/Message";
import Button from "../../components/buttons/Button";

import { BASE_URL } from "../../constants/api-constants";
import MainLayout from "../../components/layouts/main/main-layout";
import PageTitle from "../../components/PageTitle";
import BackButton from "../../components/buttons/BackButton";
import Spinner from "../../components/Spinner";
import { DivItemsCenter } from "../../components/Divs";
import InputReal from "../../components/InputReal";
import { extractErrorMessage } from "../../util/SistemaUtil";
import { AuthContext } from "../../context/AuthProvider";
import useNovoCardapioItemViewModel from "../../viewModels/cardapio-item/useNovoCardapioItemViewModel";

const CardapioItemNovo = () => {

    const [descricao, setDescricao] = useState( '' );
    const [preco, setPreco] = useState( 0 );

    const {save, errorMessage, infoMessage, loading } = useNovoCardapioItemViewModel();

    const onSave = async () => {
        try {
            await save( {
                descricao: descricao,
                preco: preco
            } );

            setDescricao( '' );
            setPreco( '' );
        } catch( error ) {
        
        }
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
                            <InputReal value={preco} onValueChange={setPreco} placeholder="Preço" />
                        </div>
                        
                        <Message type="error" message={errorMessage} />
                        <Message type="info" message={infoMessage} />

                        <DivItemsCenter>
                            <Spinner visible={loading} />
                        </DivItemsCenter>
                        
                        <div className="py-2">
                            <Button onClick={onSave}>
                                Registrar
                            </Button>
                        </div>                                                
                        
                        <BackButton />                        
                    </div>
                </Form>
            </Painel>
        </MainLayout>
    );
};

export default CardapioItemNovo;