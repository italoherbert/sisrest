package italo.sisrest.controller.dto.validation.validator;

import italo.sisrest.controller.dto.validation.Validator;
import italo.sisrest.exception.Errors;
import italo.sisrest.exception.ValidationException;
import italo.sisrest.model.enums.EnumOption;

public class OptionValidator implements Validator {

    private final EnumOption[] options;
    private final String optionName;
    private final Class<? extends EnumOption> optionClass;

    public OptionValidator(EnumOption[] options, String optionName, Class<? extends EnumOption> optionClass) {
        this.options = options;
        this.optionName = optionName;
        this.optionClass = optionClass;
    }

    @Override
    public void validate() {
        boolean achou = false;
        for( int i = 0; !achou && i < options.length; i++ )
            if ( options[ i ].name().equalsIgnoreCase( optionName ) )
                achou = true;

        if ( !achou )
            throw new ValidationException(Errors.OPCAO_INVALIDA, optionName, optionClass.getCanonicalName() );
    }

}
