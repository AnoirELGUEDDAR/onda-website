package ma.onda.website.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "airports")
public class Airport {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Size(max = 100)
    private String name;
    
    @NotBlank
    @Size(max = 3)
    @Column(unique = true)
    private String code;
    
    @NotBlank
    @Size(max = 100)
    private String city;
    
    @Size(max = 255)
    private String description;
    
    private double latitude;
    
    private double longitude;
    
    @Size(max = 255)
    private String address;
    
    @Size(max = 100)
    private String website;
    
    @Size(max = 20)
    private String phoneNumber;
    
    @Size(max = 255)
    private String imageUrl;
    
    @OneToMany(mappedBy = "airport", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AirportService> services = new HashSet<>();
    
    private boolean international;
    
    @Enumerated(EnumType.STRING)
    private AirportStatus status = AirportStatus.ACTIVE;
    
    public enum AirportStatus {
        ACTIVE, UNDER_MAINTENANCE, CLOSED
    }
}
