package com.projetos3.cicle.dto;

import lombok.Data;

@Data
public class TransacaoDTO {
    private Long usuarioId;
    private String tipo;
    private Double distanciaKm;
}