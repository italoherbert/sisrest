import { FaX } from "react-icons/fa6";
import SimpleButton from "./buttons/SimpleButton";
import { ReactNode } from "react";

interface ChipWithRemoveProps {
    onRemove?(): void;
    bgColor?: string;
    textColor?: string;
    hoverBGColor?: string;
    hoverTextColor?: string;
    className?: string;
    onClick?(): void;
    children: ReactNode;
}

export const Chip = ({ onRemove, bgColor, textColor, hoverBGColor, hoverTextColor, className, onClick, children } : ChipWithRemoveProps) => {    
    let classNames = "inline-block rounded-md p-1";
    classNames += " "+( bgColor !== undefined ? bgColor : 'bg-blue-400' );
    classNames += " "+( textColor !== undefined ? textColor : 'text-dark-500' );
    if ( onClick !== undefined ) {
        classNames += " "+( hoverBGColor !== undefined ? hoverBGColor : 'hover:bg-blue-900' );
        classNames += " "+( hoverTextColor !== undefined ? hoverTextColor : 'hover:text-white')
    }
    classNames += " "+( className ?? '' );

    const handleOnClick = async () => {        
        if ( onClick !== undefined )
            onClick();
    };

    return (
        <div onClick={handleOnClick}>
            <div className={classNames}>
                <div className="flex items-center">
                    {children}
                    { onRemove !== undefined ? (
                        <>
                            <span className="mx-1"></span>
                            <SimpleButton onClick={onRemove}>
                                <FaX />
                            </SimpleButton>
                        </>
                    ) : (
                        <></>
                    ) }
                </div>
            </div>
        </div>
    )

};
