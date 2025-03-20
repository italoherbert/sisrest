import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import Button from '../components/buttons/Button';
import InputText from '../components/InputText';
import Label from '../components/Label';
import Painel from '../components/Painel';
import Message from '../components/Message';
import Spinner from '../components/Spinner';
import { DivItemsCenter } from '../components/Divs';

const Login = () => {

    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState( null );
    const [infoMessage, setInfoMessage] = useState( null );

    const [username, setUsername] = useState( "" );
    const [password, setPassword] = useState( "" );
    const [spinnerVisible, setSpinnerVisible] = useState( false );

    useEffect( () => {
        localStorage.setItem( 'token', null );
    } );

    const login = async () => {
        setErrorMessage( null );
        setInfoMessage( null );
        setSpinnerVisible( true );

        axios.post( "http://localhost:8080/api/sisrest/v1/login", {
            username: username,
            password: password
        } ).then( response => {
            localStorage.setItem( "token", response.data.token );
            router.push( '/cardapio-item' );
        } ).catch( error => {
            setErrorMessage( error.response.data.mensagem );
            setSpinnerVisible( false );
        } );
    };

    return (
        <DivItemsCenter className="mt-20">
            <Painel className="columns-1 w-1/3 p-3">                
                <h1>Login</h1>
                
                <div className="py-2">
                    <Label>Nome de usuário: </Label>
                    <InputText value={username} onChange={(e) => setUsername( e.target.value ) } />
                </div>
                <div className="py-2">
                    <Label>Senha: </Label>
                    <InputText value={password} onChange={(e) => setPassword( e.target.value ) } />
                </div>
                <Message message={errorMessage} type="error" />
                <Message message={infoMessage} type="info" />

                <DivItemsCenter>
                    <Spinner visible={spinnerVisible} />
                </DivItemsCenter>

                <div className="py-2">
                    <Button onClick={login}>
                        Logar
                    </Button>            
                </div>                
            </Painel>
        </DivItemsCenter>
    );
};

export default Login;