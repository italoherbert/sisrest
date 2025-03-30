package italo.sisrest.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import italo.sisrest.exception.BusinessException;
import italo.sisrest.exception.Errors;
import italo.sisrest.model.CardapioItem;
import italo.sisrest.model.Pedido;
import italo.sisrest.model.PedidoItem;
import italo.sisrest.model.dto.PedidoItemDTO;
import italo.sisrest.repository.CardapioItemRepository;
import italo.sisrest.repository.PedidoRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PedidoService {
    
    private final PedidoRepository pedidoRepository;

    private final CardapioItemRepository cardapioItemRepository;

    public void insert( Pedido pedido, PedidoItemDTO[] cardapioItems ) {
        for( PedidoItemDTO itemDTO : cardapioItems ) {
            Long itemId = itemDTO.getCardapioItemId();
            int quantidade = itemDTO.getQuantidade();

            Optional<CardapioItem> itemOp = cardapioItemRepository.findById( itemId );
            if ( !itemOp.isPresent() )
                throw new BusinessException( Errors.CARDAPIO_ITEM_NAO_ENCONTRADO_ID, String.valueOf( itemId ) );

            CardapioItem item = itemOp.get();

            PedidoItem pedidoItem = PedidoItem.builder()
                .item( item )
                .quantidade( quantidade )
                .build();

            pedido.getItems().add( pedidoItem );
        }

        pedidoRepository.save( pedido );
    }


}
