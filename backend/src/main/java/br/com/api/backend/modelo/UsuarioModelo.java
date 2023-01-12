package br.com.api.backend.modelo;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.util.List;
import java.util.UUID;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "usuario")
@Getter
@Setter
public class UsuarioModelo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "O campo nome não pode ser vázio")
    private String nome;

    @NotBlank(message = "O campo email não pode ser vázio")
    @Email(message = "Informe um endereço de email válido")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "O campo senha não pode ser vázio")
    @Size(min = 8, message = "A senha deve ter no minímo 8 caracteres")
    private String senha;
    
    @NotBlank(message = "O campo de confirmação de senha não pode ser vázio")
    private String confirmacaoSenha;
    
    @JsonManagedReference
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private List<GaleriaModelo> galeria;
   
    
    public boolean addImagem(GaleriaModelo gm){
        return galeria.add(gm);
    }
    
    public boolean deleteImage(UUID imagem_id){
        return galeria.removeIf(imagem -> imagem.getImagem_id().equals(imagem_id));
    }
    
    public GaleriaModelo visualizarImagem(Long imagem_id){
        return galeria.stream().filter(imagem -> imagem.getImagem_id().equals(imagem_id)).toList().get(0);
    }
    
    public void mudarFavorito(Long imagem_id){
        for(GaleriaModelo gm: galeria){
          int index = this.getGaleria().indexOf(gm);
          if(gm.getImagem_id().equals(imagem_id)){
             galeria.get(index).setFavorito(!gm.getFavorito());
          }
      }
    }
    
    public List<GaleriaModelo> verFavoritos(){
        return galeria.stream().filter(imagem -> imagem.getFavorito().equals(true)).toList();
    }
    
    public List<GaleriaModelo> findImage(String pesquisa){
        return galeria.stream().filter(imagem -> imagem.getTitulo().contains(pesquisa) || imagem.getData_publicacao().contains(pesquisa)).toList();
    }
}
