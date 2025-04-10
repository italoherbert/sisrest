package italo.sisrest.controller.dto.validation.validator;

import italo.sisrest.controller.dto.validation.Validator;
import italo.sisrest.exception.Errors;
import italo.sisrest.exception.ValidationException;

public class DeveSerInteiroOuAsteriscoValidator implements Validator {

    private String fieldName;
    private String fieldValue;

    public DeveSerInteiroOuAsteriscoValidator(String fieldName, String fieldValue ) {
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

    @Override
    public void validate() {
        if ( fieldValue == null )
            throw new ValidationException( Errors.VALOR_NAO_INTEIRO_NEM_ASTERISCO, fieldName );

        try {
            Integer.parseInt( fieldValue );
        } catch ( NumberFormatException e ) {
            if ( !fieldValue.equals( "*" ) )
                throw new ValidationException( Errors.VALOR_NAO_INTEIRO_NEM_ASTERISCO, fieldName );
        }
    }

}
