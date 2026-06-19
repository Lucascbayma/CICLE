package com.projetos3.cicle.service;

import com.projetos3.cicle.dto.CalculoAmbientalDTO;
import com.projetos3.cicle.model.CalculoAmbiental;
import com.projetos3.cicle.model.Progresso;
import com.projetos3.cicle.repository.CalculoAmbientalRepository;
import com.projetos3.cicle.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CalculoAmbientalService {

    @Autowired
    private CalculoAmbientalRepository calculoRepository;

    @Autowired
    private MetaService metaService;

    @Autowired
    private GamificacaoService gamificacaoService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Map<String, Object> salvar(CalculoAmbientalDTO dto) {
        CalculoAmbiental calculo = new CalculoAmbiental();

        calculo.setUsuarioId(dto.getUsuarioId());

        calculo.setTransporteKm(dto.getTransporteKm());
        calculo.setUsaTransportePublico(dto.getUsaTransportePublico());
        calculo.setTipoVeiculo(dto.getTipoVeiculo());

        calculo.setEnergiaKwh(dto.getEnergiaKwh());
        calculo.setUsaEnergiaSolar(dto.getUsaEnergiaSolar());
        calculo.setFonteEnergia(dto.getFonteEnergia());

        calculo.setDiasCarne(dto.getDiasCarne());
        calculo.setAlimentacaoPlantBased(dto.getAlimentacaoPlantBased());
        calculo.setDieta(dto.getDieta());

        calculo.setVoosAno(dto.getVoosAno());
        calculo.setViagemLongaDistancia(dto.getViagemLongaDistancia());
        calculo.setTipoViagem(dto.getTipoViagem());

        calculo.setItensConsumo(dto.getItensConsumo());
        calculo.setConsumoSustentavel(dto.getConsumoSustentavel());
        calculo.setPerfilConsumo(dto.getPerfilConsumo());

        double emissaoTotal = dto.getEmissaoTotal() != null ? dto.getEmissaoTotal() : 0.0;
        double cashback = dto.getCashback() != null ? dto.getCashback() : 0.0;

        calculo.setEmissaoTotal(emissaoTotal);
        calculo.setCashback(cashback);
        calculo.setDataCriacao(LocalDateTime.now());

        CalculoAmbiental salvo = calculoRepository.save(calculo);

        metaService.atualizarEmissao(dto.getUsuarioId(), emissaoTotal);

        double economiaCO2 = Math.max(0, 400 - emissaoTotal);
        Progresso progresso = gamificacaoService.atualizarProgresso(dto.getUsuarioId(), economiaCO2);

        usuarioRepository.findById(dto.getUsuarioId()).ifPresent(usuario -> {
            double saldoAtual = usuario.getSaldoCashback() != null ? usuario.getSaldoCashback() : 0.0;
            usuario.setSaldoCashback(saldoAtual + cashback);
            usuarioRepository.save(usuario);
        });

        Map<String, Object> response = new HashMap<>();
        response.put("calculo", salvo);
        response.put("emissaoTotal", emissaoTotal);
        response.put("cashback", cashback);
        response.put("economiaCO2", economiaCO2);
        response.put("pontos", progresso.getPontos());
        response.put("nivel", progresso.getNivel());
        response.put("pecasDesbloqueadas", progresso.getPecasDesbloqueadas());

        metaService.getProgressoAtual(dto.getUsuarioId())
                .ifPresent(meta -> response.put("meta", meta));

        return response;
    }

    public List<CalculoAmbiental> listarPorUsuario(Long usuarioId) {
        return calculoRepository.findByUsuarioIdOrderByDataCriacaoDesc(usuarioId);
    }

    public Map<String, Object> resumoPorUsuario(Long usuarioId) {
        List<CalculoAmbiental> calculos = listarPorUsuario(usuarioId);

        double emissaoTotal = calculos.stream()
                .mapToDouble(c -> c.getEmissaoTotal() != null ? c.getEmissaoTotal() : 0.0)
                .sum();

        double cashbackTotal = calculos.stream()
                .mapToDouble(c -> c.getCashback() != null ? c.getCashback() : 0.0)
                .sum();

        Map<String, Object> resumo = new HashMap<>();
        resumo.put("usuarioId", usuarioId);
        resumo.put("totalCalculos", calculos.size());
        resumo.put("emissaoTotal", emissaoTotal);
        resumo.put("cashbackTotal", cashbackTotal);

        return resumo;
    }
}