import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Button from '../components/buttons/Button';
import InputText from '../components/InputText';
import Label from '../components/Label';
import Painel from '../components/Painel';
import Message from '../components/Message';
import Spinner from '../components/Spinner';
import { DivItemsCenter } from '../components/Divs';
import { useLoginViewModel } from '../viewModels/useLoginViewModel';

const Login = () => {

    const router = useRouter();

    const [username, setUsername] = useState<string>( "" );
    const [password, setPassword] = useState<string>( "" );

    const {logar, limpaToken, errorMessage, infoMessage, loading} = useLoginViewModel();

    useEffect( () => {
        limpaToken();
    }, [] );

    const login = async () => {
        try {
            await logar( {
                username: username,
                password: password
            } );
            
            router.push( '/cardapio-item' );
        } catch ( error ) {
            console.error( error );
        }
    };

    return (
        <DivItemsCenter className="mt-20">
            <Painel className="columns-1 w-1/3 p-3">                
                <h1>Login</h1>
                
                <div className="py-2">
                    <Label>Nome de usuário: </Label>
                    <InputText 
                        value={username} 
                        onChange={(e) => setUsername( e.target.value ) } 
                        onEnterTyped={() => login()}/>
                </div>
                <div className="py-2">
                    <Label>Senha: </Label>
                    <InputText 
                        type="password"
                        value={password} 
                        onChange={(e) => setPassword( e.target.value ) } 
                        onEnterTyped={() => login()}/>
                </div>
                <Message message={errorMessage} type="error" />
                <Message message={infoMessage} type="info" />

                <DivItemsCenter>
                    <Spinner visible={loading} />
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