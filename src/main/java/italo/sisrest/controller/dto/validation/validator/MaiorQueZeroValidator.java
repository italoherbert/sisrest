package italo.sisrest.controller.dto.validation.validator;

import italo.sisrest.controller.dto.validation.Validator;
import italo.sisrest.exception.Errors;
import italo.sisrest.exception.ValidationException;

public class MaiorQueZeroValidator implements Validator {

    private String fieldName;
    private String fieldValue;

    public MaiorQueZeroValidator( String fieldName, String fieldValue ) {
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

    @Override
    public void validate() {
        double value;
        try {
            value = Double.parseDouble( fieldValue );
        } catch ( NumberFormatException e ) {
            throw new ValidationException( Errors.VALOR_MENOR_QUE_ZERO, fieldName );
        }

        if ( value <= 0 )
            throw new ValidationException( Errors.VALOR_MENOR_QUE_ZERO, fieldName );
    }
    
}
