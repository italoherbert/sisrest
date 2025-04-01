import { ChangeEvent, KeyboardEvent } from "react";

interface InputTextProps {
    type?: string;
    value: string;
    placeholder?: string;
    width?: string;
    onChange?( e : ChangeEvent<HTMLInputElement> ) : void;
    onKeyDown?( e : KeyboardEvent<HTMLInputElement> ) : void;
    onEnterTyped?( e : KeyboardEvent<HTMLInputElement> ) : void;
};


const InputText = ({type, value, placeholder, width, onChange, onKeyDown, onEnterTyped} : InputTextProps ) => {
    const handleOnKeyDown = async ( e : KeyboardEvent<HTMLInputElement> ) => {
        if ( onKeyDown !== undefined )
            onKeyDown( e );

        if ( e.key === 'Enter' )
            if ( onEnterTyped !== undefined )
                onEnterTyped( e );        
    };

    let classNames = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    classNames += ( width !== undefined ? width : " w-full" );

    return (
        <input 
            type={type ?? 'text'}
            placeholder={placeholder} 
            value={value}
            onChange={onChange} 
            onKeyDown={handleOnKeyDown}
            className={classNames} />
    );
}

export default InputText;