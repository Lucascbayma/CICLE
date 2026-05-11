package com.projetos3.cicle.controller;

import com.projetos3.cicle.model.Meta;
import com.projetos3.cicle.repository.MetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/metas")
@CrossOrigin(origins = "*")
public class MetaController {

    @Autowired
    private MetaRepository repo;

    @PostMapping
    public ResponseEntity<Meta> criar(@RequestBody Meta meta) {
        // Se não informar mês/ano, usa o atual
        if (meta.getMes() == null) meta.setMes(LocalDate.now().getMonthValue());
        if (meta.getAno() == null) meta.setAno(LocalDate.now().getYear());
        meta.setEmissaoAtual(0.0);
        return ResponseEntity.ok(repo.save(meta));
    }

    @GetMapping("/usuario/{id}")
    public List<Meta> listar(@PathVariable Long id) {
        return repo.findByUsuarioId(id);
    }

    @GetMapping("/usuario/{id}/progresso")
    public ResponseEntity<?> progresso(@PathVariable Long id) {
        int mes = LocalDate.now().getMonthValue();
        int ano = LocalDate.now().getYear();

        return repo.findByUsuarioIdAndMesAndAno(id, mes, ano)
                .map(meta -> {
                    double percentual = (meta.getEmissaoAtual() / meta.getLimiteKgCO2Mensal()) * 100;
                    boolean alerta = percentual >= 80;
                    return ResponseEntity.ok(Map.of(
                            "limite",     meta.getLimiteKgCO2Mensal(),
                            "emitido",    meta.getEmissaoAtual(),
                            "percentual", percentual,
                            "alerta",     alerta
                    ));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}