import { useEffect } from 'react';

import Painel from '../../../components/Painel';
import PageTitle from '../../../components/PageTitle';
import Field from '../../../components/Field';
import { RealFormatter } from '../../../components/NumberFormatter';
import Message from '../../../components/Message';
import Spinner from '../../../components/Spinner';

import MainLayout from '../../../layouts/main/main-layout';
import BackButton from '../../../components/buttons/BackButton';
import useDetalhesCardapioItemViewModel from '../../../viewModels/cardapio-item/useDetalhesCardapioItemViewModel';
import { NextPageContext } from 'next';

interface Props {
    id : string;
}

const CardapioItemDetalhes = ( props : Props ) => {

    const { loadItem, item, errorMessage, loading } = useDetalhesCardapioItemViewModel();

    useEffect( () => {        
        onLoadItem();
    }, [] );

    const onLoadItem = async () => {
        const id = parseInt( props.id );

        try {
            await loadItem( id );            
        } catch ( error ) {
            console.error( error );
        }
    }

    return (
        <MainLayout>
            <Painel className="w-200 p-3 bg-blue-50">
                <PageTitle>Detalhes do item</PageTitle>
                <br />

                <Message type="error" message={errorMessage} />
                
                <div className="flex justify-center">
                    <Spinner visible={loading} />
                </div>

                <div className="columns-2 w-1/2">
                    <div className="p-2">
                        <Field name="Descrição: ">
                            {item.descricao}
                        </Field>
                    </div>
                    <div className="p-2">
                        <Field name="Preço: ">
                            <RealFormatter value={item.preco} isBold={true} />
                        </Field>
                    </div>
                </div>
                
                <div className="mt-2">
                    <BackButton />
                </div>
            </Painel>
        </MainLayout>
    )
};

CardapioItemDetalhes.getInitialProps = async ({query} : NextPageContext) => {
    return { 
        id : query.id,
    };
};

export default CardapioItemDetalhes;