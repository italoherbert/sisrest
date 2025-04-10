package italo.sisrest.service;

import java.util.List;
import java.util.Optional;

import italo.sisrest.controller.dto.request.filter.PedidoFilterRequest;
import italo.sisrest.model.enums.AtendimentoOption;
import italo.sisrest.util.OptionManager;
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

    private final OptionManager optionManager;

    public void insert( Pedido pedido, PedidoItemDTO[] cardapioItems ) {
        for( PedidoItemDTO itemDTO : cardapioItems ) {
            Long itemId = itemDTO.getCardapioItemId();
            int quantidade = itemDTO.getQuantidade();

            Optional<CardapioItem> itemOp = cardapioItemRepository.findById( itemId );
            if ( !itemOp.isPresent() )
                throw new BusinessException( Errors.CARDAPIO_ITEM_NAO_ENCONTRADO_ID, String.valueOf( itemId ) );

            CardapioItem item = itemOp.get();

            PedidoItem pedidoItem = PedidoItem.builder()
                    .pedido( pedido )
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
        pedidoRepository.save( regPedido );

        pedidoItemRepository.deleteByPedidoId( pedidoId );

        for( PedidoItemDTO itemDTO : pedidoItemsDTOs ) {
            Long itemId = itemDTO.getCardapioItemId();
            int quantidade = itemDTO.getQuantidade();

            Optional<CardapioItem> itemOp = cardapioItemRepository.findById( itemId );
            if ( !itemOp.isPresent() )
                throw new BusinessException( Errors.CARDAPIO_ITEM_NAO_ENCONTRADO_ID, String.valueOf( itemId ) );

            CardapioItem item = itemOp.get();

            PedidoItem pedidoItem = PedidoItem.builder()
                    .pedido( regPedido )
                    .item( item )
                    .quantidade( quantidade )
                    .build();

            pedidoItemRepository.save( pedidoItem );
        }
    }

    public void setAtendido( Long pedidoId, boolean atendido ) {
        Optional<Pedido> pedidoOp = pedidoRepository.findById( pedidoId );
        if ( !pedidoOp.isPresent() )
            throw new BusinessException( Errors.PEDIDO_NAO_ENCONTRADO );

        Pedido pedido = pedidoOp.get();
        pedido.setAtendido( atendido );

        pedidoRepository.save( pedido );
    }

    public List<Pedido> listByMesa( int mesa ) {
        return pedidoRepository.findByMesa( mesa ); 
    }

    public List<Pedido> list() {
        return pedidoRepository.findAll();
    }

    public List<Pedido> filter( PedidoFilterRequest filter ) {
        String mesa = filter.getMesa();
        String atendidoOption = filter.getAtendidoOption();

        AtendimentoOption atenOption = optionManager.getEnum( atendidoOption, AtendimentoOption.values() );
        Boolean atendidoBool = switch( atenOption ) {
            case AtendimentoOption.TODOS -> null;
            case AtendimentoOption.SOMENTE_ATENDIDOS -> true;
            case AtendimentoOption.SOMENTE_NAO_ATENDIDOS -> false;
        };

        Integer mesaInt = ( mesa.equals( "*" ) ? null : Integer.parseInt( mesa ) );

        return pedidoRepository.filter( mesaInt, atendidoBool );
        /*
        if ( mesa.equals( "*" ) ) {
            switch( atenOption ) {
                case AtendimentoOption.TODOS:
                    return pedidoRepository.findAll();
                case AtendimentoOption.SOMENTE_ATENDIDOS:
                    return pedidoRepository.filterOnlyByAtendido( true );
                default:
                    return pedidoRepository.filterOnlyByAtendido( false );
            }
        } else {
            int mesaInt = Integer.parseInt( mesa );

            switch( atenOption ) {
                case AtendimentoOption.TODOS:
                    return pedidoRepository.filterOnlyByMesa( mesaInt );
                case AtendimentoOption.SOMENTE_ATENDIDOS:
                    return pedidoRepository.filter( mesaInt, true );
                default:
                    return pedidoRepository.filter( mesaInt, false );
            }
        }
        */
    }

    public Pedido get( Long pedidoId ) {
        Optional<Pedido> pedidoOp = pedidoRepository.findById( pedidoId );
        if ( !pedidoOp.isPresent() )
            throw new BusinessException( Errors.PEDIDO_NAO_ENCONTRADO );

        return pedidoOp.get();
    }

    @Transactional
    public void delete( Long pedidoId ) {
        if ( !pedidoRepository.existsById( pedidoId ) )
            throw new BusinessException( Errors.PEDIDO_NAO_ENCONTRADO );

        pedidoItemRepository.deleteByPedidoId( pedidoId );
        pedidoRepository.deleteById( pedidoId );
    }

}
