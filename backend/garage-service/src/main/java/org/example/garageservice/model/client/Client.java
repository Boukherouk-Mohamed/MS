package org.example.garageservice.model.client;


import lombok.*;
import org.springframework.data.annotation.Id;

@Getter @Setter @ToString
public class Client {


    private String CIN;
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private int phoneNumber;
}
