package italo.sisrest.mocks;

import com.github.javafaker.Faker;

import italo.sisrest.controller.dto.request.CardapioItemRequest;
import italo.sisrest.model.CardapioItem;

public class CardapioItemMocks {
    
    private final static Faker faker = new Faker();

    public static CardapioItem mockCardapioItem() {
        return CardapioItem.builder()
                .id( faker.random().nextLong() ) 
                .descricao( faker.name().title() )
                .preco( faker.random().nextDouble() )
                .build();
    }

    public static CardapioItem copyCardapioItem( CardapioItem item ) {
        return CardapioItem.builder()
            .id( item.getId() )
            .descricao( item.getDescricao() )
            .preco( item.getPreco() ) 
            .build();
    }

    public static CardapioItemRequest mockCardapioItemRequest() {
        return CardapioItemRequest.builder()
                .descricao( faker.name().title() )
                .preco( faker.random().nextDouble() ) 
                .build();
    }

}
