package org.example.clientservice.service;

import org.example.clientservice.model.Client;
import org.example.clientservice.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientServiceImpl implements ClientService{

    @Autowired
    private ClientRepository clientRepository;
    @Override
    public Client getClientById(String id) {
        return clientRepository.findById(id).get();
    }

    @Override
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    @Override
    public Client addClient(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public Client updateClient(Client client, String id) {
        // Récupérer le client ou lancer une exception s'il n'existe pas
        Client foundClient = clientRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Client with ID: " + id + " not found"));

        foundClient.setAddress(client.getAddress());
        foundClient.setCIN(client.getCIN());
        foundClient.setEmail(client.getEmail());
        foundClient.setLastName(client.getLastName());
        foundClient.setFirstName(client.getFirstName());
        foundClient.setPhoneNumber(client.getPhoneNumber());

        // Sauvegarder les modifications
        clientRepository.save(foundClient);

        return foundClient;
    }

}