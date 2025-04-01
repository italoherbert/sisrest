import { FaX } from "react-icons/fa6";
import SimpleButton from "./buttons/SimpleButton";

interface ChipWithRemoveProps {
    text: string;
    onRemove(): void;
    bgColor?: string;
    textColor?: string;
    hoverBGColor?: string;
    hoverTextColor?: string;
    onSelect?(): void;
}

export const Chip = ({ text, onRemove, bgColor, textColor, hoverBGColor, hoverTextColor, onSelect } : ChipWithRemoveProps) => {    
    let classNames = "inline-block rounded-md p-1";
    classNames += " "+( bgColor !== undefined ? bgColor : 'bg-blue-400' );
    classNames += " "+( textColor !== undefined ? textColor : 'text-dark-500' );
    if ( onSelect !== undefined ) {
        classNames += " "+( hoverBGColor !== undefined ? hoverBGColor : 'hover:bg-blue-900' );
        classNames += " "+( hoverTextColor !== undefined ? hoverTextColor : 'hover:text-white')
    }

    const handleOnClick = async () => {        
        if ( onSelect !== undefined )
            onSelect();
    };

    return (
        <div onClick={handleOnClick}>
            <div className={classNames}>
                <div className="flex items-center">
                    {text}
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
