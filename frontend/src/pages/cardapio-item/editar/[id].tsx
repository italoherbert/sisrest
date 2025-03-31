import { useEffect, useState } from "react";

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
import useEditarCardapioItemViewModel from "../../../viewModels/cardapio-item/useEditarCardapioItemViewModel";

import { SaveCardapioItem } from "../../../models/dtos/CardapioItem";
import { NextPageContext } from "next";

interface Props {
    id : number;
}

const CardapioItemEditar = (props : Props) => {

    const [descricao, setDescricao] = useState<string>( '' );
    const [preco, setPreco] = useState<number>( 0 );

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
            console.error( error );
        }
    };

    const onSalvar = async () => {       
        const id = props.id;

        try {
            const item : SaveCardapioItem = {
                descricao: descricao,
                preco: preco                
            };

            await saveItem( id, item );
        } catch ( error ) {
            console.error( error );
        }
    };

    return (
        <MainLayout>
            <Painel className="w-200 p-3">
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
                        <Button onClick={onSalvar}>
                            Salvar
                        </Button>
                    </div>

                    <BackButton />
                </Form>
            </Painel>
        </MainLayout>
    )
};

CardapioItemEditar.getInitialProps = async ({query} : NextPageContext) => {
    return { 
        id : query.id 
    };
};

export default CardapioItemEditar;