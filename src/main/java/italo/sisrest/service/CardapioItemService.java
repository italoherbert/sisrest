package italo.sisrest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import italo.sisrest.exception.BusinessException;
import italo.sisrest.exception.Errors;
import italo.sisrest.model.CardapioItem;
import italo.sisrest.repository.CardapioItemRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CardapioItemService {
    
    private final CardapioItemRepository cardapioItemRepository;

    public void insert( CardapioItem item ) {    
        Optional<CardapioItem> itemOp = cardapioItemRepository.findByDescricao( item.getDescricao() );
        if ( itemOp.isPresent() )
            throw new BusinessException( Errors.CARDAPIO_ITEM_JA_EXISTE );

        cardapioItemRepository.save( item );
    }

    public List<CardapioItem> list() {
        return cardapioItemRepository.findAll();
    }

    public Optional<CardapioItem> find( Long itemId ) {
        Optional<CardapioItem> itemOp = cardapioItemRepository.findById( itemId );
        if ( !itemOp.isPresent() )
            throw new BusinessException( Errors.CARDAPIO_ITEM_NAO_ENCONTRADO );

        return itemOp;
    }

    public List<CardapioItem> filtra( String descricao ) {
        if ( descricao.equals( "*" ) ) {
            return cardapioItemRepository.findAll();
        } else {
            return cardapioItemRepository.filtra( "%"+descricao+"%" );
        }
    }

    public void update( Long itemId, CardapioItem item ) {
        Optional<CardapioItem> itemOp = cardapioItemRepository.findById( itemId );
        if ( !itemOp.isPresent() )
            throw new BusinessException( Errors.CARDAPIO_ITEM_NAO_ENCONTRADO );

        item.setId( itemId );

        CardapioItem regItem = itemOp.get();
        if ( !item.getDescricao().equalsIgnoreCase( regItem.getDescricao() ) )
            if ( cardapioItemRepository.findByDescricao( item.getDescricao() ).isPresent() )
                throw new BusinessException( Errors.CARDAPIO_ITEM_JA_EXISTE );
        
        cardapioItemRepository.save( item );
    }

    public void delete( Long itemId ) {
        Optional<CardapioItem> itemOp = cardapioItemRepository.findById( itemId );
        if ( !itemOp.isPresent() )
            throw new BusinessException( Errors.CARDAPIO_ITEM_NAO_ENCONTRADO );

        cardapioItemRepository.deleteById( itemId ); 
    }

}
