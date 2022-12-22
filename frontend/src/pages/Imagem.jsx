import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function Imagem(){
    const { imagem_id } = useParams();
    const [imagem, setImagem] = useState([])

    useEffect(() => {
       axios
      .get(`http://localhost:8080/galeria?imagem_id=${imagem_id}`)
      .then((response) => {
        setImagem(response.data[0].imagem);
      });
    }, [])

    return (
        <main className="flex h-[100vh] w-[100vw] items-center justify-center">
            <img src={imagem} alt="imagem" />
        </main>
    );
}