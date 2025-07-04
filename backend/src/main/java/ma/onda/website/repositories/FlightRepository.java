package ma.onda.website.repositories;

import ma.onda.website.models.Airport;
import ma.onda.website.models.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {
    List<Flight> findByDepartureAirportAndArrivalAirportAndDepartureTimeBetween(
        Airport departureAirport,
        Airport arrivalAirport,
        LocalDateTime startDate,
        LocalDateTime endDate
    );
}
