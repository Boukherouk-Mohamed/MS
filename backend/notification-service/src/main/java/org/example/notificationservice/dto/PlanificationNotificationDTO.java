package org.example.notificationservice.dto;


import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PlanificationNotificationDTO {
    private String id;
    private String date;
    private String email;
    private String description;
    private String clientName;
    private String planificationStatus;
    private String notificationStatus;
    private String actions;

}
