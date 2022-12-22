import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddPhoto } from "../components/AddPhoto";
import { Header } from "../components/Header";
import { Itens } from "../components/Itens";
import { Pesquisa } from "../components/Pesquisa";


export function Home() {
  const { usuario_id } = useParams();

  const [option, setOption] = useState();

  const [favoritos, setFavoritos] = useState();
  
  const [galeria, setGaleria] = useState([]);

  useEffect(() => {
    let fav = galeria.filter((foto) => foto.favorito == true);
    setFavoritos(fav);
  }, [galeria]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/u/${usuario_id}/galeria`)
      .then((response) => {
        setGaleria(response.data);
        console.log(response.data)
      });
  }, []);


  function mostrarComponente() {
    switch (option) {
      case 0:
        return <Itens galeria={galeria} setGaleria={setGaleria}/>;

        break;
      case 1:
        return <Pesquisa galeria={galeria} setGaleria={setGaleria}/>;
        break;
      case 2:
        return <AddPhoto setGaleria={setGaleria} galeria={galeria} setOption={setOption}/>;
        break;
      case 3:
        return <Itens galeria={favoritos} setGaleria={setFavoritos}/>;
        break;
      default:
        return <Itens galeria={galeria} setGaleria={setGaleria}/>;
        break;
    }
  }

  return (
    <div className="flex flex-col justify-center">
      <Header option={option} setOption={setOption} />
      <main className="flex flex-col items-center py-4 justify-center ">
        {mostrarComponente(option)}
      </main>
    </div>
  );
}