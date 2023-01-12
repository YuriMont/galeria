import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function Imagem(){
    const { usuario_id, imagem_id } = useParams();
    const [imagem, setImagem] = useState([])

    useEffect(() => {
       axios
      .get(`${import.meta.env.VITE_REACT_API_BACKEND_URL}/u/${usuario_id}/galeria${imagem_id}`)
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