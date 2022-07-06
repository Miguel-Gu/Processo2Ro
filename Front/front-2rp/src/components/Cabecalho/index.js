import { parseJwt } from '../../services/auth';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/2rpnet-1627595561-principalpng.png'

export default function Cabecalho(){

    let navigation = useNavigate();

    function logout() {
        localStorage.clear();
        navigation('/');
    }


    if (parseJwt().IdTipoUsuario === '1')
    {
        return (
            <header>
                <img src={logo} alt="logo da 2RP net Data-driven company"/>
                <Link to="/atualizarminhas">Atualizar Meu Perfil</Link>
                <button onClick={logout}>Logout</button>
            </header>
        )
    }
    else if (parseJwt().IdTipoUsuario === '2')
    {
        return (
            <header>
                <img src={logo} alt="logo da 2RP net Data-driven company"/>
                <Link to="/cadastro">Cadastrar Usuário</Link>
                <Link to="/atualizarminhas">Atualizar Meu Perfil</Link>
                <Link to="/listagemadmin">Lista de Usuarios</Link>
                <button onClick={logout}>Logout</button>
            </header>
        )
    }
    else if (parseJwt().IdTipoUsuario === '3')
    {
        return (
            <header>
                <img src={logo} alt="logo da 2RP net Data-driven company"/>

                <Link to="/cadastro">Cadastrar Usuário</Link>
                <Link to="/atualizarminhas">Atualizar Meu Perfil</Link>
                <Link to="/listagemroot">Lista de Usuarios</Link>
                <button onClick={logout}>Logout</button>
            </header>
        )
    }
}