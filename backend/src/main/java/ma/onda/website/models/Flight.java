package ma.onda.website.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "flights")
public class Flight {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Size(max = 10)
    private String flightNumber;
    
    @NotBlank
    @Size(max = 100)
    private String airline;
    
    @NotNull
    @Enumerated(EnumType.STRING)
    private FlightType type;
    
    @ManyToOne
    @JoinColumn(name = "origin_airport_id")
    private Airport originAirport;
    
    @ManyToOne
    @JoinColumn(name = "destination_airport_id")
    private Airport destinationAirport;
    
    @NotNull
    private LocalDateTime scheduledDepartureTime;
    
    @NotNull
    private LocalDateTime scheduledArrivalTime;
    
    private LocalDateTime actualDepartureTime;
    
    private LocalDateTime actualArrivalTime;
    
    @Size(max = 10)
    private String terminal;
    
    @Size(max = 10)
    private String gate;
    
    @Enumerated(EnumType.STRING)
    private FlightStatus status = FlightStatus.SCHEDULED;
    
    @Size(max = 255)
    private String remarks;
    
    @Size(max = 255)
    private String aircraftType;
    
    private boolean codeshare = false;
    
    public enum FlightType {
        DOMESTIC, INTERNATIONAL
    }
    
    public enum FlightStatus {
        SCHEDULED, ON_TIME, DELAYED, BOARDING, DEPARTED, LANDED, ARRIVED, CANCELLED, DIVERTED
    }
}
