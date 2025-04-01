import { FaX } from "react-icons/fa6";
import SimpleButton from "./buttons/SimpleButton";

interface ChipWithRemoveProps {
    text: string;
    onRemove(): void;
    bgColor?: string;
    textColor?: string;
}

export const Chip = ({ text, onRemove, bgColor, textColor } : ChipWithRemoveProps) => {    
    return (
        <div className={`inline-block rounded-md p-1 ${bgColor !== undefined ? bgColor : 'bg-green-200'} ${textColor !== undefined ? textColor : 'text-dark-500'}`}>
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
    )

};
