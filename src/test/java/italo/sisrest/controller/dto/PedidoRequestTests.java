package italo.sisrest.controller.dto;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.catchThrowable;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import italo.sisrest.controller.dto.request.PedidoRequest;
import italo.sisrest.exception.ValidationException;
import italo.sisrest.mocks.PedidoMocks;

public class PedidoRequestTests {
    
    @Test
    @DisplayName("Deve validar pedido com sucesso")
    void deveValidarPedidoComSucesso() {
        PedidoRequest request = PedidoMocks.mockPedidoRequest();

        request.validate();

        assertThat( request.getMesa() ).isGreaterThanOrEqualTo( 1 );
    }

    @ParameterizedTest
    @ValueSource(ints = { -1, -5, -10 })
    void deveLancarExcecaoDeMesaInvalida( int mesa ) {
        PedidoRequest request = PedidoMocks.mockPedidoRequest();
        request.setMesa( mesa );

        Throwable t = catchThrowable( request::validate );

        assertThat( t ).isNotNull();
        assertThat( t ).isInstanceOf( ValidationException.class );
        assertThat( ((ValidationException)t).response().getMensagem() ).isEqualTo( "O valor do campo 'mesa' deve ser um número maior que zero." );

    }

}
