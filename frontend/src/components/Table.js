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

export const Paginator = ({datalist, onUpdateDataList, pageSize, maxPagesGroupSize}) => {

    const [firstPageNumber, setFirstPageNumber] = useState( 0 );
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
        let fpNumber = firstPageNumber;

        const currentPageGroup = calcCurrentPageGroup( fpNumber );
        
        if ( currentPageGroup > 1 ) {
            fpNumber -= maxPagesGroupSize;
            setFirstPageNumber( fpNumber );
            geraPageNumbers( fpNumber );
        }
    };

    const onNextClick = async () => {                
        let fpNumber = firstPageNumber;

        const quantPagesGroups = calcQuantPagesGroups();
        const currentPageGroup = calcCurrentPageGroup( fpNumber );

        if ( currentPageGroup < quantPagesGroups ) {
            fpNumber += maxPagesGroupSize;
            setFirstPageNumber( fpNumber );
            geraPageNumbers( fpNumber );
        }
    };

    useEffect( () => {             
        if ( datalist.length > 0 ) {
            setFirstPageNumber( 1 );
            onPageClick( 1 ); 
            geraPageNumbers( 1 );           
        } else {
            setFirstPageNumber( 0 );
        }
    }, [datalist] );

    const geraPageNumbers = async ( fpNumber ) => {
        let pageNumbersList = [];
       
        if ( fpNumber > 0 ) {

            let lastPageNumber;
            if ( ( fpNumber * pageSize ) + ( maxPagesGroupSize * pageSize ) < datalist.length ) {
                lastPageNumber = fpNumber + maxPagesGroupSize - 1;
            } else {
                lastPageNumber = fpNumber + ( datalist.length - ( fpNumber * pageSize ) );
            }

            for( let i = fpNumber; i <= lastPageNumber; i++ )
                pageNumbersList.push( i );
        }

        setPageNumbers( pageNumbersList );
    };

    const calcQuantPagesGroups = () => {
        let quantPagesGroups = parseInt( datalist.length / ( pageSize * maxPagesGroupSize ) );
        if ( datalist.length % ( pageSize * maxPagesGroupSize ) != 0 )
            quantPagesGroups++;
        return quantPagesGroups;
    };

    const calcCurrentPageGroup = ( fpNumber ) => {
        return parseInt( fpNumber / maxPagesGroupSize ) + 1
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