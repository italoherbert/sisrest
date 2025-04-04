package italo.sisrest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import italo.sisrest.exception.BusinessException;
import italo.sisrest.exception.Errors;
import italo.sisrest.model.CardapioItem;
import italo.sisrest.model.Pedido;
import italo.sisrest.model.PedidoItem;
import italo.sisrest.model.dto.PedidoItemDTO;
import italo.sisrest.repository.CardapioItemRepository;
import italo.sisrest.repository.PedidoItemRepository;
import italo.sisrest.repository.PedidoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PedidoService {
    
    private final PedidoRepository pedidoRepository;

    private final PedidoItemRepository pedidoItemRepository;

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

    @Transactional
    public void update( Long pedidoId, Pedido pedido, PedidoItemDTO[] pedidoItemsDTOs ) {
        Optional<Pedido> regPedidoOp = pedidoRepository.findById( pedidoId );
        if ( !regPedidoOp.isPresent() )
            throw new BusinessException( Errors.PEDIDO_NAO_ENCONTRADO );

        Pedido regPedido = regPedidoOp.get();        
        regPedido.setMesa( pedido.getMesa() );

        regPedido.getItems().clear();
        for( PedidoItemDTO itemDTO : pedidoItemsDTOs ) {
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

            regPedido.getItems().add( pedidoItem );
        }
        
        pedidoRepository.save( regPedido );
    }

    public List<Pedido> listByMesa( int mesa ) {
        return pedidoRepository.findByMesa( mesa ); 
    }

    public List<Pedido> list() {
        return pedidoRepository.findAll();
    }

    public Pedido get( Long pedidoId ) {
        Optional<Pedido> pedidoOp = pedidoRepository.findById( pedidoId );
        if ( !pedidoOp.isPresent() )
            throw new BusinessException( Errors.PEDIDO_NAO_ENCONTRADO );

        return pedidoOp.get();
    }

    public void delete( Long pedidoId ) {
        if ( !pedidoRepository.existsById( pedidoId ) )
            throw new BusinessException( Errors.PEDIDO_NAO_ENCONTRADO );

        pedidoRepository.deleteById( pedidoId ); 
    }

}
