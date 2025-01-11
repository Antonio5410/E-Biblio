package org.example.ebiblio.model;

import jakarta.persistence.*;

@Entity
public class Carte {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titlu;
    private String autor;
    private String gen;
    private boolean disponibil;
    private int stocTotal; // Număr total de exemplare ale cărții
    private String descriere;

    // Getters și Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitlu() {
        return titlu;
    }

    public void setTitlu(String titlu) {
        this.titlu = titlu;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getGen() {
        return gen;
    }

    public void setGen(String gen) {
        this.gen = gen;
    }

    public boolean isDisponibil() {
        return disponibil;
    }

    public void setDisponibil(boolean disponibil) {
        this.disponibil = disponibil;
    }


    private int stoc;


    public int getStoc() {
        return stoc;
    }

    public void setStoc(int stoc) {
        this.stoc = stoc;
    }


    // Getters și Setters
    public int getStocTotal() {
        return stocTotal;
    }

    public void setStocTotal(int stocTotal) {
        this.stocTotal = stocTotal;
    }

    public String getDescriere() {
        return descriere;
    }

    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }
}