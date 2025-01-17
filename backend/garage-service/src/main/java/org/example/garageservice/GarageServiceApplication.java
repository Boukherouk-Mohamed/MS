package org.example.garageservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class GarageServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(GarageServiceApplication.class, args);
    }

}
