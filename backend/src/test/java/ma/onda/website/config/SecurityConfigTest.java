package ma.onda.website.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class SecurityConfigTest {

  @Autowired
  MockMvc mvc;

  @Test
  void actuatorHealth_isPublic() throws Exception {
    mvc.perform(get("/actuator/health")).andExpect(status().isOk());
  }

  @Test
  void actuatorPrometheus_isPublic() throws Exception {
    mvc.perform(get("/actuator/prometheus")).andExpect(status().isOk());
  }

  @Test
  void apiIsPublic_example() throws Exception {
    // Adjust to any existing API path in your app
    mvc.perform(get("/api")).andExpect(status().isOk()); // or is4xx if /api is not mapped
  }
}
