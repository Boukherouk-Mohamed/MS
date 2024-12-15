package org.example.factureservice.controller;

import org.example.factureservice.FeignVehicule.VehiculeFeignClient;
import org.example.factureservice.model.Client;
import org.example.factureservice.model.Facture;
import org.example.factureservice.model.SendEmail.SendEmailRequest;
import org.example.factureservice.model.vehicule.Vehicule;
import org.example.factureservice.service.mailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/mail")
@CrossOrigin("*")
public class mailController {
    private mailService emailService;

    @Autowired
    private VehiculeFeignClient vehiculeFeignClient;




    public mailController(mailService emailService) {
        this.emailService = emailService;
    }



    @PostMapping("/send-facture")
    public String sendFacture( @RequestBody Facture facture) {
        return emailService.sendFacture(facture);
    }

    @PostMapping("/send")
    public String sendMail( String to, String[] cc, String subject, String body) {
        return emailService.sendMail( to, cc, subject, body);
    }

    @GetMapping("/factures")
    public List<Facture> getFactures(){
        return emailService.getFactures();
    }



    @GetMapping("/clients")
    public List<Client> getClients(){
        List<Vehicule> vehicules = vehiculeFeignClient.getAllVehicules();
        // Extract clients from the list of vehicles and remove duplicates
        return vehicules.stream()
                .map(Vehicule::getClient) // Extract the client from each vehicle
                .distinct() // Remove duplicate clients based on equals() and hashCode()
                .collect(Collectors.toList());
    }

}
