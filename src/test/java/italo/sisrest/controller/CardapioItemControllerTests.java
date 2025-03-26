package italo.sisrest.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;

import italo.sisrest.controller.dto.request.CardapioItemRequest;
import italo.sisrest.mocks.CardapioItemMocks;
import italo.sisrest.model.CardapioItem;
import italo.sisrest.service.CardapioItemService;

@SpringBootTest
public class CardapioItemControllerTests {
    
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @MockitoBean
    private CardapioItemService cardapioItemService;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                    .webAppContextSetup( webApplicationContext )
                    .build();
    }

    @Test
    @DisplayName("Deve criar/inserir um item de cardápio com sucesso")
    @WithMockUser(username = "italo", authorities = { "cardapioItemWRITE" })
    void deveCriarItemComSucesso() throws Exception {
        CardapioItemRequest request = CardapioItemMocks.mockCardapioItemRequest();
        String content = objectMapper.writeValueAsString( request );

        doNothing().when( cardapioItemService ).insert( any( CardapioItem.class ) ); 

        mockMvc.perform(
            post( "/api/sisrest/v1/cardapioitem" )
                .contentType( MediaType.APPLICATION_JSON )
                .content( content ) )
            .andExpect( status().isOk() );

        verify( cardapioItemService ).insert( any( CardapioItem.class ) );
    }

    @Test
    @DisplayName("Deve atualizar um item de cardápio com sucesso.")
    @WithMockUser(username = "italo", authorities = { "cardapioItemWRITE" })
    void deveAtualizarItemComSucesso() throws Exception {
        CardapioItemRequest request = CardapioItemMocks.mockCardapioItemRequest();
        String content = objectMapper.writeValueAsString( request );

        String id = "123";

        doNothing().when( cardapioItemService ).update( anyLong(), any( CardapioItem.class ) ); 

        mockMvc.perform(
            put( "/api/sisrest/v1/cardapioitem/"+id )                
                .contentType( MediaType.APPLICATION_JSON )
                .content( content ) )
            .andExpect( status().isOk() );

        verify( cardapioItemService ).update( anyLong(), any( CardapioItem.class ) );
    }

    @Test
    @DisplayName("Deve listar items de cardápio com sucesso.")
    @WithMockUser(username = "italo", authorities = { "cardapioItemREAD" })
    void deveListarItemsComSucesso() throws Exception {
        List<CardapioItem> items = Arrays.asList(
            CardapioItemMocks.mockCardapioItem(),
            CardapioItemMocks.mockCardapioItem(),
            CardapioItemMocks.mockCardapioItem(),
            CardapioItemMocks.mockCardapioItem()
        );

        when( cardapioItemService.list() ).thenReturn( items );

        mockMvc.perform(
            get( "/api/sisrest/v1/cardapioitem/list" )  
        ).andExpect( status().isOk() );

        verify( cardapioItemService ).list();
    }

    @Test
    @DisplayName("Deve buscar item de cardápio com sucesso.")
    @WithMockUser(username = "italo", authorities = { "cardapioItemREAD" })
    void deveBuscarItemComSucesso() throws Exception {
        CardapioItem item = CardapioItemMocks.mockCardapioItem();

        when( cardapioItemService.find( item.getId() ) ).thenReturn( Optional.of( item ) );

        mockMvc.perform(
            get( "/api/sisrest/v1/cardapioitem/"+item.getId() ) 
        ).andExpect( status().isOk() );

        verify( cardapioItemService ).find( item.getId() );
    }

    @Test
    @DisplayName("Deve deletar um item de cardápio com sucesso.")
    @WithMockUser(username = "italo", authorities = { "cardapioItemDELETE" })
    void deveDeletarItemComSucesso() throws Exception {
        doNothing().when( cardapioItemService ).delete( anyLong() );

        String id = "123";

        mockMvc.perform(
            delete( "/api/sisrest/v1/cardapioitem/"+id )
        ).andExpect( status().isOk() );

        verify( cardapioItemService ).delete( anyLong() ); 
    }


}
