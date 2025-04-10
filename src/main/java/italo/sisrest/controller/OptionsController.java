package italo.sisrest.controller;

import italo.sisrest.controller.dto.response.OptionResponse;
import italo.sisrest.model.enums.AtendimentoOption;
import italo.sisrest.util.OptionManager;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sisrest/v1/options")
@RequiredArgsConstructor
public class OptionsController {

    private final OptionManager optionManager;

    @GetMapping("/atendido")
    public ResponseEntity<List<OptionResponse>> atendidoOptions() {
        List<OptionResponse> types = optionManager.responseList( AtendimentoOption.values() );
        return ResponseEntity.ok( types );
    }

}
