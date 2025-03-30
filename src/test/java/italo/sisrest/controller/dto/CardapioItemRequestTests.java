package italo.sisrest.controller.dto;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.catchThrowable;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;

import italo.sisrest.controller.dto.request.CardapioItemRequest;
import italo.sisrest.exception.ValidationException;
import italo.sisrest.mocks.CardapioItemMocks;

public class CardapioItemRequestTests {
    
    @Test
    void deveValidarComSucesso() {
        CardapioItemRequest item = CardapioItemMocks.mockCardapioItemRequest();
        item.validate();

        assertThat( item.getDescricao() ).isNotNull();
        assertThat( item.getDescricao() ).isNotBlank();
    }

    @ParameterizedTest
    @NullAndEmptySource
    @DisplayName("Deve tratar exceção de descrição obrigatória")
    void deveTratarExceptionDescricaoObrigatoria( String descricao ) {
        CardapioItemRequest item = CardapioItemMocks.mockCardapioItemRequest();        
        item.setDescricao( descricao );

        Throwable ex = catchThrowable( item::validate );

        assertThat( ex ).isNotNull();
        assertThat( ex ).isInstanceOf( ValidationException.class );
        assertThat( ((ValidationException)ex).response().getMensagem() ).isEqualTo( "O campo 'descrição' é de preenchimento obrigatório." );
    }

}
