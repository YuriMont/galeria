package br.com.api.backend.modelo;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "galeria")
@Getter
@Setter
public class GaleriaModelo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imagem_id;
    
    @NotBlank(message = "O campo da imagem não pode ser vázio")
    private String imagem;
    
    @NotBlank(message = "O campo do titulo não pode ser vázio")
    private String titulo;
    
    private Boolean favorito = false;
    
    @NotBlank(message = "O campo do data não pode ser vázio")
    private String data_publicacao;
    
    @NotNull(message = "O campo usuario_id não pode ser vázio")
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private UsuarioModelo usuario;

    
    
}
