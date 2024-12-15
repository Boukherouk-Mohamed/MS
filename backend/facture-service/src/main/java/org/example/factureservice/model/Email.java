package org.example.factureservice.model;

import lombok.*;
import org.springframework.data.annotation.Id;

@Getter @Setter @ToString @AllArgsConstructor @NoArgsConstructor
public class Email {

    @Id
    private String id;
    private String to;
    private String subject;
    private String body;

}
