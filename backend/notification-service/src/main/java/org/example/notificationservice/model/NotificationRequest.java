package org.example.notificationservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.notificationservice.model.client.Client;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationRequest {
    private String[] cc;
    private String subject;
    private String body;
    private TypeNotification typeNotification;
    private Client client;
}
