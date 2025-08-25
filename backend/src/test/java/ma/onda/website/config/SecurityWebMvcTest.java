package ma.onda.website.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * IMPORTANT:
 * - This is a @WebMvcTest (NOT @SpringBootTest).
 * - We import only SecurityConfig and the test-only ActuatorStubController.
 * - No DB/JPA/Actuator beans are started, so no MySQL connection attempts.
 */
@WebMvcTest(controllers = ActuatorStubController.class)
@Import(SecurityConfig.class)
class SecurityConfigWebMvcTest {

  @Autowired
  MockMvc mvc;

  @Test
  void actuatorHealth_isPermitted() throws Exception {
    mvc.perform(get("/actuator/health")).andExpect(status().isOk());
  }

  @Test
  void actuatorPrometheus_isPermitted() throws Exception {
    mvc.perform(get("/actuator/prometheus")).andExpect(status().isOk());
  }
}

