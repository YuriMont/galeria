package br.com.api.backend.repositorio;

import br.com.api.backend.modelo.GaleriaModelo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GaleriaRepositorio extends JpaRepository<GaleriaModelo, Long>{

    @Query(value = "SELECT * FROM galeria WHERE titulo like %:pesquisa% OR data_publicacao like %:pesquisa% AND galeria_id = :galeria_id", nativeQuery = true)
    List<GaleriaModelo> pesquisarImagens (@Param("pesquisa") String pesquisa, @Param("galeria_id") Long usuario_id);
}
