package org.example.ebiblio.service;

import org.example.ebiblio.model.Carte;
import org.example.ebiblio.model.Imprumut;
import org.example.ebiblio.model.Rezervare;
import org.example.ebiblio.model.User;
import org.example.ebiblio.repository.CarteRepository;
import org.example.ebiblio.repository.ImprumutRepository;
import org.example.ebiblio.repository.RezervareRepository;
import org.example.ebiblio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;


import java.time.LocalDate;

import java.util.List;
import java.util.Optional;

@Service
public class RezervareService {

    @Autowired
    private RezervareRepository rezervareRepository;

    @Autowired
    private CarteRepository carteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImprumutRepository imprumutRepository;


    public String creeazaRezervare(Long userId, Long carteId) {
        System.out.println("Start creare rezervare pentru userId: " + userId + ", carteId: " + carteId);

        // Caută cartea după ID
        Optional<Carte> carteOpt = carteRepository.findById(carteId);
        if (carteOpt.isEmpty()) {
            return "Cartea specificată nu există!";
        }

        // Caută utilizatorul după ID
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return "Utilizatorul specificat nu există!";
        }

        User user = userOpt.get();
        Carte carte = carteOpt.get();

        // Verifică dacă utilizatorul are deja o rezervare activă pentru această carte
        Optional<Rezervare> rezervareExistenta = rezervareRepository.findByUserIdAndOnoratFalse(user.getId());
        if (rezervareExistenta.isPresent()) {
            return "Utilizatorul are deja o rezervare activă pentru această carte!";
        }

        // Verifică dacă utilizatorul are deja o carte împrumutată și nereturnată
        Optional<Imprumut> imprumutNereturnat = imprumutRepository.findFirstByUserIdAndReturnatFalse(userId);
        if (imprumutNereturnat.isPresent()) {
            return "Utilizatorul are deja o carte împrumutată și nereturnată!";
        }

        // Verifică stocul cărții
        if (carte.getStoc() <= 0) {
            return "Nu mai există exemplare disponibile pentru rezervare!";
        }

        // Creează rezervarea
        Rezervare rezervare = new Rezervare();
        rezervare.setCarteId(carte.getId());
        rezervare.setUserId(user.getId());
        rezervare.setDataRezervare(LocalDate.now());
        rezervare.setExpiraLa(LocalDate.now().plusDays(1)); // Rezervarea expiră în 7 zile
        rezervare.setOnorat(false);

        // Reducem stocul cărții
        carte.setStoc(carte.getStoc() - 1);
        carteRepository.save(carte);

        // Salvăm rezervarea
        rezervareRepository.save(rezervare);

        return "Rezervarea a fost creată cu succes!";
    }




    @Scheduled(cron = "0 0 * * * *") // Rulează la fiecare oră
    public void stergeRezervariExpirate() {
        LocalDate dataCurenta = LocalDate.now();
        List<Rezervare> rezervariExpirate = rezervareRepository.findAllByExpiraLaBeforeAndOnoratFalse(dataCurenta);

        for (Rezervare rezervare : rezervariExpirate) {
            // Actualizează stocul cărții folosind ID-ul cărții
            Long carteId = rezervare.getCarteId();
            Carte carte = carteRepository.findById(carteId).orElse(null);

            if (carte != null) {
                carte.setStoc(carte.getStoc() + 1);
                carte.setDisponibil(true); // Setează cartea ca fiind disponibilă
                carteRepository.save(carte);
            }

            // Șterge rezervarea
            rezervareRepository.delete(rezervare);
        }
    }

    public Optional<Rezervare> getRezervariByUserId(Long userId) {
        return rezervareRepository.findByUserIdAndOnoratFalse(userId);
    }

    public Optional<Rezervare> getRezervariNeonorateByUserId(Long userId) {
        return rezervareRepository.findByUserIdAndOnoratFalse(userId);
    }
}