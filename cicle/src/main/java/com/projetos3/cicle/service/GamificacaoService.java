package com.projetos3.cicle.service;

import com.projetos3.cicle.model.Progresso;
import com.projetos3.cicle.repository.ProgressoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class GamificacaoService {

    @Autowired
    private ProgressoRepository repo;

    // Pontos mínimos para desbloquear cada peça
    private static final Map<Integer, String> RECOMPENSAS = Map.of(
            10,  "folha",
            25,  "arvore",
            50,  "gota",
            100, "sol",
            200, "planeta"
    );

    public Progresso atualizarProgresso(Long usuarioId, Double economiaCO2) {
        Progresso p = repo.findByUsuarioId(usuarioId)
                .orElseGet(() -> {
                    Progresso novo = new Progresso();
                    novo.setUsuarioId(usuarioId);
                    novo.setPontos(0);
                    novo.setNivel(1);
                    novo.setPecasDesbloqueadas("");
                    return novo;
                });

        // 1 ponto a cada 0,1 kg de CO2 economizado
        int pontosGanhos = (int)(economiaCO2 * 10);
        p.setPontos(p.getPontos() + pontosGanhos);

        // Nível sobe a cada 50 pontos
        p.setNivel((p.getPontos() / 50) + 1);

        // Verifica quais peças desbloquear
        RECOMPENSAS.forEach((threshold, peca) -> {
            if (p.getPontos() >= threshold && !p.getPecasDesbloqueadas().contains(peca)) {
                String atual = p.getPecasDesbloqueadas();
                p.setPecasDesbloqueadas(atual.isEmpty() ? peca : atual + "," + peca);
            }
        });

        return repo.save(p);
    }

    public Progresso buscarProgresso(Long usuarioId) {
        return repo.findByUsuarioId(usuarioId).orElseGet(() -> {
            Progresso novo = new Progresso();
            novo.setUsuarioId(usuarioId);
            novo.setPontos(0);
            novo.setNivel(1);
            novo.setPecasDesbloqueadas("");
            return repo.save(novo);
        });
    }
}