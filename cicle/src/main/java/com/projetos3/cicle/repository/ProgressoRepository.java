package com.projetos3.cicle.repository;

import com.projetos3.cicle.model.Progresso;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProgressoRepository extends JpaRepository<Progresso, Long> {
    Optional<Progresso> findByUsuarioId(Long usuarioId);
}