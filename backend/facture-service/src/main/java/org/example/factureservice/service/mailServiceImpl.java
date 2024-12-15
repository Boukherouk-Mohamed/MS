package org.example.factureservice.service;

import jakarta.mail.internet.MimeMessage;
import org.example.factureservice.FeignVehicule.VehiculeFeignClient;
import org.example.factureservice.Repository.FactureRepo;
import org.example.factureservice.model.Client;
import org.example.factureservice.model.Facture;
import org.example.factureservice.model.vehicule.Vehicule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class mailServiceImpl implements mailService {
    @Value("${spring.mail.username}")
    private String fromEmail;
    private JavaMailSender javaMailSender;

    @Autowired
    private FactureRepo factureRepo;
    @Autowired
    private JavaMailSenderImpl mailSender;


    @Override
    public String sendMail(String to, String[] cc, String subject, String body) {
        try {
            // Create MimeMessage
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            // Set the email properties
            mimeMessageHelper.setFrom(fromEmail);
            mimeMessageHelper.setTo(to);
            mimeMessageHelper.setCc(cc); // CC can be null or empty if not needed
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(body);

            // Send the email
            javaMailSender.send(mimeMessage);
            return "Mail sent successfully";

        } catch (Exception e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }
    @Override
    public List<Facture> getFactures() {
        return factureRepo.findAll();
    }

    @Override
    public String sendFacture(Facture facture) {
        try {
            String body = "The amount of the invoice is : " + facture.getMontant() ;
            String subject = "Invoice Details " ;

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(fromEmail);
            mimeMessageHelper.setTo(facture.getReceiver());
            mimeMessageHelper.setCc(facture.getReceiver());
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(body);

            mailSender.send(mimeMessage);

            //save the facture
            factureRepo.save(facture);  // Save notification to the database

            return "Mail sent and invoice saved";

        } catch (Exception e) {
            throw new RuntimeException("Failed to send mail and save notification", e);
        }
    }




}