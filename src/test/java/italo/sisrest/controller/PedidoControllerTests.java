package italo.sisrest.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import italo.sisrest.controller.dto.response.PedidoResponse;
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

import italo.sisrest.controller.dto.request.PedidoItemRequest;
import italo.sisrest.controller.dto.request.PedidoRequest;
import italo.sisrest.mocks.PedidoMocks;
import italo.sisrest.model.Pedido;
import italo.sisrest.model.dto.PedidoItemDTO;
import italo.sisrest.service.PedidoService;

import java.util.Arrays;
import java.util.List;

@SpringBootTest
public class PedidoControllerTests {
    
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @MockitoBean
    private PedidoService pedidoService;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
            .webAppContextSetup( webApplicationContext )            
            .build();
    }

    @Test
    @WithMockUser(username="italo", authorities = {"pedidoWRITE"})
    @DisplayName("Deve criar pedido com sucesso")
    void deveCriarPedidoComSucesso() throws Exception {
        PedidoRequest request = PedidoMocks.mockPedidoRequest();

        PedidoItemRequest itemRequest = PedidoMocks.mockPedidoItemRequest();
        request.getItems().add( itemRequest );

        String content = objectMapper.writeValueAsString( request );

        doNothing().when( pedidoService ).insert( any(Pedido.class), any(PedidoItemDTO[].class) );

        mockMvc.perform( 
                post("/api/sisrest/v1/pedido" )
                    .contentType( MediaType.APPLICATION_JSON )
                    .content( content ) )
            .andExpect( status().isOk() );

        verify( pedidoService ).insert( any( Pedido.class), any( PedidoItemDTO[].class ) ); 
    }

    @Test
    @WithMockUser(username="italo", authorities = {"pedidoWRITE"})
    @DisplayName("Deve atualizar pedido com sucesso")
    void deveAtualizarPedidoComSucesso() throws Exception {
        PedidoRequest request = PedidoMocks.mockPedidoRequest();

        PedidoItemRequest itemRequest = PedidoMocks.mockPedidoItemRequest();
        request.getItems().add( itemRequest );

        String content = objectMapper.writeValueAsString( request );

        Long pedidoId = 1L;

        doNothing().when( pedidoService ).update( anyLong(), any(Pedido.class), any(PedidoItemDTO[].class ) );

        mockMvc.perform(
                put( "/api/sisrest/v1/pedido/"+pedidoId )
                    .contentType( MediaType.APPLICATION_JSON )
                    .content( content )
        ).andExpect( status().isOk() );

        verify( pedidoService ).update( anyLong(), any(Pedido.class), any(PedidoItemDTO[].class) );
    }

    @Test
    @WithMockUser(username="italo", authorities = {"pedidoREAD"})
    @DisplayName("Deve listar todos os pedidos com sucesso.")
    void deveListarTodosComSucesso() throws Exception {
        List<Pedido> pedidos = Arrays.asList(
                PedidoMocks.mockPedido(),
                PedidoMocks.mockPedido(),
                PedidoMocks.mockPedido(),
                PedidoMocks.mockPedido()
        );

        when( pedidoService.list() ).thenReturn( pedidos );

        mockMvc.perform(
                get( "/api/sisrest/v1/pedido/list" )
        ).andExpect( status().isOk() );

        verify( pedidoService ).list();
    }

    @Test
    @WithMockUser(username="italo", authorities = {"pedidoREAD"})
    @DisplayName("Deve listar todos os pedidos pela mesa com sucesso.")
    void deveListarPedidosPelaMesaComSucesso() throws Exception {
        List<Pedido> pedidos = Arrays.asList(
                PedidoMocks.mockPedido(),
                PedidoMocks.mockPedido(),
                PedidoMocks.mockPedido(),
                PedidoMocks.mockPedido()
        );

        int mesa = 1;

        when( pedidoService.listByMesa( mesa ) ).thenReturn( pedidos );

        mockMvc.perform(
                get( "/api/sisrest/v1/pedido/listByMesa/"+mesa )
        ).andExpect( status().isOk() );

        verify( pedidoService ).listByMesa( mesa );

    }

    @Test
    @WithMockUser(username="italo", authorities = {"pedidoREAD"})
    @DisplayName("Deve buscar pedido pelo ID com sucesso.")
    void deveBuscarPedidoComSucesso() throws Exception {
        Pedido pedido = PedidoMocks.mockPedido();

        Long pedidoId = pedido.getId();

        when( pedidoService.get( pedidoId ) ).thenReturn( pedido );

        mockMvc.perform(
                get( "/api/sisrest/v1/pedido/"+pedidoId )
        ).andExpect( status().isOk() );

        verify( pedidoService ).get( pedidoId );
    }

    @Test
    @WithMockUser(username="italo", authorities = {"pedidoDELETE"})
    @DisplayName("Deve deletar um pedido com sucesso.")
    void deveDeletarPedidoComSucesso() throws Exception {
        Long pedidoId = 1L;

        doNothing().when( pedidoService ).delete( pedidoId );

        mockMvc.perform(
                delete( "/api/sisrest/v1/pedido/"+pedidoId )
        ).andExpect( status().isOk() );

        verify( pedidoService ).delete( pedidoId );
    }
}
