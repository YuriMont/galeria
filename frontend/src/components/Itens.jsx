import { Locale } from "./Locale";
import { useParams } from "react-router-dom";
import axios from "axios";

export function Itens({galeria, setGaleria}){

  const { usuario_id } = useParams();

  async function favoritar(imagem_id){
    let imagem = galeria.filter((e) => e.imagem_id == imagem_id);
    let index = galeria.indexOf(imagem[0]);
    let imagens = [...galeria];
    imagens[index].favorito = !imagens[index].favorito;
    
    setGaleria(imagens);
    await axios.put(`http://localhost:8080/u/${usuario_id}/galeria`, {
      imagem_id: imagem[0].imagem_id,
      galeria_id: imagem[0].usuario_id,
      imagem: imagem[0].image,
      titulo: imagem[0].titulo,
      data_publicacao: imagem[0].data_publicacao,
      favorito: !imagem[0].favorito,
    });
  }

  async function remover(imagem_id){
    var imagens_filtradas = galeria.filter((e) => e.imagem_id != imagem_id);
    setGaleria(imagens_filtradas);
    await axios.delete(`http://localhost:8080/u/${usuario_id}/galeria?imagem_id=${imagem_id}`);
  }

    return(
        <div className="flex flex-col mt-0 items-center animate-focusIn sm:grid sm:grid-cols-3">
            {galeria.map((prop) => (
              <Locale
                galeria_id={prop.galeria_id}
                imagem_id={prop.imagem_id}
                imagem={prop.imagem}
                titulo={prop.titulo}
                data_publicacao={prop.data_publicacao}
                favorito={prop.favorito}
                favoritar={favoritar}
                remover={remover}
              />
            ))}
          </div>
    );
}