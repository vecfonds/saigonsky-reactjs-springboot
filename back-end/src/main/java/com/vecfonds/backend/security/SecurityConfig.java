package com.vecfonds.backend.security;

import com.vecfonds.backend.service.impl.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(
        // securedEnabled = true,
        // jsr250Enabled = true,
        prePostEnabled = true)
public class SecurityConfig {

    private static final String[] PUBLIC_URL = {
            "/api/v1/auth/register/**",
            "/api/v1/auth/login/**",
            "/api/v1/auth/refreshtoken/**",
            "api/v1/shopping-cart/**",
//            "api/v1/user/**"
    };

//    private static final String[] PRIVATE_URL = {
//            "/api/v1/auth/logout/**",
//    };


    private final JwtAuthEntryPoint jwtAuthEntryPoint;
//    private final CustomUserDetailsService userDetailsService;


    @Autowired
    public SecurityConfig(JwtAuthEntryPoint jwtAuthEntryPoint) {
        this.jwtAuthEntryPoint = jwtAuthEntryPoint;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req ->
//                        req.anyRequest().permitAll()
                        req.requestMatchers(PUBLIC_URL)
                                .permitAll()
                                .anyRequest()
                                .authenticated()
                )
                .exceptionHandling(exception-> exception.authenticationEntryPoint(jwtAuthEntryPoint)
//                        .accessDeniedPage("/error/accedd-denied")
                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
        ;
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(){
        return new JwtAuthenticationFilter();
    }

}
