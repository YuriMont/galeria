package br.com.api.backend.servico;

import br.com.api.backend.modelo.GaleriaModelo;
import br.com.api.backend.modelo.LoginForm;
import br.com.api.backend.modelo.RespostaModelo;
import br.com.api.backend.modelo.UsuarioModelo;
import br.com.api.backend.repositorio.GaleriaRepositorio;
import br.com.api.backend.repositorio.UsuarioRepositorio;
import java.util.ArrayList;
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
        UsuarioModelo um = ur.findByIdUsuario(usuario_id);
        ur.delete(um);
    }
    
    //Método para adicionar imagem
    public ResponseEntity<?> adicionarImagem(GaleriaModelo gm){
       if(gm.getImagem().equals(null)||gm.getTitulo().equals(null)){
           rm.setMensagem("Preencha todos os dados");
           return new ResponseEntity<RespostaModelo>(rm,HttpStatus.BAD_REQUEST);
       }
       return new ResponseEntity<GaleriaModelo>(gr.save(gm),HttpStatus.CREATED);
    }
    
    //Método para visualizar imagens
    public Iterable<GaleriaModelo> listarImagens(Long usuario_id){
        if(!ur.findById(usuario_id).isEmpty()){
            return gr.pesquisarPorUsuario(usuario_id);
        }
        return null;
    }
    
    //Método para visualizar imagem
    public Iterable listarImagem(Long imagem_id){
        List<GaleriaModelo> list = new ArrayList<GaleriaModelo>();
        list.add(gr.pesquisarPorImagemId(imagem_id));
        return list;
    }
    
    //Método para pesquisar imagem
    public Iterable pesquisarImagens(String pesquisa, Long usuario_id){
        if(gr.pesquisarImagens(pesquisa, usuario_id).isEmpty()){
            return null;
        }
        else{
            return gr.pesquisarImagens(pesquisa, usuario_id);
        }
    }
    
    //Método para atualizar os favoritos
    public void favorito(GaleriaModelo gm){
        GaleriaModelo imagem = gr.pesquisarPorImagemId(gm.getImagem_id());
        if(imagem!=null){
            imagem.setFavorito(!imagem.getFavorito());
            gr.save(imagem);
        }
    }
    
    //Método para mostrar os favoritos
    public ResponseEntity<?> mostrarFavoritos(Long usuario_id){
        List <GaleriaModelo> favoritos = gr.favoritos(usuario_id);
        if(favoritos.isEmpty()){
            rm.setMensagem("Nenhuma mensagem foi adicionada aos favoritos");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Iterable>(favoritos, HttpStatus.CREATED);
        
    }
    
    //Método para deletar imagem
    public void deletarImagem(Long imagem_id){
        GaleriaModelo gm = gr.pesquisarPorImagemId(imagem_id);
        gr.delete(gm);
    }
    
    
    
    
   
}
