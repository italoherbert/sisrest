package italo.sisrest.controller.dto.request.filter;

import italo.sisrest.controller.dto.validation.ValidationBuilder;
import italo.sisrest.controller.dto.validation.Validator;
import italo.sisrest.controller.dto.validation.validator.OptionValidator;
import italo.sisrest.exception.Errors;
import italo.sisrest.exception.ValidationException;
import italo.sisrest.model.enums.AtendimentoOption;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PedidoFilterRequest implements Validator {

    private String mesa;

    private String atendidoOption;

    @Override
    public void validate() {
        List<Validator> validators = new ArrayList<>();

        validators.addAll(
                ValidationBuilder.of( "mesa", mesa )
                        .required()
                        .deveSerInteiroOuAsterisco()
                        .build()
        );

        validators.addAll(
                ValidationBuilder.of( "atendido option", atendidoOption )
                        .required()
                        .build()
        );

        validators.add( new OptionValidator( AtendimentoOption.values(), atendidoOption, AtendimentoOption.class ) );

        validators.forEach(Validator::validate);
    }
}
