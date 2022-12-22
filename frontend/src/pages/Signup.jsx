import { ArrowLeft } from "phosphor-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { useState } from "react";

import axios from "axios";

export function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");

  const [errors, setErrors] = useState();

  const [disabled, setDisabled] = useState(false);

  async function handleAddUser() {
    setDisabled(true);
    await axios
      .post("http://localhost:8080/cadastro", {
        nome: name,
        email: emailAddress,
        senha: password,
        confirmacaoSenha: confirmacaoSenha,
      })
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        setErrors(error.response.data);
        setDisabled(false);
      });
  }

  return (
    <div className="min-h-screen w-screen pb-4 flex flex-col sm:items-center sm:justify-center">
      <div className="sm:flex sm:justify-between gap-5 items-center">
        <div className="bg-gray-600 sm:m-8 p-12 rounded sm:w-[480px]">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold mb-8">Crie uma conta</h1>
            <Input
              text="Seu email"
              type="email"
              error={
                errors?.email != undefined
                  ? errors.email
                  : errors?.mensagem != undefined &&
                    errors?.mensagem != "confirmeSenha"
                  ? errors.mensagem
                  : ""
              }
              add={setEmailAddress}
            />

            <Input text="Seu nome" type="text" error="" add={setName} />

            <Input
              text="Sua senha"
              type="password"
              error={errors?.senha != undefined ? errors.senha : ""}
              add={setPassword}
            />

            <Input
              text="Confirme sua senha"
              type="password"
              error={
                errors?.confirmacaoSenha != undefined
                  ? errors.confirmacaoSenha
                  : errors?.mensagem == "confirmeSenha"
                  ? "As senhas não são identicas"
                  : ""
              }
              add={setConfirmacaoSenha}
            />

            <p className="text-sm text-center my-2">
              Ao se registrar, você aceita nossos termos de uso e a nossa
              política de privacidade.
            </p>
            <button
              disabled={disabled}
              onClick={handleAddUser}
              className={`flex items-center justify-center gap-2 bg-violet-500 my-3 p-4 uppercase hover:bg-violet-400 transition-colors rounded font-bold text-white disabled:bg-violet-900 ${disabled ? "cursor-wait" : "cursor-pointer"}`}
            >
              Cadastre-se
              {disabled ? (
                <div className="border-[4px] border-violet-200 border-t-violet-600 rounded-full h-6 w-6 animate-spin z-10" />
              ) : null}
            </button>
          </div>
        </div>
        <div className="sm:max-w-[580px] p-4">
          <h1 className="text-gray-100 uppercase text-4xl mt-8 font-extrabold text-left">
            Lorem ipsum, dolor sit amet consectetur adipisicing.
          </h1>
          <p className="text-base my-8">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Laboriosam, illum.
          </p>
          <Link
            to={"../"}
            className="flex items-center gap-4 text-violet-600 font-semibold"
          >
            <ArrowLeft size={24} weight="fill" />
            Voltar para login
          </Link>
        </div>
      </div>
    </div>
  );
}
