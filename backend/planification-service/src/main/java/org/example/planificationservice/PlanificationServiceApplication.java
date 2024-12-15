package org.example.planificationservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class PlanificationServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(PlanificationServiceApplication.class, args);
    }

}
