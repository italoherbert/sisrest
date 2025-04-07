package italo.sisrest.model;

import jakarta.persistence.*;
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
@Entity
@Table(name="pedido_item")
public class PedidoItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int quantidade;

    @OneToOne
    @JoinColumn(name="cardapio_item_id")
    private CardapioItem item;

    @ManyToOne
    @JoinColumn(name="pedido_id")
    private Pedido pedido; 

}
