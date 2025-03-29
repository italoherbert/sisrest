package italo.sisrest.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.catchThrowable;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
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
import italo.sisrest.model.CardapioItem;
import italo.sisrest.repository.CardapioItemRepository;

@SpringBootTest
public class CardapioItemServiceTests {
    
    @Autowired
    private CardapioItemService cardapioItemService;

    @MockitoBean
    private CardapioItemRepository cardapioItemRepository;

    @Test
    @DisplayName("Deve registrar um item de cardápio com sucesso.")
    void deveRegistrarComSucesso() {
        CardapioItem item = CardapioItemMocks.mockCardapioItem();

        when( cardapioItemRepository.findByDescricao( item.getDescricao() ) ).thenReturn( Optional.empty() );
        when( cardapioItemRepository.save( item ) ).thenReturn( item ); 

        cardapioItemService.insert( item );

        verify( cardapioItemRepository ).findByDescricao( item.getDescricao() );
        verify( cardapioItemRepository ).save( item );        
    }

    @Test
    @DisplayName("Deve não registrar com sucesso porque descrição já existe")
    void deveNaoRegistrarPorqueDescricaoJaExiste() {
        CardapioItem item = CardapioItemMocks.mockCardapioItem();
        CardapioItem regItem = CardapioItemMocks.mockCardapioItem();

        when( cardapioItemRepository.findByDescricao( item.getDescricao() ) ).thenReturn( Optional.of( regItem ) );

        Throwable ex = catchThrowable( () -> cardapioItemService.insert( item ) );

        assertThat( ex ).isNotNull();
        assertThat( ex ).isInstanceOf( BusinessException.class );
        assertThat( ((BusinessException)ex).response().getMensagem() ).isEqualTo( "Já existe um item de cardápio com a descrição informada." );
    }

    @Test
    @DisplayName("Deve atualizar com sucesso.")
    void deveAtualizarComSucesso() {
        CardapioItem item = CardapioItemMocks.mockCardapioItem();
        CardapioItem regItem = CardapioItemMocks.copyCardapioItem( item ); 

        when( cardapioItemRepository.save( item ) ).thenReturn( item ); 
        when( cardapioItemRepository.findById( item.getId() ) ).thenReturn( Optional.of( regItem ) );

        cardapioItemService.update( item.getId(), item );

        verify( cardapioItemRepository ).findById( item.getId() );
        verify( cardapioItemRepository ).save( item );
    }

    @Test
    @DisplayName("Deve lançar exceção de item de cardápio não encontrado para atualização.")
    void deveLancarExcecaoItemNaoEncontradoParaAtualizacao() {
        CardapioItem item = CardapioItemMocks.mockCardapioItem();

        when( cardapioItemRepository.save( item ) ).thenReturn( item ); 
        when( cardapioItemRepository.findById( item.getId() ) ).thenReturn( Optional.empty() );

        Throwable ex = catchThrowable( () -> cardapioItemService.update( item.getId(), item ) );

        assertThat( ex ).isNotNull();
        assertThat( ex ).isInstanceOf( BusinessException.class );
        assertThat( ((BusinessException)ex).response().getMensagem() ).isEqualTo( "Item de cardápio não encontrado." );

        verify( cardapioItemRepository ).findById( item.getId() );
    }

    @Test
    @DisplayName("Deve lançar exceção de descrição já existe.")
    void deveLancarExcecaoDescricaoJaExiste() { 
        CardapioItem item = CardapioItemMocks.mockCardapioItem();
        CardapioItem regItem = CardapioItemMocks.mockCardapioItem(); 
        CardapioItem regItem2 = CardapioItemMocks.mockCardapioItem();

        regItem2.setDescricao( item.getDescricao() );

        when( cardapioItemRepository.save( item ) ).thenReturn( item ); 
        when( cardapioItemRepository.findById( item.getId() ) ).thenReturn( Optional.of( regItem ) );
        when( cardapioItemRepository.findByDescricao( item.getDescricao() ) ).thenReturn( Optional.of( regItem2 ) );

        Throwable ex = catchThrowable( () -> cardapioItemService.update( item.getId(), item ) ); 

        assertThat( ex ).isNotNull();
        assertThat( ex ).isInstanceOf( BusinessException.class );
        assertThat( ((BusinessException)ex).response().getMensagem() ).isEqualTo( "Já existe um item de cardápio com a descrição informada." );

        verify( cardapioItemRepository ).findById( item.getId() );
        verify( cardapioItemRepository ).findByDescricao( item.getDescricao() );
    }

    @Test
    @DisplayName( "Deve listar items de cardápio com sucesso.")
    void deveListarItemsComSucesso() {
        List<CardapioItem> regItems = Arrays.asList( 
            CardapioItemMocks.mockCardapioItem(),
            CardapioItemMocks.mockCardapioItem(),
            CardapioItemMocks.mockCardapioItem(),
            CardapioItemMocks.mockCardapioItem()
        );

        when( cardapioItemRepository.findAll() ).thenReturn( regItems );

        List<CardapioItem> items = cardapioItemService.list();

        assertThat( items ).isEqualTo( regItems );

        verify( cardapioItemRepository ).findAll();
    }

    @Test
    @DisplayName("Deve filtrar items de cardápio com sucesso")
    void deveFiltrarItemsComSucesso() {
        List<CardapioItem> regItems = Arrays.asList( 
            CardapioItemMocks.mockCardapioItem(),
            CardapioItemMocks.mockCardapioItem(),
            CardapioItemMocks.mockCardapioItem(),
            CardapioItemMocks.mockCardapioItem()
        );

        String desc = "abc";

        when( cardapioItemRepository.filtra( anyString() ) ).thenReturn( regItems );

        List<CardapioItem> items = cardapioItemService.filtra( desc );

        assertThat( items ).isNotNull();
        assertThat( items ).isEqualTo( regItems );

        verify( cardapioItemRepository ).filtra( anyString() );
    }

    @Test
    @DisplayName("Deve filtrar listando todos os items com sucesso")
    void deveFiltrarListandoTodosItemsComSucesso() {
        List<CardapioItem> regItems = Arrays.asList( 
            CardapioItemMocks.mockCardapioItem(),
            CardapioItemMocks.mockCardapioItem(),
            CardapioItemMocks.mockCardapioItem(),
            CardapioItemMocks.mockCardapioItem()
        );

        String desc = "*";

        when( cardapioItemRepository.findAll() ).thenReturn( regItems );

        List<CardapioItem> items = cardapioItemService.filtra( desc );

        assertThat( items ).isNotNull();
        assertThat( items ).isEqualTo( regItems );

        verify( cardapioItemRepository ).findAll();
    }

    @Test
    @DisplayName("Deve buscar items de cardápio com sucesso.")
    void deveBuscarItemComSucesso() {
        CardapioItem item = CardapioItemMocks.mockCardapioItem();

        when( cardapioItemRepository.findById( item.getId() ) ).thenReturn( Optional.of( item ) );

        Optional<CardapioItem> findedItemOp = cardapioItemService.find( item.getId() );

        assertThat( findedItemOp ).isPresent();

        verify( cardapioItemRepository ).findById( item.getId() );
    }

    @Test
    @DisplayName("Deve lançar exceção de item não encontrado na busca.")
    void deveLancarExcecaoItemNaoEncontradoParaBusca() {
        CardapioItem item = CardapioItemMocks.mockCardapioItem();

        when( cardapioItemRepository.findById( item.getId() ) ).thenReturn( Optional.empty() );

        Throwable ex = catchThrowable( () -> cardapioItemService.find( item.getId() ) );

        assertThat( ex ).isNotNull();
        assertThat( ex ).isInstanceOf( BusinessException.class );
        assertThat( ((BusinessException)ex).response().getMensagem() ).isEqualTo( "Item de cardápio não encontrado." );

        verify( cardapioItemRepository ).findById( item.getId() );
    }

    @Test
    @DisplayName("Deve deletar um item de cardápio com sucesso.")
    void deveDeletarItemComSucesso() {
        CardapioItem item = CardapioItemMocks.mockCardapioItem();

        when( cardapioItemRepository.findById( item.getId() ) ).thenReturn( Optional.of( item ) );
        doNothing().when( cardapioItemRepository ).deleteById( item.getId() );

        cardapioItemService.delete( item.getId() ); 

        verify( cardapioItemRepository ).findById( item.getId() );
        verify( cardapioItemRepository ).deleteById( item.getId() ); 
    }

    @Test
    @DisplayName("Deve lançar exceção de item não encontrado para remoção.")
    void deveLancarExcecaoItemNaoEncontradoParaRemocao() {
        CardapioItem item = CardapioItemMocks.mockCardapioItem();

        when( cardapioItemRepository.findById( item.getId() ) ).thenReturn( Optional.empty() );

        Throwable ex = catchThrowable( () -> cardapioItemService.delete( item.getId() ) ); 

        assertThat( ex ).isNotNull();
        assertThat( ex ).isInstanceOf( BusinessException.class );
        assertThat( ((BusinessException)ex).response().getMensagem() ).isEqualTo( "Item de cardápio não encontrado." );

        verify( cardapioItemRepository ).findById( item.getId() );
    }

}
