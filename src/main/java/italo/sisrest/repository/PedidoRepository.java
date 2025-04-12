package italo.sisrest.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import italo.sisrest.model.Pedido;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    @Query("select p from Pedido p " +
            "where (?1 is null or p.mesa=?1) and (?2 is null or p.atendido=?2)")
    List<Pedido> filter( Integer mesa, Boolean atendido );

    List<Pedido> findByMesa(int mesa);

}
