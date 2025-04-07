package italo.sisrest.mocks;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.github.javafaker.Faker;

import italo.sisrest.controller.dto.request.PedidoItemRequest;
import italo.sisrest.controller.dto.request.PedidoRequest;
import italo.sisrest.controller.dto.response.CardapioItemResponse;
import italo.sisrest.controller.dto.response.PedidoItemResponse;
import italo.sisrest.controller.dto.response.PedidoResponse;
import italo.sisrest.model.Pedido;
import italo.sisrest.model.PedidoItem;
import italo.sisrest.model.dto.PedidoItemDTO;

public class PedidoMocks {
    
    private final static Faker faker = new Faker();

    public static Pedido mockPedido() {
        return Pedido.builder()
            .id( faker.number().randomNumber() ) 
            .mesa( faker.number().numberBetween( 1, 10 ) )
            .items( new ArrayList<>() )
            .build();
    }

    public static Pedido mockPedidoCompleto() {
        Pedido pedido = mockPedido();
        pedido.getItems().add( mockPedidoItem() );
        pedido.getItems().add( mockPedidoItem() );
        pedido.getItems().add( mockPedidoItem() );
        pedido.getItems().add( mockPedidoItem() );
        return pedido;
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

    public static PedidoResponse mockPedidoResponse() {
        List<PedidoItemResponse> items = Arrays.asList(
                mockPedidoItemResponse(),
                mockPedidoItemResponse(),
                mockPedidoItemResponse(),
                mockPedidoItemResponse()
        );

        return PedidoResponse.builder()
                .id( faker.number().randomNumber() )
                .mesa( faker.number().numberBetween( 1, 30 ) )
                .items( items )
                .build();
    }

    public static PedidoItemResponse mockPedidoItemResponse() {
        return PedidoItemResponse.builder()
                .id( faker.number().randomNumber() )
                .quantidade( faker.number().numberBetween( 1, 20 ) )
                .cardapioItem( CardapioItemResponse.builder()
                        .id( faker.number().randomNumber() )
                        .descricao( faker.name().title() )
                        .preco( faker.number().randomDouble( 2, 1, 100 ) )
                        .build() )
                .build();
    }

}
