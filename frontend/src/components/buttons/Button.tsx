
import React, { MouseEvent, ReactNode } from 'react';

interface ButtonProps {
    variant? : "dark" | "light" | "red" | "blue";
    disabled?: boolean;
    onClick( e : MouseEvent<HTMLButtonElement>): void; 
    children : ReactNode;
}


const Button = ({onClick, disabled, variant, children}: ButtonProps) => {
    let className = "";
    switch( variant ) {
        case "dark":
            className = "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed";
            break;
        case "light":
            className = "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            break;
        case "red":
            className = "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
            break;
        default:
            className = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed";
    }
    return (
        <button type="button" className={className} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}

export default Button;