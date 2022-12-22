import axios from "axios";
import {
  BookmarkSimple,
  List,
  MagnifyingGlass,
  Plus,
  SignOut,
  TrashSimple,
  User,
  X,
  Image,
} from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function Header({ option, setOption }) {
  const [viewMenu, setViewMenu] = useState(true);
  const { usuario_id } = useParams();
  const navigate = useNavigate();

  function handleChangeOption(numero) {
    setViewMenu(!viewMenu);
    setOption(numero);
  }

  function handleDeleteUser() {
    axios.delete(`localhost:8080/u/delete?usuario_id=${usuario_id}`);
    navigate("/");
  }

  function handleSingOut() {
    navigate("/");
  }

  return (
    <header>
      <nav className="bg-gray-900 border-b-2 border-gray-600 w-full h-[8vh] px-4 sm:px-16 flex items-center justify-around">
        <Link
          onClick={() => setOption(0)}
          to={`/u/${usuario_id}/galeria`}
          className="font-semibold text-white text-[24px] tracking-wider uppercase hover:opacity-[0.7] transition-all"
        >
          Galeria
        </Link>
        <button
          onClick={() => setViewMenu(!viewMenu)}
          className="cursor-pointer block sm:hidden transition-all"
        >
          {viewMenu ? (
            <List size={28} weight="bold" />
          ) : (
            <X size={28} weight="bold" />
          )}
        </button>
        <ul
          className={`bg-gray-900 sm:bg-transparent flex sm:relative absolute top-[8vh] sm:top-auto right-0 sm:right-auto w-full sm:w-auto h-[92vh] sm:h-auto flex-col sm:flex-row items-center justify-around sm:justify-start z-10 ${
            viewMenu ? "translate-x-full" : "translate-x-0"
          }  sm:translate-x-0 transition-all`}
        >
          {option != 1 ? (
            <li className="flex items-center tracking-wide ml-8 cursor-pointer hover:opacity-[0.7] transition-all">
              <MagnifyingGlass size={24} weight="bold" />
              <button
                onClick={() => handleChangeOption(1)}
                className="ml-2 text-gray-200 text-center text-xl"
              >
                Buscar
              </button>
            </li>
          ) : (
            <li className="flex items-center tracking-wide ml-8 cursor-pointer hover:opacity-[0.7] transition-all">
              <Image size={32} />
              <button
                onClick={() => handleChangeOption(0)}
                className="ml-2 text-gray-200 text-center text-xl"
              >
                Galeria
              </button>
            </li>
          )}
          {option != 2 ? (
            <li className="flex items-center tracking-wide ml-8 cursor-pointer hover:opacity-[0.7] transition-all">
              <Plus size={24} weight="bold" />
              <button
                onClick={() => handleChangeOption(2)}
                className="ml-2 text-gray-200 text-center text-xl"
              >
                Adicionar
              </button>
            </li>
          ) : (
            <li className="flex items-center tracking-wide ml-8 cursor-pointer hover:opacity-[0.7] transition-all">
              <Image size={32} />
              <button
                onClick={() => handleChangeOption(0)}
                className="ml-2 text-gray-200 text-center text-xl"
              >
                Galeria
              </button>
            </li>
          )}
          {option != 3 ? (
            <li className="flex items-center tracking-wide ml-8 cursor-pointer hover:opacity-[0.7] transition-all">
              <BookmarkSimple size={24} weight="bold" />{" "}
              <button
                onClick={() => handleChangeOption(3)}
                className="ml-2 text-gray-200 text-center text-xl"
              >
                Favoritos
              </button>
            </li>
          ) : (
            <li className="flex items-center tracking-wide ml-8 cursor-pointer hover:opacity-[0.7] transition-all">
              <Image size={32} />
              <button
                onClick={() => handleChangeOption(0)}
                className="ml-2 text-gray-200 text-center text-xl"
              >
                Galeria
              </button>
            </li>
          )}
          <li className="flex items-center">
            <details className="sm:fixed transition-all">
              <summary className="flex items-center tracking-wide ml-8 cursor-pointer hover:opacity-[0.7] transition-all">
                <User size={24} weight="bold" />
                <h1 className="ml-2 text-gray-200 text-center text-xl">
                  Usuario
                </h1>
              </summary>
              <div className="sm:absolute sm:left-0 sm:ml-auto ml-8 sm:bg-gray-800 sm:px-16 py-4">
                <button
                  onClick={handleDeleteUser}
                  className="flex items-center tracking-wide gap-2"
                >
                  <TrashSimple size={24} weight="bold" /> Deletar
                </button>
                <button
                  onClick={handleSingOut}
                  className="mt-4 flex items-center tracking-wide gap-2"
                >
                  {" "}
                  <SignOut size={24} weight="bold" /> Sair
                </button>
              </div>
            </details>
          </li>
        </ul>
      </nav>
    </header>
  );
}
