package italo.sisrest.controller;

import italo.sisrest.service.MesaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sisrest/v1/mesa")
@RequiredArgsConstructor
public class MesaController {

    private final MesaService mesaService;

    @PreAuthorize("hasAuthority('pedidoWRITE')")
    @PostMapping("/atendeMesa/{mesa}")
    public ResponseEntity<Object> atendeMesa(@PathVariable int mesa ) {
        mesaService.atendeMesa( mesa );

        return ResponseEntity.ok().build();
    }

}
