package italo.sisrest.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import italo.sisrest.model.CardapioItem;

public interface CardapioItemRepository extends MongoRepository<CardapioItem, String> {
    
    @Query( "{ descricao: { '$regex': ?0, '$options': 'i'} }") 
    List<CardapioItem> filtra( String descriacao );

    Optional<CardapioItem> findByDescricao( String descricao );

}
