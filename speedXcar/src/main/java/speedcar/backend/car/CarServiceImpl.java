package speedcar.backend.car;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import speedcar.backend.car.dto.CarResponse;
import speedcar.backend.car.dto.CategoryResponse;
import speedcar.backend.exceptions.CarNotFoundException;
import speedcar.backend.home.dto.HomeResponse;
import speedcar.backend.home.dto.HomeStatResponse;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CarServiceImpl implements CarService {

    private final CarRepository carRepository;

    @Override
    public Car createCar(Car car) {
        return carRepository.save(car);
    }

    @Override
    public Car updateCar(Long id, Car carRequest) {
        Car car = getCarById(id);

        car.setBrand(carRequest.getBrand());
        car.setModel(carRequest.getModel());
        car.setCategory(carRequest.getCategory());
        car.setPricePerDay(carRequest.getPricePerDay());
        car.setGearBox(carRequest.getGearBox());
        car.setFuel(carRequest.getFuel());
        car.setDoors(carRequest.getDoors());
        car.setSeats(carRequest.getSeats());
        car.setImageUrl(carRequest.getImageUrl());
        car.setAvailable(carRequest.getAvailable());

        return carRepository.save(car);
    }

    @Override
    public void deleteCar(Long id) {
        Car car = getCarById(id);
        carRepository.delete(car);
    }

    @Override
    public List<Car> getAllCars() {
        return carRepository.findAllByOrderByIdDesc();
    }

    @Override
    public Car getCarById(Long id) {
        return carRepository.findById(id)
                .orElseThrow(() -> new CarNotFoundException("Voiture introuvable"));
    }

    @Override
    public List<CarResponse> getPublicCars() {
        return carRepository.findByAvailableTrueOrderByIdAsc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public CarResponse getPublicCarById(Long id) {
        Car car = carRepository.findByIdAndAvailableTrue(id)
                .orElseThrow(() -> new CarNotFoundException("Voiture introuvable"));

        return toResponse(car);
    }

    @Override
    public List<CarResponse> getFeaturedCars(int limit) {
        int safeLimit = Math.max(1, limit);

        return carRepository.findByAvailableTrueOrderByIdAsc()
                .stream()
                .limit(safeLimit)
                .map(this::toResponse)
                .toList();
    }

    @Override
    public List<CategoryResponse> getPublicCategories() {
        Map<String, Long> categoryCounts = carRepository.findByAvailableTrueOrderByIdAsc()
                .stream()
                .collect(Collectors.groupingBy(
                        car -> normalizeCategory(car.getCategory()),
                        LinkedHashMap::new,
                        Collectors.counting()
                ));

        List<String> categoryOrder = List.of("Sedan", "Cabriolet", "Sport", "SUV", "Minivan");

        return categoryOrder.stream()
                .filter(categoryCounts::containsKey)
                .map(category -> new CategoryResponse(category, categoryCounts.get(category)))
                .toList();
    }

    @Override
    public HomeResponse getHomeData() {
        long totalCars = carRepository.countByAvailableTrue();

        List<HomeStatResponse> stats = List.of(
                new HomeStatResponse(totalCars + "+", "Cars"),
                new HomeStatResponse("20k+", "Customers"),
                new HomeStatResponse("25+", "Years"),
                new HomeStatResponse("20m+", "Miles")
        );

        return new HomeResponse(
                getFeaturedCars(6),
                stats,
                getPublicCategories()
        );
    }

    private CarResponse toResponse(Car car) {
        return new CarResponse(
                car.getId(),
                car.getBrand(),
                car.getModel(),
                car.getCategory(),
                car.getPricePerDay(),
                car.getGearBox(),
                car.getFuel(),
                car.getDoors(),
                car.getSeats(),
                car.getImageUrl(),
                car.getAvailable()
        );
    }

    private String normalizeCategory(String category) {
        if (category == null) {
            return "";
        }

        String normalizedCategory = category.trim();

        if (normalizedCategory.equalsIgnoreCase("van")) {
            return "Minivan";
        }

        return normalizedCategory;
    }
}
