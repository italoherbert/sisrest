import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import SimpleButton from "./buttons/SimpleButton";

interface PaginatorProps {
    datalist: unknown[];

    onUpdateDataList( pageDataList : unknown[] ): void;

    pageSize: number;
    maxPagesByGroup: number;
    nextButtonLabel?: string;
    backButtonLabel?: string;
}

const Paginator = ({
    datalist, 
    onUpdateDataList, 
    pageSize, maxPagesByGroup,
    nextButtonLabel, backButtonLabel} : PaginatorProps) => {

    const [currentPageGroup, setCurrentPageGroup] = useState<number>( 0 );
    const [pageNumbers, setPageNumbers] = useState<number[]>( [] );
    
    const onPageClick = async ( num : number ) => {
        const i = (num-1) * pageSize;

        let j;
        if ( i+pageSize > datalist.length ) {
            j = datalist.length-1;
        } else {
            j = i + pageSize - 1;
        }

        const pageDataList = [];
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

        const quantPageGroups = calcQuantPageGroups();

        if ( currPageGroup < quantPageGroups ) {
            currPageGroup++;
            setCurrentPageGroup( currPageGroup );
            geraPageNumbers( currPageGroup );
        }
    };

    useEffect( () => {           
        const currPageGroup = ( datalist.length > 0 ? 1 : 0 );  
        setCurrentPageGroup( currPageGroup );

        if ( currPageGroup > 0 ) {
            onPageClick( currPageGroup );
        } else {
            onUpdateDataList( [] );
        }

        geraPageNumbers( currPageGroup );                   
    }, [datalist] );

    const geraPageNumbers = async ( currPageGroup : number ) => {
        const pageNumbersList : number[] = [];
               
        if ( currPageGroup > 0 ) {
            const quantPageGroups = calcQuantPageGroups();

            const firstPageNumber = ( ( currPageGroup - 1 ) * maxPagesByGroup ) + 1;

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
        let quantPages =  Math.floor( datalist.length / pageSize );
        if ( datalist.length % pageSize !== 0 )
            quantPages++;
        return quantPages;
    }

    const calcQuantPageGroups = () => {
        let quantPageGroups = Math.floor( datalist.length / ( pageSize * maxPagesByGroup ) );
        if ( datalist.length % ( pageSize * maxPagesByGroup ) !== 0 )
            quantPageGroups++;
        return quantPageGroups;
    };

    return (
        <nav>
            <ul className="inline-flex -space-x-px text-sm">
                <li>
                    <SimpleButton onClick={onBackClick} data-testid="back">
                        <span className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">                    
                            { backButtonLabel ? backButtonLabel : <FaChevronLeft /> }                        
                        </span>                             
                        </SimpleButton>
                </li>                                
                { pageNumbers.map( (number, index) => (                    
                    <li key={index}>
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
                            { nextButtonLabel ? nextButtonLabel : <FaChevronRight /> }                        
                        </span>
                    </SimpleButton>
                </li>                                
            </ul>
        </nav>
    );
};

export default Paginator;