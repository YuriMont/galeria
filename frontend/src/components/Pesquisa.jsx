import { useEffect, useState } from "react";
import { Itens } from "../components/Itens";

export function Pesquisa({ galeria, setGaleria }) {
  const [fotosPesquisadas, setFotosPesquisadas] = useState(galeria);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    let filtro = galeria.filter(
      (foto) =>
        foto.titulo.indexOf(pesquisa) != -1 ||
        foto.data_publicacao.indexOf(pesquisa) != -1
    );
    filtro != undefined ? setFotosPesquisadas(filtro) : setFotosPesquisadas([]);
  }, [pesquisa]);

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
        <input
          type="text"
          onChange={(e) => setPesquisa(e.target.value)}
          placeholder="Informe o titulo ou a data"
          className="mr-2 bg-gray-600 text-base p-[7px] outline-0 rounded min-w-[30vw] text-center"
        />

      <Itens galeria={fotosPesquisadas} setGaleria={setGaleria}/>
    </div>
  );
}
