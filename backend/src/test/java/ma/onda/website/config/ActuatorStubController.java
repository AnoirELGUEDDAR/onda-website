package ma.onda.website.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/** Test-only stub so we can assert SecurityConfig permits /actuator/** */
@RestController
public class ActuatorStubController {

  @GetMapping("/actuator/health")
  public ResponseEntity<Void> health() {
    return ResponseEntity.ok().build();
  }

  @GetMapping("/actuator/prometheus")
  public ResponseEntity<String> prometheus() {
    return ResponseEntity.ok("# test metrics");
  }
}
