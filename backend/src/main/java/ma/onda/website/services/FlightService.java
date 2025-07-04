package ma.onda.website.services;

import ma.onda.website.models.Airport;
import ma.onda.website.models.Flight;
import ma.onda.website.models.dto.AirportDto;
import ma.onda.website.models.dto.FlightDto;
import ma.onda.website.repositories.AirportRepository;
import ma.onda.website.repositories.FlightRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlightService {
    
    private final FlightRepository flightRepository;
    private final AirportRepository airportRepository;
    private final ModelMapper modelMapper;
    
    @Autowired
    public FlightService(
        FlightRepository flightRepository, 
        AirportRepository airportRepository,
        ModelMapper modelMapper
    ) {
        this.flightRepository = flightRepository;
        this.airportRepository = airportRepository;
        this.modelMapper = modelMapper;
    }
    
    public List<FlightDto> searchFlights(String departureCode, String arrivalCode, LocalDate date) {
        Airport departureAirport = airportRepository.findByCode(departureCode)
            .orElseThrow(() -> new EntityNotFoundException("Departure airport not found: " + departureCode));
        
        Airport arrivalAirport = airportRepository.findByCode(arrivalCode)
            .orElseThrow(() -> new EntityNotFoundException("Arrival airport not found: " + arrivalCode));
        
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);
        
        List<Flight> flights = flightRepository.findByDepartureAirportAndArrivalAirportAndDepartureTimeBetween(
            departureAirport, arrivalAirport, startOfDay, endOfDay);
        
        return flights.stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }
    
    private FlightDto convertToDto(Flight flight) {
        FlightDto dto = new FlightDto();
        dto.setId(flight.getId());
        dto.setFlightNumber(flight.getFlightNumber());
        dto.setAirlineName(flight.getAirline().getName());
        dto.setAirlineCode(flight.getAirline().getCode());
        dto.setAirlineLogoUrl(flight.getAirline().getLogoUrl());
        
        AirportDto departureAirportDto = new AirportDto(
            flight.getDepartureAirport().getId(),
            flight.getDepartureAirport().getCode(),
            flight.getDepartureAirport().getName(),
            flight.getDepartureAirport().getCity(),
            flight.getDepartureAirport().getInternational(),
            flight.getDepartureAirport().getDescriptionEn()
        );
        dto.setDepartureAirport(departureAirportDto);
        
        AirportDto arrivalAirportDto = new AirportDto(
            flight.getArrivalAirport().getId(),
            flight.getArrivalAirport().getCode(),
            flight.getArrivalAirport().getName(),
            flight.getArrivalAirport().getCity(),
            flight.getArrivalAirport().getInternational(),
            flight.getArrivalAirport().getDescriptionEn()
        );
        dto.setArrivalAirport(arrivalAirportDto);
        
        dto.setDepartureTime(flight.getDepartureTime());
        dto.setArrivalTime(flight.getArrivalTime());
        dto.setStatus(flight.getStatus());
        dto.setAircraftType(flight.getAircraftType());
        dto.setPrice(flight.getPrice());
        dto.setSeatsAvailable(flight.getSeatsAvailable());
        dto.setTerminal(flight.getTerminal());
        dto.setGate(flight.getGate());
        
        return dto;
    }
}
