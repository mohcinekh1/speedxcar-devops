package speedcar.backend.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank(message = "email obligatoire")
    @Email(message = "format invalide")
    private String email;

    @NotBlank(message = "password obligatoire")
    private String password;
}
