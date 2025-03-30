import Link from "next/link";

import { ReactNode } from 'react';

interface ButtonOutlineLinkProps {
    variant?: "dark" | "blue";
    href: string;
    children: ReactNode;
}

const ButtonOutlineLink = ({href, variant, children} : ButtonOutlineLinkProps ) => {
    let className = "";
    switch( variant ) {
        case "dark":
            className = "text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800";
            break;
        default:
            className = "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800";
    }

    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    );
}

export default ButtonOutlineLink;