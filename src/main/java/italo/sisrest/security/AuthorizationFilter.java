package italo.sisrest.security;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import italo.sisrest.util.JwtTokenUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthorizationFilter extends OncePerRequestFilter {

    @Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Override
	protected void doFilterInternal(
			@NonNull HttpServletRequest request, 
			@NonNull HttpServletResponse response, 
			@NonNull FilterChain filterChain) throws ServletException, IOException {
				
		String auth = request.getHeader( "Authorization" );
				
		boolean authHeaderValido = true;
		if ( auth == null ) {
			authHeaderValido = false;
		} else {
			authHeaderValido = auth.startsWith( "Bearer " );						
		}
		
		if ( authHeaderValido && auth != null ) {		
			String token = auth.substring( 7 );
			try {
				if ( !jwtTokenUtil.isExpirado( token ) ) {
					String username = jwtTokenUtil.getSubject( token );
					String[] roles = jwtTokenUtil.getRoles( token );
										
					List<SimpleGrantedAuthority> authorities = new ArrayList<>();
					for( String role : roles )
						authorities.add( new SimpleGrantedAuthority( role ) );					
					
					UsernamePasswordAuthenticationToken userPassToken = 
							new UsernamePasswordAuthenticationToken( username, null, authorities );
					
					SecurityContextHolder.getContext().setAuthentication( userPassToken );
				}
			} catch ( SignatureException e ) {
				
			} catch ( ExpiredJwtException e ) {
				String resp = "{ \"mensagem\" : \"Token expirado, por favor faça login novamente.\" }";
				response.setContentType( "application/json" );
				response.setStatus( HttpServletResponse.SC_BAD_REQUEST );
				
				PrintWriter writer = new PrintWriter( response.getOutputStream() );
				writer.print( resp ); 
				writer.flush();		
				
				return;
			} catch ( MalformedJwtException e ) {
				String resp = "{ \"mensagem\" : \"Token inválido.\" }";
				response.setContentType( "application/json" );
				response.setStatus( HttpServletResponse.SC_BAD_REQUEST );
				
				PrintWriter writer = new PrintWriter( response.getOutputStream() );
				writer.print( resp ); 
				writer.flush();		
				
				return;
			}
		} 
		super.doFilter( request, response, filterChain );	
    }
    
}
