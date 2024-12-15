package org.example.factureservice.model.SendEmail;

import lombok.Data;
import org.example.factureservice.model.Email;

@Data
public class SendEmailRequest {
    private Email email;
}
