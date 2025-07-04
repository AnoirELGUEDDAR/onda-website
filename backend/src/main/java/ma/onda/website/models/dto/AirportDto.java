package ma.onda.website.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AirportDto {
    private Long id;
    private String code;
    private String name;
    private String city;
    private Boolean international;
    private String description;
}
