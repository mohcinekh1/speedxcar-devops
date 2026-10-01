package speedcar.backend.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "le nom est obligatoire")
    @Size(min = 2, message = "le nom doit contenir au moins 2 caracteres")
    private String nom;

    @NotBlank(message = "l'email est obligatoire")
    @Email(message = "format invalide")
    private String email;

    @NotBlank(message = "password est obligatoire")
    @Size(min = 6, message = "password minimum doit contenir 6 caracteres")
    private String password;

    @NotBlank(message = "la confirmation de password est obligatoire")
    private String confirmPassword;
}
