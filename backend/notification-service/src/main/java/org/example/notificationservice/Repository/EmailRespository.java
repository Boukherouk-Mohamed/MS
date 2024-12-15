package org.example.notificationservice.Repository;

import org.example.notificationservice.model.Email;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmailRespository extends MongoRepository<Email,String> {
}
