package org.example.ebiblio.service;

import org.example.ebiblio.model.Carte;
import org.example.ebiblio.model.Imprumut;
import org.example.ebiblio.model.Rezervare;
import org.example.ebiblio.model.User;
import org.example.ebiblio.repository.ImprumutRepository;
import org.example.ebiblio.repository.CarteRepository;
import org.example.ebiblio.repository.RezervareRepository;
import org.example.ebiblio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class ImprumutService {

    @Autowired
    private ImprumutRepository imprumutRepository;
    @Autowired
    private CarteRepository carteRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RezervareRepository rezervareRepository;



    public String imprumutaCarte(Long userId, Long carteId, Long durata) {
        // Verifică dacă utilizatorul există
        if (!userRepository.existsById(userId)) {
            return "Utilizatorul specificat nu există!";
        }

        // Verifică dacă utilizatorul are deja un împrumut activ
        Optional<Imprumut> imprumutActivOpt = imprumutRepository.findFirstByUserIdAndReturnatFalse(userId);
        if (imprumutActivOpt.isPresent()) {
            return "Utilizatorul are deja un împrumut activ și nu poate împrumuta o altă carte!";
        }

        // Verifică dacă cartea există
        Optional<Carte> carteOpt = carteRepository.findById(carteId);
        if (carteOpt.isEmpty()) {
            return "Cartea specificată nu există!";
        }

        Carte carte = carteOpt.get();

        // Verifică dacă utilizatorul are o rezervare activă pentru această carte
        Optional<Rezervare> rezervareOpt = rezervareRepository.findByUserIdAndOnoratFalse(userId);
        if (rezervareOpt.isPresent()) {
            Rezervare rezervare = rezervareOpt.get();

            // Marchează rezervarea ca onorată
            rezervare.setOnorat(true);
            rezervareRepository.save(rezervare);
        }

        // Verifică dacă există suficiente stocuri pentru împrumut
        if (carte.getStoc() <= 0) {
            return "Cartea nu mai este disponibilă pentru împrumut!";
        }

        // Creează și salvează împrumutul
        Imprumut imprumut = new Imprumut();
        imprumut.setUserId(userId); // Setează doar ID-ul utilizatorului
        imprumut.setCarteId(carteId); // Setează doar ID-ul cărții
        imprumut.setDataImprumut(LocalDate.now());
        imprumut.setPerioada(durata); // Folosește durata personalizată primită ca parametru
        imprumut.setDataReturnare(LocalDate.now().plusDays(durata)); // Calculează data returnării în funcție de durata
        imprumut.setReturnat(false);

        imprumutRepository.save(imprumut);

        // Scade stocul cărții
        carte.setStoc(carte.getStoc() - 1);

        // Dacă stocul devine 0, setează cartea ca indisponibilă
        if (carte.getStoc() == 0) {
            carte.setDisponibil(false);
        }

        carteRepository.save(carte);

        return "Cartea a fost împrumutată cu succes!";
    }




    public String returneazaImprumut(Long userId) {
        // Cautăm utilizatorul care are împrumutul activ
        Optional<Imprumut> imprumutOpt = imprumutRepository.findFirstByUserIdAndReturnatFalse(userId);

        // Dacă nu există un împrumut nereturnat, returnăm un mesaj informativ
        if (imprumutOpt.isEmpty()) {
            return "Nu există niciun împrumut nereturnat pentru acest utilizator!";
        }

        // Extragem detaliile împrumutului
        Imprumut imprumut = imprumutOpt.get();

        try {
            // Obținem cartea din baza de date pe baza ID-ului
            Optional<Carte> carteOpt = carteRepository.findById(imprumut.getCarteId());
            if (carteOpt.isEmpty()) {
                return "Eroare: Cartea asociată acestui împrumut nu există!";
            }

            Carte carte = carteOpt.get();

            // Incrementăm stocul cărții
            carte.setStoc(carte.getStoc() + 1);

            // Dacă stocul este mai mare de 0, cartea devine disponibilă
            if (carte.getStoc() > 0) {
                carte.setDisponibil(true);
            }

            carteRepository.save(carte);

            // Marcăm împrumutul ca returnat
            imprumut.setReturnat(true);
            imprumutRepository.save(imprumut);

            return "Cartea a fost returnată cu succes!";
        } catch (Exception e) {
            // Logăm eroarea pentru debugging (opțional)
            e.printStackTrace();
            return "A apărut o eroare la returnarea cărții!";
        }
    }




}