package com.projetos3.cicle.controller;

import com.projetos3.cicle.dto.TransacaoDTO;
import com.projetos3.cicle.model.Progresso;
import com.projetos3.cicle.model.Transacao;
import com.projetos3.cicle.repository.TransacaoRepository;
import com.projetos3.cicle.repository.UsuarioRepository;
import com.projetos3.cicle.service.CarbonService;
import com.projetos3.cicle.service.CashbackService;
import com.projetos3.cicle.service.GamificacaoService;
import com.projetos3.cicle.service.MetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transacoes")
@CrossOrigin(origins = "*")
public class TransacaoController {

    @Autowired CarbonService carbonService;
    @Autowired CashbackService cashbackService;
    @Autowired GamificacaoService gamificacaoService;
    @Autowired MetaService metaService;
    @Autowired TransacaoRepository transacaoRepo;
    @Autowired UsuarioRepository usuarioRepo;

    @PostMapping
    public ResponseEntity<?> registrar(@RequestBody TransacaoDTO dto) {
        Transacao t = new Transacao();
        t.setUsuarioId(dto.getUsuarioId());
        t.setTipo(dto.getTipo());
        t.setDistanciaKm(dto.getDistanciaKm());
        t.setDataHora(LocalDateTime.now());

        double emissao  = carbonService.calcularEmissao(dto.getTipo(), dto.getDistanciaKm());
        double economia = carbonService.calcularEconomia(dto.getTipo(), dto.getDistanciaKm());
        double cashback = cashbackService.converter(economia);

        t.setEmissaoCO2(emissao);
        t.setEconomiaCO2(economia);
        t.setCashbackGerado(cashback);
        transacaoRepo.save(t);

        // Atualiza saldo do usuário
        usuarioRepo.findById(dto.getUsuarioId()).ifPresent(u -> {
            u.setSaldoCashback(u.getSaldoCashback() + cashback);
            usuarioRepo.save(u);
        });

        // Atualiza gamificação
        Progresso progresso = gamificacaoService.atualizarProgresso(dto.getUsuarioId(), economia);

        // Atualiza emissão da meta mensal e coleta progresso
        metaService.atualizarEmissao(dto.getUsuarioId(), emissao);

        Map<String, Object> response = new HashMap<>();
        response.put("emissao_co2",  emissao);
        response.put("economia_co2", economia);
        response.put("cashback",     cashback);
        response.put("pontos",       progresso.getPontos());
        response.put("nivel",        progresso.getNivel());
        response.put("pecas",        progresso.getPecasDesbloqueadas());

        metaService.getProgressoAtual(dto.getUsuarioId())
                .ifPresent(meta -> response.put("meta", meta));

        return ResponseEntity.ok(response);
    }

    @GetMapping("/usuario/{id}")
    public List<Transacao> listar(@PathVariable Long id) {
        return transacaoRepo.findByUsuarioId(id);
    }
}