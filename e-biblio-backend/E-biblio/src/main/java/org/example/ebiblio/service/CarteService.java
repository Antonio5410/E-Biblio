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

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CarteService {

    @Autowired
    private CarteRepository carteRepository;

    @Autowired
    private RezervareRepository rezervareRepository;

    public List<Carte> getToateCartile() {
        return carteRepository.findAll();
    }

    public String adaugaCarte(Carte carteNoua) {
        // Caută cartea în baza de date după titlu
        Carte carteExistenta = carteRepository.findByTitlu(carteNoua.getTitlu());

        if (carteExistenta != null) {
            // Dacă există, actualizează stocurile
            carteExistenta.setStocTotal(carteExistenta.getStocTotal() + carteNoua.getStocTotal());
            carteExistenta.setStoc(carteExistenta.getStoc() + carteNoua.getStocTotal());

            // Actualizează disponibilitatea
            carteExistenta.setDisponibil(carteExistenta.getStoc() > 0);

            carteRepository.save(carteExistenta);
            return "Stocul total pentru cartea existentă a fost actualizat!";
        } else {
            // Dacă nu există, adaugă cartea nouă
            carteNoua.setDisponibil(carteNoua.getStoc() > 0); // Setează disponibilitatea
            carteRepository.save(carteNoua);
            return "Cartea nouă a fost adăugată cu succes!";
        }
    }



    public String stergeCarte(Long id) {
        if (carteRepository.existsById(id)) {
            carteRepository.deleteById(id);
            return "Cartea a fost ștearsă cu succes!";
        } else {
            return "Cartea cu ID-ul specificat nu există!";
        }
    }


    public List<Carte> cautaCartiDupaTitlu(String titlu) {
        return carteRepository.findByTitluContainingIgnoreCase(titlu);
    }

    public String editeazaCarte(Long id, Carte carteNoua) {
        Optional<Carte> carteExistenta = carteRepository.findById(id);
        if (carteExistenta.isPresent()) {
            Carte carte = carteExistenta.get();
            carte.setTitlu(carteNoua.getTitlu());
            carte.setAutor(carteNoua.getAutor());
            carte.setGen(carteNoua.getGen());
            carte.setDisponibil(carteNoua.isDisponibil());
            carte.setDescriere(carteNoua.getDescriere()); // Actualizăm descrierea
            carteRepository.save(carte);
            return "Cartea a fost actualizată cu succes!";
        } else {
            return "Cartea cu ID-ul specificat nu există!";
        }
    }


    public List<Carte> gasesteToateCartile() {
        return carteRepository.findAll();
    }

    public String rezervaCarte(Long carteId, Long userId) {
        // Verifică dacă există cartea cu ID-ul specificat
        if (!carteRepository.existsById(carteId)) {
            return "Cartea nu a fost găsită!";
        }

        // Verifică disponibilitatea stocului cărții
        Optional<Carte> carteOpt = carteRepository.findById(carteId);
        if (carteOpt.isPresent() && carteOpt.get().getStoc() <= 0) {
            return "Nu mai sunt cărți disponibile!";
        }

        // Creează rezervarea
        Rezervare rezervare = new Rezervare();
        rezervare.setCarteId(carteId);
        rezervare.setUserId(userId);
        rezervare.setOnorat(false);
        rezervare.setDataRezervare(LocalDate.now());
        rezervare.setExpiraLa(LocalDate.now().plusDays(7)); // Rezervarea expiră în 7 zile

        // Salvează rezervarea
        rezervareRepository.save(rezervare);

        return "Cartea a fost rezervată cu succes!";
    }



    @Autowired
    private ImprumutRepository imprumutRepository;

    @Autowired
    private UserRepository userRepository;

    public String imprumutaCarte(Long carteId, Long userId) {
        // Verificăm dacă există cartea specificată
        Optional<Carte> carteOpt = carteRepository.findById(carteId);

        if (carteOpt.isEmpty()) {
            return "Cartea nu a fost găsită!";
        }

        Carte carte = carteOpt.get();

        // Verificăm disponibilitatea stocului
        if (carte.getStoc() <= 0) {
            return "Nu mai sunt cărți disponibile!";
        }

        // Creăm un nou împrumut
        Imprumut imprumut = new Imprumut();
        imprumut.setCarteId(carteId); // Folosim doar ID-ul cărții
        imprumut.setUserId(userId);  // Folosim doar ID-ul utilizatorului
        imprumut.setDataImprumut(LocalDate.now());
        imprumut.setDataReturnare(LocalDate.now().plusDays(14)); // Perioada implicită: 14 zile
        imprumut.setReturnat(false);

        imprumutRepository.save(imprumut);

        // Reducem stocul cărții
        carte.setStoc(carte.getStoc() - 1);
        carte.setDisponibil(carte.getStoc() > 0); // Actualizăm disponibilitatea
        carteRepository.save(carte);

        return "Cartea a fost împrumutată cu succes!";
    }






    public String suplimenteazaStoc(Long id, int numarCarti) {
        Optional<Carte> carteOptional = carteRepository.findById(id);

        if (carteOptional.isPresent()) {
            Carte carte = carteOptional.get();

            // Adăugăm cărțile la stoc și la stoc_total
            carte.setStoc(carte.getStoc() + numarCarti);
            carte.setStocTotal(carte.getStocTotal() + numarCarti);

            carte.setDisponibil(true); // Cartea devine disponibilă pentru împrumut
            carteRepository.save(carte);

            return "Stocul a fost suplimentat cu succes!";
        } else {
            return "Cartea cu ID-ul specificat nu există!";
        }
    }

}