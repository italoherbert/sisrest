package italo.sisrest.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import italo.sisrest.controller.dto.request.CardapioItemRequest;
import italo.sisrest.controller.dto.response.CardapioItemResponse;
import italo.sisrest.mapper.CardapioItemMapper;
import italo.sisrest.model.CardapioItem;
import italo.sisrest.service.CardapioItemService;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/sisrest/v1/cardapioitem")
@RequiredArgsConstructor
public class CardapioItemController {
    
    private final CardapioItemService cardapioItemService;
    private final CardapioItemMapper cardapioItemMapper;

    @PostMapping
    @PreAuthorize("hasAuthority('cardapioItemWRITE')")
    public ResponseEntity<Object> insert( @RequestBody CardapioItemRequest request ) {
        request.validate();

        CardapioItem item = cardapioItemMapper.map( request );
        cardapioItemService.insert( item );
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{itemId}")
    @PreAuthorize("hasAuthority('cardapioItemWRITE')")
    public ResponseEntity<Object> update( @PathVariable String itemId, @RequestBody CardapioItemRequest request ) {
        request.validate();
        
        CardapioItem item = cardapioItemMapper.map( request );
        cardapioItemService.update( itemId, item );
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{itemId}")
    @PreAuthorize("hasAuthority('cardapioItemREAD')")
    public ResponseEntity<CardapioItemResponse> find( @PathVariable String itemId ) {
        CardapioItemResponse resp = cardapioItemService.find( itemId ).map( cardapioItemMapper::map ).get();
        return ResponseEntity.ok( resp );
    }

    @GetMapping("/list")
    @PreAuthorize("hasAuthority('cardapioItemREAD')")
    public ResponseEntity<List<CardapioItemResponse>> list() {
        List<CardapioItemResponse> resps = cardapioItemService.list().stream().map( cardapioItemMapper::map ).toList();
        return ResponseEntity.ok( resps );
    }

    @DeleteMapping("/{itemId}")
    @PreAuthorize("hasAuthority('cardapioItemDELETE')")
    public ResponseEntity<Object> delete( @PathVariable String itemId ) {
        cardapioItemService.delete( itemId );
        return ResponseEntity.ok().build();
    }

}
