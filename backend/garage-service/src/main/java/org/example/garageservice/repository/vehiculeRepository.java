package org.example.garageservice.repository;

import org.example.garageservice.model.Vehicule;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface vehiculeRepository extends MongoRepository<Vehicule,String> {

}
