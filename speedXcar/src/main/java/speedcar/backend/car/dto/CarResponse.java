package speedcar.backend.car.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarResponse {

    private Long id;
    private String brand;
    private String model;
    private String category;
    private String pricePerDay;
    private String gearBox;
    private String fuel;
    private int doors;
    private int seats;
    private String imageUrl;
    private Boolean available;
}
