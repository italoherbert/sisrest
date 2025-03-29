import { FaX } from "react-icons/fa6";
import SimpleButton from "./buttons/SimpleButton";
import Painel from "./Painel";

export const Modal = ({visible, className, children}) => {

    return (        
        <div className={`absolute z-10 flex flex-col justify-center w-full h-screen items-center bg-gray-500/50 ${visible === true ? 'block' : 'hidden'}`}>
            <Painel className={`bg-white ${className ?? ''}`}>
                {children}
            </Painel>
        </div>
    );

};

export const ModalHeader = ({title, titleClassName, setVisible, className}) => {

    const handleCloseOnClick = async () => {
        setVisible( false );
    };

    return (
        <div className={`flex flex-row justify-between bg-gray-50 border-b border-gray-100 p-3 ${className ?? ''}`}>
            <h1 className={titleClassName ?? 'text-2xl'}>
                {title}
            </h1>
            <SimpleButton onClick={handleCloseOnClick}>
                <FaX />
            </SimpleButton>
        </div>
    );
};

export const ModalBody = ({className, children}) => {
    return (
        <div className={`p-3 ${className}`}>
            {children}
        </div>
    );
};

export const ModalFooter = ({className, children}) => {
    return (
        <div className={`flex justify-end items-center p-3 border-t border-gray-100 ${className}`}>
            {children}
        </div>
    ); 
};