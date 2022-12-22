package br.com.api.backend.modelo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "usuario")
@Getter
@Setter
public class UsuarioModelo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O campo nome não pode ser vázio")
    private String nome;

    @NotBlank(message = "O campo email não pode ser vázio")
    @Email(message = "Informe um endereço de email válido")
    private String email;

    @NotBlank(message = "O campo senha não pode ser vázio")
    @Size(min = 8, message = "A senha deve ter no minímo 8 caracteres")
    private String senha;
    
    @NotBlank(message = "O campo de confirmação de senha não pode ser vázio")
    private String confirmacaoSenha;
    
}
