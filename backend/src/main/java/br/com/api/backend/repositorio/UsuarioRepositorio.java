package br.com.api.backend.repositorio;

import br.com.api.backend.modelo.UsuarioModelo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepositorio extends JpaRepository<UsuarioModelo, Long>{
    
    @Query(value = "SELECT * FROM usuario WHERE email = :email", nativeQuery = true)
    UsuarioModelo findByEmail(@Param("email") String email);
}
