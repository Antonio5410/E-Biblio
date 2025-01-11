package org.example.ebiblio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class EBiblioApplication {
	public static void main(String[] args) {
		SpringApplication.run(EBiblioApplication.class, args);
	}
}
