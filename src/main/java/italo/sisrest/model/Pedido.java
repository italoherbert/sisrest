package italo.sisrest.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
@Document("Pedido")
public class Pedido {
    
    @Id
    private String id;

    private int mesa;

    private boolean atendido;

    private List<PedidoItem> items;

}
