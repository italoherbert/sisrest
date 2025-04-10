import { ChangeEvent } from "react";

interface SelectBoxProps {
    options: { value : string, label : string, selected?: boolean }[];
    onChange?( e : ChangeEvent<HTMLSelectElement> ): void;
    className?: string;
}

const SelectBox = ({options, onChange, className} : SelectBoxProps) => {
    let classNames = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    if ( className !== undefined )
        classNames += " "+className;
    
    return (
        <select className={classNames}
                onChange={onChange}>
            {options.map( (option, index) => (
                <option key={index} 
                        selected={option.selected} 
                        value={option.value}>
                    {option.label}
                </option>            
            ))}            
        </select>
    )
};

export default SelectBox;