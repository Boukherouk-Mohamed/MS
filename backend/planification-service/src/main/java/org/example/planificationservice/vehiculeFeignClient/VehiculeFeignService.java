package org.example.planificationservice.vehiculeFeignClient;


import org.example.planificationservice.model.vehicule.Vehicule;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "GARAGE-SERVICE" , url = "http://garage-service:8082")  // Ensure the name matches exactly with the service name
public interface VehiculeFeignService {

    @GetMapping("/vehicule-service/vehicules")
    List<Vehicule> getAllVehicules();

    @GetMapping("/vehicule-service/vehicules/{id}")
    public Vehicule getVehiculeById(@PathVariable String id);
}

