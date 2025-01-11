package org.example.ebiblio.controller;

import org.example.ebiblio.service.ImprumutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/imprumuturi")
public class ImprumutController {

    @Autowired
    private ImprumutService imprumutService;

    // Metoda pentru împrumut
    @PostMapping("/imprumuta")
    public String imprumutaCarte(@RequestParam Long userId,
                                 @RequestParam Long carteId,
                                 @RequestParam Long durataImprumutului) {
        return imprumutService.imprumutaCarte(userId, carteId, durataImprumutului);
    }

    @PutMapping("/returneaza/{userId}")
    public String returneazaCarte(@PathVariable Long userId) {
        System.out.println("Solicitare pentru returnarea cărții pentru userId: " + userId);
        return imprumutService.returneazaImprumut(userId);
    }
}
