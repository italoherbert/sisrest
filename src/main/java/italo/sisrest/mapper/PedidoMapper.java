package italo.sisrest.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import italo.sisrest.controller.dto.request.PedidoItemRequest;
import italo.sisrest.controller.dto.request.PedidoRequest;
import italo.sisrest.model.Pedido;
import italo.sisrest.model.dto.PedidoItemDTO;

@Component
public class PedidoMapper {
    
    public Pedido map( PedidoRequest request ) {
        return Pedido.builder()
            .mesa( request.getMesa() ) 
            .build();
    }

    public PedidoItemDTO[] map( List<PedidoItemRequest> requests ) {
        PedidoItemDTO[] dtos = new PedidoItemDTO[ requests.size() ];
        for( int i = 0; i < dtos.length; i++ ) {
            dtos[ i ] = 
                PedidoItemDTO.builder()
                    .cardapioItemId( requests.get( i ).getCardapioItemId() )
                    .quantidade( requests.get( i ).getQuantidade() )
                    .build();
        }
        return dtos;
    }

}
