
const CardapioItemRemover = ({onError}) => {

    const [deleteModalVisible, setDeleteModalVisible] = useState( false );
    const [deleteId, setDeleteId] = useState( '' );
    const [deleteCardapioItemDescricao, setDeleteCardapioItemDescricao] = useState( '' );

    const remover = async () => {
        setErrorMessage( null );
        setInfoMessage( null );
        setSpinnerVisible( true );

        axios.delete( BASE_URL + "/cardapioitem/"+deleteId, { 
            headers: {
                Authorization: `Bearer ${localStorage.getItem( 'token' )}`
            }
        } ).then( response => {
            filtra();
            
            setDeleteModalVisible( false );           
            setInfoMessage( 'Item deletado com sucesso.');            
            setSpinnerVisible( false );
        } ).catch( error => {
            setErrorMessage( extractErrorMessage( error ) );
            setSpinnerVisible( false );
        } );
    };

    const perguntarSeRemover = async ( id ) => {
        setErrorMessage( null );
        setInfoMessage( null );
        setSpinnerVisible( true );

        axios.get( BASE_URL + "/cardapioitem/"+id, { 
            headers: {
                Authorization: `Bearer ${localStorage.getItem( 'token' )}`
            }
        } ).then( response => {
            setDeleteCardapioItemDescricao( response.data.descricao );
            setDeleteId( id );
            setDeleteModalVisible( true );           

            setSpinnerVisible( false );
        } ).catch( error => {
            setErrorMessage( extractErrorMessage( error ) );
            setSpinnerVisible( false );
        } );
    };

    return (
        <Modal visible={deleteModalVisible} className="w-1/3">
            <ModalHeader title="Remoção de items" onModalVisible={setDeleteModalVisible} />
            <ModalBody>
                Confirme se deseja remover o ítem de cardápio de descrição: 
                <span className="mx-1 text-red-500"> 
                    {deleteCardapioItemDescricao}
                </span>
                ?
            </ModalBody>
            <ModalFooter>                    
                <DivItemMX1>
                    <Button onClick={() => setDeleteModalVisible( false )}>
                        Fechar
                    </Button>
                </DivItemMX1>                    
                <Button variant="red" onClick={remover}>
                    Remover
                </Button>
            </ModalFooter>
        </Modal>
    )
}