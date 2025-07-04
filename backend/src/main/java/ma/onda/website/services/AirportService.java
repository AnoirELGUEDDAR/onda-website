package ma.onda.website.services;

import ma.onda.website.models.Airport;
import ma.onda.website.models.dto.AirportDto;
import ma.onda.website.repositories.AirportRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class AirportService {
    
    private final AirportRepository airportRepository;
    private final ModelMapper modelMapper;
    
    @Autowired
    public AirportService(AirportRepository airportRepository, ModelMapper modelMapper) {
        this.airportRepository = airportRepository;
        this.modelMapper = modelMapper;
    }
    
    public List<AirportDto> getAllAirports() {
        return airportRepository.findAll().stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }
    
    public Airport getAirportByCode(String code) {
        return airportRepository.findByCode(code)
            .orElseThrow(() -> new EntityNotFoundException("Airport not found with code: " + code));
    }
    
    public AirportDto getAirportDtoByCode(String code) {
        Airport airport = getAirportByCode(code);
        return convertToDto(airport);
    }
    
    private AirportDto convertToDto(Airport airport) {
        return new AirportDto(
            airport.getId(),
            airport.getCode(),
            airport.getName(),
            airport.getCity(),
            airport.getInternational(),
            airport.getDescriptionEn() // Default to English
        );
    }
    
    public AirportDto convertToDtoWithLocale(Airport airport, Locale locale) {
        String description;
        
        switch(locale.getLanguage()) {
            case "fr":
                description = airport.getDescriptionFr();
                break;
            case "ar":
                description = airport.getDescriptionAr();
                break;
            default:
                description = airport.getDescriptionEn();
        }
        
        return new AirportDto(
            airport.getId(),
            airport.getCode(),
            airport.getName(),
            airport.getCity(),
            airport.getInternational(),
            description
        );
    }
}
