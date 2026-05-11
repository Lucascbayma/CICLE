package com.projetos3.cicle.service;

import org.springframework.stereotype.Service;

@Service
public class CashbackService {

    // R$ 0,10 por kg de CO2 economizado
    private static final double TAXA = 0.10;

    public Double converter(Double economiaCO2) {
        return economiaCO2 * TAXA;
    }
}