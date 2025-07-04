package ma.onda.website.repositories;

import ma.onda.website.models.Airport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AirportRepository extends JpaRepository<Airport, Long> {
    List<Airport> findAll();
    Optional<Airport> findByCode(String code);
}
