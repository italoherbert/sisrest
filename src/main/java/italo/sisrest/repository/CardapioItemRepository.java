package italo.sisrest.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import italo.sisrest.model.CardapioItem;

public interface CardapioItemRepository extends MongoRepository<CardapioItem, String> {
    
    Optional<CardapioItem> findByDescricao( String descricao );

}
