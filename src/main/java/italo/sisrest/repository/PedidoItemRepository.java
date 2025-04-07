package italo.sisrest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import italo.sisrest.model.PedidoItem;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PedidoItemRepository extends JpaRepository<PedidoItem, Long> {

    @Modifying
    @Query( "delete from PedidoItem pi where pi.pedido.id=?1" )
    void deleteByPedidoId( Long pedidoId );

}
