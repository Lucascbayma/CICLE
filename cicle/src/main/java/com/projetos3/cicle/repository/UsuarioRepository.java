package com.projetos3.cicle.repository;

import com.projetos3.cicle.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}