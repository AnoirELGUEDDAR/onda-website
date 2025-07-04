package ma.onda.website.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.onda.website.models.Flight.FlightStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightDto {
    private Long id;
    private String flightNumber;
    private String airlineName;
    private String airlineCode;
    private String airlineLogoUrl;
    private AirportDto departureAirport;
    private AirportDto arrivalAirport;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private FlightStatus status;
    private String aircraftType;
    private BigDecimal price;
    private Integer seatsAvailable;
    private String terminal;
    private String gate;
}
