package speedcar.backend.car;

import speedcar.backend.car.dto.CarResponse;
import speedcar.backend.car.dto.CategoryResponse;
import speedcar.backend.home.dto.HomeResponse;

import java.util.List;

public interface CarService {

    Car createCar(Car car);

    Car updateCar(Long id, Car car);

    void deleteCar(Long id);

    List<Car> getAllCars();

    Car getCarById(Long id);

    List<CarResponse> getPublicCars();

    CarResponse getPublicCarById(Long id);

    List<CarResponse> getFeaturedCars(int limit);

    List<CategoryResponse> getPublicCategories();

    HomeResponse getHomeData();
}
