import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import vazio from '../assets/vazio.png';

export function AddPhoto({setGaleria, galeria, setOption}){

    const [image, setImage] = useState(vazio);
    const [titulo, setTitulo] = useState("");
    const {usuario_id} = useParams();
    const [desabilitar, setDesabilitar] = useState(false);
    const [texto, setTexto] = useState("adicionar")

    const previewImage = (e) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            e !== null ? setImage(String(e.target.result)) : null
        }

        reader.readAsDataURL(e.target.files[0]);
    }

    function fomatarData(data){
        return `${data.getDate() < 10 ? "0"+data.getDate() : data.getDate()}`+"/"+`${data.getMonth()+1 < 10 ? "0"+data.getMonth()+1 : data.getMonth()+1}`+"/"+data.getFullYear();
    }



    async function handleAddImage(){
        setTexto("Adicionando")
        setDesabilitar(true);
        if(titulo != "" && image != vazio){
            await axios.post(`http://localhost:8080/u/${usuario_id}/galeria`, {
                galeria_id: usuario_id,
                imagem: image,
                titulo: titulo,
                data_publicacao: fomatarData(new Date()),
                favorito: false,
            }).then((response)=>{
                console.log(response.data);
                setGaleria([...galeria, response.data]);
                setOption(0)
                setImage(vazio)
            }).catch((erro)=>{
                console.log(erro);
            })
        }
        else{
            alert("Informe os dados necessarios")
        }
        setTexto("Adicionar");
        setDesabilitar(false);
        
    }


    return(
        <div className="bg-gray-700 w-[90vw] sm:w-[80vw] animate-focusIn mt-0 rounded-md px-4 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center py-10">
                <h1 className="text-3xl font-bold text-gray-100">Insira uma imagem</h1>
                <label htmlFor="imagem" className="my-4 hover:border-gray-300 border-[2.5px] border-transparent">
                <input 
                    type="file" 
                    id="imagem"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {previewImage(e)}}
                    multiple
                 />
                 <img src={image} alt="" className='h-[250px] sm:h-[60vh] w-[70vw] sm:w-[45vw]' />
                </label>
                <div className='flex gap-2 items-center justify-center'>
                    <input onChange={(e) => (setTitulo(e.target.value))} type="text" placeholder='Titulo da imagem' required={true} className='bg-gray-500 py-2 outline-none focus:border-[2.5px] border-[2.5px] rounded-sm text-center sm:w-[40vw] hover:border-purple-600 focus:border-purple-600 border-transparent'/>
                    <button disabled={desabilitar} onClick={handleAddImage} type="submit" className="flex items-center justify-center bg-violet-700 disabled:bg-violet-900 text-gray-100 hover:bg-violet-600 p-3 w-auto rounded-md text-sm uppercase font-semibold">
                        {texto} {desabilitar && <div className="ml-2 border-[4px] border-violet-400 border-t-violet-600 rounded-full h-6 w-6 animate-spin z-10"/>}
                    </button>
                </div>
                
            </div>
        </div>
    );
}
