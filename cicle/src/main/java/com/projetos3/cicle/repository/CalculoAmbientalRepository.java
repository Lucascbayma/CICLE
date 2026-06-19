package com.projetos3.cicle.repository;

import com.projetos3.cicle.model.CalculoAmbiental;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CalculoAmbientalRepository extends JpaRepository<CalculoAmbiental, Long> {

    List<CalculoAmbiental> findByUsuarioIdOrderByDataCriacaoDesc(Long usuarioId);
}