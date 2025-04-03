package italo.sisrest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import italo.sisrest.model.Pedido;
import java.util.List;


public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    
    public List<Pedido> findByMesa(int mesa);

}
