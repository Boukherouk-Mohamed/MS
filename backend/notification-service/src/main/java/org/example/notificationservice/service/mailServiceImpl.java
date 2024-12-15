package org.example.notificationservice.service;

import jakarta.mail.internet.MimeMessage;
import org.example.notificationservice.FeignVehicule.VehiculeFeignClient;
import org.example.notificationservice.Repository.Repo;
import org.example.notificationservice.model.Email;
import org.example.notificationservice.model.Notification;
import org.example.notificationservice.model.StatusNotif;
import org.example.notificationservice.model.TypeNotification;
import org.example.notificationservice.model.client.Client;
import org.example.notificationservice.model.vehicule.Vehicule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class mailServiceImpl implements mailService {
    @Value("${spring.mail.username}")
    private String fromEmail;

    @Autowired
    private Repo repo;


    @Autowired
    private VehiculeFeignClient vehiculeFeignClient;



    private final JavaMailSender mailSender;

    @Autowired
    public mailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public String sendSimpleEmail(Email email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email.getTo());
        message.setSubject(email.getSubject());
        message.setText(email.getBody());
        message.setFrom("boukherouk.mohamed@gmail.com");  // Optional, specify sender's email
        mailSender.send(message);
        return "Mail sent";
    }

    @Override
    public String sendMail(String to, String[] cc, String subject, String body) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(fromEmail);
            mimeMessageHelper.setTo(to);
            mimeMessageHelper.setCc(cc);
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(body);

            mailSender.send(mimeMessage);

            // Create and save the notification
            Notification notification = new Notification();
            notification.setDateEnvoi(LocalDateTime.now());
            notification.setTypeNotification(TypeNotification.EMAIL); // or other type as appropriate
            notification.setStatusNotif(StatusNotif.ENVOYEE);

            // Fetch client data if necessary or set manually
            Client client = new Client(); // Populate with relevant client data if needed
            client.setEmail(to);
            notification.setClient(client);

            repo.save(notification);  // Save notification to the database

            return "Mail sent and notification saved";

        } catch (Exception e) {
            throw new RuntimeException("Failed to send mail and save notification", e);
        }
    }

    @Override
    public Notification saveNotification(Notification notification) {
        return repo.save(notification);
    }


    @Override
    public List<Notification> getNotifications() {
        return repo.findAll();
    }
}