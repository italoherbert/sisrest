import { useState } from "react";

import Form from "../../components/Form";
import InputText from "../../components/InputText";
import Label from "../../components/Label";
import Painel from "../../components/Painel";
import Message from "../../components/Message";
import Button from "../../components/buttons/Button";

import MainLayout from "../../components/layouts/main/main-layout";
import PageTitle from "../../components/PageTitle";
import BackButton from "../../components/buttons/BackButton";
import Spinner from "../../components/Spinner";
import { DivItemsCenter } from "../../components/Divs";
import InputReal from "../../components/InputReal";
import useNovoCardapioItemViewModel from "../../viewModels/cardapio-item/useNovoCardapioItemViewModel";
import { SaveCardapioItem } from "@/models/dtos/CardapioItem";

const CardapioItemNovo = () => {

    const [descricao, setDescricao] = useState<string>( '' );
    const [preco, setPreco] = useState<number>( 0 );

    const {save, errorMessage, infoMessage, loading } = useNovoCardapioItemViewModel();

    const onSave = async () => {
        try {
            const item : SaveCardapioItem = {
                descricao: descricao,
                preco: preco
            }
            await save( item );

            setDescricao( '' );
            setPreco( 0 );
        } catch( error ) {
            console.error( error );
        }
    };

    return (
        <MainLayout>
            <Painel className="bg-white w-200 p-5">
                <PageTitle>Novo Item</PageTitle>
                <br />

                <Form>
                    <div>
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