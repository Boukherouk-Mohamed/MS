package org.example.clientservice.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor @ToString
@Document(collection = "clients")
public class Client {

    @Id
    private String CIN;
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private int phoneNumber;

}
