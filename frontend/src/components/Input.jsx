import { EnvelopeSimple, Eye, EyeSlash, LockSimple, User } from "phosphor-react";
import { useState } from "react";


export function Input({type, text, error, add}){

    const [tipo, setTipo] = useState(type)

    function mudarTipo(){
        if (tipo==='password') {
            setTipo('text')
        }
        else{
            setTipo('password')
        }
    }

    function handlleAdd(event){
        add(event.target.value);
    }

    return (
        <div>
            <div className="flex items-center gap-3 bg-gray-900 rounded px-5 h-14 focus-within:border-[2.5px] border-purple-600">
                {
                    type === 'email' ? <EnvelopeSimple size={32} weight="fill"/> : type === 'text' ? <User size={32} weight="fill" /> : <LockSimple size={32} weight="fill" />
                }
                <input type={tipo} placeholder={text} className="outline-none w-full bg-transparent transition" onChange={(event) => (handlleAdd(event))}/>
                {
                    type === 'password' &&
                    <button onClick={mudarTipo} className="transition"> {tipo === 'password' ? 
                        <Eye size={24} weight="fill" /> :
                        <EyeSlash size={24} weight="fill" />}
                    </button>
                }
            </div>
            <p className="text-red-600 text-sm">{error}</p>
        </div>
    );
}