package com.projetos3.cicle.dto;

import lombok.Data;

@Data
public class CalculoAmbientalDTO {

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
}