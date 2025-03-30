import { MouseEvent } from 'react';
import Link from 'next/link';

import { FaCircleInfo, FaPenToSquare, FaTrash } from "react-icons/fa6";

import SimpleButton from "./buttons/SimpleButton";

interface ActionItemsProps {
    detailsHref: string;
    editarHref: string;
    removerOnClick( e : MouseEvent<HTMLButtonElement> ): void;
}

const ActionItems = ({detailsHref, editarHref, removerOnClick} : ActionItemsProps) => {
    return (
        <div className="flex flex-row">
            <div className="px-1 border-r border-gray-500">
                <Link href={detailsHref}>
                    <FaCircleInfo color="green" />
                </Link>
            </div>                                                                                
            <div className="px-1 border-r border-gray-500">
                <Link href={editarHref}>
                    <FaPenToSquare color="blue" />
                </Link>    
            </div> 
            <div className="px-1">
                <SimpleButton onClick={removerOnClick}>
                    <FaTrash color="red"/>
                </SimpleButton>    
            </div>                                        
        </div>
    );
};

export default ActionItems;