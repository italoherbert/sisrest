import Link from "next/link";

import React, { ReactNode } from 'react';

interface ButtonIconLinkProps {
    variant?: "alternative" | "dark" | "light" | "blue";
    href: string;
    children: ReactNode;
}

const ButtonIconLink : React.FC<ButtonIconLinkProps> = ({variant, href, children}) => {
    let className = "";
    switch( variant ) {
        case 'alternative':
            className = "me-2 p-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700";
            break;
        case 'dark':
            className = "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            break;
        case 'light':
            className = "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm p-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700";
            break;
        default:
            className = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
    }     
    return (
        <Link href={href} className={className}>
            {children}
        </Link>        
    );
};

export default ButtonIconLink;