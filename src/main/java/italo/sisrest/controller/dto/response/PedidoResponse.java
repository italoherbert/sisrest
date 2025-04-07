package italo.sisrest.controller.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PedidoResponse {
    
    private Long id;

    private int mesa;

    private boolean atendido;

    private List<PedidoItemResponse> items;

}
