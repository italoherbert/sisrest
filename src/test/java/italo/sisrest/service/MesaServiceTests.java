package italo.sisrest.service;

import italo.sisrest.repository.PedidoRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;

@SpringBootTest
public class MesaServiceTests {

    @Autowired
    private MesaService mesaService;

    @MockitoBean
    private PedidoRepository pedidoRepository;

    @Test
    @DisplayName("Deve atender mesa com sucesso.")
    void deveAtenderMesaComSucesso() {
        int mesa = 1;

        doNothing().when( pedidoRepository ).updateAtendidosByMesa( mesa );

        mesaService.atendeMesa( mesa );

        verify( pedidoRepository ).updateAtendidosByMesa( mesa );
    }

}
