package italo.sisrest.controller.dto.validation;

import java.util.ArrayList;
import java.util.List;

import italo.sisrest.controller.dto.validation.validator.MaiorQueZeroValidator;
import italo.sisrest.controller.dto.validation.validator.RequiredValidator;

public class ValidationBuilder {
    
    private List<Validator> validators = new ArrayList<>();
    private String fieldName;
    private String fieldValue;


    public ValidationBuilder( String fieldName, String fieldValue ) {
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

    public static ValidationBuilder of( String fieldName, String fieldValue ) {
        return new ValidationBuilder( fieldName, fieldValue );
    }

    public ValidationBuilder required() {
        validators.add( new RequiredValidator( fieldName, fieldValue ) );
        return this;
    }

    public ValidationBuilder deveSerMaiorQueZero() {
        validators.add( new MaiorQueZeroValidator( fieldName, fieldValue ) );
        return this;
    }

    public List<Validator> build() {
        return validators;
    }

}
