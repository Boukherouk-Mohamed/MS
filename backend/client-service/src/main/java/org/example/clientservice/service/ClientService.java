package org.example.clientservice.service;

import org.example.clientservice.model.Client;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ClientService {

    public Client getClientById(String id);
    public List<Client> getAllClients();
    public Client addClient(Client client);
    public Client updateClient(Client client,String id);

}
