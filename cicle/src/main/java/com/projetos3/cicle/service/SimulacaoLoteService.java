package com.projetos3.cicle.service;

import com.projetos3.cicle.dto.CalculadoraResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Service
public class SimulacaoLoteService {

    private final double EMISSAO_TRANSACAO_DIGITAL = 0.000015;
    private final double EMISSAO_TRANSACAO_FISICA_PADRAO = 0.0001;
    private final double REDUCAO_RECICLADO = 0.35;

    public CalculadoraResponse processarArquivoCsv(MultipartFile file) throws Exception {
        double totalEmissoesCenarioAtual = 0.0;
        double totalEmissoes100FisicoPadrao = 0.0;


        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {

            String linha;
            boolean primeiraLinha = true;

            while ((linha = br.readLine()) != null) {

                if (primeiraLinha) {
                    primeiraLinha = false;
                    continue;
                }

                String[] colunas = linha.split(",");
                if (colunas.length < 3) continue;

                try {
                    int volumeTotal = Integer.parseInt(colunas[0].trim());
                    double pDigital = Double.parseDouble(colunas[1].trim()) / 100.0;
                    double pReciclado = Double.parseDouble(colunas[2].trim()) / 100.0;


                    int transacoesDigitais = (int) (volumeTotal * pDigital);
                    int transacoesFisicas = volumeTotal - transacoesDigitais;

                    double emissaoDigital = transacoesDigitais * EMISSAO_TRANSACAO_DIGITAL;

                    double fatorFisicoReciclado = EMISSAO_TRANSACAO_FISICA_PADRAO * (1 - REDUCAO_RECICLADO);
                    double emissaoFisica = (transacoesFisicas * pReciclado * fatorFisicoReciclado) +
                            (transacoesFisicas * (1 - pReciclado) * EMISSAO_TRANSACAO_FISICA_PADRAO);

                    // Acumula os valores globais da empresa
                    totalEmissoesCenarioAtual += (emissaoFisica + emissaoDigital);
                    totalEmissoes100FisicoPadrao += (volumeTotal * EMISSAO_TRANSACAO_FISICA_PADRAO);

                } catch (NumberFormatException e) {

                    System.err.println("Erro ao converter linha do CSV: " + linha);
                }
            }
        }


        double carbonoEconomizado = totalEmissoes100FisicoPadrao - totalEmissoesCenarioAtual;
        int arvoresSalvas = (int) (carbonoEconomizado / 15.0);

        return new CalculadoraResponse(
                totalEmissoesCenarioAtual,
                totalEmissoes100FisicoPadrao,
                carbonoEconomizado,
                arvoresSalvas
        );
    }
}