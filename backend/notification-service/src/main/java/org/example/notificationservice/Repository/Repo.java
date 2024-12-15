package org.example.notificationservice.Repository;

import org.example.notificationservice.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface Repo extends MongoRepository<Notification,String> {
}
