import { useContext, useEffect, useState } from "react";
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
import { extractErrorMessage } from "../../../util/SistemaUtil";
import { AuthContext } from "../../../context/AuthProvider";
import useEditarCardapioItemViewModel from "../../../viewModels/cardapio-item/useEditarCardapioItemViewModel";

const CardapioItemEditar = (props) => {

    const [descricao, setDescricao] = useState( '' );
    const [preco, setPreco] = useState( 0 );

    const {loadItem, saveItem, errorMessage, infoMessage, loading } = useEditarCardapioItemViewModel();

    useEffect( () => {        
        onLoadItem();
    }, [] );

    const onLoadItem = async () => {
        const id = props.id;

        try {
            const item = await loadItem( id );
            setDescricao( item.descricao );
            setPreco( item.preco );
        } catch ( error ) {

        }
    };

    const onSalvar = async () => {       
        const id = props.id;

        try {
            await saveItem( id, {
                descricao: descricao,
                preco: preco
            } );
        } catch ( error ) {

        }
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
                        <Spinner visible={loading} />
                    </DivItemsCenter>

                    <div className="py-2">
                        <Button variant="default" onClick={onSalvar}>
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