package org.example.factureservice.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class Facture {

    @Id
    private String id;
    private String receiver;
    private int numero;
    private int montant;

}
