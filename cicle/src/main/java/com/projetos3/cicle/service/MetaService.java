package com.projetos3.cicle.service;

import com.projetos3.cicle.model.Meta;
import com.projetos3.cicle.repository.MetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

@Service
public class MetaService {

    @Autowired
    private MetaRepository metaRepository;

    public void atualizarEmissao(Long usuarioId, Double emissaoCO2) {
        int mes = LocalDate.now().getMonthValue();
        int ano = LocalDate.now().getYear();
        metaRepository.findByUsuarioIdAndMesAndAno(usuarioId, mes, ano)
                .ifPresent(meta -> {
                    meta.setEmissaoAtual(meta.getEmissaoAtual() + emissaoCO2);
                    metaRepository.save(meta);
                });
    }

    public Optional<Map<String, Object>> getProgressoAtual(Long usuarioId) {
        int mes = LocalDate.now().getMonthValue();
        int ano = LocalDate.now().getYear();
        return metaRepository.findByUsuarioIdAndMesAndAno(usuarioId, mes, ano)
                .map(this::calcularProgresso);
    }

    public Optional<Map<String, Object>> getProgressoPorMeta(Long usuarioId, Integer mes, Integer ano) {
        return metaRepository.findByUsuarioIdAndMesAndAno(usuarioId, mes, ano)
                .map(this::calcularProgresso);
    }

    public Meta atualizarLimite(Long metaId, Double novoLimite) {
        return metaRepository.findById(metaId)
                .map(meta -> {
                    meta.setLimiteKgCO2Mensal(novoLimite);
                    return metaRepository.save(meta);
                })
                .orElseThrow(() -> new RuntimeException("Meta não encontrada: " + metaId));
    }

    private Map<String, Object> calcularProgresso(Meta meta) {
        double limite = meta.getLimiteKgCO2Mensal();
        double emitido = meta.getEmissaoAtual();
        double percentual = limite > 0 ? (emitido / limite) * 100.0 : 0.0;
        boolean alerta = percentual >= 80.0;
        return Map.of(
                "metaId",     meta.getId(),
                "limite",     limite,
                "emitido",    emitido,
                "percentual", percentual,
                "alerta",     alerta
        );
    }
}
