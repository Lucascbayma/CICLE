package com.projetos3.cicle.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Meta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long usuarioId;
    private Double limiteKgCO2Mensal;
    private Double emissaoAtual = 0.0;
    private Integer mes;
    private Integer ano;
}