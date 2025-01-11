package org.example.ebiblio.controller;

import org.example.ebiblio.model.Carte;
import org.example.ebiblio.model.Imprumut;
import org.example.ebiblio.model.User;
import org.example.ebiblio.repository.CarteRepository;
import org.example.ebiblio.repository.UserRepository;
import org.example.ebiblio.service.CarteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/carti")
public class CarteController {

    @Autowired
    private CarteService carteService;

    @Autowired
    private CarteRepository carteRepository;

    @Autowired
    private UserRepository userRepository;


    @GetMapping("/toate")
    public List<Carte> getToateCartile() {
        return carteService.getToateCartile();
    }

    @DeleteMapping("/delete/{id}")
    public String stergeCarte(@PathVariable Long id) {
        return carteService.stergeCarte(id);
    }


    @GetMapping("/cautare")
    public List<Carte> cautaCarti(@RequestParam String titlu) {
        return carteService.cautaCartiDupaTitlu(titlu);
    }

    @PostMapping("/add")
    public String adaugaCarte(@RequestBody Carte carte) {
        carteService.adaugaCarte(carte);
        return "Cartea a fost adăugată cu succes!";
    }

    @PutMapping("/edit/{id}")
    public String editeazaCarte(@PathVariable Long id, @RequestBody Carte carteNoua) {
        return carteService.editeazaCarte(id, carteNoua);
    }
    @GetMapping("/list")
    public List<Carte> listaCarti() {
        return carteService.gasesteToateCartile();
    }

    @PostMapping("/imprumuta")
    public String imprumutaCarte(@RequestBody Map<String, Object> body) {
        // Extrage datele din body
        Long carteId = Long.valueOf(body.get("carteId").toString());
        Long userId = Long.valueOf(body.get("userId").toString());
        int durataImprumutului = Integer.parseInt(body.get("durataImprumutului").toString());

        // Apelăm direct metoda din serviciu
        return carteService.imprumutaCarte(carteId, userId);
    }




    @PutMapping("/suplimenteaza-stoc/{id}")
    public String suplimenteazaStoc(@PathVariable Long id, @RequestParam int numarCarti) {
        // Caută cartea în baza de date
        Optional<Carte> carteOpt = carteRepository.findById(id);

        if (carteOpt.isPresent()) {
            Carte carte = carteOpt.get();

            // Adaugă numărul de cărți la stocul total
            carte.setStocTotal(carte.getStocTotal() + numarCarti);

            // Dacă stocul disponibil este mai mic decât stocul total, ajustează-l
            carte.setStoc(carte.getStoc() + numarCarti);

            // Actualizează disponibilitatea (true dacă mai există stoc disponibil)
            carte.setDisponibil(carte.getStoc() > 0);

            // Salvează modificările în baza de date
            carteRepository.save(carte);

            return "Stocul total și disponibilitatea au fost actualizate cu succes!";
        }

        return "Carte nu a fost găsită!";
    }




}