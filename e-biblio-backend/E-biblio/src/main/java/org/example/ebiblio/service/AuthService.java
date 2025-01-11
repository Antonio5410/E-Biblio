package org.example.ebiblio.service;

import org.example.ebiblio.model.User;
import org.example.ebiblio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    // Aceasta este metoda folosită de AuthController
    public Optional<User> autentificare(String username, String password) {
        return userRepository.findByUsername(username)
                .filter(user -> user.getPassword().equals(password)); // Verificăm parola
    }

    // Metodă pentru înregistrare
    public User inregistrare(User user) {
        return userRepository.save(user);
    }

    public boolean existaUsername(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

}