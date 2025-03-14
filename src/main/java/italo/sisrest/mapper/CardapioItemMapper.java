package italo.sisrest.mapper;

import org.springframework.stereotype.Component;

import italo.sisrest.controller.dto.request.CardapioItemRequest;
import italo.sisrest.controller.dto.response.CardapioItemResponse;
import italo.sisrest.model.CardapioItem;

@Component
public class CardapioItemMapper {
    
    public CardapioItem map( CardapioItemRequest request ) {
        return CardapioItem.builder()
            .descricao( request.getDescricao() )
            .preco( request.getPreco() )
            .build();
    }

    public CardapioItemResponse map( CardapioItem item ) {
        return CardapioItemResponse.builder()
            .id( item.getId() )
            .descricao( item.getDescricao() )
            .preco( item.getPreco() ) 
            .build();
    }

}
