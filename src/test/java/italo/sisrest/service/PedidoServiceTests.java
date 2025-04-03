package italo.sisrest.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.catchThrowable;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
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
import italo.sisrest.repository.PedidoItemRepository;
import italo.sisrest.repository.PedidoRepository;

@SpringBootTest
public class PedidoServiceTests {
    
    @Autowired
    private PedidoService pedidoService;

    @MockitoBean
    private PedidoRepository pedidoRepository;

    @MockitoBean
    private PedidoItemRepository pedidoItemRepository;

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

        verify( cardapioItemRepository, times( items.length ) ).findById( anyLong() );
        verify( pedidoRepository ).save( any( Pedido.class ) );
    }

    @Test
    @DisplayName("Deve lançar exceção de cardápio item não encontrado para inserção.")
    void deveLancarExcecaoInsertCardapioItemNaoEncontrado() {    
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

        verify( cardapioItemRepository ).findById( anyLong() );
    }

    @Test
    @DisplayName("Deve atualizar pedido com sucesso.")
    void deveAtualizarPedidoComSucesso() {    
        Pedido pedido = PedidoMocks.mockPedido();
        Pedido pedidoReg = PedidoMocks.mockPedidoCompleto();

        pedidoReg.setId( pedido.getId() );

        int regPedidoItemsSize = pedidoReg.getItems().size();

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

        when( pedidoRepository.findById( pedido.getId() ) ).thenReturn( Optional.of( pedidoReg ) );

        for( int i = 0; i < items.length; i++ )
            when( cardapioItemRepository.findById( itemDTOs[ i ].getCardapioItemId() ) ).thenReturn( Optional.of( items[ i ] ) );

        doNothing().when( pedidoItemRepository ).deleteById( anyLong() );

        when( pedidoRepository.save( pedido ) ).thenReturn( pedido ); 

        pedidoService.update( pedido.getId(), pedido, itemDTOs );

        verify( pedidoRepository ).findById( anyLong() );
        verify( cardapioItemRepository, times( items.length ) ).findById( anyLong() );
        verify( pedidoItemRepository, times( regPedidoItemsSize ) ).deleteById( anyLong() );
        verify( pedidoRepository ).save( any( Pedido.class ) );
    }

    @Test
    @DisplayName("Deve atualizar pedido com sucesso.")
    void deveLancarExcecaoDePedidoNaoEncontrado() {    
        Pedido pedido = PedidoMocks.mockPedido();

        PedidoItemDTO[] itemDTOs = {
            PedidoMocks.mockPedidoItemDTO(),
            PedidoMocks.mockPedidoItemDTO(),
            PedidoMocks.mockPedidoItemDTO(),
            PedidoMocks.mockPedidoItemDTO()
        };

        when( pedidoRepository.findById( pedido.getId() ) ).thenReturn( Optional.empty() );

        Throwable t = catchThrowable( () -> pedidoService.update( pedido.getId(), pedido, itemDTOs ) );

        assertThat( t ).isNotNull();
        assertThat( t ).isInstanceOf( BusinessException.class );
        assertThat( ((BusinessException)t).response().getMensagem() ).isEqualTo( "Pedido não encontrado." );

        verify( pedidoRepository ).findById( anyLong() );
    }


    @Test
    @DisplayName("Deve lançar exceção de cardápio item não encontrado para atualização")
    void deveLancarExcecaoUpdateCardapioItemNaoEncontrado() {
        Pedido pedido = PedidoMocks.mockPedido();
        Pedido pedidoReg = PedidoMocks.mockPedido();

        Long pedidoId = pedido.getId();

        pedidoReg.setId( pedidoId );

        PedidoItemDTO[] itemDTOs = {
            PedidoMocks.mockPedidoItemDTO(),
            PedidoMocks.mockPedidoItemDTO(),
            PedidoMocks.mockPedidoItemDTO()
        };

        Long itemId = itemDTOs[ 0 ].getCardapioItemId();

        when( pedidoRepository.findById( pedidoId ) ).thenReturn( Optional.of( pedidoReg ) );
        when( cardapioItemRepository.findById( itemId ) ).thenReturn( Optional.empty() );

        Throwable t = catchThrowable( () -> pedidoService.update( pedidoId, pedido, itemDTOs ) );

        assertThat( t ).isNotNull();
        assertThat( t ).isInstanceOf( BusinessException.class );
        assertThat( ((BusinessException)t).response().getMensagem() ).isEqualTo( "O item de cardápio de ID: '"+itemId+"' não foi encontrado." );

        verify( pedidoRepository ).findById( anyLong() );
        verify( cardapioItemRepository ).findById( anyLong() );
    }

    @Test
    @DisplayName("Deve listar pedidos com sucesso.")
    void deveListarPedidosComSucesso() {
        List<Pedido> regPedidos = Arrays.asList(
            PedidoMocks.mockPedidoCompleto(),
            PedidoMocks.mockPedidoCompleto(),
            PedidoMocks.mockPedidoCompleto(),
            PedidoMocks.mockPedidoCompleto()
        );

        when( pedidoRepository.findAll() ).thenReturn( regPedidos );

        List<Pedido> pedidos = pedidoService.list();
        assertThat( pedidos ).isEqualTo( regPedidos );

        verify( pedidoRepository ).findAll();
    }

    @Test
    @DisplayName("Deve listar por mesa com sucesso.")
    void deveListarPorMesaComSucesso() {
        List<Pedido> regPedidos = Arrays.asList(
            PedidoMocks.mockPedidoCompleto(),
            PedidoMocks.mockPedidoCompleto(),
            PedidoMocks.mockPedidoCompleto(),
            PedidoMocks.mockPedidoCompleto()
        );

        int mesa = 1;

        when( pedidoRepository.findByMesa( mesa ) ).thenReturn( regPedidos );

        List<Pedido> pedidos = pedidoService.listByMesa( mesa );

        assertThat( pedidos ).isEqualTo( regPedidos );

        verify( pedidoRepository ).findByMesa( anyInt() );
    }

    @Test
    @DisplayName("Deve deletar pedio com sucesso")
    void deveDeletarPedidoComSucesso() {
        
    }

}
