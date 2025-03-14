package italo.sisrest.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import italo.sisrest.model.Pedido;

public interface PedidoRepository extends MongoRepository<Pedido, String> {
    
}
