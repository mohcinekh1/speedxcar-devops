package speedcar.backend.car;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import speedcar.backend.car.dto.CarResponse;
import speedcar.backend.car.dto.CategoryResponse;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200", "http://127.0.0.1:4200"}, allowedHeaders = "*")
public class PublicCarController {

    private final CarService carService;

    @GetMapping
    public ResponseEntity<List<CarResponse>> getPublicCars() {
        return ResponseEntity.ok(carService.getPublicCars());
    }

    @GetMapping("/featured")
    public ResponseEntity<List<CarResponse>> getFeaturedCars(@RequestParam(defaultValue = "6") int limit) {
        return ResponseEntity.ok(carService.getFeaturedCars(limit));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryResponse>> getCategories() {
        return ResponseEntity.ok(carService.getPublicCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarResponse> getPublicCarById(@PathVariable Long id) {
        return ResponseEntity.ok(carService.getPublicCarById(id));
    }
}
