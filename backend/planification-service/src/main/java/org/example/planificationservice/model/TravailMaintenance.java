package org.example.planificationservice.model;

import lombok.*;
import org.example.planificationservice.model.client.Client;
import org.example.planificationservice.model.vehicule.Vehicule;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "travauxMaintenance")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @ToString
public class TravailMaintenance {
    @Id
    private String id;
    private LocalDateTime tempsDebut;
    private LocalDateTime tempsFin;
    private String description;
    private TravailStatus status; // ex: "Scheduled", "IN_PROGRESS", "DONE"
    private String VehiculeVIN;
    @Transient
    private Vehicule vehicule;
    @Transient
    private Client client;
}
