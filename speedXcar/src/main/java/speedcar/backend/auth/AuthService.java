package speedcar.backend.auth;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import speedcar.backend.auth.dto.AuthResponse;
import speedcar.backend.auth.dto.LoginRequest;
import speedcar.backend.auth.dto.RegisterRequest;
import speedcar.backend.exceptions.EmailAlreadyUsedException;
import speedcar.backend.exceptions.InvalidCredentialsException;
import speedcar.backend.security.JwtService;
import speedcar.backend.user.Role;
import speedcar.backend.user.User;
import speedcar.backend.user.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyUsedException("Cet email est deja utilise");
        }
        if(!request.getPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }
        User user = new User();
        user.setFullName(request.getNom());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        userRepository.save(user);
        String token = jwtService.generateToken(user);

        return new AuthResponse(
                token,
                user.getFullName(),
                user.getEmail(),
                user.getRole()
        );

    }
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Email ou mot de passe incorrect"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Email ou mot de passe incorrect");
        }

        String token = jwtService.generateToken(user);

        return new AuthResponse(
                token,
                user.getFullName(),
                user.getEmail(),
                user.getRole()
        );
    }

}
