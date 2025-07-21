package ma.onda.website.controllers;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import ma.onda.website.models.dto.ContactForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import jakarta.mail.internet.MimeMessage;
import java.io.File;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/contact")
    public String sendContactEmail(@RequestBody ContactForm form) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy HH:mm");
    String formattedDate = ZonedDateTime.now().format(formatter);
        System.out.println("Contact endpoint hit!");

        if (form.getFirstName() == null || form.getLastName() == null ||
            form.getEmail() == null || form.getMessage() == null) {
            return "Missing required fields";
        }

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");

            // Improved HTML with gradient and accent color
            String htmlBody = String.format(
                """
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Contact Form Submission</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    body {
      background: linear-gradient(135deg, #f5f7fa 0%%, #e4edf5 100%%);
      font-family: 'Poppins', sans-serif;
      padding: 0;
      margin: 0;
    }
    .container {
      max-width: 740px;
      width: 100%%;
      margin: 0 auto;
      background: white;
      border-radius: 18px;
      box-shadow: 0 12px 30px rgba(0, 85, 179, 0.15);
      overflow: hidden;
      position: relative;
    }
    .header-bg {
      background: linear-gradient(90deg, #0056b3 0%%, #0077e6 100%%);
      padding: 30px 20px 16px;
      text-align: center;
    }
    .logo-container {
      margin-bottom: 16px;
    }
    .logo-placeholder img {
      height: 52px;
      display: block;
      margin: auto;
    }
    .header-title {
      font-size: 2rem;
      font-weight: 700;
      color: white;
      margin-bottom: 12px;
      letter-spacing: -0.5px;
    }
    .header-subtitle {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.85);
      font-weight: 300;
      max-width: 98%%;
      margin: 0 auto 4px auto;
      line-height: 1.5;
    }
    .divider {
      border: none;
      height: 4px;
      background: linear-gradient(90deg, #e06c00 0%%, #ff8c00 100%%);
      margin: 0;
    }
    .content {
      padding: 28px 14px 24px 14px;
    }
    .info-card {
      background: #f9fbfd;
      border-radius: 12px;
      padding: 18px;
      margin-bottom: 18px;
      box-shadow: 0 4px 12px rgba(0, 85, 179, 0.05);
      border: 1px solid #e9f0f7;
    }
    .info-row {
      display: flex;
      flex-direction: column;
      margin-bottom: 14px;
      align-items: flex-start;
    }
    .label {
      font-weight: 600;
      color: #0056b3;
      font-size: 1rem;
      margin-bottom: 4px;
      display: block;
    }
    .value, .email-value {
      color: #2d3748;
      font-size: 1.01rem;
      font-weight: 500;
      padding-left: 0;
      word-break: break-word;
    }
    .email-value {
      color: #0077e6;
      font-size: 1.01rem;
    }
    .message-section {
      margin-top: 18px;
    }
    .section-title {
      color: #0056b3;
      font-size: 1.08rem;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .message-content {
      background: #f9fbfd;
      padding: 18px;
      border-left: 4px solid #e06c00;
      border-radius: 8px;
      font-size: 1rem;
      color: #2d3748;
      line-height: 1.6;
      box-shadow: 0 4px 12px rgba(0, 85, 179, 0.05);
      border: 1px solid #e9f0f7;
      word-break: break-word;
    }
    .footer {
      background: #f5f9ff;
      padding: 18px 12px;
      font-size: 13px;
      color: #5a6d8a;
      text-align: center;
      border-top: 1px solid #e1ebf7;
    }
    .footer p {
      margin-bottom: 6px;
      line-height: 1.5;
    }
    .copyright {
      color: #7a8ca5;
      font-size: 12px;
      margin-top: 8px;
    }

    /* Mobile Responsive */
    @media (max-width: 600px) {
      .container {
        max-width: 98%% !important;
        border-radius: 10px;
        margin: 10px auto;
      }
      .header-bg {
        padding: 18px 6px 10px;
      }
      .header-title {
        font-size: 1.35rem;
      }
      .content {
        padding: 14px 5px 14px 5px;
      }
      .info-card {
        padding: 12px;
        margin-bottom: 8px;
      }
      .message-content {
        padding: 10px;
        font-size: .98rem;
      }
      .footer {
        padding: 12px 6px;
        font-size: 12px;
      }
    }
  </style>
</head>
<body>
<div class="container">
  <div class="header-bg">
    <div class="logo-container">
      <div class="logo-placeholder">
        <img src="cid:logo.png" alt="Logo">
      </div>
    </div>
    <h1 class="header-title">NOUVEAU MESSAGE DE CONTACT</h1>
    <p class="header-subtitle">Vous avez reçu un nouveau message via le formulaire de contact de votre site web</p>
  </div>
  <div class="divider"></div>
  <div class="content">
    <div class="info-card">
      <div class="info-row">
        <span class="label">Nom :</span>
        <span class="value">%s %s</span>
      </div>
      <div class="info-row">
        <span class="label">Email :</span>
        <span class="email-value">%s</span>
      </div>
      <div class="info-row">
        <span class="label">Date :</span>
        <span class="value">%s</span>
      </div>
    </div>
    <div class="message-section">
      <div class="section-title">Message :</div>
      <div class="message-content">%s</div>
    </div>
  </div>
  <div class="footer">
    <p>Ce message a été envoyé automatiquement depuis le site web <strong>ONDA-Website</strong>.</p>
    <p>Merci de ne pas répondre directement à cet e-mail.</p>
    <p class="copyright">© 2025 ONDA. Tous droits réservés.</p>
  </div>
</div>
</body>
</html>
                """,
                escapeHtml(form.getFirstName()),
                escapeHtml(form.getLastName()),
                escapeHtml(form.getEmail()),
formattedDate,
                escapeHtml(form.getMessage())
            );

            helper.setFrom("anoirkazakh4@gmail.com"); // MUST match your Gmail SMTP user
            helper.setTo("anoirkazakh4@gmail.com");   // Your receiving address
            helper.setReplyTo(form.getEmail());
            helper.setSubject("New Contact Form Submission");
            helper.setText(htmlBody, true); // true for HTML

            // Attach logo (image must be in the same directory as controller)
            File logoFile = new File("src/main/java/ma/onda/website/controllers/logo.png");
            if (logoFile.exists()) {
                helper.addInline("logo.png", logoFile);
            } else {
                System.out.println("Logo image not found at: " + logoFile.getAbsolutePath());
            }

            mailSender.send(mimeMessage);
            return "Message sent successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "There was an error sending your message: " + e.getMessage();
        }
    }

    // Basic HTML escaping to avoid broken HTML/email
    private String escapeHtml(String input) {
        if (input == null) return "";
        return input.replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace("\"", "&quot;")
            .replace("'", "&#39;");
    }
}
