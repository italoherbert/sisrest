package italo.sisrest.controller.dto;

import italo.sisrest.controller.dto.request.filter.PedidoFilterRequest;
import italo.sisrest.exception.ValidationException;
import italo.sisrest.mocks.PedidoMocks;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.catchThrowable;

public class PedidoFilterRequestTests {

    @ParameterizedTest
    @ValueSource(strings = { "0", "-1", "*", "1"})
    @DisplayName("Deve validar filtro com sucesso.")
    void deveValidarFiltroComSucesso( String mesa ) {
        PedidoFilterRequest request = PedidoMocks.mockPedidoFilterRequest();
        request.setMesa( mesa );

        request.validate();
    }

    @ParameterizedTest
    @NullAndEmptySource
    @DisplayName( "Deve lançar exceção de valor não inteiro nem asterisco.")
    void deveLancarExcecaoDeCampoMesaObrigatorio( String mesa ) {
        PedidoFilterRequest request = PedidoMocks.mockPedidoFilterRequest();
        request.setMesa( mesa );

        Throwable t = catchThrowable( request::validate );

        assertThat( t ).isNotNull();
        assertThat( t ).isInstanceOf( ValidationException.class );
        assertThat( ((ValidationException)t).response().getMensagem() ).isEqualTo( "O campo 'mesa' é de preenchimento obrigatório." );
    }

    @ParameterizedTest
    @ValueSource(strings= { "a", "1a", "-2d", "d3" })
    @DisplayName( "Deve lançar exceção de valor não inteiro nem asterisco.")
    void deveLancarExcecaoDeValorNaoInteiroNemAsterisco( String mesa ) {
        PedidoFilterRequest request = PedidoMocks.mockPedidoFilterRequest();
        request.setMesa( mesa );

        Throwable t = catchThrowable( request::validate );

        assertThat( t ).isNotNull();
        assertThat( t ).isInstanceOf( ValidationException.class );
        assertThat( ((ValidationException)t).response().getMensagem() ).isEqualTo( "O valor do campo 'mesa' deve ser um número inteiro ou asterisco." );
    }

}
