import { ReactNode } from "react";
import Button from "../buttons/Button";
import { DivItemMX1 } from "../Divs";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "./Modal";

interface ModalRemoverProps {
    title: string;
    visible: boolean;
    setVisible( visible : boolean ): void;
    onRemover(): void;
    children: ReactNode;
}

const ModalRemover = ({title, visible, setVisible, onRemover, children} : ModalRemoverProps) => {
    return (
        <Modal visible={visible} className="w-100">
            <ModalHeader title={title} setVisible={setVisible} />
            <ModalBody>
                {children}
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

export default ModalRemover;