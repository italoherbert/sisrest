import { ReactNode } from 'react';

interface DivItemsCenterProps {
    className?: string;
    children: ReactNode;
}

interface ChildrenOnly {
    children: ReactNode;
}

export const DivItemsCenter = ({className, children} : DivItemsCenterProps) => {
    let classNames = "flex justify-center items-center";
    if ( className !== undefined && className !== null )
        classNames += " "+className;

    return (
        <div className={classNames}>
            {children}
        </div>
    )
};

interface DivRowProps {
    className?: string;
    children: ReactNode;
}

export const DivRow = ({className, children} : DivRowProps ) => {
    let classNames = "flex flex-row items-center";
    if ( className !== undefined && className !== null )
        classNames += " "+className;

    return (
        <div className={classNames}>
            {children}
        </div>
    )
}

export const DivItemMX2 = ({children} : ChildrenOnly) => {
    return (
        <div className="mx-2">
            {children}
        </div>
    );
};

export const DivItemMX1 = ({children} : ChildrenOnly) => {
    return (
        <div className="mx-1">
            {children}
        </div>
    );
};

export const DivItemP2 = ({children} : ChildrenOnly) => {
    return (
        <div className="p-2">
            {children}
        </div>
    );
};