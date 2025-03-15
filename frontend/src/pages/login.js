import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import Button from '../components/Button';
import InputText from '../components/InputText';
import Label from '../components/Label';
import Painel from '../components/Painel';
import Message from '../components/Message';

const Login = () => {

    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState( null );
    const [infoMessage, setInfoMessage] = useState( null );

    const [username, setUsername] = useState( "" );
    const [password, setPassword] = useState( "" );

    const login = async () => {
        setErrorMessage( null );
        setInfoMessage( null );

        axios.post( "http://localhost:8080/api/sisrest/v1/login", {
            username: username,
            password: password
        } ).then( response => {
            localStorage.setItem( "token", response.data.token );
            router.push( '/cardapio-item' );
        } ).catch( error => {
            setErrorMessage( error.response.data.mensagem );
        } );
    };

    return (
        <div className="flex justify-center justify-items-center mt-20">
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
                <div className="py-2">
                    <Button onClick={login}>
                        Logar
                    </Button>            
                </div>                
            </Painel>
        </div>
    );
};

export default Login;