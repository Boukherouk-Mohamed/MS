package org.example.notificationservice.model.planification;

import lombok.*;
import org.example.notificationservice.model.client.Client;
import org.example.notificationservice.model.vehicule.Vehicule;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter @Setter @ToString
public class TravailMaintenance {
    private String id;
    private LocalDateTime tempsDebut;
    private LocalDateTime tempsFin;
    private String description;
    private TravailStatus status; // ex: "Scheduled", "In Progress", "Completed"
    private String VehiculeVIN;
    private Vehicule vehicule;
    private Client client;
}
