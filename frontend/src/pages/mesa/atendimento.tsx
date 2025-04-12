import Button from "@/components/buttons/Button";
import { DivItemMX1, DivItemsCenter, DivRow } from "@/components/Divs";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Message from "@/components/Message";
import { RealFormatter } from "@/components/NumberFormatter";
import PageTitle from "@/components/PageTitle";
import Painel from "@/components/Painel";
import SimpleField from "@/components/SimpleField";
import Spinner from "@/components/Spinner";
import { Table, TableBody, TableHead, TableTD, TableTH, TableTHR, TableTR } from "@/components/Table";
import MainLayout from "@/layouts/main/main-layout";
import useMesaAtendimentoViewModel from "@/viewModels/mesa/useMesaAtendimentoViewModel";
import { useState } from "react";

const MesaAtendimento = () => {

    const [mesa, setMesa] = useState<string>('');
    const [atenderDisabled, setAtenderDisabled] = useState<boolean>( true );

    const {
        loadMesa,
        atendeMesa,
        limpaMessages,
        mesaItems,
        total,
        errorMessage,
        infoMessage,
        loading,
        setErrorMessage
    } = useMesaAtendimentoViewModel();

    const onLoadMesa = async () => {
        limpaMessages();

        const mesaInt = parseInt( mesa );

        if ( isNaN( mesaInt ) ) {
            setErrorMessage( 'Informe um número de mesa numérico.' );
            return;
        }

        try {
            const loaded = await loadMesa( mesaInt );
            setAtenderDisabled( loaded === false );
        } catch ( error ) {
            console.error( error );
        }
    };

    const onAtenderMesa = async () => {
        limpaMessages();

        const mesaInt = parseInt( mesa );

        if ( isNaN( mesaInt ) ) {
            setErrorMessage( 'Informe um número de mesa numérico.' );
            return;
        }

        try {
            await atendeMesa( mesaInt );
        } catch ( error ) {
            console.error( error );
        }
    };

    return (
        <>
            <MainLayout>
                <Painel className="w-200 p-3">
                    <PageTitle>Atendimento de mesa</PageTitle>
                    <br />
                    <Label>Informe a mesa: </Label>
                    <DivRow>
                        <InputText width="w-100" value={mesa} onChange={(e) => setMesa( e.target.value )} />
                        <DivItemMX1>
                            <Button onClick={onLoadMesa}>
                                Carregar
                            </Button>
                        </DivItemMX1>                            
                    </DivRow>
                    
                    <Message type="error" message={errorMessage} />
                    <Message type="info" message={infoMessage} />
                    <DivItemsCenter>
                        <Spinner visible={loading} />
                    </DivItemsCenter>

                    <br />

                    <h1 className="text-2xl">Itens pedidos</h1>
                    <br />
                    <Table>
                        <TableHead>
                            <TableTHR>
                                <TableTH>Descrição</TableTH>
                                <TableTH>Preço</TableTH>
                                <TableTH>Quantidade</TableTH>
                            </TableTHR>
                        </TableHead>
                        <TableBody>
                            {mesaItems.map( (item, index) => (
                                <TableTR key={index}>
                                    <TableTD>
                                        {item.descricao}
                                    </TableTD>
                                    <TableTD>
                                        <RealFormatter value={item.preco} />
                                    </TableTD>
                                    <TableTD>
                                        {item.quantidade}
                                    </TableTD>
                                </TableTR>
                            ) )}
                        </TableBody>
                    </Table>

                    <br />

                    
                    <SimpleField 
                            name="Total: " 
                            valueTextColor="text-red-500" 
                            nameTextFont="text-2xl"
                            valueTextFont="text-2xl">
                        <RealFormatter value={total} />
                    </SimpleField>

                    <div className="my-2">
                        <Message type="error" message={errorMessage} />
                        <Message type="info" message={infoMessage} />
                        <DivItemsCenter>
                            <Spinner visible={loading} />
                        </DivItemsCenter>
                    </div>
                    
                    <Button onClick={onAtenderMesa} disabled={atenderDisabled}>
                        Atender mesa
                    </Button>
                    
                </Painel>
            </MainLayout>
        </>
    )
};

export default MesaAtendimento;