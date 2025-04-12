import { ReactNode } from 'react';

interface FieldProps {
    name: string;
    nameTextColor?: string;   
    valueTextColor?: string;    
    nameTextFont?: string;
    valueTextFont?: string;
    children: ReactNode;
}

const Field = ({name, nameTextColor, valueTextColor, nameTextFont, valueTextFont, children} : FieldProps ) => {
    return (
        <div className="flex flex-col">
            <div className={`${nameTextColor ?? 'text-gray-900'} ${nameTextFont ?? 'text-sm'}`}>
                {name}
            </div>
            <div className={`${valueTextColor ?? 'text-blue-500'} ${valueTextFont ?? 'text-lg'}`}>
                {children}
            </div>
        </div>
    )
};

export default Field;