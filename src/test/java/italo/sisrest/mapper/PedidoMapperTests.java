package italo.sisrest.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import italo.sisrest.controller.dto.request.PedidoItemRequest;
import italo.sisrest.controller.dto.request.PedidoRequest;
import italo.sisrest.mocks.PedidoMocks;
import italo.sisrest.model.Pedido;
import italo.sisrest.model.dto.PedidoItemDTO;

@SpringBootTest
public class PedidoMapperTests {
    
    @Autowired
    private PedidoMapper pedidoMapper;

    @Test
    @DisplayName("Deve converter PedidoRequest para Pedido")    
    void deveConverterPedidoRequestParaPedido() {
        PedidoRequest request = PedidoMocks.mockPedidoRequest();

        Pedido pedido = pedidoMapper.map( request );

        assertThat( pedido ).isNotNull();
        assertThat( pedido.getMesa() ).isEqualTo( request.getMesa() ); 
    }

    @Test
    @DisplayName("Deve converter PedidoItemRequestList para PedidoItemDTOArray")
    void deveConverterPedidoItemRequestListParaPedidoItemDTOArray() {
        List<PedidoItemRequest> itemRequests = Arrays.asList(
            PedidoMocks.mockPedidoItemRequest(),
            PedidoMocks.mockPedidoItemRequest(),
            PedidoMocks.mockPedidoItemRequest(),
            PedidoMocks.mockPedidoItemRequest()
        );

        PedidoItemDTO[] itemDTOs = pedidoMapper.map( itemRequests );

        for( int i = 0; i < itemDTOs.length; i++ ) {
            assertThat( itemDTOs[ i ] ).isNotNull();
            assertThat( itemDTOs[ i ].getCardapioItemId() ).isEqualTo( itemRequests.get( i ).getCardapioItemId() );
            assertThat( itemDTOs[ i ].getQuantidade() ).isEqualTo( itemRequests.get( i ).getQuantidade() );
        }
    }

}
