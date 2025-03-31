import Button from "../../components/buttons/Button";
import { DivItemMX1 } from "../../components/Divs";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "../../components/Modal";

interface CardapioItemRemoverProps {
    itemDesc: string;
    visible: boolean;
    setVisible( visible : boolean ): void;
    onRemover(): void;
}

const CardapioItemRemover = ({itemDesc, visible, setVisible, onRemover} : CardapioItemRemoverProps) => {
    return (
        <Modal visible={visible} className="w-1/3">
            <ModalHeader title="Remoção de items" setVisible={setVisible} />
            <ModalBody>
                Confirme se deseja remover o ítem de cardápio de descrição: 
                <span className="mx-1 text-red-500"> 
                    {itemDesc}
                </span>
                ?
            </ModalBody>
            <ModalFooter>                    
                <DivItemMX1>
                    <Button onClick={() => setVisible( false )}>
                        Fechar
                    </Button>
                </DivItemMX1>                    
                <Button variant="red" onClick={onRemover}>
                    Remover
                </Button>
            </ModalFooter>
        </Modal>
    )
};

export default CardapioItemRemover;