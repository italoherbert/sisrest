import { ReactNode } from "react";

interface PainelProps {
    className?: string;
    children: ReactNode;
}

const Painel = ({className, children} : PainelProps) => {
    let classNames = "border border-gray-300 rounded";
    if ( className !== undefined )
        classNames += " "+className;

    return (
        <div className={classNames}>
            {children}
        </div>
    );
};

export default Painel;