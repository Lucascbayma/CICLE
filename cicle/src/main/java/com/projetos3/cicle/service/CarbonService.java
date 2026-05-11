package com.projetos3.cicle.service;

import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class CarbonService {

    // kg de CO2 emitido por km percorrido
    private static final Map<String, Double> FATORES_CO2 = Map.of(
            "carro",               0.21,
            "aviao",               0.255,
            "transporte_publico",  0.05,
            "bicicleta",           0.0,
            "a_pe",                0.0
    );

    public Double calcularEmissao(String tipo, Double km) {
        return FATORES_CO2.getOrDefault(tipo, 0.21) * km;
    }

    public Double calcularEconomia(String tipo, Double km) {
        double emissaoCarro   = 0.21 * km;
        double emissaoEscolha = calcularEmissao(tipo, km);
        return Math.max(0, emissaoCarro - emissaoEscolha);
    }
}