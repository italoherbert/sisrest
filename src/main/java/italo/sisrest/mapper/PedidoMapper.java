package italo.sisrest.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import italo.sisrest.controller.dto.request.PedidoItemRequest;
import italo.sisrest.controller.dto.request.PedidoRequest;
import italo.sisrest.controller.dto.response.CardapioItemResponse;
import italo.sisrest.controller.dto.response.PedidoItemResponse;
import italo.sisrest.controller.dto.response.PedidoResponse;
import italo.sisrest.model.CardapioItem;
import italo.sisrest.model.Pedido;
import italo.sisrest.model.PedidoItem;
import italo.sisrest.model.dto.PedidoItemDTO;

@Component
public class PedidoMapper {
    
    public Pedido map( PedidoRequest request ) {
        return Pedido.builder()
            .mesa( request.getMesa() ) 
            .items( new ArrayList<>() )
            .atendido( false )
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

    public PedidoResponse map( Pedido pedido ) {
        List<PedidoItemResponse> itemsResp = new ArrayList<>();
        for( PedidoItem item : pedido.getItems() ) {
            CardapioItem cadItem = item.getItem();

            CardapioItemResponse carItemResp = 
                CardapioItemResponse.builder()
                    .id( cadItem.getId() )
                    .descricao( cadItem.getDescricao() )
                    .preco( cadItem.getPreco() )
                    .build();

            itemsResp.add( 
                PedidoItemResponse.builder()
                    .id( item.getId() )
                    .item( carItemResp )
                    .quantidade( item.getQuantidade() )
                    .build() );
        }

        return PedidoResponse.builder()
            .id( pedido.getId() )
            .mesa( pedido.getMesa() )
            .items( itemsResp )
            .build();
    }

}
