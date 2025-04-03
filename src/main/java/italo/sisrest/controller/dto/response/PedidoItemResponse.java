package italo.sisrest.controller.dto.response;

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
public class PedidoItemResponse {
    
    private Long id;

    private CardapioItemResponse item;

    private int quantidade;

}
