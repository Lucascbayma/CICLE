package com.projetos3.cicle.repository;

import com.projetos3.cicle.model.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
    List<Transacao> findByUsuarioId(Long usuarioId);
}