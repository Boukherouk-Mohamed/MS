package org.example.clientservice.controller;

import org.example.clientservice.model.Client;
import org.example.clientservice.service.ClientServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/client-service")
public class ClientController {

    @Autowired
    ClientServiceImpl clientService;

    @GetMapping("/clients")
    public List<Client> getAllClients(){
      return clientService.getAllClients();
    };

    @GetMapping("/clients/{id}")
    public Client getClientById(@PathVariable String id){
        return clientService.getClientById(id);
    };

    @PostMapping("/clients/update/{id}")
    public Client updateClient(@RequestBody Client client, @PathVariable String id){
        return clientService.updateClient(client,id);
    };


    @PostMapping("/clients/add")
    public Client updateClient(@RequestBody Client client){
        return clientService.addClient(client);
    };


}
