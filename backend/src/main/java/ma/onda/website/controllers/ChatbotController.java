package ma.onda.website.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@RestController
@RequestMapping("/api/chat")
public class ChatbotController {

    // Inject the Groq API key from application.properties
    @Value("${groq.api.key}")
    private String groqApiKey;

    @PostMapping
    public ResponseEntity<Map<String, Object>> chat(@RequestBody Map<String, String> request) {
        try {
            if (request == null || !request.containsKey("message")) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Message is required"));
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + groqApiKey);

            String apiUrl = "https://api.groq.com/openai/v1/chat/completions";

            Map<String, Object> body = new HashMap<>();
            body.put("model", "llama3-70b-8192");

            List<Map<String, String>> messages = new ArrayList<>();
            // Add system prompt to restrict answers to airport topics
            messages.add(Map.of("role", "system", "content",
                "You are an expert assistant who only answers questions about airports. " +
                "If asked about anything else, politely reply that you can only answer questions related to airports."));
            messages.add(Map.of("role", "user", "content", request.get("message")));
            body.put("messages", messages);

            RestTemplate restTemplate = new RestTemplate();
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            Map<String, Object> response = restTemplate.postForObject(apiUrl, entity, Map.class);

            List choices = (List) response.get("choices");
            if (choices != null && !choices.isEmpty()) {
                Map choice = (Map) choices.get(0);
                Map message = (Map) choice.get("message");
                String reply = (String) message.get("content");
                return ResponseEntity.ok(Map.of("reply", reply));
            }

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Invalid response from AI service"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "error", "Chatbot service unavailable",
                            "details", e.getMessage()
                    ));
        }
    }
}
