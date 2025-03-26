package italo.sisrest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import italo.sisrest.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    
}
