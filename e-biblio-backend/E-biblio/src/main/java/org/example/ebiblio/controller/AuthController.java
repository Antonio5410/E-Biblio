package org.example.ebiblio.controller;

import org.example.ebiblio.service.AuthService;
import org.example.ebiblio.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public String autentificare(@RequestParam String username, @RequestParam String password) {
        Optional<User> utilizatorAutentificat = authService.autentificare(username, password);

        if (utilizatorAutentificat.isPresent()) {
            User user = utilizatorAutentificat.get();
            return "Autentificare reușită! Rol: " + user.getRole() + ", ID: " + user.getId();
        } else {
            return "Autentificare eșuată! Verifică numele de utilizator și parola.";
        }
    }


    @PostMapping("/register")
    public String inregistrare(@RequestParam String username,
                               @RequestParam String password,
                               @RequestParam String email) {
        // Verificăm dacă username-ul există deja
        if (authService.existaUsername(username)) {
            return "Eroare: Numele de utilizator este deja folosit!";
        }

        // Creăm un nou utilizator
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        user.setRole("user"); // Setează implicit rolul ca utilizator simplu

        authService.inregistrare(user);
        return "Utilizator înregistrat cu succes!";
    }


}