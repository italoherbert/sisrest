import { fireEvent, render, screen } from '@testing-library/react';
import InputReal from '../src/components/InputReal';

describe( 'test javascript', () => {
    it('test dec frac', () => {
        let str = "1001.25";
        let i = str.indexOf( '.' );
    
        let dec = str.substring( 0, i );
        let frac = str.substring( i+1, str.length );
    
        expect( dec ).toBe( '1001' );
        expect( frac ).toBe( '25' ); 
    } );
    
    it('test tofixed', () => {
        expect( (101.019).toFixed( 2 ) ).toBe( '101.02' );
        expect( (101.1).toFixed( 2 ) ).toBe( '101.10' );
        expect( (101).toFixed( 2 ) ).toBe( '101.00' );
    } );
    
    it('test textToRealNumber', () => {                
        const textToRealNumber = ( text ) => {
            return parseFloat( text.replace( 'R$ ', '' ).replaceAll( '.', '' ).replace( ',', '.' ) );
        };

        expect( textToRealNumber( 'R$ 4.000.000,00' ) ).toBe( 4000000 );
    } );
} );


describe( 'test InputReal', () => {
    it('test inputreal', () => {
        let value = 101.25;
        const inputrealRender = render( <InputReal value={value} placeholder="Real" onValueChange={(v) => {value = v} } /> );
        const inputreal = inputrealRender.getByPlaceholderText( "Real" );

        fireEvent.keyDown( inputreal, { key : '1' } );
        expect( value ).toBe( 1012.51 );

        fireEvent.keyDown( inputreal, { key: 'a' } );
        expect( value ).toBe( 1012.51 );

        fireEvent.keyDown( inputreal, { key : '', keyCode : 46, target : { selectionStart : 4 } } );
        expect( value ).toBe( 112.51 );

        fireEvent.keyDown( inputreal, { keyCode : 8, target : { selectionStart : 6 } } );
        expect( value ).toBe( 11.51 );

        fireEvent.keyDown( inputreal, { keyCode : 8 } );
        expect( value ).toBe( 11.5 );                  

        fireEvent.keyDown( inputreal, { keyCode : 8, target : { selectionStart : 6 } } );
        expect( value ).toBe( 11.5 );

        fireEvent.keyDown( inputreal, { keyCode : 46, target : { selectionStart : 5 } } );
        expect( value ).toBe( 11.5 );

        fireEvent.keyDown( inputreal, { key: '5', target : { selectionStart : 3 } } );
        expect( value ).toBe( 511.5 );
    } );
} );
