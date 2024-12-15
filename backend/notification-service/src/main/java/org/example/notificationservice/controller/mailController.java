package org.example.notificationservice.controller;

import org.example.notificationservice.FeignVehicule.PlanificationFeignClient;
import org.example.notificationservice.Repository.EmailRespository;
import org.example.notificationservice.Repository.Repo;
import org.example.notificationservice.dto.PlanificationNotificationDTO;
import org.example.notificationservice.model.*;
import org.example.notificationservice.model.SendEmail.SendEmailRequest;
import org.example.notificationservice.model.client.Client;
import org.example.notificationservice.model.planification.TravailMaintenance;
import org.example.notificationservice.model.planification.TravailStatus;
import org.example.notificationservice.service.mailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/notification-service")
@CrossOrigin("*")
public class mailController {
    private mailService emailService;

    @Autowired
    private PlanificationFeignClient planificationFeignClient;

    @Autowired
    private Repo notificationRepository;
    @Autowired
    private EmailRespository emailRespository;


    public mailController(mailService emailService) {
        this.emailService = emailService;
    }



    @CrossOrigin(origins = "*")
    @PostMapping("/send-email")
    public String sendEmail(@RequestBody SendEmailRequest request) {
        Email email = request.getEmail();
        TravailMaintenance travailMaintenance = request.getTravailMaintenance();

        // Send the email
        emailService.sendSimpleEmail(email);

        // Save the email details
        emailRespository.save(email);

        // Create and save a notification
        Notification notification = new Notification();
        notification.setId(travailMaintenance.getId());
        notification.setDateEnvoi(LocalDateTime.now());
        notification.setTypeNotification(TypeNotification.EMAIL);
        notification.setStatusNotif(StatusNotif.ENVOYEE);

        // Set client details based on the email
        Client client = new Client();
        client.setEmail(email.getTo());
        notification.setClient(client);

        // Save the notification to the database
        notificationRepository.save(notification);

        return "Email sent and notification saved successfully!";
    }




    @GetMapping("/notifications")
    public List<PlanificationNotificationDTO> getAllNotifications() {
        // Fetch all notifications and jobs
        List<Notification> notifications = emailService.getNotifications();
        List<TravailMaintenance> jobs = planificationFeignClient.getAllJobs();
        List<PlanificationNotificationDTO> result = new ArrayList<>();

        // Collect IDs of jobs that have notifications sent
        Set<String> notifiedJobIds = notifications.stream()
                .filter(notification -> StatusNotif.ENVOYEE.equals(notification.getStatusNotif()))
                .map(Notification::getId)
                .collect(Collectors.toSet());

        // Process IN_PROGRESS jobs that are not yet notified
        for (TravailMaintenance job : jobs) {
            if (TravailStatus.IN_PROGRESS.equals(job.getStatus()) && !notifiedJobIds.contains(job.getId())) {
                PlanificationNotificationDTO dto = new PlanificationNotificationDTO();
                dto.setDate("--------");
                dto.setId(job.getId());
                dto.setEmail(job.getClient().getEmail());
                dto.setDescription(job.getDescription());
                dto.setClientName(job.getClient().getLastName() + " " + job.getClient().getFirstName());
                dto.setPlanificationStatus("IN_PROGRESS");
                dto.setNotificationStatus("Not Sent");
                result.add(dto);
            }
        }

        // Process sent notifications
        for (Notification notification : notifications) {
            if (StatusNotif.ENVOYEE.equals(notification.getStatusNotif())) {
                PlanificationNotificationDTO dto = new PlanificationNotificationDTO();
                dto.setDate(notification.getDateEnvoi().toString());
                dto.setId(notification.getId());
                dto.setEmail(notification.getClient().getEmail());
                dto.setDescription(notification.getTypeNotification().toString()); // Adjust based on type
                dto.setClientName(notification.getClient().getLastName() + " " + notification.getClient().getFirstName());
                dto.setPlanificationStatus("COMPLETED"); // or relevant status
                dto.setNotificationStatus("Sent");
                result.add(dto);
            }
        }

        return result;
    }

}
