package br.com.api.backend.servico;

import br.com.api.backend.modelo.GaleriaModelo;
import br.com.api.backend.modelo.LoginForm;
import br.com.api.backend.modelo.RespostaModelo;
import br.com.api.backend.modelo.UsuarioModelo;
import br.com.api.backend.repositorio.GaleriaRepositorio;
import br.com.api.backend.repositorio.UsuarioRepositorio;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServico {
    
    @Autowired
    private UsuarioRepositorio ur;
    
    @Autowired
    private GaleriaRepositorio gr;
    
    @Autowired
    private RespostaModelo rm;
    
    //Método para logar
    public ResponseEntity<?> logar(LoginForm lf){

        UsuarioModelo usuario = ur.findByEmail(lf.getEmail());
        if(usuario == null){
            rm.setMensagem("emailInvalido");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }
        else if(!usuario.getSenha().equals(lf.getSenha())){
            rm.setMensagem("senhaInvalida");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }
        
        return new ResponseEntity<Long>(usuario.getId(), HttpStatus.ACCEPTED);
        
    }
    
    //Método para mostrar tudo
    public Iterable<UsuarioModelo> findAll(){
        return ur.findAll();
    }
    
    //Método para cadastrar usuários
    public ResponseEntity<?> cadastrar(UsuarioModelo um){
        UsuarioModelo usuario = ur.findByEmail(um.getEmail());
        if(usuario != null){
            rm.setMensagem("O email já está sendo utilizado");
            return new ResponseEntity<RespostaModelo>(rm,HttpStatus.BAD_REQUEST);
        }
        else if(!um.getSenha().equals(um.getConfirmacaoSenha())){
            rm.setMensagem("confirmeSenha");
            return new ResponseEntity<RespostaModelo>(rm,HttpStatus.BAD_REQUEST);
        }
        
        return new ResponseEntity<UsuarioModelo>(ur.save(um),HttpStatus.CREATED);
    }
    
    //Método para excluir conta
    public void deletarConta(Long usuario_id){
        UsuarioModelo um = ur.getReferenceById(usuario_id);
        ur.delete(um);
    }
    
    //Método para adicionar imagem
    public ResponseEntity<GaleriaModelo> adicionarImagem(Long usuario_id, GaleriaModelo gm){
       gr.save(gm);
       return ResponseEntity.ok(ur.getReferenceById(usuario_id).visualizarImagem(gm.getImagem_id()));
    }
    
    //Método para visualizar imagens
    public Iterable<GaleriaModelo> listarImagens(Long usuario_id){
        return ur.getReferenceById(usuario_id).getGaleria();
    }
    
    //Método para visualizar imagem
    public ResponseEntity<GaleriaModelo> verImagem(Long usuario_id, Long imagem_id){
        return ResponseEntity.ok(ur.getReferenceById(usuario_id).visualizarImagem(imagem_id));
    }
    
    //Método para pesquisar imagem
    public Iterable<GaleriaModelo> pesquisarImagens(String pesquisa, Long usuario_id){
        return ur.getReferenceById(usuario_id).findImage(pesquisa);
    }
    
    //Método para atualizar os favoritos
    public void favorito(Long imagem_id){
        GaleriaModelo gm = gr.getReferenceById(imagem_id);
        gm.setFavorito(!gm.getFavorito());
        gr.save(gm);
    }
    
    //Método para mostrar os favoritos
    public ResponseEntity<?> mostrarFavoritos(Long usuario_id){
        List <GaleriaModelo> favoritos = ur.getReferenceById(usuario_id).verFavoritos();
        if(favoritos.isEmpty()){
            rm.setMensagem("Nenhuma mensagem foi adicionada aos favoritos");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Iterable>(favoritos, HttpStatus.OK);
        
    }
    
    //Método para deletar imagem
    public ResponseEntity<String> deletarImagem(Long usuario_id, Long imagem_id){
        UsuarioModelo um = ur.getReferenceById(usuario_id);
        GaleriaModelo gm = um.getGaleria().remove(um.getGaleria().indexOf(gr.getReferenceById(imagem_id)));
        gr.delete(gm);
        if(um.getGaleria().contains(gm)){
            return new ResponseEntity<String>("Imagem não removida", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<String>("Imagem removida", HttpStatus.OK);
    }
    
    
    
    
   
}
