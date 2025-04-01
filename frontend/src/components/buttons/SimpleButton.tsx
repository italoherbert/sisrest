
import React, { ReactNode } from 'react';

interface SimpleButtonProps {
    onClick?(): void;
    disabled?: boolean;
    children: ReactNode;
}

const SimpleButton = ({onClick, disabled, children}: SimpleButtonProps) => {
    return (
        <button type="button" className="cursor-pointer" onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default SimpleButton;