package italo.sisrest.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import italo.sisrest.controller.dto.response.ErrorResponse;

@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ErrorException.class)
    public ResponseEntity<ErrorResponse> errorException( ErrorException e ) {
        return ResponseEntity.badRequest().body( e.response() );
    }

    @ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<ErrorResponse> trataAccessDeniedException( AccessDeniedException e ) {
		return ResponseEntity.status( 403 ).body( new ErrorResponse( Errors.ACESSO_NAO_AUTORIZADO ) );		
	}

}
