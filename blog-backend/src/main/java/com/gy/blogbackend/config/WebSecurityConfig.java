package com.gy.blogbackend.config;

import com.gy.blogbackend.filter.JwtAuthenticaitonFilter;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final JwtAuthenticaitonFilter jwtAuthenticaitonFilter;

    @Bean
    protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                // cors 정책: 현재는 application에서 작업을 해뒀음으로 기본 설정 사용
                .cors().and()
                // csrf 대책: 현재는 csrf에 대한 대책을 비활서화
                .csrf().disable()
                // basic 인증: 현재는 Bear token 인증 방식을 사용하기 때문에 비활설화
                .httpBasic().disable()
                // 세션 기반 인증: 현재는 session 기반 인증을 사용하기 않기 때문에 사용안함
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                // '/', '/api/auth' 모듈에 대해서는 모두 허용
                .authorizeRequests()
                .requestMatchers("/", "/api/v1/auth/**", "/api/v1/search/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/board/**", "/api/v1/user/*", "/file/*").permitAll()
                // 나머지 request 에 대해서는 모두 인증된 사용자만 사용 가능
                .anyRequest().authenticated().and()
                .exceptionHandling().authenticationEntryPoint(new FailedAuthenticationEntryPoint());

        httpSecurity.addFilterBefore(jwtAuthenticaitonFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }
}

class FailedAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("{\"code\":\"AF\", \"message\": \"Authorized Failed\"}");
    }
}