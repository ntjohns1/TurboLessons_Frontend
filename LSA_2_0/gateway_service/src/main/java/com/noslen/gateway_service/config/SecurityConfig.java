//package com.noslen.gateway_service.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
////import org.springframework.security.config.web.server.ServerHttpSecurity;
////import org.springframework.security.oauth2.client.oidc.web.server.logout.OidcClientInitiatedServerLogoutSuccessHandler;
////import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
////import org.springframework.security.web.server.SecurityWebFilterChain;
////import org.springframework.security.web.server.header.XFrameOptionsServerHttpHeadersWriter;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.reactive.CorsConfigurationSource;
//import org.springframework.web.cors.reactive.CorsWebFilter;
//import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
//
//import java.util.Arrays;
//import java.util.Collections;
//import java.util.List;
//
//@Configuration
//@EnableWebFluxSecurity
//public class SecurityConfig {
//
//    @Bean
//    CorsConfigurationSource corsConfigurationSource() {
//
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(List.of("*"));
//        configuration.setAllowedMethods(List.of("*"));
//        configuration.setAllowedHeaders(List.of("*"));
//        configuration.setAllowCredentials(true);
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
//
////    @Bean
////    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http,
////                                                            ReactiveClientRegistrationRepository clientRegistrationRepository) {
////        http.cors();
////        // Authenticate through configured OpenID Provider
////        http.oauth2Login();
////        // Also logout at the OpenID Connect provider
////        http.logout(logout -> logout.logoutSuccessHandler(new OidcClientInitiatedServerLogoutSuccessHandler(
////                clientRegistrationRepository)));
////        // Require authentication for all requests
////        http.authorizeExchange().anyExchange().authenticated();
////        // Allow showing /home within a frame
////        http.headers().frameOptions().mode(XFrameOptionsServerHttpHeadersWriter.Mode.SAMEORIGIN);
////        // Disable CSRF in the gateway to prevent conflicts with proxied service CSRF
////        http.csrf().disable();
////
////        return http.build();
////    }
//
//}
