package italo.sisrest.mocks;

import com.github.javafaker.Faker;

import italo.sisrest.controller.dto.request.LoginRequest;

public class LoginMocks {
    
    private final static Faker faker = new Faker();
    
    public static LoginRequest mockLoginRequest() {
        return LoginRequest.builder()
            .username( faker.name().username() )
            .password( faker.random().hex() )
            .build();
    }

}
