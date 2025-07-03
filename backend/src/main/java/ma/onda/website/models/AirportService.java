package ma.onda.website.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "airport_services")
public class AirportService {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Size(max = 100)
    private String name;
    
    @Size(max = 255)
    private String description;
    
    @Size(max = 255)
    private String iconUrl;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "airport_id")
    private Airport airport;
    
    @Enumerated(EnumType.STRING)
    private ServiceCategory category;
    
    private boolean available = true;
    
    @Size(max = 255)
    private String location;
    
    @Size(max = 20)
    private String contactNumber;
    
    @Size(max = 50)
    private String openingHours;
    
    public enum ServiceCategory {
        RESTAURANT, SHOPPING, LOUNGE, WIFI, PARKING, BAGGAGE, SECURITY, TRANSPORTATION, OTHER
    }
}
