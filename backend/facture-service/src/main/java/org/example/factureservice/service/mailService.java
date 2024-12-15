package org.example.factureservice.service;

import org.example.factureservice.model.Client;
import org.example.factureservice.model.Facture;
import org.example.factureservice.model.vehicule.Vehicule;

import java.util.List;

public interface mailService {
    String sendMail(String to,String[] cc, String subject, String body);
    List<Facture> getFactures();
    String sendFacture(Facture facture);



    }
