package com.projetos3.cicle.controller;

import com.projetos3.cicle.dto.CalculadoraRequest;
import com.projetos3.cicle.dto.CalculadoraResponse;
import com.projetos3.cicle.service.SimulacaoLoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/calculadora")
@CrossOrigin(origins = "*")
public class CalculadoraController {

    private final double EMISSAO_TRANSACAO_DIGITAL = 0.000015;
    private final double EMISSAO_TRANSACAO_FISICA_PADRAO = 0.0001;
    private final double REDUCAO_RECICLADO = 0.35;

    @Autowired
    private SimulacaoLoteService loteService;

    @PostMapping("/simular")
    public CalculadoraResponse simularEmissoes(@RequestBody CalculadoraRequest request) {
        int volumeTotal = request.getVolumeTransacoes();
        double pDigital = request.getPercentualDigital() / 100.0;
        double pReciclado = request.getPercentualReciclado() / 100.0;

        int transacoesDigitais = (int) (volumeTotal * pDigital);
        int transacoesFisicas = volumeTotal - transacoesDigitais;

        double emissaoDigital = transacoesDigitais * EMISSAO_TRANSACAO_DIGITAL;

        double fatorFisicoReciclado = EMISSAO_TRANSACAO_FISICA_PADRAO * (1 - REDUCAO_RECICLADO);
        double emissaoFisica = (transacoesFisicas * pReciclado * fatorFisicoReciclado) +
                (transacoesFisicas * (1 - pReciclado) * EMISSAO_TRANSACAO_FISICA_PADRAO);

        double emissoesCenarioAtual = emissaoFisica + emissaoDigital;
        double emissoesCenario100FisicoPadrao = volumeTotal * EMISSAO_TRANSACAO_FISICA_PADRAO;

        double carbonoEconomizado = emissoesCenario100FisicoPadrao - emissoesCenarioAtual;
        int arvoresSalvas = (int) (carbonoEconomizado / 15.0);

        return new CalculadoraResponse(emissoesCenarioAtual, emissoesCenario100FisicoPadrao, carbonoEconomizado, arvoresSalvas);
    }

    @PostMapping(value = "/simular-lote", consumes = {"multipart/form-data"})
    public ResponseEntity<?> simularEmissoesEmLote(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("O arquivo CSV não pode estar vazio.");
        }

        try {
            CalculadoraResponse response = loteService.processarArquivoCsv(file);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao processar o arquivo: " + e.getMessage());
        }
    }
}