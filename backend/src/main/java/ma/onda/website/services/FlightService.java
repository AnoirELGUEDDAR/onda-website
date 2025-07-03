package ma.onda.website.services;

import ma.onda.website.models.Airport;
import ma.onda.website.models.Flight;
import ma.onda.website.repositories.AirportRepository;
import ma.onda.website.repositories.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class FlightService {
    
    private final FlightRepository flightRepository;
    private final AirportRepository airportRepository;
    
    @Autowired
    public FlightService(FlightRepository flightRepository, AirportRepository airportRepository) {
        this.flightRepository = flightRepository;
        this.airportRepository = airportRepository;
    }
    
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }
    
    public Optional<Flight> getFlightById(Long id) {
        return flightRepository.findById(id);
    }
    
    public Optional<Flight> getFlightByFlightNumber(String flightNumber) {
        return flightRepository.findByFlightNumber(flightNumber);
    }
    
    public List<Flight> getDeparturesByAirport(Long airportId, LocalDate date) {
        Optional<Airport> airport = airportRepository.findById(airportId);
        if (airport.isPresent()) {
            LocalDateTime startOfDay = date.atStartOfDay();
            LocalDateTime endOfDay = date.atTime(LocalTime.MAX);
            return flightRepository.findDeparturesByAirportAndTimeRange(airport.get(), startOfDay, endOfDay);
        }
        return List.of();
    }
    
    public List<Flight> getArrivalsByAirport(Long airportId, LocalDate date) {
        Optional<Airport> airport = airportRepository.findById(airportId);
        if (airport.isPresent()) {
            LocalDateTime startOfDay = date.atStartOfDay();
            LocalDateTime endOfDay = date.atTime(LocalTime.MAX);
            return flightRepository.findArrivalsByAirportAndTimeRange(airport.get(), startOfDay, endOfDay);
        }
        return List.of();
    }
    
    public List<Flight> getFlightsByStatus(Flight.FlightStatus status) {
        return flightRepository.findByStatus(status);
    }
    
    public List<Flight> getFlightsByAirline(String airline) {
        return flightRepository.findByAirlineContainingIgnoreCase(airline);
    }
    
    public Flight createFlight(Flight flight) {
        return flightRepository.save(flight);
    }
    
    public Flight updateFlight(Flight flight) {
        return flightRepository.save(flight);
    }
    
    public void deleteFlight(Long id) {
        flightRepository.deleteById(id);
    }
}
