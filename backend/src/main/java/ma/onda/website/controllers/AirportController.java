package ma.onda.website.controllers;

import ma.onda.website.models.Airport;
import ma.onda.website.services.AirportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/airports")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class AirportController {
    
    private final AirportService airportService;
    
    @Autowired
    public AirportController(AirportService airportService) {
        this.airportService = airportService;
    }
    
    @GetMapping
    public ResponseEntity<List<Airport>> getAllAirports() {
        List<Airport> airports = airportService.getAllAirports();
        return new ResponseEntity<>(airports, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Airport> getAirportById(@PathVariable Long id) {
        return airportService.getAirportById(id)
                .map(airport -> new ResponseEntity<>(airport, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @GetMapping("/code/{code}")
    public ResponseEntity<Airport> getAirportByCode(@PathVariable String code) {
        return airportService.getAirportByCode(code)
                .map(airport -> new ResponseEntity<>(airport, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @GetMapping("/city/{city}")
    public ResponseEntity<List<Airport>> getAirportsByCity(@PathVariable String city) {
        List<Airport> airports = airportService.getAirportsByCity(city);
        return new ResponseEntity<>(airports, HttpStatus.OK);
    }
    
    @GetMapping("/international")
    public ResponseEntity<List<Airport>> getInternationalAirports() {
        List<Airport> airports = airportService.getInternationalAirports();
        return new ResponseEntity<>(airports, HttpStatus.OK);
    }
    
    @GetMapping("/domestic")
    public ResponseEntity<List<Airport>> getDomesticAirports() {
        List<Airport> airports = airportService.getDomesticAirports();
        return new ResponseEntity<>(airports, HttpStatus.OK);
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<Airport>> getActiveAirports() {
        List<Airport> airports = airportService.getActiveAirports();
        return new ResponseEntity<>(airports, HttpStatus.OK);
    }
    
    @PostMapping
    public ResponseEntity<Airport> createAirport(@Valid @RequestBody Airport airport) {
        Airport createdAirport = airportService.createAirport(airport);
        return new ResponseEntity<>(createdAirport, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Airport> updateAirport(@PathVariable Long id, @Valid @RequestBody Airport airport) {
        return airportService.getAirportById(id)
                .map(existingAirport -> {
                    airport.setId(id);
                    return new ResponseEntity<>(airportService.updateAirport(airport), HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAirport(@PathVariable Long id) {
        return airportService.getAirportById(id)
                .map(airport -> {
                    airportService.deleteAirport(id);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
