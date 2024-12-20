package org.example.factureservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;


@SpringBootApplication
@EnableFeignClients(basePackages = "org.example.factureservice.FeignVehicule")
public class FactureServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(FactureServiceApplication.class, args);
    }

}
