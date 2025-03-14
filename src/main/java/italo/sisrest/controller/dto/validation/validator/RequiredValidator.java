package italo.sisrest.controller.dto.validation.validator;

import italo.sisrest.controller.dto.validation.Validator;
import italo.sisrest.exception.Errors;
import italo.sisrest.exception.ValidationException;

public class RequiredValidator implements Validator {

    private String fieldName;
    private String fieldValue;

    public RequiredValidator( String fieldName, String fieldValue ) {
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

    @Override
    public void validate() {
        if ( fieldValue == null )
            throw new ValidationException( Errors.CAMPO_OBRIGATORIO, fieldName );        
        if ( fieldValue.isBlank() )
            throw new ValidationException( Errors.CAMPO_OBRIGATORIO, fieldName );        
    }
    
}
