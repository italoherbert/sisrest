package italo.sisrest.model;


import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name="ultimo_pedido_atendido")
public class UltimoPedidoAtendido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int mesa;

    @OneToOne
    @JoinColumn(name="pedido_id")
    private Pedido pedido;

}
