package org.example.ebiblio.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Permite toate endpoint-urile
                        .allowedOrigins("http://localhost:3000") // Adresele frontend-ului
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // Metodele HTTP permise
                        .allowedHeaders("*") // Toate header-ele permise
                        .allowCredentials(true); // Permite cookie-uri dacă este nevoie
            }
        };
    }
}
