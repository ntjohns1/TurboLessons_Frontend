package com.noslen.lessonscheduleservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestRedirectFilter.DEFAULT_AUTHORIZATION_REQUEST_BASE_URI;

@Configuration
public class SecurityConfig {

    private ClientRegistrationRepository clientRegistrationRepository;
    private Environment env;

    public SecurityConfig(ClientRegistrationRepository clientRegistrationRepository, Environment env) {
        this.clientRegistrationRepository = clientRegistrationRepository;
        this.env = env;
    }

   @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
            .antMatchers("/", "/img/**")
            .permitAll()
            .anyRequest()
            .fullyAuthenticated();

        if (Boolean.valueOf(env.getProperty("okta.oauth2.pkce-always"))) {
            http
                .oauth2Login()
                .authorizationEndpoint()
                .authorizationRequestResolver(new CustomAuthorizationRequestResolver(
                    clientRegistrationRepository, DEFAULT_AUTHORIZATION_REQUEST_BASE_URI
                ));
        }

        return  http.build();
    }
}
