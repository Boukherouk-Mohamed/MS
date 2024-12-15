package org.example.garageservice.service;

import org.example.garageservice.feignService.ClientServiceFeignClient;
import org.example.garageservice.model.Vehicule;
import org.example.garageservice.model.client.Client;
import org.example.garageservice.repository.vehiculeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class vehiculeServiceImpl implements vehiculeService {


    @Autowired
    private vehiculeRepository vehiculeRepository;


    @Autowired
    private ClientServiceFeignClient clientServiceFeignClient;



    @Override
    public Vehicule getVehiculeById(String vin) {
        Vehicule vehicule = vehiculeRepository.findById(vin).orElseThrow(() -> new RuntimeException("Vehicule not found"));
        Client client = clientServiceFeignClient.getClientById(vehicule.getOwnerId());
        vehicule.setClient(client);  // Set the client details
        return vehicule;
    }

    @Override
    public List<Vehicule> getAllVehicules() {
        return vehiculeRepository.findAll();
    }

    @Override
    public Vehicule addVehicule(Vehicule vehicule) {
        return vehiculeRepository.save(vehicule);
    }

    @Override
    public Vehicule updateVehicule(Vehicule vehicule, String vin) {
        Vehicule foundVehicule = vehiculeRepository.findById(vin)
                .orElseThrow(() -> new IllegalArgumentException("Vehicule with VIN: " + vin + " not found"));

        foundVehicule.setBrand(vehicule.getBrand());
        foundVehicule.setColor(vehicule.getColor());
        foundVehicule.setModel(vehicule.getModel());
        foundVehicule.setMileage(vehicule.getMileage());
        foundVehicule.setYear(vehicule.getYear());
        foundVehicule.setFuelType(vehicule.getFuelType());
        foundVehicule.setOwnerId(vehicule.getOwnerId());
        foundVehicule.setPurchaseDate(vehicule.getPurchaseDate());
        foundVehicule.setRegistrationNumber(vehicule.getRegistrationNumber());
        foundVehicule.setVehicleStatus(vehicule.getVehicleStatus());

        return vehiculeRepository.save(foundVehicule);
    }
}
