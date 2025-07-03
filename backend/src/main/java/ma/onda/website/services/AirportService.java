package ma.onda.website.services;

import ma.onda.website.models.Airport;
import ma.onda.website.repositories.AirportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AirportService {
    
    private final AirportRepository airportRepository;
    
    @Autowired
    public AirportService(AirportRepository airportRepository) {
        this.airportRepository = airportRepository;
    }
    
    public List<Airport> getAllAirports() {
        return airportRepository.findAll();
    }
    
    public Optional<Airport> getAirportById(Long id) {
        return airportRepository.findById(id);
    }
    
    public Optional<Airport> getAirportByCode(String code) {
        return airportRepository.findByCode(code);
    }
    
    public List<Airport> getAirportsByCity(String city) {
        return airportRepository.findByCity(city);
    }
    
    public List<Airport> getInternationalAirports() {
        return airportRepository.findByInternational(true);
    }
    
    public List<Airport> getDomesticAirports() {
        return airportRepository.findByInternational(false);
    }
    
    public List<Airport> getActiveAirports() {
        return airportRepository.findByStatus(Airport.AirportStatus.ACTIVE);
    }
    
    public Airport createAirport(Airport airport) {
        return airportRepository.save(airport);
    }
    
    public Airport updateAirport(Airport airport) {
        return airportRepository.save(airport);
    }
    
    public void deleteAirport(Long id) {
        airportRepository.deleteById(id);
    }
}
