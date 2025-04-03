package italo.sisrest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import italo.sisrest.model.PedidoItem;

public interface PedidoItemRepository extends JpaRepository<PedidoItem, Long> {
    
}
