package italo.sisrest.controller;

import italo.sisrest.controller.dto.request.filter.PedidoFilterRequest;
import italo.sisrest.controller.dto.response.PedidoResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import italo.sisrest.controller.dto.request.PedidoRequest;
import italo.sisrest.mapper.PedidoMapper;
import italo.sisrest.model.Pedido;
import italo.sisrest.model.dto.PedidoItemDTO;
import italo.sisrest.service.PedidoService;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/api/sisrest/v1/pedido")
@RequiredArgsConstructor
public class PedidoController {
    
    private final PedidoService pedidoService;

    private final PedidoMapper pedidoMapper;

    @PreAuthorize("hasAuthority('pedidoWRITE')")
    @PostMapping
    public ResponseEntity<Object> insert( @RequestBody PedidoRequest request ) {
        request.validate();

        Pedido pedido = pedidoMapper.map( request );
        PedidoItemDTO[] itemDTOs = pedidoMapper.map( request.getItems() );

        pedidoService.insert( pedido, itemDTOs );

        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAuthority('pedidoWRITE')")
    @PutMapping("/{pedidoId}")
    public ResponseEntity<Object> update( @PathVariable Long pedidoId, @RequestBody PedidoRequest request ) {
        request.validate();

        Pedido pedido = pedidoMapper.map( request );
        PedidoItemDTO[] itemDTOs = pedidoMapper.map( request.getItems() );

        pedidoService.update( pedidoId, pedido, itemDTOs );

        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAuthority('pedidoREAD')")
    @GetMapping("/list")
    public ResponseEntity<List<PedidoResponse>> list() {
        List<Pedido> pedidos = pedidoService.list();
        List<PedidoResponse> responses = pedidos.stream().map( pedidoMapper::map ).toList();

        return ResponseEntity.ok( responses );
    }

    @PreAuthorize("hasAuthority('pedidoREAD')")
    @GetMapping("/listByMesa/{mesa}")
    public ResponseEntity<List<PedidoResponse>> listByMesa( @PathVariable int mesa ) {
        List<Pedido> pedidos = pedidoService.listByMesa( mesa );
        List<PedidoResponse> responses = pedidos.stream().map( pedidoMapper::map ).toList();

        return ResponseEntity.ok( responses );
    }

    @PreAuthorize("hasAuthority('pedidoREAD')")
    @GetMapping("/filter")
    public ResponseEntity<List<PedidoResponse>> filter(
            @RequestParam("mesa") String mesa,
            @RequestParam("atendidoOption") String atendidoOption ) {

        PedidoFilterRequest request = PedidoFilterRequest.builder()
                .mesa( mesa )
                .atendidoOption( atendidoOption )
                .build();

        request.validate();

        List<PedidoResponse> responses = pedidoService.filter( request ).stream()
                .map( pedidoMapper::map )
                .toList();

        return ResponseEntity.ok( responses );
    }

    @PreAuthorize("hasAuthority('pedidoREAD')")
    @GetMapping("/{pedidoId}")
    public ResponseEntity<PedidoResponse> get( @PathVariable  Long pedidoId ) {
        Pedido pedido = pedidoService.get( pedidoId );
        PedidoResponse resp = pedidoMapper.map( pedido );

        return ResponseEntity.ok( resp );
    }

    @PreAuthorize("hasAuthority('pedidoWRITE')")
    @PostMapping("/set-atendido/{pedidoId}")
    public ResponseEntity<Object> setAtendido(
            @PathVariable Long pedidoId, @RequestParam("atendido") boolean atendido ) {

        pedidoService.setAtendido( pedidoId, atendido );

        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAuthority('pedidoDELETE')")
    @DeleteMapping("/{pedidoId}")
    public ResponseEntity<Object> delete( @PathVariable Long pedidoId ) {
        pedidoService.delete( pedidoId );

        return ResponseEntity.ok().build();
    }

}
