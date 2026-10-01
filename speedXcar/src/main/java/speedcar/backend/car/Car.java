package speedcar.backend.car;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cars")
public class Car {
   @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "La marque est obligatoire")
    @Column(nullable = false)
    private String brand;

    @NotBlank(message = "Le modele est obligatoire")
    @Column(nullable = false)
    private String model;

    @NotBlank(message = "La categorie est obligatoire")
    @Column(nullable = false)
    private String category;

    @NotBlank(message = "Le prix est obligatoire")
    @Column(name = "price_per_day", nullable = false)
    private String pricePerDay ;

    @NotBlank(message = "La boite vitesse est obligatoire")
    @Column(name = "gear_box", nullable = false)
    private String gearBox;

    @NotBlank(message = "Le carburant est obligatoire")
    @Column(nullable = false)
    private String fuel;

    @Min(value = 1, message = "Le nombre de portes est invalide")
    @Column(nullable = false)
    private int doors;

    @Min(value = 1, message = "Le nombre de places est invalide")
    @Column(nullable = false)
    private int seats;

    @NotBlank(message = "L image est obligatoire")
    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @NotNull(message = "La disponibilite est obligatoire")
    @Column(nullable = false)
    private Boolean available;


}
