package org.example.notificationservice.service;

import org.example.notificationservice.model.Email;
import org.example.notificationservice.model.Notification;
import org.example.notificationservice.model.vehicule.Vehicule;

import java.util.List;

public interface mailService {
    String sendMail(String to,String[] cc, String subject, String body);

    String sendSimpleEmail(Email email);
    Notification saveNotification(Notification notification);
    List<Notification> getNotifications();

}
