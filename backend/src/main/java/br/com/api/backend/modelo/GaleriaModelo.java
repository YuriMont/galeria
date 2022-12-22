package br.com.api.backend.modelo;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "galeria")
@Getter
@Setter
public class GaleriaModelo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long imagem_id;
    
    private Long galeria_id; 
    @NotBlank(message = "O campo da imagem não pode ser vázio")
    private String imagem;
    @NotBlank(message = "O campo do titulo não pode ser vázio")
    private String titulo;
    private Boolean favorito;
    @NotBlank(message = "O campo do data não pode ser vázio")
    private String data_publicacao;
    
}
