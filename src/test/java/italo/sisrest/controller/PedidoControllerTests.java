package italo.sisrest.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
        request.getCardapioItems().add( itemRequest );

        String content = objectMapper.writeValueAsString( request );

        mockMvc.perform( 
            post("/api/sisrest/v1/pedido" )
                .contentType( MediaType.APPLICATION_JSON )
                .content( content ) )
            .andExpect( status().isOk() );

        verify( pedidoService ).insert( any( Pedido.class), any( PedidoItemDTO[].class ) ); 
    }

}
