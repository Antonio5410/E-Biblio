package org.example.ebiblio.repository;

import org.example.ebiblio.model.Rezervare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface RezervareRepository extends JpaRepository<Rezervare, Long> {

    // Găsește rezervarea activă pentru un utilizator
    Optional<Rezervare> findByUserIdAndOnoratFalse(Long userId);

    // Găsește toate rezervările care au expirat și nu au fost onorate
    List<Rezervare> findAllByExpiraLaBeforeAndOnoratFalse(LocalDate expiraLa);

}
