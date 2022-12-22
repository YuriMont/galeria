package br.com.api.backend.repositorio;

import br.com.api.backend.modelo.UsuarioModelo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepositorio extends JpaRepository<UsuarioModelo, Long>{
    List<UsuarioModelo> findById(Integer id);
    
    @Query(value = "SELECT * FROM usuario WHERE email = :email", nativeQuery = true)
    UsuarioModelo findByEmail(@Param("email") String email);
    
    @Query(value = "SELECT * FROM usuario WHERE id = :usuario_id", nativeQuery = true)
    UsuarioModelo findByIdUsuario(@Param("usuario_id") Long id);
}
