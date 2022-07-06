import { useEffect, useState } from 'react';
import { parseJwt } from '../../services/auth';
import axios from 'axios';
import Cabecalho from '../../components/Cabecalho';

export default function AtualizarMinhas(){
    
    const [usuario, setUsuario] = useState([]);
    const [msg, setMsg] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');

    function BuscarUsuario(){

        axios('https://localhost:5001/api/Usuarios/ListarPorId/' + parseJwt().jti, {
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

        axios.patch('https://localhost:5001/api/Usuarios/AlterarPropriasInformacoes/'+ parseJwt().jti, {
            nome: nome,
            email: email,
            senha : senha
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        })
        .then((resposta) => {
            if (resposta.status === 204) {
                setMsg('Perfil Atualizado Com Sucesso');
                setTimeout(() => {window.location.reload()}, 5000)
            }
        })
        .catch((erro) => {
            setMsg('Erro ao atualizar perfil. Tente novamente, por favor.')
            setTimeout(() => {window.location.reload()}, 5000)
        })
    }

    useEffect(BuscarUsuario, [])

    return (
        <div className='telaCadastro'>
            <Cabecalho/>
            <main>
                <div className='quadrado_cadastro'>
                    <h1>Atualizar Meu Perfil</h1>
                    <p>{msg}</p>
                    <form onSubmit={(event => Atualizar(event))}>
                        <input type="name" placeholder={usuario.nome} value={nome} onChange={(event) => setNome(event.target.value)}></input>
                        <input type="email" placeholder={usuario.email} value={email} onChange={(event) => setEmail(event.target.value)}></input>
                        <input type="text" placeholder='senha' value={senha} onChange={(event => setSenha(event.target.value))}></input>
                        <button type="submit">Atualizar</button>
                    </form>
                </div>
            </main>
        </div>
    )
}