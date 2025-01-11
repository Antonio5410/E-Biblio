package org.example.ebiblio.repository;

import org.example.ebiblio.model.Imprumut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImprumutRepository extends JpaRepository<Imprumut, Long> {

    // Verifică dacă un utilizator are deja o carte împrumutată și nereturnată
    boolean existsByUserIdAndReturnatFalse(Long userId);

    // Găsește primul împrumut nereturnat al unui utilizator
    Optional<Imprumut> findFirstByUserIdAndReturnatFalse(Long userId);

}
