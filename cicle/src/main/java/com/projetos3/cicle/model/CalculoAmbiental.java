package com.projetos3.cicle.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class CalculoAmbiental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long usuarioId;

    private Double transporteKm;
    private Boolean usaTransportePublico;
    private String tipoVeiculo;

    private Double energiaKwh;
    private Boolean usaEnergiaSolar;
    private String fonteEnergia;

    private Integer diasCarne;
    private Boolean alimentacaoPlantBased;
    private String dieta;

    private Integer voosAno;
    private Boolean viagemLongaDistancia;
    private String tipoViagem;

    private Integer itensConsumo;
    private Boolean consumoSustentavel;
    private String perfilConsumo;
    
    private Double emissaoTotal;
    private Double cashback;

    private LocalDateTime dataCriacao;
}