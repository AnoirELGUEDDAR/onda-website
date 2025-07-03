package ma.onda.website.repositories;

import ma.onda.website.models.Airport;
import ma.onda.website.models.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {
    Optional<Flight> findByFlightNumber(String flightNumber);
    
    List<Flight> findByOriginAirport(Airport airport);
    
    List<Flight> findByDestinationAirport(Airport airport);
    
    List<Flight> findByStatus(Flight.FlightStatus status);
    
    @Query("SELECT f FROM Flight f WHERE f.originAirport = ?1 AND f.scheduledDepartureTime BETWEEN ?2 AND ?3")
    List<Flight> findDeparturesByAirportAndTimeRange(Airport airport, LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT f FROM Flight f WHERE f.destinationAirport = ?1 AND f.scheduledArrivalTime BETWEEN ?2 AND ?3")
    List<Flight> findArrivalsByAirportAndTimeRange(Airport airport, LocalDateTime start, LocalDateTime end);
    
    List<Flight> findByAirlineContainingIgnoreCase(String airline);
}
