package com.vandit.campuspulse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class CampuspulseApplication {

	public static void main(String[] args) {
		SpringApplication.run(CampuspulseApplication.class, args);
	}

}
