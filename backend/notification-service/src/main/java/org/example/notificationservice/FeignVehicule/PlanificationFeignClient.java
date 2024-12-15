package org.example.notificationservice.FeignVehicule;

import org.example.notificationservice.model.planification.TravailMaintenance;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "PLANIFICATION-SERVICE" , url = "http://planification-service:8084/planifications")  // Ensure the name matches exactly with the service name
public interface PlanificationFeignClient {

    @GetMapping("/planifications" )
    List<TravailMaintenance> getAllJobs();

}
