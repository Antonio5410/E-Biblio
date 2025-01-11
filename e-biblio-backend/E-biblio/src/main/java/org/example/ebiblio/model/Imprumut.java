package org.example.ebiblio.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Imprumut {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "carte_id", nullable = false)
    private Long carteId;

    @Column(nullable = false)
    private LocalDate dataImprumut;

    @Column(nullable = false)
    private Long perioada; // Perioada în zile

    @Column(nullable = false)
    private LocalDate dataReturnare;

    @Column(nullable = false)
    private boolean returnat = false;

    // Getteri și setteri
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

    public LocalDate getDataImprumut() {
        return dataImprumut;
    }

    public void setDataImprumut(LocalDate dataImprumut) {
        this.dataImprumut = dataImprumut;
    }

    public Long getPerioada() {
        return perioada;
    }

    public void setPerioada(Long perioada) {
        this.perioada = perioada;
    }

    public LocalDate getDataReturnare() {
        return dataReturnare;
    }

    public void setDataReturnare(LocalDate dataReturnare) {
        this.dataReturnare = dataReturnare;
    }

    public boolean isReturnat() {
        return returnat;
    }

    public void setReturnat(boolean returnat) {
        this.returnat = returnat;
    }
}
