package speedcar.backend.car;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CarRepository extends JpaRepository<Car, Long> {

    List<Car> findAllByOrderByIdDesc();

    List<Car> findByAvailableTrueOrderByIdAsc();

    Optional<Car> findByIdAndAvailableTrue(Long id);

    long countByAvailableTrue();
}
