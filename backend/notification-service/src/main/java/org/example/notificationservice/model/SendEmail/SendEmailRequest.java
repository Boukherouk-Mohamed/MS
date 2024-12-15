package org.example.notificationservice.model.SendEmail;

import lombok.Data;
import org.example.notificationservice.model.Email;
import org.example.notificationservice.model.planification.TravailMaintenance;

@Data
public class SendEmailRequest {
    private Email email;
    private TravailMaintenance travailMaintenance;
}
