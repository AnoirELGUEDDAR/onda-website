package ma.onda.website.controllers;

import ma.onda.website.models.dto.FlightDto;
import ma.onda.website.models.dto.FlightSearchRequestDto;
import ma.onda.website.services.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "*")
public class FlightController {
    
    private final FlightService flightService;
    
    @Autowired
    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<FlightDto>> searchFlights(
        @RequestParam String departure,
        @RequestParam String arrival,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        try {
            List<FlightDto> flights = flightService.searchFlights(departure, arrival, date);
            return ResponseEntity.ok(flights);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/search")
    public ResponseEntity<List<FlightDto>> searchFlightsPost(@RequestBody FlightSearchRequestDto request) {
        try {
            List<FlightDto> flights = flightService.searchFlights(
                request.getDepartureAirportCode(),
                request.getArrivalAirportCode(),
                request.getDate()
            );
            return ResponseEntity.ok(flights);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
