import { useEffect, useState } from 'react';
import axios from 'axios';
import Cabecalho from '../../components/Cabecalho';

export default function AtualizarTudoOutro(){
    
    const [usuario, setUsuario] = useState([]);
    const [msg, setMsg] = useState('');
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');
    const [status, setStatus] = useState('');
    let idUsuario = localStorage.getItem('idUsuario');;

    function BuscarUsuario(){

        axios('https://localhost:5001/api/Usuarios/ListarPorId/' + idUsuario, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(response => {
            if (response.status === 200) {
                setMsg('');
                setUsuario(response.data);
            }
        })
        .catch(() => {
            setMsg('Erro ao buscar Dados. Por favor, tente recarregar a página.');
        });
    }

    function Atualizar(event){
        event.preventDefault();
        setMsg('Carregando');

        axios.patch('https://localhost:5001/api/Usuarios/AlterarTudo/'+ idUsuario, {
            idTipoUsuario: tipo,
            nome: nome,
            email: email,
            status: status
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        })
        .then((resposta) => {
            if (resposta.status === 204) {
                setMsg('Usuário Atualizado Com Sucesso');
                setTimeout(() => {window.location.reload()}, 5000)
            }
        })
        .catch((erro) => {
            setMsg('Erro ao atualizar usuário. Tente novamente, por favor.')
            setTimeout(() => {window.location.reload()}, 5000)
        })
    }

    useEffect(BuscarUsuario, [])

    return (
        <div className='telaCadastro'>
            <Cabecalho/>
            <main>
                <div className='quadrado_cadastro'>
                    <h1>Atualizar Usuário</h1>
                    <p>{msg}</p>
                    <form onSubmit={(event => Atualizar(event))}>
                        <input type="name" placeholder={usuario.nome} value={nome} onChange={(event) => setNome(event.target.value)}></input>

                        <input type="email" placeholder={usuario.email} value={email} onChange={(event) => setEmail(event.target.value)}></input>

                        <select value={tipo} onChange={(event) => setTipo(event.target.value)}>
                            <option hidden>tipo</option>
                            <option value={1}>Geral</option>
                            <option value={2}>Admin</option>
                            <option value={3}>Root</option>
                        </select>

                        <select value={status} onChange={(event) => setStatus(event.target.value)}>
                            <option hidden>Status</option>
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                        </select>

                        <button type="submit">Atualizar</button>
                    </form>
                </div>
            </main>
        </div>
    )
}