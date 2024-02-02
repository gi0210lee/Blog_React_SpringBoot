package com.gy.blogbackend.security;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoder;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.Password;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.security.PublicKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;

// JwtProvider 로 대체
@Service
public class TokenProvider {


    /* JWT 생성 및 검증을 위한 키
       sha-256: 32byte
       sha-384: 48byte
       sha-512: 64byte
    */
    private static final String SECRET_KEY = "jwtsecretkey12345678901234567890jwtsecretkey12345678901234567890";
    private Key key;

    // JWT 를 생성하는 메서드
    public String create(String userEmail) {
        // 완료날짜를 현재 날짜 + 1시간
        Date expireTime = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

        // JWT 생성
        // 암호화 알고리즘, 키
        // JWT 제목, 생성일, 완료일
        // 생성
//        byte[] keyBytes = Decoders.BASE64.decode()
//                SECRET_KEY.getBytes(StandardCharsets.UTF_8);
//        Key key = Keys.hmacShaKeyFor(keyBytes);
        key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
        System.out.println("key: " + Base64.getEncoder().encodeToString(key.getEncoded()));
        return Jwts.builder()
                .subject(userEmail)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(expireTime)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

//        // recently
//        key = Jwts.SIG.HS512.key().build();
//        String secretString = Encoders.BASE64.encode(key.getEncoded());
//
//        System.out.println("secretString: " + secretString);
//        return Jwts.builder()
//                .subject(userEmail)
//                .issuedAt(new Date())
//                .expiration(expireTime)
//                .signWith(key)
//                .compact();
    }

    // JWT 검증
    public String validate(String token) {
        // 매개변수로 받은 tokend 키로 사용해서 복호화
        // 복호화된 토큰의 payload에서 제목을 가져온다
        Claims claims = Jwts.parser().setSigningKey(key).build().parseSignedClaims(token).getBody();
        return claims.getSubject();

        // recently
//        return Jwts.parser()
//                .verifyWith((SecretKey) key)
//                .build()
//                .parseSignedClaims(token)
//                .getPayload()
//                .getSubject()
//                ;
    }
}
