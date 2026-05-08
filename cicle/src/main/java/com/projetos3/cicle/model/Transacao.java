package com.projetos3.cicle.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Transacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long usuarioId;
    private String tipo; 
    private Double distanciaKm;
    private Double emissaoCO2;
    private Double economiaCO2;
    private Double cashbackGerado;
    private LocalDateTime dataHora;
}