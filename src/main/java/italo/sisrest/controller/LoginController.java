package italo.sisrest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import italo.sisrest.controller.dto.request.LoginRequest;
import italo.sisrest.controller.dto.response.LoginResponse;
import italo.sisrest.service.LoginService;

@RestController
@RequestMapping("/api/sisrest/v1/login")
public class LoginController {
    
    @Autowired
    private LoginService loginService;

    @PostMapping
    public ResponseEntity<Object> login( @RequestBody LoginRequest request ) {
        String token = loginService.login( request );
        
        return ResponseEntity.ok( 
            LoginResponse.builder()
                .token( token )
                .build() );
    }

}
