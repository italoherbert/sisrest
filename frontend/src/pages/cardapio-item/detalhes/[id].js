import { useEffect, useState } from 'react';
import axios from 'axios';

import { BASE_URL } from '../../../constants/api-constants';

import Painel from '../../../components/Painel';
import PageTitle from '../../../components/PageTitle';
import Field from '../../../components/Field';
import { RealFormatter } from '../../../components/NumberFormatter';
import Message from '../../../components/Message';
import Spinner from '../../../components/Spinner';

import MainLayout from '../../../components/layouts/main/main-layout';
import BackButton from '../../../components/buttons/BackButton';

const CardapioItemDetalhes = props => {

    const [errorMessage, setErrorMessage] = useState( null );
    const [spinnerVisible, setSpinnerVisible] = useState( false );
    const [item, setItem] = useState( { id : '', descricao: '', preco: '' } ); 
    
    useEffect( () => {
        setErrorMessage( null );
        setSpinnerVisible( true );

        const id = props.id;

        axios.get( BASE_URL + "/cardapioitem/"+id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem( 'token' )}`
            }
        } ).then( response => {
            setItem( response.data );
            setSpinnerVisible( false );
        } ).catch( error => {
            setErrorMessage( error.response.data.mensagem );
            setSpinnerVisible( false );
        } );
    }, [] );

    return (
        <MainLayout>
            <Painel className="w-1/2 p-3 bg-blue-50">
                <PageTitle>Detalhes do item</PageTitle>
                <br />

                <Message type="error" message={errorMessage} />
                
                <div className="flex justify-center">
                    <Spinner visible={spinnerVisible} />
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

CardapioItemDetalhes.getInitialProps = ({query}) => {
    return { 
        id : query.id,
    };
};

export default CardapioItemDetalhes;