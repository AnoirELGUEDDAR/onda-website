package ma.onda.website.repositories;

import ma.onda.website.models.Airport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AirportRepository extends JpaRepository<Airport, Long> {
    Optional<Airport> findByCode(String code);
    List<Airport> findByCity(String city);
    List<Airport> findByInternational(boolean international);
    List<Airport> findByStatus(Airport.AirportStatus status);
}
