import React from 'react';
import '@testing-library/jest-dom'; 
import { fireEvent, render } from '@testing-library/react';
import Paginator from '../src/components/Paginator';


describe( 'test Paginator.js', () => {
    it('test (1)', () => {
        const itemDataList = [ 
            { descricao : 'Café', preco: 8 },
            { descricao : 'Leite', preco: 5 },
            { descricao : 'Macarrão', preco: 10 },
            { descricao : 'Feijão', preco: 8 },
            { descricao : 'Arroz', preco: 12 },
            { descricao : 'Sorvete', preco: 3 },
            { descricao : 'Mel', preco: 5 }        
        ];

        let itemPageDataList : [] = [];
        
        const onUpdate = ( pageDataList : [] ) => {
            itemPageDataList = pageDataList;
        };

        const paginatorRender = render( 
            <Paginator datalist={itemDataList} 
                maxPagesByGroup={4} 
                pageSize={2} 
                onUpdateDataList={onUpdate} /> 
        );
        
        fireEvent.click( paginatorRender.getByText( "1" ) );
        expect( itemPageDataList ).toStrictEqual( [
            { descricao : 'Café', preco: 8 },
            { descricao : 'Leite', preco: 5 },
        ] );

        fireEvent.click( paginatorRender.getByText( "2" ) );
        expect( itemPageDataList ).toStrictEqual( [
            { descricao : 'Macarrão', preco: 10 },
            { descricao : 'Feijão', preco: 8 },
        ] );

        fireEvent.click( paginatorRender.getByText( "3" ) );
        expect( itemPageDataList ).toStrictEqual( [
            { descricao : 'Arroz', preco: 12 },
            { descricao : 'Sorvete', preco: 3 },
        ] );

        fireEvent.click( paginatorRender.getByText( "4" ) );
        expect( itemPageDataList ).toStrictEqual( [
            { descricao : 'Mel', preco: 5 }
        ] );

        expect( paginatorRender.queryByText( '5' ) ).toBeNull();
        expect( paginatorRender.queryByText( '1' ) ).not.toBeNull();

        expect( paginatorRender.queryByText( '0' ) ).toBeNull();
    } );

    it( 'test (2)', () => {
        const itemDataList = [];
        for( let i = 0; i < 101; i++ )
            itemDataList.push( { descricao: 'ABC', preco: 5 } );

        const onUpdate = jest.fn();

        const pagRender = render( 
            <Paginator datalist={itemDataList} 
                maxPagesByGroup={3} 
                pageSize={10} 
                onUpdateDataList={onUpdate} 
                backButtonLabel="Anterior" 
                nextButtonLabel="Proximo" /> 
        );

        for( let i = 0; i < 3; i++ ) {
            for( let j = 0; j < 3; j++ )
                expect( pagRender.getByText( ''+((i*3)+j+1) ) ).toBeInTheDocument();            
            expect( pagRender.queryByText( ''+(i*3) ) ).toBeNull();
            expect( pagRender.queryByText( ''+((i*3)+4) ) ).toBeNull();

            fireEvent.click( pagRender.getByText( 'Proximo' ) );
        }

        expect( pagRender.queryByText( '10' ) ).toBeInTheDocument();
        expect( pagRender.queryByText( '11' ) ).toBeInTheDocument();

        fireEvent.click( pagRender.getByText( 'Proximo' ) );

        expect( pagRender.queryByText( '10' ) ).toBeInTheDocument();
        expect( pagRender.queryByText( '11' ) ).toBeInTheDocument();

        fireEvent.click( pagRender.getByText( 'Anterior' ) );

        for( let i = 2; i >= 0; i-- ) {
            for( let j = 2; j >= 0; j-- )
                expect( pagRender.getByText( ''+((i*3)+j+1) ) ).toBeInTheDocument();            
            expect( pagRender.queryByText( ''+(i*3) ) ).toBeNull();
            expect( pagRender.queryByText( ''+((i*3)+4) ) ).toBeNull();

            fireEvent.click( pagRender.getByText( 'Anterior' ) );
        }

        expect( pagRender.queryByText( '1' ) ).toBeInTheDocument();
        expect( pagRender.queryByText( '2' ) ).toBeInTheDocument();
        expect( pagRender.queryByText( '3' ) ).toBeInTheDocument();

        fireEvent.click( pagRender.getByText( 'Anterior' ) );

        expect( pagRender.queryByText( '1' ) ).toBeInTheDocument();
        expect( pagRender.queryByText( '2' ) ).toBeInTheDocument();
        expect( pagRender.queryByText( '3' ) ).toBeInTheDocument();
    } )
} );