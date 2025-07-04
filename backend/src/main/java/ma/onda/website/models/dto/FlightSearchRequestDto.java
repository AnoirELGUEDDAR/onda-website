package ma.onda.website.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightSearchRequestDto {
    private String departureAirportCode;
    private String arrivalAirportCode;
    private LocalDate date;
}
