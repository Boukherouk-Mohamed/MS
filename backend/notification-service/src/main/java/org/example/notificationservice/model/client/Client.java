package org.example.notificationservice.model.client;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class Client {
    private String CIN;
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private int phoneNumber;

}
