package italo.sisrest.mocks;

import java.util.ArrayList;

import com.github.javafaker.Faker;

import italo.sisrest.controller.dto.request.PedidoItemRequest;
import italo.sisrest.controller.dto.request.PedidoRequest;
import italo.sisrest.model.Pedido;
import italo.sisrest.model.PedidoItem;
import italo.sisrest.model.dto.PedidoItemDTO;

public class PedidoMocks {
    
    private final static Faker faker = new Faker();

    public static Pedido mockPedido() {
        return Pedido.builder()
            .mesa( faker.number().numberBetween( 1, 10 ) )
            .items( new ArrayList<>() )
            .build();
    }

    public static PedidoItem mockPedidoItem() {
        return PedidoItem.builder()
            .id( faker.number().randomNumber() )
            .item( CardapioItemMocks.mockCardapioItem() )
            .quantidade( faker.number().numberBetween( 1, 10 ) )
            .build();
    }

    public static PedidoRequest mockPedidoRequest() {
        return PedidoRequest.builder()
            .mesa( faker.number().numberBetween( 1, 10 ) )
            .items( new ArrayList<>() )
            .build();
    }

    public static PedidoItemDTO mockPedidoItemDTO() {
        return PedidoItemDTO.builder()
            .cardapioItemId( faker.number().randomNumber() )
            .quantidade( faker.number().numberBetween( 1, 10 ) )
            .build();
    }

    public static PedidoItemRequest mockPedidoItemRequest() {
        return PedidoItemRequest.builder()
            .cardapioItemId( faker.number().randomNumber() )
            .quantidade( faker.number().numberBetween( 1, 10 ) )
            .build();
    }

}
