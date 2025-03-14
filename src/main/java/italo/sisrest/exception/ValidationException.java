package italo.sisrest.exception;

public class ValidationException extends ErrorException {

    public ValidationException(String error, String... params) {
        super(error, params);
    }
    
}
