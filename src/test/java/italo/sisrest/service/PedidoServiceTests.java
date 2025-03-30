package italo.sisrest.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.catchThrowable;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import italo.sisrest.exception.BusinessException;
import italo.sisrest.mocks.CardapioItemMocks;
import italo.sisrest.mocks.PedidoMocks;
import italo.sisrest.model.CardapioItem;
import italo.sisrest.model.Pedido;
import italo.sisrest.model.dto.PedidoItemDTO;
import italo.sisrest.repository.CardapioItemRepository;
import italo.sisrest.repository.PedidoRepository;

@SpringBootTest
public class PedidoServiceTests {
    
    @Autowired
    private PedidoService pedidoService;

    @MockitoBean
    private PedidoRepository pedidoRepository;

    @MockitoBean
    private CardapioItemRepository cardapioItemRepository;

    @Test
    @DisplayName("Deve inserir pedido com sucesso.")
    void deveInserirPedidoComSucesso() {    
        Pedido pedido = PedidoMocks.mockPedido();

        PedidoItemDTO[] itemDTOs = {
            PedidoMocks.mockPedidoItemDTO(),
            PedidoMocks.mockPedidoItemDTO(),
            PedidoMocks.mockPedidoItemDTO(),
            PedidoMocks.mockPedidoItemDTO()
        };

        CardapioItem[] items = {
            CardapioItemMocks.mockCardapioItem(),
            CardapioItemMocks.mockCardapioItem(),
            CardapioItemMocks.mockCardapioItem(),
            CardapioItemMocks.mockCardapioItem()
        };

        for( int i = 0; i < items.length; i++ )
            when( cardapioItemRepository.findById( itemDTOs[ i ].getCardapioItemId() ) ).thenReturn( Optional.of( items[ i ] ) );

        when( pedidoRepository.save( pedido ) ).thenReturn( pedido ); 

        pedidoService.insert( pedido, itemDTOs );
    }

    @Test
    @DisplayName("Deve lançar exceção de cardápio item não encontrado.")
    void deveLancarExcecaoCardapioItemNaoEncontrado() {    
        Pedido pedido = PedidoMocks.mockPedido();

        PedidoItemDTO[] itemDTOs = {
            PedidoMocks.mockPedidoItemDTO(),
            PedidoMocks.mockPedidoItemDTO(),
            PedidoMocks.mockPedidoItemDTO(),
            PedidoMocks.mockPedidoItemDTO()
        };

        for( int i = 0; i < itemDTOs.length; i++ )
            when( cardapioItemRepository.findById( itemDTOs[ i ].getCardapioItemId() ) ).thenReturn( Optional.empty() );

        when( pedidoRepository.save( pedido ) ).thenReturn( pedido ); 

        Throwable t = catchThrowable( () -> pedidoService.insert( pedido, itemDTOs ) );

        assertThat( t ).isNotNull();
        assertThat( t ).isInstanceOf( BusinessException.class );

        Long itemId = itemDTOs[ 0 ].getCardapioItemId();
        assertThat( ((BusinessException)t).response().getMensagem() ).isEqualTo( "O item de cardápio de ID: '"+itemId+"' não foi encontrado." );
    }

}
