package com.example.globalhistorybe.config;

import com.example.globalhistorybe.entity.User;
import com.example.globalhistorybe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Create admin accounts if they don't exist
        if (!userRepository.existsByEmail("admin@globalhistory.org")) {
            User admin = User.builder()
                    .username("admin")
                    .email("admin@globalhistory.org")
                    .passwordHash(passwordEncoder.encode("admin123"))
                    .role(User.Role.ADMIN)
                    .bio("Platform administrator for Global History")
                    .build();
            userRepository.save(admin);
            log.info("Created admin account: admin@globalhistory.org / admin123");
        }

        if (!userRepository.existsByEmail("editor@globalhistory.org")) {
            User editor = User.builder()
                    .username("editor")
                    .email("editor@globalhistory.org")
                    .passwordHash(passwordEncoder.encode("admin123"))
                    .role(User.Role.ADMIN)
                    .bio("Senior editor and content curator")
                    .build();
            userRepository.save(editor);
            log.info("Created editor account: editor@globalhistory.org / admin123");
        }

        // Create regular user accounts
        createUserIfNotExists("historian_jane", "jane@example.com", "user123",
                "History enthusiast specializing in Ancient civilizations");
        createUserIfNotExists("marco_polo", "marco@example.com", "user123",
                "Travel historian and silk road researcher");
        createUserIfNotExists("cleopatra_fan", "cleo@example.com", "user123",
                "Egyptian history researcher and writer");
        createUserIfNotExists("viking_scholar", "viking@example.com", "user123",
                "Norse mythology and Viking Age specialist");

        log.info("Data seeding complete. 2 admins + 4 users ready.");
    }

    private void createUserIfNotExists(String username, String email, String password, String bio) {
        if (!userRepository.existsByEmail(email)) {
            User user = User.builder()
                    .username(username)
                    .email(email)
                    .passwordHash(passwordEncoder.encode(password))
                    .role(User.Role.USER)
                    .bio(bio)
                    .build();
            userRepository.save(user);
            log.info("Created user: {} / {}", email, password);
        }
    }
}
