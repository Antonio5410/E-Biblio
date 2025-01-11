package org.example.ebiblio.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Rezervare {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "carte_id", nullable = false)
    private Long carteId;

    private LocalDate dataRezervare;
    private LocalDate expiraLa;
    private boolean onorat;

    // Getters și Setters pentru toate câmpurile

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getCarteId() {
        return carteId;
    }

    public void setCarteId(Long carteId) {
        this.carteId = carteId;
    }

    public LocalDate getDataRezervare() {
        return dataRezervare;
    }

    public void setDataRezervare(LocalDate dataRezervare) {
        this.dataRezervare = dataRezervare;
    }

    public LocalDate getExpiraLa() {
        return expiraLa;
    }

    public void setExpiraLa(LocalDate expiraLa) {
        this.expiraLa = expiraLa;
    }

    public boolean isOnorat() {
        return onorat;
    }

    public void setOnorat(boolean onorat) {
        this.onorat = onorat;
    }
}
