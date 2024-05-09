package com.example.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The entry point of the Spring Boot application.
 *
 * The @SpringBootApplication annotation encompasses @Configuration, @EnableAutoConfiguration,
 * and @ComponentScan annotations with their default attributes.
 */
@SpringBootApplication
public class Application {

    /**
     * The main method that starts up the Spring Boot application.
     *
     * @param args command line arguments passed to the application.
     */
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
