import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import github from '../assets/github.png';
import { Input } from '../components/Input';
import axios from 'axios';


export function Login(){

    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    const [errors, setErrors] = useState();

    const [disabled, setDisabled] = useState(false);

    async function handleAddUser() {
        setDisabled(true)
        await axios.post("http://localhost:8080/login", {
            email: email,
            senha: senha
       }).then((response) => {
            navigate(`/u/${response.data}/galeria/`)
       }).catch((error) => {
            setErrors(error.response.data)
            setDisabled(false)
    });
    }

    return (
        <div className="min-h-screen w-screen flex flex-col items-center justify-center">
            <div className="sm:flex sm:justify-between gap-5 items-center">
                <div className="sm:max-w-[640px]">
                    <h1 className="text-gray-100 uppercase text-4xl mt-8 text-center">Faça login na plataforma</h1>
                </div>
                <div className="bg-gray-600 my-8 sm:mx-8 p-12 rounded sm:w-[480px]">
                    <div className="flex flex-col gap-3 border-b border-gray-400">
                        <Input 
                            text='Email' 
                            type='email'
                            error={errors?.mensagem == "emailInvalido" ? "Email não castrado":""}
                            add={setEmail}
                        />
                        
                        <Input 
                            text='Senha' 
                            type='password'
                            error={errors?.mensagem == "senhaInvalida" ? "Senha incorreta":""}
                            add={setSenha}
                        />
                        {/*<a href="" className="text-violet-500">Esqueci minha senha</a>*/}
                        <button 
                            onClick={handleAddUser} 
                            disabled={disabled}
                            className={`flex items-center justify-center gap-2 bg-violet-500 my-3 py-4 uppercase hover:bg-violet-400 transition-colors rounded font-bold text-white disabled:bg-violet-900 ${ disabled ? "cursor-wait" : "cursor-pointer"}`}>
                                Entrar {disabled ? <div className="border-[4px] border-violet-200 border-t-violet-600 rounded-full h-6 w-6 animate-spin z-10"/> : null}
                        </button>

                        <div className="text-center mb-4">
                            não tem conta?  <Link to={'/signup'} className="text-violet-500">Registre-se</Link>
                        </div>
                    </div>
                    <div className='flex items-center justify-center my-6 mx-auto'>
                        <p>Ou entre com</p> 
                        <a className='flex gap-4 sm:gap-6 items-center justify-center mx-4 sm:w-[230px] p-4 bg-gray-500 border border-gray-500 hover:border-violet-600 transition-colors uppercase font-bold rounded cursor-pointer'>
                            <img src={github} alt="git" />
                            github
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}