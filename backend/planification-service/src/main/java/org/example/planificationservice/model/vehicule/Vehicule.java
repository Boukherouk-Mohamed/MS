package org.example.planificationservice.model.vehicule;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.example.planificationservice.model.client.Client;
import org.springframework.data.annotation.Transient;

import java.time.LocalDate;


@Setter @Getter @ToString
public class Vehicule {

    private String vin;
    private String registrationNumber;
    private String brand;
    private String model;
    private int year;
    private String color;
    private int mileage;
    private fuelTypes fuelType;
    private LocalDate purchaseDate;
    private String ownerId;  // This will store the client ID
    private ExistenceTypes existenceType; //To check if the vehicle is in the garage or out of it
    private statusTypes vehicleStatus;
    @Transient
    private Client client;  // This field will store client details via Feign
}
