import { useCallback, useEffect, useState } from "react";
import SimpleButton from "./buttons/SimpleButton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export const Table = ({bgColor, textColor, children}) => {
    let className = "w-full text-sm text-left rtl:text-right dark:text-gray-400";
    if ( bgColor !== undefined && bgColor !== null )
        className += " "+bgColor;
    className += " "+(textColor ?? 'text-gray-500')

    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className={className}>
                {children}
            </table>
        </div>
    )
};

export const TableHead = ({bgColor, textColor, children}) => {
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

export const TableBody = ({bgColor, textColor, divideColor, children}) => {
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

export const TableTHR = ({bgColor, textColor, children}) => {
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

export const TableTR = ({bgColor, textColor, borderColor, children}) => {
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

export const TableTD = ({bgColor, textColor, children}) => {
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

export const TableTH = ({bgColor, textColor, children}) => {
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

export const Paginator = ({datalist, onUpdateDataList, pageSize, maxPagesByGroup}) => {

    const [currentPageGroup, setCurrentPageGroup] = useState( 0 );
    const [pageNumbers, setPageNumbers] = useState( [] );
    
    const onPageClick = async ( number ) => {
        let i = (number-1) * pageSize;

        let j;
        if ( i+pageSize > datalist.length ) {
            j = datalist.length-1;
        } else {
            j = i + pageSize - 1;
        }

        let pageDataList = [];
        for( let k = i; k <= j; k++ )
            pageDataList.push( datalist[ k ] );

        onUpdateDataList( pageDataList );
    };

    const onBackClick = async () => {
        let currPageGroup = currentPageGroup;
        
        if ( currPageGroup > 1 ) {
            currPageGroup--;
            setCurrentPageGroup( currPageGroup );
            geraPageNumbers( currPageGroup );
        }
    };

    const onNextClick = async () => {                
        let currPageGroup = currentPageGroup;

        let quantPageGroups = calcQuantPageGroups();

        if ( currPageGroup < quantPageGroups ) {
            currPageGroup++;
            setCurrentPageGroup( currPageGroup );
            geraPageNumbers( currPageGroup );
        }
    };

    useEffect( () => {           
        let currPageGroup = ( datalist.length > 0 ? 1 : 0 );  
        setCurrentPageGroup( currPageGroup );

        if ( currPageGroup > 0 ) {
            onPageClick( currPageGroup );
        } else {
            onUpdateDataList( [] );
        }

        geraPageNumbers( currPageGroup );                   
    }, [datalist] );

    const geraPageNumbers = async ( currPageGroup ) => {
        let pageNumbersList = [];
               
        if ( currPageGroup > 0 ) {
            const quantPageGroups = calcQuantPageGroups();

            let firstPageNumber = ( ( currPageGroup - 1 ) * maxPagesByGroup ) + 1;

            let lastPageNumber;
            if ( currPageGroup < quantPageGroups ) {                
                lastPageNumber = firstPageNumber + maxPagesByGroup - 1;
            } else {
                lastPageNumber = calcQuantPages();
            }

            for( let i = firstPageNumber; i <= lastPageNumber; i++ )
                pageNumbersList.push( i );
        }

        setPageNumbers( pageNumbersList );
    };

    const calcQuantPages = () => {
        return parseInt( datalist.length / pageSize ) + datalist.length % pageSize;
    }

    const calcQuantPageGroups = () => {
        let quantPageGroups = parseInt( datalist.length / ( pageSize * maxPagesByGroup ) );
        if ( datalist.length % ( pageSize * maxPagesByGroup ) != 0 )
            quantPageGroups++;
        return quantPageGroups;
    };

    return (
        <nav>
            <ul class="inline-flex -space-x-px text-sm">
                <li>
                    <SimpleButton onClick={onBackClick}>
                        <span className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">                    
                            <FaChevronLeft />
                        </span>
                    </SimpleButton>
                </li>                                
                { pageNumbers.map( (number, index) => (                    
                    <li>
                        <SimpleButton onClick={() =>onPageClick( number )}>
                            <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                {number}     
                            </span>
                        </SimpleButton>                    
                    </li>                    
                ) ) }
                <li>
                    <SimpleButton onClick={onNextClick}>
                        <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <FaChevronRight />
                        </span>
                    </SimpleButton>
                </li>                                
            </ul>
        </nav>
    );
}