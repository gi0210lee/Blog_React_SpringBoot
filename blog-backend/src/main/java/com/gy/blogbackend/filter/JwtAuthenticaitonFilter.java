package com.gy.blogbackend.filter;

//import com.gy.blogbackend.security.TokenProvider;

import com.gy.blogbackend.provider.JwtProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.swing.*;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticaitonFilter extends OncePerRequestFilter {

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = parseBearerToken(request);
            if (token == null) {
                filterChain.doFilter(request, response);
                return;
            }

            // 토큰 검증해서 payload의 userEmail 가져옴
            String userEmail = jwtProvider.validate(token);
            if (userEmail == null) {
                filterChain.doFilter(request, response);
                return;
            }

            // SecurityContext 에 추가할 객체
            AbstractAuthenticationToken abstractAuthenticationToken = new UsernamePasswordAuthenticationToken(userEmail, null, AuthorityUtils.NO_AUTHORITIES);
            abstractAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            /* SecurityContext 에 AbstractAuthenticationToken 객체를 추가해서
               해당 thread가 지속적으로 정보를 가질수 있게 해줌
             */
            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
            securityContext.setAuthentication(abstractAuthenticationToken);
            SecurityContextHolder.setContext(securityContext);

        } catch (Exception exception) {
            exception.printStackTrace();
        }

        // 아래를 추가해야 계속 진행
        filterChain.doFilter(request, response);
    }

    // Request Header에서 Authorization 필드의 Bearer Token을 가져오는 메서드
    private String parseBearerToken(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        boolean basAuthorization = StringUtils.hasText(authorization);
        if (!basAuthorization) return null;

        if (!authorization.startsWith("Bearer ")) return null;

        String token = authorization.substring(7);
        return token;


    }
}
