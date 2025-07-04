package ma.onda.website.controllers;

import ma.onda.website.models.dto.AirportDto;
import ma.onda.website.services.AirportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/airports")
@CrossOrigin(origins = "*")
public class AirportController {
    
    private final AirportService airportService;
    
    @Autowired
    public AirportController(AirportService airportService) {
        this.airportService = airportService;
    }
    
    @GetMapping
    public ResponseEntity<List<AirportDto>> getAllAirports() {
        return ResponseEntity.ok(airportService.getAllAirports());
    }
    
    @GetMapping("/{code}")
    public ResponseEntity<AirportDto> getAirportByCode(@PathVariable String code) {
        try {
            return ResponseEntity.ok(airportService.getAirportDtoByCode(code));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
