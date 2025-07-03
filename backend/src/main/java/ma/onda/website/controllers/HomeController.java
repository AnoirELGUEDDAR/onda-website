package ma.onda.website.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, String> home() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Welcome to ONDA Website API");
        response.put("status", "UP");
        response.put("apiDocs", "/api");
        return response;
    }
    
    @GetMapping("/api")
    public Map<String, String> apiInfo() {
        Map<String, String> apiEndpoints = new HashMap<>();
        apiEndpoints.put("airports", "/api/airports");
        apiEndpoints.put("flights", "/api/flights");
        apiEndpoints.put("airportById", "/api/airports/{id}");
        apiEndpoints.put("airportByCode", "/api/airports/code/{code}");
        apiEndpoints.put("flightByNumber", "/api/flights/number/{flightNumber}");
        apiEndpoints.put("departures", "/api/flights/departures?airportId={id}&date={date}");
        apiEndpoints.put("arrivals", "/api/flights/arrivals?airportId={id}&date={date}");
        return apiEndpoints;
    }
}
