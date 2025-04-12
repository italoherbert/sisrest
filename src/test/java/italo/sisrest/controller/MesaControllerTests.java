package italo.sisrest.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import italo.sisrest.service.MesaService;
import italo.sisrest.service.PedidoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
public class MesaControllerTests {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @MockitoBean
    private MesaService mesaService;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup( webApplicationContext )
                .build();
    }

    @Test
    @WithMockUser(username = "italo", authorities = {"pedidoWRITE"})
    @DisplayName("Deve atender pedido com sucesso.")
    void deveAtenderPedidoComSucesso() throws Exception {
        int mesa = 1;

        doNothing().when( mesaService ).atendeMesa( mesa );

        mockMvc.perform(
                post( "/api/sisrest/v1/mesa/atendeMesa/"+mesa )
        ).andExpect( status().isOk() );

        verify( mesaService ).atendeMesa( mesa );
    }

}
