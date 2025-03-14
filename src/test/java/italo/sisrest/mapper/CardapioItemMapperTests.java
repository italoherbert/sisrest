package italo.sisrest.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import italo.sisrest.controller.dto.request.CardapioItemRequest;
import italo.sisrest.controller.dto.response.CardapioItemResponse;
import italo.sisrest.mocks.CardapioItemMocks;
import italo.sisrest.model.CardapioItem;

@SpringBootTest
public class CardapioItemMapperTests {
    
    @Autowired
    private CardapioItemMapper cardapioItemMapper;

    @Test
    @DisplayName("Deve converter um objeto CardapioItemRequest para CardapioItem")
    void deveConverterCardapioItemRequestParaCardapioItem() {
        CardapioItemRequest request = CardapioItemMocks.mockCardapioItemRequest();

        CardapioItem item = cardapioItemMapper.map( request );

        assertThat( item.getDescricao() ).isEqualTo( request.getDescricao() );
        assertThat( item.getPreco() ).isEqualTo( request.getPreco() );
    }

    @Test
    @DisplayName("Deve converter um objeto CardapioItem para CardapioItemResponse")
    void deveConverterCardapioItemParaCardapioItemResponse() {
        CardapioItem item = CardapioItemMocks.mockCardapioItem();

        CardapioItemResponse resp = cardapioItemMapper.map( item );

        assertThat( resp.getId() ).isEqualTo( item.getId() );
        assertThat( resp.getDescricao() ).isEqualTo( item.getDescricao() );
        assertThat( resp.getPreco() ).isEqualTo( item.getPreco() );
    }

}
