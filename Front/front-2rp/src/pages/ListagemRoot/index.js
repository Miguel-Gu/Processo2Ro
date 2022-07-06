import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cabecalho from '../../components/Cabecalho';

export default function ListagemRoot(){
    let navigation = useNavigate();
    const [listaUsuario, setListaUsuarios] = useState([]);

    const [msg, setMsg] = useState('');

    function ListarUsuarios() {
        axios('https://localhost:5001/api/Usuarios/ListarUsuarios', {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(response => {
            if  (response.status === 200) {
                setMsg('');
                setListaUsuarios(response.data);
            }
        })
        .catch(() => {
            setMsg('Erro ao buscar Dados. Por favor, tente recarregar a página.');
        });
    }

    function Excluir(idUsuario) {

        axios.delete('https://localhost:5001/api/Usuarios/Excluir/'+ idUsuario, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        })
        .then(response => {
            if (response.status === 204) {
                window.location.reload();
            }
        })
        .catch(() => {
            setMsg('Erro ao excluir usuário.')
        })
    }

    function Editar(idUsuario) {
        localStorage.setItem('idUsuario', idUsuario);
        navigation('/atualizartudooutro');
    }

    useEffect(ListarUsuarios, []);

    return (
        <div className='telaListagem'>
            <Cabecalho/>
            <main>
                <div className='quadrado_listagem'>

                    <h1>Usuários</h1>
                    <p>{msg}</p>
                    {
                        // eslint-disable-next-line
                        listaUsuario.map((usuario) => {

                            if (usuario.idTipoUsuario === 1)
                            {
                                return(
                                    <table key={usuario.idUsuario} className='info_usuario'>
                                        <tbody>
                                            <tr>
                                                <th>Nome: </th>
                                                <td>{usuario.nome}</td>
                                            </tr>
                                            <tr>
                                                <th>Email: </th>
                                                <td>{usuario.email}</td>
                                            </tr>
                                            <tr>
                                                <th>Tipo: </th>
                                                <td>Geral</td>
                                            </tr>
                                            <tr>
                                                <th>Status: </th>
                                                <td>{usuario.status}</td>
                                            </tr>
                                        </tbody>
                                        <div>
                                            <button className='button_editar' onClick={() => Editar(usuario.idUsuario)}>Editar</button>
                                            <button className='button_excluir' onClick={() => Excluir(usuario.idUsuario)}>Excluir</button>
                                        </div>
                                    </table>
                                )
                            }
                            else if (usuario.idTipoUsuario === 2)
                            {
                                return(
                                    <table key={usuario.idUsuario} className='info_usuario'>
                                        <tbody>
                                            <tr>
                                                <th>Nome: </th>
                                                <td>{usuario.nome}</td>
                                            </tr>
                                            <tr>
                                                <th>Email: </th>
                                                <td>{usuario.email}</td>
                                            </tr>
                                            <tr>
                                                <th>Tipo: </th>
                                                <td>Admin</td>
                                            </tr>
                                            <tr>
                                                <th>Status: </th>
                                                <td>{usuario.status}</td>
                                            </tr>
                                        </tbody>
                                        <div>
                                            <button className='button_editar' onClick={() => Editar(usuario.idUsuario)}>Editar</button>
                                            <button className='button_excluir' onClick={() => Excluir(usuario.idUsuario)}>Excluir</button>
                                        </div>
                                    </table>
                                )
                            }
                            else if (usuario.idTipoUsuario === 3)
                            {
                                return(
                                    <table key={usuario.idUsuario} className='info_usuario'>
                                        <tbody>
                                            <tr>
                                                <th>Nome: </th>
                                                <td>{usuario.nome}</td>
                                            </tr>
                                            <tr>
                                                <th>Email: </th>
                                                <td>{usuario.email}</td>
                                            </tr>
                                            <tr>
                                                <th>Tipo: </th>
                                                <td>Root</td>
                                            </tr>
                                            <tr>
                                                <th>Status: </th>
                                                <td>{usuario.status}</td>
                                            </tr>
                                        </tbody>
                                        <div>
                                            <button className='button_editar' onClick={() => Editar(usuario.idUsuario)}>Editar</button>
                                            <button className='button_excluir' onClick={() => Excluir(usuario.idUsuario)}>Excluir</button>
                                        </div>
                                    </table>
                                )
                            }
                        })
                    }
                </div>
            </main>
        </div>
    )
}