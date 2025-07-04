package ma.onda.website.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "flights")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "flight_number", nullable = false)
    private String flightNumber;
    
    @ManyToOne
    @JoinColumn(name = "airline_id", nullable = false)
    private Airline airline;
    
    @ManyToOne
    @JoinColumn(name = "departure_airport_id", nullable = false)
    private Airport departureAirport;
    
    @ManyToOne
    @JoinColumn(name = "arrival_airport_id", nullable = false)
    private Airport arrivalAirport;
    
    @Column(name = "departure_time", nullable = false)
    private LocalDateTime departureTime;
    
    @Column(name = "arrival_time", nullable = false)
    private LocalDateTime arrivalTime;
    
    @Enumerated(EnumType.STRING)
    private FlightStatus status = FlightStatus.SCHEDULED;
    
    @Column(name = "aircraft_type")
    private String aircraftType;
    
    private BigDecimal price;
    
    @Column(name = "seats_available")
    private Integer seatsAvailable;
    
    private String terminal;
    
    private String gate;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public enum FlightStatus {
        SCHEDULED, DELAYED, DEPARTED, ARRIVED, CANCELLED
    }
    
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
