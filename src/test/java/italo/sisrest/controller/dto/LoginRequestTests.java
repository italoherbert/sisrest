package italo.sisrest.controller.dto;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.catchThrowable;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;

import italo.sisrest.controller.dto.request.LoginRequest;
import italo.sisrest.exception.ValidationException;
import italo.sisrest.mocks.LoginMocks;

public class LoginRequestTests {

    @Test
    @DisplayName("Deve validar login com sucesso")
    void deveValidarLoginComSucesso() {
        LoginRequest request = LoginMocks.mockLoginRequest();

        request.validate();

        assertThat( request.getUsername() ).isNotNull();
        assertThat( request.getUsername() ).isNotBlank();
        assertThat( request.getPassword() ).isNotNull();
        assertThat( request.getPassword() ).isNotBlank();
    }

    @ParameterizedTest
    @NullAndEmptySource
    @DisplayName("Deve lançar exceção de username obrigatório")
    void deveLancarExcecaoUsernameObrigatorio( String username ) {
        LoginRequest request = LoginMocks.mockLoginRequest();
        request.setUsername( username );

        Throwable t = catchThrowable( request::validate );

        assertThat( t ).isNotNull();
        assertThat( t ).isInstanceOf( ValidationException.class );
        assertThat( ((ValidationException)t).response().getMensagem() ).isEqualTo( "O campo 'username' é de preenchimento obrigatório." );
    }

    @ParameterizedTest
    @NullAndEmptySource
    @DisplayName("Deve lançar exceção de password obrigatório")
    void deveLancarExcecaoPasswordObrigatorio( String password ) {
        LoginRequest request = LoginMocks.mockLoginRequest();
        request.setPassword( password );

        Throwable t = catchThrowable( request::validate );

        assertThat( t ).isNotNull();
        assertThat( t ).isInstanceOf( ValidationException.class );
        assertThat( ((ValidationException)t).response().getMensagem() ).isEqualTo( "O campo 'password' é de preenchimento obrigatório." );
    }

}
