package org.example.garageservice.service;

import org.example.garageservice.model.Vehicule;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface vehiculeService {

    public Vehicule getVehiculeById(String vin);
    public List<Vehicule> getAllVehicules();
    public Vehicule addVehicule(Vehicule client);
    public Vehicule updateVehicule(Vehicule vehicule,String vin);

}
