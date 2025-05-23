package italo.sisrest.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.catchThrowable;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import italo.sisrest.controller.dto.request.filter.PedidoFilterRequest;
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
        Pedido pedidoReg = PedidoMocks.mockPedido();

        pedidoReg.setId( pedido.getId() );

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

        doNothing().when( pedidoItemRepository ).deleteByPedidoId( pedido.getId() );

        for( int i = 0; i < items.length; i++ ) {
            when( cardapioItemRepository.findById( itemDTOs[i].getCardapioItemId() ) ).thenReturn( Optional.of( items[i] ) );
        }

        when( pedidoRepository.save( pedido ) ).thenReturn( pedidoReg );

        pedidoService.update( pedido.getId(), pedido, itemDTOs );

        verify( pedidoRepository ).findById( anyLong() );
        verify( cardapioItemRepository, times( items.length ) ).findById( anyLong() );
        verify( pedidoRepository ).save( any( Pedido.class ) );
        verify( pedidoItemRepository ).deleteByPedidoId( pedido.getId() );
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
        doNothing().when( pedidoItemRepository ).deleteByPedidoId( pedidoId );
        when( cardapioItemRepository.findById( itemId ) ).thenReturn( Optional.empty() );

        Throwable t = catchThrowable( () -> pedidoService.update( pedidoId, pedido, itemDTOs ) );

        assertThat( t ).isNotNull();
        assertThat( t ).isInstanceOf( BusinessException.class );
        assertThat( ((BusinessException)t).response().getMensagem() ).isEqualTo( "O item de cardápio de ID: '"+itemId+"' não foi encontrado." );

        verify( pedidoRepository ).findById( anyLong() );
        verify( pedidoItemRepository ).deleteByPedidoId( pedidoId );
        verify( cardapioItemRepository ).findById( anyLong() );
    }

    @Test
    @DisplayName("Deve listar pedidos com sucesso.")
    void deveListarPedidosComSucesso() {
        List<Pedido> regPedidos = Arrays.asList(
            PedidoMocks.mockPedido(),
            PedidoMocks.mockPedido(),
            PedidoMocks.mockPedido(),
            PedidoMocks.mockPedido()
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
            PedidoMocks.mockPedido(),
            PedidoMocks.mockPedido(),
            PedidoMocks.mockPedido(),
            PedidoMocks.mockPedido()
        );

        int mesa = 1;

        when( pedidoRepository.findByMesa( mesa ) ).thenReturn( regPedidos );

        List<Pedido> pedidos = pedidoService.listByMesa( mesa );

        assertThat( pedidos ).isEqualTo( regPedidos );

        verify( pedidoRepository ).findByMesa( anyInt() );
    }

    @Test
    @DisplayName("Deve filtrar com sucesso")
    void deveFiltrarPedidosComSucesso() {
        List<Pedido> regPedidos = Arrays.asList(
                PedidoMocks.mockPedido(),
                PedidoMocks.mockPedido(),
                PedidoMocks.mockPedido(),
                PedidoMocks.mockPedido()
        );

        PedidoFilterRequest request = PedidoMocks.mockPedidoFilterRequest();
        request.setAtendidoOption("TODOS");

        when( pedidoRepository.filter( anyInt(), isNull() ) ).thenReturn( regPedidos );

        List<Pedido> pedidos = pedidoService.filter( request );

        assertThat( pedidos ).isNotEmpty();
        assertThat( pedidos ).isEqualTo( regPedidos );

        verify( pedidoRepository ).filter( anyInt(), isNull() );
    }

    @Test
    @DisplayName("Deve buscar pedido com sucesso")
    void deveBuscarPedidoComSucesso() {
        Pedido pedidoReg = PedidoMocks.mockPedido();
        pedidoReg.setAtendido( false );

        when( pedidoRepository.findById( pedidoReg.getId() ) ).thenReturn( Optional.of( pedidoReg ) );

        Pedido pedido = pedidoService.get( pedidoReg.getId() );

        assertThat( pedido ).isNotNull();
        assertThat( pedido.getId() ).isEqualTo( pedidoReg.getId() );
        assertThat( pedido.getMesa() ).isEqualTo( pedidoReg.getMesa() );
    }

    @Test
    @DisplayName("Deve lançar exceção de pedido não encontrado na busca")
    void deveLancarExcecaoBuscaPedidoNaoEncontrado() {
        Long pedidoId = 1L;

        when( pedidoRepository.findById( pedidoId ) ).thenReturn( Optional.empty() );

        Throwable t = catchThrowable( () -> pedidoService.get( pedidoId ) );

        assertThat( t ).isNotNull();
        assertThat( t ).isInstanceOf( BusinessException.class );
        assertThat( ((BusinessException)t).response().getMensagem() ).isEqualTo( "Pedido não encontrado." );
    }

    @Test
    @DisplayName("Deve marcar pedido como atendido com sucesso.")
    void deveMarcarPedidoComoAtendidoComSucesso() {
        Pedido pedidoReg = PedidoMocks.mockPedido();

        Long pedidoId = pedidoReg.getId();

        when( pedidoRepository.findById( pedidoId ) ).thenReturn( Optional.of( pedidoReg ) );
        when( pedidoRepository.save( pedidoReg ) ).thenReturn( pedidoReg );

        pedidoService.setAtendido( pedidoId, true );

        assertThat( pedidoReg.isAtendido() ).isEqualTo( true );
    }

    @Test
    @DisplayName("Deve lançar exceção de pedido não encontrado para marcar como atendido")
    void deveLancarExcecaoPedidoNaoEncontradoMarcarAtendido() {
        Pedido pedido = PedidoMocks.mockPedido();
        Long pedidoId = pedido.getId();

        when( pedidoRepository.findById( pedidoId ) ).thenReturn( Optional.empty() );

        Throwable t = catchThrowable( () -> pedidoService.setAtendido( pedidoId, true ) );

        assertThat( t ).isNotNull();
        assertThat( t ).isInstanceOf( BusinessException.class );
        assertThat( ((BusinessException)t).response().getMensagem() ).isEqualTo( "Pedido não encontrado." );

        verify( pedidoRepository ).findById( pedidoId );
    }

    @Test
    @DisplayName("Deve deletar pedido com sucesso")
    void deveDeletarPedidoComSucesso() {
        Pedido pedido = PedidoMocks.mockPedido();

        Long pedidoId = pedido.getId();

        when( pedidoRepository.existsById( pedidoId ) ).thenReturn( true );

        doNothing().when( pedidoRepository ).deleteById( pedidoId );

        pedidoService.delete( pedidoId );

        verify( pedidoRepository ).existsById( pedidoId );
        verify( pedidoRepository ).deleteById( pedidoId );
    }

    @Test
    @DisplayName("Deve lançar exceção de pedido não encontrado.")
    void deveLancarExcecaoDeletePedidoNaoEncontrado() {
        Pedido pedido = PedidoMocks.mockPedido();

        Long pedidoId = pedido.getId();

        when( pedidoRepository.existsById( pedidoId ) ).thenReturn( false );

        Throwable t = catchThrowable( () -> pedidoService.delete( pedidoId ) );

        assertThat( t ).isNotNull();
        assertThat( t ).isInstanceOf( BusinessException.class );
        assertThat( ((BusinessException)t).response().getMensagem() ).isEqualTo( "Pedido não encontrado." );

        verify( pedidoRepository ).existsById( pedidoId );
    }

}
