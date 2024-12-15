package org.example.garageservice.feignService;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.example.garageservice.model.client.Client;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "CLIENT-SERVICE" , url = "http://client-service:8081")  // Ensure the name matches exactly with the service name
public interface ClientServiceFeignClient {

    @GetMapping("/client-service/clients/{id}")
    @CircuitBreaker(name = "clientService",fallbackMethod = "getDefaultClient")
    Client getClientById(@PathVariable("id") String id);


    default Client getDefaultCustomer(Long id){
        Client client = new Client();
        client.setAddress("Adresse not found");
        client.setCIN("CIN not found");
        client.setEmail("Email not found");
        client.setLastName("Last name not found");
        client.setFirstName("First name not found");
        client.setPhoneNumber(00000000);
        return client;
    }
}
