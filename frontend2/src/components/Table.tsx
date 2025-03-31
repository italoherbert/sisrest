import { ReactNode } from "react";

interface TableProps {
    bgColor?: string;
    textColor?: string;
    children: ReactNode;
}

export const Table = ({bgColor, textColor, children} : TableProps ) => {
    let className = "w-full text-sm text-left rtl:text-right dark:text-gray-400";
    if ( bgColor !== undefined && bgColor !== null )
        className += " "+bgColor;
    className += " "+(textColor ?? 'text-gray-500')

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className={className}>
                {children}
            </table>
        </div>
    )
};


interface TableHeadProps {
    bgColor?: string;
    textColor?: string;
    children: ReactNode;
}

export const TableHead = ({bgColor, textColor, children} : TableHeadProps ) => {
    let className = "w-full text-sm text-left rtl:text-right dark:text-gray-400";
    if ( bgColor !== undefined && bgColor !== null )
        className += " "+bgColor;
    className += " "+(textColor ?? 'text-gray-500');

    return (
        <thead className={className}>
            {children}
        </thead>
    )
};


interface TableBodyProps {
    bgColor?: string;
    textColor?: string;
    divideColor?: string;
    children: ReactNode;
}

export const TableBody = ({bgColor, textColor, divideColor, children} : TableBodyProps ) => {
    let className = "divide-y";
    className += " "+(divideColor ?? 'divide-gray-200');
    className += " "+(bgColor ?? 'bg-white');    
    if ( textColor !== undefined && textColor !== null )
        className += " "+textColor;
    
    return (
        <tbody className={className}>
            {children}
        </tbody>
    )
};


interface TableTHRProps {
    bgColor?: string;
    textColor?: string;
    children: ReactNode;
}

export const TableTHR = ({bgColor, textColor, children} : TableTHRProps ) => {
    let className = "";
    if ( bgColor !== undefined && bgColor !== null )
        className += " "+bgColor;
    if ( textColor !== undefined && textColor !== null )
        className += " "+textColor;

    return (
        <tr className={className}>
            {children}
        </tr>
    );
};

interface TableTRProps {
    bgColor?: string;
    textColor?: string;
    borderColor?: string;
    children: ReactNode;
}

export const TableTR = ({bgColor, textColor, borderColor, children} : TableTRProps ) => {
    let className = "border-b dark:border-gray-700";
    if ( bgColor !== undefined && bgColor !== null )
        className += " "+bgColor;
    if ( textColor !== undefined && textColor !== null )
        className += " "+textColor;
    className += " "+(borderColor ?? 'border-gray-200');

    return (
        <tr className={className}>
            {children}
        </tr>
    )
};


interface TableTDProps {
    bgColor?: string;
    textColor?: string;
    children: ReactNode;
}

export const TableTD = ({bgColor, textColor, children} : TableTDProps ) => {
    let className = "px-6 py-4 font-medium whitespace-nowrap dark:text-white dark:bg-gray-800";
    if ( bgColor !== undefined && bgColor !== null )
        className += " "+bgColor;
    if ( textColor !== undefined && textColor !== null )
        className += " "+textColor;
    return (
        <td className={className}>
            {children}
        </td>
    );
};


interface TableTHProps {
    bgColor?: string;
    textColor?: string;
    children: ReactNode;
}

export const TableTH = ({bgColor, textColor, children} : TableTHProps ) => {
    let className = "px-6 py-3";
    if ( bgColor !== undefined && bgColor !== null )
        className += " "+bgColor;
    if ( textColor !== undefined && textColor !== null )
        className += " "+textColor;

    return (
        <th scope="col" className={className}>
            {children}
        </th>
    )
};