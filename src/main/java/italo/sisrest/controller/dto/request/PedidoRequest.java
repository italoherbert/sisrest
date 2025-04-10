package italo.sisrest.controller.dto.request;

import java.util.ArrayList;
import java.util.List;

import italo.sisrest.controller.dto.validation.ValidationBuilder;
import italo.sisrest.controller.dto.validation.Validator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PedidoRequest implements Validator {
    
    private int mesa;

    private List<PedidoItemRequest> items;

    @Override
    public void validate() {
        List<Validator> validators = new ArrayList<>();

        validators.addAll(
            ValidationBuilder.of( "mesa", String.valueOf( mesa ) )
                .deveSerMaiorQueZero()
                .build()
        );

        validators.forEach(Validator::validate);
    }

}
