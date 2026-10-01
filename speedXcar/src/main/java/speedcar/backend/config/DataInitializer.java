package speedcar.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import speedcar.backend.car.Car;
import speedcar.backend.car.CarRepository;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private static final List<String> BROKEN_IMAGE_PATHS = List.of(
            "/assets/images/image1.jpg",
            "/assets/images/image2.jpg",
            "/assets/images/image3.jpg",
            "/assets/images/login-hd.png",
            "/assets/images/cars/SUV/suv-4.png"
    );

    private final CarRepository carRepository;

    @Override
    public void run(String... args) {
        List<Car> seedCars = List.of(
                createCar("Mercedes", "C Class", "Sedan", "45", "Automat", "Petrol", 4, 5,
                        "/assets/images/cars/SEDAN/sedan1.png"),
                createCar("BMW", "Serie 5", "Sedan", "55", "Automat", "Petrol", 4, 5,
                        "/assets/images/cars/SEDAN/sedan2.png"),
                createCar("Audi", "A6", "Sedan", "50", "Automat", "Petrol", 4, 5,
                        "/assets/images/cars/SEDAN/sedan3.png"),

                createCar("Bentley", "Continental GTC", "Cabriolet", "90", "Automat", "Petrol", 2, 4,
                        "/assets/images/cars/CABRIOLET/cabriolet1.png"),
                createCar("Porsche", "911 Cabriolet", "Cabriolet", "95", "Automat", "Petrol", 2, 2,
                        "/assets/images/cars/CABRIOLET/cabriolet2.png"),
                createCar("BMW", "Z4", "Cabriolet", "70", "Manual", "Petrol", 2, 2,
                        "/assets/images/cars/CABRIOLET/cabriolet3.png"),

                createCar("Porsche", "911 GT3", "Sport", "120", "Manual", "Petrol", 2, 2,
                        "/assets/images/cars/SPORT/sport1.png"),
                createCar("Toyota", "Supra", "Sport", "80", "Manual", "Petrol", 2, 2,
                        "/assets/images/cars/SPORT/sport2.png"),
                createCar("Mercedes", "AMG GT", "Sport", "110", "Automat", "Petrol", 2, 2,
                        "/assets/images/cars/SPORT/sport3.png"),

                createCar("Toyota", "Land Cruiser", "SUV", "75", "Automat", "Diesel", 4, 7,
                        "/assets/images/cars/SUV/suv-1.png"),
                createCar("Toyota", "Hilux GR", "SUV", "65", "Automat", "Diesel", 4, 5,
                        "/assets/images/cars/SUV/suv-2.png"),
                createCar("Ford", "Ranger", "SUV", "85", "Automat", "Diesel", 4, 5,
                        "/assets/images/cars/SUV/suv-3.png"),

                createCar("Mercedes", "V Class", "Minivan", "60", "Automat", "Diesel", 5, 7,
                        "/assets/images/cars/MINIVAN/minivan1.png"),
                createCar("Toyota", "Sienna", "Minivan", "55", "Automat", "Hybrid", 5, 7,
                        "/assets/images/cars/MINIVAN/minivan2.png"),
                createCar("Volkswagen", "Multivan", "Minivan", "58", "Automat", "Diesel", 5, 7,
                        "/assets/images/cars/MINIVAN/minivan3.png")
        );

        List<Car> brokenImageCars = carRepository.findAll()
                .stream()
                .filter(this::hasBrokenImage)
                .toList();

        if (brokenImageCars.isEmpty() == false) {
            carRepository.deleteAll(brokenImageCars);
        }

        Map<String, Car> existingCars = carRepository.findAll()
                .stream()
                .collect(Collectors.toMap(
                        this::carKey,
                        Function.identity(),
                        (firstCar, secondCar) -> firstCar,
                        LinkedHashMap::new
                ));

        seedCars.forEach(seedCar -> {
            Car existingCar = existingCars.get(carKey(seedCar));

            if (existingCar == null) {
                carRepository.save(seedCar);
                return;
            }

            copyCar(seedCar, existingCar);
            carRepository.save(existingCar);
        });
    }

    private boolean hasBrokenImage(Car car) {
        String imageUrl = car.getImageUrl();
        return imageUrl == null || imageUrl.isBlank() || BROKEN_IMAGE_PATHS.contains(imageUrl);
    }

    private void copyCar(Car source, Car target) {
        target.setBrand(source.getBrand());
        target.setModel(source.getModel());
        target.setCategory(source.getCategory());
        target.setPricePerDay(source.getPricePerDay());
        target.setGearBox(source.getGearBox());
        target.setFuel(source.getFuel());
        target.setDoors(source.getDoors());
        target.setSeats(source.getSeats());
        target.setImageUrl(source.getImageUrl());
        target.setAvailable(source.getAvailable());
    }

    private String carKey(Car car) {
        return normalize(car.getBrand())
                + "|" + normalize(car.getModel())
                + "|" + normalize(car.getCategory());
    }

    private String normalize(String value) {
        return value == null ? "" : value.trim().toLowerCase();
    }

    private Car createCar(String brand, String model, String category, String pricePerDay,
                          String gearBox, String fuel, int doors, int seats, String imageUrl) {
        Car car = new Car();
        car.setBrand(brand);
        car.setModel(model);
        car.setCategory(category);
        car.setPricePerDay(pricePerDay);
        car.setGearBox(gearBox);
        car.setFuel(fuel);
        car.setDoors(doors);
        car.setSeats(seats);
        car.setImageUrl(imageUrl);
        car.setAvailable(true);
        return car;
    }
}
