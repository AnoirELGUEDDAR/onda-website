package ma.onda.website.controllers;

import ma.onda.website.models.dto.ContactForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/contact")
    public String sendContactEmail(@RequestBody ContactForm form) {
    System.out.println("Contact endpoint hit!");

        if (form.getFirstName() == null || form.getLastName() == null ||
            form.getEmail() == null || form.getMessage() == null) {
            return "Missing required fields";
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("anoirkazakh4@gmail.com"); // MUST match your Gmail SMTP user
        message.setTo("anoirkazakh4@gmail.com");   // Your receiving address
        message.setReplyTo(form.getEmail());       // User's email for replies
        message.setSubject("New Contact Form Submission");
        message.setText(
                "Name: " + form.getFirstName() + " " + form.getLastName() + "\n" +
                "Email: " + form.getEmail() + "\n\n" +
                "Message:\n" + form.getMessage()
        );

        try {
            mailSender.send(message);
            return "Message sent successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "There was an error sending your message: " + e.getMessage();
        }
    }
}
