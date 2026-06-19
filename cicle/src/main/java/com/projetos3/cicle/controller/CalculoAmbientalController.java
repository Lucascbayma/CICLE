package com.projetos3.cicle.controller;

import com.projetos3.cicle.dto.CalculoAmbientalDTO;
import com.projetos3.cicle.model.CalculoAmbiental;
import com.projetos3.cicle.service.CalculoAmbientalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/calculos")
@CrossOrigin(origins = "*")
public class CalculoAmbientalController {

    @Autowired
    private CalculoAmbientalService calculoService;

    @PostMapping
    public Map<String, Object> salvar(@RequestBody CalculoAmbientalDTO dto) {
        return calculoService.salvar(dto);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<CalculoAmbiental> listarPorUsuario(@PathVariable Long usuarioId) {
        return calculoService.listarPorUsuario(usuarioId);
    }

    @GetMapping("/usuario/{usuarioId}/resumo")
    public Map<String, Object> resumoPorUsuario(@PathVariable Long usuarioId) {
        return calculoService.resumoPorUsuario(usuarioId);
    }
}