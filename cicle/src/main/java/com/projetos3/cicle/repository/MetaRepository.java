package com.projetos3.cicle.repository;

import com.projetos3.cicle.model.Meta;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface MetaRepository extends JpaRepository<Meta, Long> {
    Optional<Meta> findByUsuarioIdAndMesAndAno(Long usuarioId, Integer mes, Integer ano);
    List<Meta> findByUsuarioId(Long usuarioId);
}