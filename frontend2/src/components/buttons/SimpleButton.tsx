
import React, { MouseEvent, ReactNode } from 'react';

interface SimpleButtonProps {
    onClick?( e : MouseEvent<HTMLButtonElement> ): void;
    disabled?: boolean;
    children: ReactNode;
}

const SimpleButton : React.FC<SimpleButtonProps> = ({onClick, disabled, children}) => {
    return (
        <button type="button" className="cursor-pointer" onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default SimpleButton;