package italo.sisrest.util;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenUtil {

	@Value("${jwt.secret}")
	private String secret;
	
	@Value("${jwt.tempo.expiracao}")
	private long expirationMS;
	
	public String authorizationHeaderToken( String authorizationHeader ) {
		return authorizationHeader.substring( 7 );
	}
		
	public String geraToken( String subject, List<String> roles, Long uid ) {
		Map<String, Object> claims = new HashMap<>();
		claims.put( "roles", this.rolesToClaim( roles ) );		
		claims.put( "uid", String.valueOf( uid ) );	
		return this.geraToken( subject, claims );
	}
	
	public Long getUID( String token ) {
		Claims claims = this.extraiClaims( token );
		return Long.parseLong( String.valueOf( claims.get( "uid" ) ) );
	}

    public String[] getRoles( String token ) {
        Claims claims = this.extraiClaims( token );
        return this.claimToRole( claims.get( "roles" ) );
    }

    public boolean isExpirado( String token ) {
        Claims claims = this.extraiClaims( token );
		return ( claims.getExpiration().before( new Date() ) );
    }

    public String getSubject( String token ) {
        Claims claims = this.extraiClaims( token );
        return claims.getSubject();

    }


	
	public String geraToken( String subject, Map<String, Object> claims ) {
		byte[] secretBytes = Base64.getDecoder().decode( secret );
		Key secretKey = Keys.hmacShaKeyFor( secretBytes );
		
		return Jwts.builder()
                .subject( subject )
                .claims( claims )
                .issuedAt( new Date() )				
                .expiration( new Date( System.currentTimeMillis() + expirationMS ) ) 								
				.signWith( secretKey )
				.compact();
	}
	
	public Claims extraiClaims( String token ) {
		byte[] secretBytes = Base64.getDecoder().decode( secret );
		SecretKey secretKey = Keys.hmacShaKeyFor( secretBytes );
		
		return Jwts.parser()                                                    
				.verifyWith( secretKey )
				.build()
                .parseSignedClaims( token )
                .getPayload();
	}
		
	public String[] claimToRole( Object claim ) {
		String claimStr = String.valueOf( claim );
		
		if ( claimStr.isBlank() )
			return new String[]{};
		
		String[] lista = claimStr.split( "," );					
		return lista;
	}
	
	public String rolesToClaim( List<String> roles ) {
		int size = roles.size();
		
		StringBuilder strB = new StringBuilder();
		for( int i = 0; i < size; i++ ) {
			strB.append( roles.get( i ) );
			if ( i < size-1 )
				strB.append( "," );		
		}
		return strB.toString();
	}
	
	public String rolesToClaim( String[] roles ) {		
		StringBuilder strB = new StringBuilder();
		for( int i = 0; i < roles.length; i++ ) {
			strB.append( roles[ i ] );
			if ( i < roles.length-1 )
				strB.append( "," );		
		}
		return strB.toString();
	}
	
}
