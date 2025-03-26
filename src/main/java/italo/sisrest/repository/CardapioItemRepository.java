package italo.sisrest.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import italo.sisrest.model.CardapioItem;

public interface CardapioItemRepository extends JpaRepository<CardapioItem, Long> {
    
    @Query("select ci from CardapioItem ci where lower(ci.descricao) like lower(?1)") 
    List<CardapioItem> filtra( String descricao );

    Optional<CardapioItem> findByDescricao( String descricao );

}
