package ma.onda.website.controllers;

import ma.onda.website.models.Flight;
import ma.onda.website.services.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class FlightController {
    
    private final FlightService flightService;
    
    @Autowired
    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }
    
    @GetMapping
    public ResponseEntity<List<Flight>> getAllFlights() {
        List<Flight> flights = flightService.getAllFlights();
        return new ResponseEntity<>(flights, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Flight> getFlightById(@PathVariable Long id) {
        return flightService.getFlightById(id)
                .map(flight -> new ResponseEntity<>(flight, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @GetMapping("/number/{flightNumber}")
    public ResponseEntity<Flight> getFlightByNumber(@PathVariable String flightNumber) {
        return flightService.getFlightByFlightNumber(flightNumber)
                .map(flight -> new ResponseEntity<>(flight, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @GetMapping("/departures")
    public ResponseEntity<List<Flight>> getDepartures(
            @RequestParam Long airportId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<Flight> flights = flightService.getDeparturesByAirport(airportId, date);
        return new ResponseEntity<>(flights, HttpStatus.OK);
    }
    
    @GetMapping("/arrivals")
    public ResponseEntity<List<Flight>> getArrivals(
            @RequestParam Long airportId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<Flight> flights = flightService.getArrivalsByAirport(airportId, date);
        return new ResponseEntity<>(flights, HttpStatus.OK);
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Flight>> getFlightsByStatus(@PathVariable Flight.FlightStatus status) {
        List<Flight> flights = flightService.getFlightsByStatus(status);
        return new ResponseEntity<>(flights, HttpStatus.OK);
    }
    
    @GetMapping("/airline")
    public ResponseEntity<List<Flight>> getFlightsByAirline(@RequestParam String airline) {
        List<Flight> flights = flightService.getFlightsByAirline(airline);
        return new ResponseEntity<>(flights, HttpStatus.OK);
    }
    
    @PostMapping
    public ResponseEntity<Flight> createFlight(@Valid @RequestBody Flight flight) {
        Flight createdFlight = flightService.createFlight(flight);
        return new ResponseEntity<>(createdFlight, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Flight> updateFlight(@PathVariable Long id, @Valid @RequestBody Flight flight) {
        return flightService.getFlightById(id)
                .map(existingFlight -> {
                    flight.setId(id);
                    return new ResponseEntity<>(flightService.updateFlight(flight), HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFlight(@PathVariable Long id) {
        return flightService.getFlightById(id)
                .map(flight -> {
                    flightService.deleteFlight(id);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
