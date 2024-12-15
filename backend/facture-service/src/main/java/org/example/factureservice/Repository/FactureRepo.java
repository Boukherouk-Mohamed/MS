package org.example.factureservice.Repository;

import org.example.factureservice.model.Facture;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FactureRepo extends MongoRepository<Facture, String> {
}
