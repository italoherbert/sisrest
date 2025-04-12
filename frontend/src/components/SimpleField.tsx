import { ReactNode } from "react";

interface SimpleFieldProps {
    name: string;
    nameTextColor?: string;   
    valueTextColor?: string;    
    nameTextFont?: string;
    valueTextFont?: string;
    children: ReactNode;
}

const SimpleField = ( { 
        name, 
        nameTextColor, 
        nameTextFont, 
        valueTextColor, 
        valueTextFont, 
        children } : SimpleFieldProps ) => {

    return (
        <div className="flex flex-row items-center">
            <div className={`${nameTextColor ?? 'text-gray-900'} ${nameTextFont ?? 'text-sm'} mr-2`}>
                {name}
            </div>
            <div className={`${valueTextColor ?? 'text-blue-500'} ${valueTextFont ?? 'text-lg'}`}>
                {children}
            </div>
        </div>
    )
};

export default SimpleField;