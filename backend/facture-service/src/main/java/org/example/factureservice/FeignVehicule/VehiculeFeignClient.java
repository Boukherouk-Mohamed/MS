package org.example.factureservice.FeignVehicule;


import org.example.factureservice.model.vehicule.Vehicule;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "GARAGE-SERVICE" , url = "http://garage-service:8082")  // Ensure the name matches exactly with the service name
public interface VehiculeFeignClient {

    @GetMapping("/vehicule-service/vehicules")
    List<Vehicule> getAllVehicules();

}
