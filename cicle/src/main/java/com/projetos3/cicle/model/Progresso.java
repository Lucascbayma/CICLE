package com.projetos3.cicle.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Progresso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long usuarioId;
    private Integer pontos = 0;
    private Integer nivel = 1;
    private String pecasDesbloqueadas = ""; // ex: "folha,arvore,gota"
}