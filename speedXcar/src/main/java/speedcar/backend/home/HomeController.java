package speedcar.backend.home;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import speedcar.backend.car.CarService;
import speedcar.backend.home.dto.HomeResponse;

@RestController
@RequestMapping("/api/home")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200", "http://127.0.0.1:4200"}, allowedHeaders = "*")
public class HomeController {

    private final CarService carService;

    @GetMapping
    public ResponseEntity<HomeResponse> getHomeData() {
        return ResponseEntity.ok(carService.getHomeData());
    }
}
