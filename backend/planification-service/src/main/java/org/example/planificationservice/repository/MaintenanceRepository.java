package org.example.planificationservice.repository;

import org.example.planificationservice.model.TravailMaintenance;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MaintenanceRepository extends MongoRepository<TravailMaintenance,String> {
}
