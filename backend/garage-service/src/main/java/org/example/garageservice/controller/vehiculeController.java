package org.example.garageservice.controller;


import org.example.garageservice.feignService.ClientServiceFeignClient;
import org.example.garageservice.model.Vehicule;
import org.example.garageservice.model.client.Client;
import org.example.garageservice.service.vehiculeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/vehicule-service")
public class vehiculeController {
    
    @Autowired
    private vehiculeServiceImpl vehiculeService;

    @Autowired
    private ClientServiceFeignClient serviceFeignClient;

    @GetMapping("/vehicules")
    public List<Vehicule> getAllVehicules() {
        List<Vehicule> vehicules = vehiculeService.getAllVehicules();
        // For each vehicle, fetch the associated client and set it
        vehicules.forEach(vehicule -> {
            String ownerId = vehicule.getOwnerId();  // Assuming ownerId is CIN in Client
            Client client = serviceFeignClient.getClientById(ownerId);  // Fetch client data
            vehicule.setClient(client);  // Set client data in vehicule
        });

        return vehicules;
    }

    @GetMapping("/vehicules/{id}")
    public Vehicule getVehiculeById(@PathVariable String id) {
        Vehicule vehicule = vehiculeService.getVehiculeById(id);
        String ownerId = vehicule.getOwnerId();
        System.out.println("Fetching client with CIN: " + ownerId);
        Client client = serviceFeignClient.getClientById(ownerId);
        vehicule.setClient(client);
        return vehicule;
    }


    @PostMapping("/vehicules/update/{vin}")
    public Vehicule updateVehicule(@RequestBody Vehicule vehicule, @PathVariable String vin){
        return vehiculeService.updateVehicule(vehicule,vin);
    };


    @PostMapping("/vehicules/add")
    public Vehicule addVehicule(@RequestBody Vehicule vehicule){
        return vehiculeService.addVehicule(vehicule);
    };


}
