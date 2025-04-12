import { ReactNode } from "react";
import Button from "../buttons/Button";
import { DivItemMX1 } from "../Divs";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "./Modal";

interface SimpleModalProps {
    title: string;
    visible: boolean;
    setVisible( visible : boolean ): void;
    actionLabel : string;
    onAction(): void;
    children: ReactNode;
}

const SimpleModal = ({title, visible, setVisible, onAction, actionLabel, children} : SimpleModalProps) => {
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
                <Button variant="red" onClick={onAction}>
                    {actionLabel}
                </Button>
            </ModalFooter>
        </Modal>
    )
};

export default SimpleModal;