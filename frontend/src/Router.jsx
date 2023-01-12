import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Imagem } from './pages/Imagem';

export function Router(){
    return (
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/u/:usuario_id/galeria' element={<Home/>}/>
            <Route path='/u/:usuario_id/galeria/imagem/:imagem_id' element={<Imagem/>}/>
            <Route path='/signup' element={<Signup/>}/>
        </Routes>
    );
}