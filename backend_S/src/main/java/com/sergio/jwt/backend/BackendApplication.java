package com.sergio.jwt.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {


		Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

		// Set as system properties so Spring can access via ${...}
		dotenv.entries().forEach(entry ->
				System.setProperty(entry.getKey(), entry.getValue())
		);
		SpringApplication.run(BackendApplication.class, args);
	}

}
