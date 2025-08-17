package com.klef;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class MdSpringbootApplication extends SpringBootServletInitializer{
	

	public static void main(String[] args) {
		SpringApplication.run(MdSpringbootApplication.class, args);
		System.out.println("Project is Running ...");
	}

}
