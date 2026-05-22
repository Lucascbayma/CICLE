package com.projetos3.cicle.controller;

import com.projetos3.cicle.dto.GamificacaoDTO;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/gamificacao")
@CrossOrigin(origins = "*")
public class GamificacaoController {

    private double carbonoSimulado = 550.0;
    private List<String> paisesSalvos = new ArrayList<>();
    private final int CUSTO_PAIS = 250;

    @GetMapping("/status")
    public GamificacaoDTO getStatus() {
        int totalPossivel = (int) (carbonoSimulado / CUSTO_PAIS);
        int disponiveis = totalPossivel - paisesSalvos.size();
        double resto = carbonoSimulado % CUSTO_PAIS;
        double faltaProximo = CUSTO_PAIS - resto;

        GamificacaoDTO dto = new GamificacaoDTO();
        dto.setCarbonoAcumulado(carbonoSimulado);
        dto.setPaisesDisponiveis(Math.max(0, disponiveis));
        dto.setCarbonoProximoPais(faltaProximo);
        dto.setPaisesSalvos(paisesSalvos.toArray(new String[0]));
        return dto;
    }

    @PostMapping("/salvar")
    public GamificacaoDTO salvarPais(@RequestBody String paisId) {
        String idLimpo = paisId.replaceAll("\"", "").trim();
        int totalPossivel = (int) (carbonoSimulado / CUSTO_PAIS);
        int disponiveis = totalPossivel - paisesSalvos.size();

        if (disponiveis > 0 && !paisesSalvos.contains(idLimpo)) {
            paisesSalvos.add(idLimpo);
        }
        return getStatus();
    }

    @PostMapping("/adicionar")
    public GamificacaoDTO adicionarCarbono() {
        carbonoSimulado += 100.0;
        return getStatus();
    }

    @PostMapping("/resetar")
    public GamificacaoDTO resetar() {
        carbonoSimulado = 0.0;
        paisesSalvos.clear();
        return getStatus();
    }
}