package italo.sisrest.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import italo.sisrest.controller.dto.request.LoginRequest;
import italo.sisrest.exception.BusinessException;
import italo.sisrest.exception.Errors;
import italo.sisrest.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {
    
    private final JwtTokenUtil jwtTokenUtil;

    public String login( LoginRequest request ) {
        if ( request.getUsername().equals( "italo" ) && request.getPassword().equals( "italo" ) ) {
            Long uid = 0L;
            String username = "italo";
            List<String> roles = Arrays.asList( 
                    "cardapioItemREAD",
                    "cardapioItemWRITE",
                    "cardapioItemDELETE",
                    "pedidoWRITE",
                    "pedidoREAD",
                    "pedidoDELETE"
            );
            return jwtTokenUtil.geraToken( username, roles, uid );
        }
        throw new BusinessException( Errors.LOGIN_INVALIDO );
    }

}
