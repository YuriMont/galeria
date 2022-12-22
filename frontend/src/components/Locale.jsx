import { BookmarkSimple, TrashSimple } from "phosphor-react";
import { Link } from "react-router-dom";

export function Locale({imagem_id, imagem, titulo, data_publicacao, favorito, favoritar, remover}) {

  return (
    <div className="flex flex-col items-center rounded-md border-[1.5px] border-transparent hover:border-gray-100 w-[280px] m-4">
      <div className="bg-violet-500 w-full rounded-t-md p-2">
        <h1 className="text-xl font-semibold text-gray-100">{titulo}</h1>
        <p className="text-sm">
          {data_publicacao}
        </p>
      </div>
      <Link to={`/imagem/${imagem_id}`}>
        <img src={imagem} alt="imagem" className="w-full h-[320px]" />
      </Link>
      <div className="flex items-center justify-end h-16 border-t-[2px] rounded-b-md border-t-gray-400 bg-gray-600 p-2 w-full">
        <button onClick={() => (remover(imagem_id))} className="cursor-pointer rounded-full hover:bg-gray-500 p-2">
          <TrashSimple size={28} weight="fill" />
        </button>
        <button
          onClick={() => (favoritar(imagem_id))}
          className="cursor-pointer rounded-full hover:bg-gray-500 p-2"
        >
          {favorito == true ? (
            <BookmarkSimple size={32} weight="fill" />
          ) : (
            <BookmarkSimple size={32} weight="regular"/>
          )}
        </button>
      </div>
    </div>
  );
}