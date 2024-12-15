package org.example.notificationservice.model;

import lombok.*;
import org.example.notificationservice.model.client.Client;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Objects;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor @ToString
@Document(collection = "notifications")
public class Notification {

    @Id
    private String id;
    private LocalDateTime dateEnvoi;
    private TypeNotification typeNotification;
    private Client client;
    private StatusNotif statusNotif;




    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Notification that = (Notification) o;
        return Objects.equals(client, that.client) &&
                typeNotification == that.typeNotification &&
                statusNotif == that.statusNotif;
    }

    @Override
    public int hashCode() {
        return Objects.hash(client, typeNotification, statusNotif);
    }

}
