package org.example.gatewayservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.EnableWebFlux;
import org.springframework.web.reactive.config.WebFluxConfigurer;

@Configuration
@EnableWebFlux
public class WebConfig implements WebFluxConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Apply to all endpoints
                .allowedOrigins("http://localhost:3000") // Your React frontend origin
                .allowedMethods("*") // Allow all methods
                .allowedHeaders("*") // Allow all headers
                .exposedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600); // Cache preflight response
    }



}