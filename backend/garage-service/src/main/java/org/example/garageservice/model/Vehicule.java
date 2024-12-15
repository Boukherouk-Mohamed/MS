package org.example.garageservice.model;


import jakarta.persistence.*;
import lombok.*;
import org.example.garageservice.model.client.Client;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;


@AllArgsConstructor @NoArgsConstructor @Getter @Setter @ToString
@Document(collection = "vehicules")
public class Vehicule {

    @Id
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
