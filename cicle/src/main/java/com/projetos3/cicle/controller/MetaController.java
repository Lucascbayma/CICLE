package com.projetos3.cicle.controller;

import com.projetos3.cicle.model.Meta;
import com.projetos3.cicle.repository.MetaRepository;
import com.projetos3.cicle.service.MetaService;
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

    @Autowired
    private MetaService metaService;

    @PostMapping
    public ResponseEntity<Meta> criar(@RequestBody Meta meta) {
        if (meta.getMes() == null) meta.setMes(LocalDate.now().getMonthValue());
        if (meta.getAno() == null) meta.setAno(LocalDate.now().getYear());
        meta.setEmissaoAtual(0.0);
        return ResponseEntity.ok(repo.save(meta));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody Map<String, Double> body) {
        Double novoLimite = body.get("limiteKgCO2Mensal");
        if (novoLimite == null || novoLimite <= 0) {
            return ResponseEntity.badRequest().body("limiteKgCO2Mensal deve ser maior que zero");
        }
        try {
            Meta atualizada = metaService.atualizarLimite(id, novoLimite);
            return ResponseEntity.ok(atualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/usuario/{id}")
    public List<Meta> listar(@PathVariable Long id) {
        return repo.findByUsuarioId(id);
    }

    @GetMapping("/usuario/{id}/progresso")
    public ResponseEntity<?> progresso(@PathVariable Long id) {
        return metaService.getProgressoAtual(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/usuario/{id}/progresso/{mes}/{ano}")
    public ResponseEntity<?> progressoPorMes(
            @PathVariable Long id,
            @PathVariable Integer mes,
            @PathVariable Integer ano) {
        return metaService.getProgressoPorMeta(id, mes, ano)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}