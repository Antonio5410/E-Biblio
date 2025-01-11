package org.example.ebiblio.repository;

import org.example.ebiblio.model.Carte;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CarteRepository extends JpaRepository<Carte, Long> {
    List<Carte> findByTitluContainingIgnoreCase(String titlu);
    Carte findByTitlu(String titlu);
}