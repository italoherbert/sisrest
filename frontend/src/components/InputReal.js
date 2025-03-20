import { useEffect, useRef, useState } from "react";

const InputReal = ({value, prefix, decimalLength, placeholder, className, onValueChange} ) => {
    
    const DEFAULT_DECIMAL_LENGTH = 2;
    const DEFAULT_PREFIX = 'R$ ';

    const [valueString, setValueString] = useState( '' );
    const inputRef = useRef(null);

    useEffect( () => {          
        let valStr = numberToRealText( value ) ;              
        setValueString( valStr );
        onValueChange( value );
    }, [value] );

    const handleOnKeyTyped = async (e) => {
        if ( !isNumber( e.key ) && e.keyCode !== 8 && e.keyCode !== 46 )
            return;

        let ch = ( e.keyCode !== 8 && e.keyCode !== 46 ? e.key : '' );
        let cursorPos = e.target.selectionStart;

        let valStr;        
        if ( cursorPos > 2 && cursorPos < valueString.length ) {
            valStr = valueString.substring( 0, cursorPos ) + ch + valueString.substring( cursorPos, valueString.length );
        } else {
            if ( isNumber( ch ) === true ) {
                let val = textToRealNumber( valueString );
                val *= 10;
                val += parseFloat( ch ) / Math.pow( 10, decimalLength ?? DEFAULT_DECIMAL_LENGTH );
                valStr = numberToRealText( val );
            } else {
                valStr = valueString + ch;
            }
        }

        switch( e.keyCode ) {
            case 8:
                if ( cursorPos > 3 && valueString.charAt( cursorPos-1 ) !== ',' ) {       
                    if ( cursorPos === valueString.length ) {
                        let pos = valueString.length-1;
                        let fim = false;
                        while( pos >= 0 && !fim ) {
                            if ( valueString.charAt( pos ) === '0' || 
                                    valueString.charAt( pos ) === ',' ||
                                    valueString.charAt( pos ) === '.' ) {
                                pos--;
                            } else {
                                fim = true;
                            }
                        }
                        valStr = valStr.substring( 0, pos ) + valStr.substring( pos+1, valStr.length );                    
                    } else {
                        valStr = valStr.substring( 0, cursorPos-1 ) + valStr.substring( cursorPos, valStr.length );                    
                    }                        
                }                
                break;
            case 46:
                if ( cursorPos > 2 && valueString.charAt( cursorPos ) !== ',' )
                    valStr = valStr.substring( 0, cursorPos ) + valStr.substring( cursorPos+1, valStr.length );
                break;                
        }                    

        const val = textToRealNumber( valStr );
        const textVal = numberToRealText( val );
        setValueString( textVal );       

        onValueChange( val );
    }

    const handleOnSelect = async (e) => {
        if ( e.target.selectionStart < 3 )
            inputRef.current.setSelectionRange( 3, 3 );
    };

    const textToRealNumber = ( text ) => {
        return parseFloat( text.replace( (prefix ?? 'R$ '), '' ).replaceAll( '.', '' ).replace( ',', '.' ) );
    };

    const numberToRealText = ( num ) => {
        const _decimalLength = decimalLength ?? DEFAULT_DECIMAL_LENGTH;
        const _prefix = DEFAULT_PREFIX ?? 'R$ ';

        let n = ( isNumber( num ) ? num : 0 );
        let textNum = n.toFixed( _decimalLength ).toString().replace( '.', ',' );

        let valStr = "";
        let k = 0;
        for( let i = textNum.length-1; i >= 0; i-- ) {
            if ( i < textNum.length-5 ) {
                if ( k % 3 == 0 && i > 0 ) {
                    valStr = "." + textNum.charAt( i ) + valStr;
                } else {
                    valStr = textNum.charAt( i ) + valStr;
                }
                k++;
            } else {
                valStr = textNum.charAt( i ) + valStr;
            }
        }

        return _prefix + valStr;
    };

    const isNumber = ( text ) => {
        return !isNaN( parseFloat( text ) );
    };

    let classNames = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    if ( className !== undefined && className !== null )
        classNames += " "+className;

    return (
        <input type="text"
            ref={inputRef}
            placeholder={placeholder}
            onChange={ () => {} }
            value={valueString}
            onKeyDown={handleOnKeyTyped}      
            onSelect={handleOnSelect}       
            className={classNames}
            />
    );
};

export default InputReal;

/*
import CurrencyInput from 'react-currency-input-field';
        <CurrencyInput 
            placeholder={placeholder}
            value={value}
            decimalScale={2}
            decimalSeparator="," 
            groupSeparator="."
            fixedDecimalLength={2}
            prefix='R$ '
            onValueChange={handleOnValueChange} 
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' /> 

        const virgulaPos = valStr.indexOf( ',' );
        if ( virgulaPos !== -1 ) {
            const decimalLength2 = ( decimalLength ?? defaultDecimalLength );
            const invertidaVirgulaPos = valStr.length - virgulaPos - 1;
            if ( invertidaVirgulaPos > decimalLength2 ) {
                let dif = invertidaVirgulaPos - decimalLength2;
                valStr = valStr.substring( 0, valStr.length - dif );
            }
        }
*/