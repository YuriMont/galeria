package br.com.api.backend.controler;

import br.com.api.backend.modelo.GaleriaModelo;
import br.com.api.backend.modelo.LoginForm;
import br.com.api.backend.modelo.RespostaModelo;
import br.com.api.backend.modelo.UsuarioModelo;
import br.com.api.backend.servico.UsuarioServico;

import java.util.HashMap;
import java.util.Map;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "*")
public class UsuarioControle {

    @Autowired
    private UsuarioServico us;

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();

            errors.put(fieldName, errorMessage);
        });

        return errors;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(@RequestBody @Valid UsuarioModelo um) {
        return us.cadastrar(um);
    }

    @PostMapping("/login")
    public ResponseEntity<?> logar(@RequestBody LoginForm lf) {
        return us.logar(lf);
    }

    @DeleteMapping("/u/delete")
    public void deletarConta(@RequestParam(name = "usuario_id") Long usuario_id) {
        us.deletarConta(usuario_id);
    }

    @GetMapping("/")
    public String rota() {
        return "API funcionando";
    }

    @GetMapping("/u/all")
    public Iterable<UsuarioModelo> findAll() {
        return us.findAll();
    }

    @PostMapping("/u/{usuario_id}/galeria")
    public ResponseEntity<?> adicionar(@RequestBody @Valid GaleriaModelo gm, @PathVariable Long usuario_id) {
        return us.adicionarImagem(usuario_id, gm);
    }

    @GetMapping("/u/{usuario_id}/galeria")
    public Iterable<GaleriaModelo> galeria(@PathVariable Long usuario_id) {
        return us.listarImagens(usuario_id);
    }

    @GetMapping("/u/{usuario_id}/galeria/{imagem_id}")
    public ResponseEntity<GaleriaModelo> visualizarImagem(@PathVariable Long usuario_id, @PathVariable Long imagem_id) {
        return us.verImagem(usuario_id, imagem_id);
    }

    @GetMapping("u/{usuario_id}/galeria/find/{pesquisa}")
    public Iterable<GaleriaModelo> pesquisaImagens(@PathVariable Long usuario_id, @PathVariable String pesquisa) {
        return us.pesquisarImagens(pesquisa, usuario_id);
    }

    @PutMapping("/u/{usuario_id}/galeria/favorito")
    public void alterar_favorito(@PathVariable Long usuario_id, @RequestParam(name = "imagem_id") Long imagem_id) {
        us.favorito(imagem_id);
    }

    @GetMapping("/u/{usuario_id}/galeria/favoritos")
    public ResponseEntity<?> mostrarFavoritos(@PathVariable Long usuario_id) {
        return us.mostrarFavoritos(usuario_id);
    }

    @DeleteMapping("/u/{usuario_id}/galeria/{imagem_id}")
    public ResponseEntity<String> deletarImagem(@PathVariable Long usuario_id, @PathVariable Long imagem_id) {
        return us.deletarImagem(usuario_id, imagem_id);
    }

}
    
    
   
