package ma.onda.website.config;

import ma.onda.website.models.Airport;
import ma.onda.website.models.Flight;
import ma.onda.website.repositories.AirportRepository;
import ma.onda.website.repositories.FlightRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);
    
    private final AirportRepository airportRepository;
    private final FlightRepository flightRepository;

    @Autowired
    public DataInitializer(AirportRepository airportRepository, FlightRepository flightRepository) {
        this.airportRepository = airportRepository;
        this.flightRepository = flightRepository;
        logger.info("DataInitializer constructor called");
    }

    @Override
    public void run(String... args) {
        logger.info("DataInitializer run method called");
        
        try {
            logger.info("Current airport count: {}", airportRepository.count());
            
            // Only initialize if the database is empty
            if (airportRepository.count() == 0) {
                logger.info("Initializing airports...");
                initializeAirports();
                logger.info("Airports initialized successfully");
            } else {
                logger.info("Airports already exist, skipping initialization");
            }
            
            if (flightRepository.count() == 0 && airportRepository.count() > 0) {
                logger.info("Initializing flights...");
                initializeFlights();
                logger.info("Flights initialized successfully");
            } else {
                logger.info("Flights already exist or airports not initialized yet, skipping flight initialization");
            }
        } catch (Exception e) {
            logger.error("Error during data initialization", e);
        }
    }

    private void initializeAirports() {
        try {
            // Create sample airports
            Airport casablanca = new Airport();
            casablanca.setName("Mohammed V International Airport");
            casablanca.setCode("CMN");
            casablanca.setCity("Casablanca");
            casablanca.setDescription("Main international airport serving Casablanca, Morocco");
            casablanca.setLatitude(33.3675);
            casablanca.setLongitude(-7.5900);
            casablanca.setAddress("Route de Nouasseur, Casablanca, Morocco");
            casablanca.setWebsite("https://www.onda.ma/Aeroports/Aeroport-Mohammed-V");
            casablanca.setPhoneNumber("+212 520001050");
            casablanca.setImageUrl("/images/airports/casablanca.jpg");
            casablanca.setInternational(true);
            casablanca.setStatus(Airport.AirportStatus.ACTIVE);
            
            Airport marrakech = new Airport();
            marrakech.setName("Marrakech Menara Airport");
            marrakech.setCode("RAK");
            marrakech.setCity("Marrakech");
            marrakech.setDescription("International airport serving Marrakech, Morocco");
            marrakech.setLatitude(31.6069);
            marrakech.setLongitude(-8.0363);
            marrakech.setAddress("Menara Airport, Marrakech, Morocco");
            marrakech.setWebsite("https://www.onda.ma/Aeroports/Aeroport-Marrakech-Menara");
            marrakech.setPhoneNumber("+212 524447865");
            marrakech.setImageUrl("/images/airports/marrakech.jpg");
            marrakech.setInternational(true);
            marrakech.setStatus(Airport.AirportStatus.ACTIVE);
            
            logger.info("Saving airports to database...");
            airportRepository.save(casablanca);
            logger.info("Saved Casablanca airport");
            airportRepository.save(marrakech);
            logger.info("Saved Marrakech airport");
            
            // Verify airports were saved
            logger.info("After initialization, airport count: {}", airportRepository.count());
        } catch (Exception e) {
            logger.error("Error initializing airports", e);
            throw e; // Rethrow to see the error in the main method
        }
    }
    
    private void initializeFlights() {
        try {
            // Get saved airports
            Airport casablanca = airportRepository.findByCode("CMN").orElseThrow(() -> 
                new RuntimeException("Casablanca airport not found"));
            Airport marrakech = airportRepository.findByCode("RAK").orElseThrow(() -> 
                new RuntimeException("Marrakech airport not found"));
            
            logger.info("Found airports for flight initialization");
            
            // Create sample flights
            Flight flight1 = new Flight();
            flight1.setFlightNumber("AT201");
            flight1.setAirline("Royal Air Maroc");
            flight1.setType(Flight.FlightType.DOMESTIC);
            flight1.setOriginAirport(casablanca);
            flight1.setDestinationAirport(marrakech);
            flight1.setScheduledDepartureTime(LocalDateTime.now().plusHours(2));
            flight1.setScheduledArrivalTime(LocalDateTime.now().plusHours(3));
            flight1.setTerminal("1");
            flight1.setGate("A12");
            flight1.setStatus(Flight.FlightStatus.SCHEDULED);
            flight1.setAircraftType("Boeing 737-800");
            
            Flight flight2 = new Flight();
            flight2.setFlightNumber("AT345");
            flight2.setAirline("Royal Air Maroc");
            flight2.setType(Flight.FlightType.DOMESTIC);
            flight2.setOriginAirport(marrakech);
            flight2.setDestinationAirport(casablanca);
            flight2.setScheduledDepartureTime(LocalDateTime.now().plusHours(4));
            flight2.setScheduledArrivalTime(LocalDateTime.now().plusHours(5));
            flight2.setTerminal("2");
            flight2.setGate("B05");
            flight2.setStatus(Flight.FlightStatus.SCHEDULED);
            flight2.setAircraftType("Airbus A320");
            
            logger.info("Saving flights to database...");
            flightRepository.save(flight1);
            logger.info("Saved flight AT201");
            flightRepository.save(flight2);
            logger.info("Saved flight AT345");
            
            // Verify flights were saved
            logger.info("After initialization, flight count: {}", flightRepository.count());
        } catch (Exception e) {
            logger.error("Error initializing flights", e);
            throw e; // Rethrow to see the error in the main method
        }
    }
}
