package italo.sisrest.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import italo.sisrest.controller.dto.request.PedidoRequest;
import italo.sisrest.mapper.PedidoMapper;
import italo.sisrest.model.Pedido;
import italo.sisrest.model.dto.PedidoItemDTO;
import italo.sisrest.service.PedidoService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/sisrest/v1/pedido")
@RequiredArgsConstructor
public class PedidoController {
    
    private final PedidoService pedidoService;

    private final PedidoMapper pedidoMapper;

    @PostMapping
    @PreAuthorize("hasAuthority('pedidoWRITE')")
    public ResponseEntity<Object> insert( @RequestBody PedidoRequest request ) throws Exception {
        request.validate();

        Pedido pedido = pedidoMapper.map( request );
        PedidoItemDTO[] itemDTOs = pedidoMapper.map( request.getItems() );

        pedidoService.insert( pedido, itemDTOs );

        return ResponseEntity.ok().build();
    }

}
