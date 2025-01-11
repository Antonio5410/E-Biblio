package org.example.ebiblio.controller;

import org.example.ebiblio.model.Carte;
import org.example.ebiblio.model.Rezervare;
import org.example.ebiblio.repository.CarteRepository;
import org.example.ebiblio.repository.RezervareRepository;
import org.example.ebiblio.service.RezervareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rezervari")
public class RezervareController {

    @Autowired
    private RezervareService rezervareService;

    @Autowired
    private RezervareRepository rezervareRepository;

    @Autowired
    private CarteRepository carteRepository;

    @PostMapping("/creeaza/{userId}/{carteId}")
    public String creeazaRezervare(@PathVariable Long userId, @PathVariable Long carteId) {
        // Verifică dacă utilizatorul are deja o rezervare activă
        Optional<Rezervare> rezervareExistenta = rezervareRepository.findByUserIdAndOnoratFalse(userId);
        if (rezervareExistenta.isPresent()) {
            return "Eroare: Ai deja o rezervare activă!";
        }

        // Verifică dacă există stoc disponibil pentru carte
        Optional<Carte> carteOptional = carteRepository.findById(carteId);
        if (carteOptional.isPresent()) {
            Carte carte = carteOptional.get();
            if (carte.getStoc() > 0) {
                // Creează rezervarea
                return rezervareService.creeazaRezervare(userId, carteId);
            } else {
                return "Eroare: Cartea nu este disponibilă în stoc!";
            }
        }

        return "Eroare: Cartea nu a fost găsită!";
    }


    @DeleteMapping("/curata-expirate")
    public String curataRezervariExpirate() {
        rezervareService.stergeRezervariExpirate();
        return "Rezervările expirate au fost curățate!";
    }

    @GetMapping("/utilizator/{userId}")
    public ResponseEntity<Optional<Rezervare>> getRezervariNeonorateByUserId(@PathVariable Long userId) {
        Optional<Rezervare> rezervari = rezervareService.getRezervariNeonorateByUserId(userId);
        return ResponseEntity.ok(rezervari);
    }
}