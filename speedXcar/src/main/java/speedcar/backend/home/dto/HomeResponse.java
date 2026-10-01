package speedcar.backend.home.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import speedcar.backend.car.dto.CarResponse;
import speedcar.backend.car.dto.CategoryResponse;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HomeResponse {

    private List<CarResponse> featuredCars;
    private List<HomeStatResponse> stats;
    private List<CategoryResponse> categories;
}
