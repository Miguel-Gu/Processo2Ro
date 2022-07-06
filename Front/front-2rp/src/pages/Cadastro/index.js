import { useState } from 'react';
import axios from 'axios';
import Cabecalho from '../../components/Cabecalho';

export default function Cadastro(){
    
    const [msg, setMsg] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');

    function Cadastrar(event){
        event.preventDefault();
        setMsg('Carregando');

        axios.post('https://localhost:5001/api/Usuarios/Cadastrar', {
            idTipoUsuario: tipo,
            nome: nome,
            email: email,
            senha: senha,
            status: "ativo"
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        })
        .then((resposta) => {
            if (resposta.status === 201) {
                setMsg('Usuário Cadastrado Com Sucesso');
                setTimeout(() => {window.location.reload()}, 5000)
            }
        })
        .catch((erro) => {
            setMsg('Erro ao cadastrar usuário. Tente novamente, por favor.')
            setTimeout(() => {window.location.reload()}, 5000)
        })


    }

    return (
        <div className='telaCadastro'>
            <Cabecalho/>
            <main>
                <div className='quadrado_cadastro'>
                    <h1>Cadastrar Usuário</h1>
                    <p>{msg}</p>
                    <form onSubmit={(event => Cadastrar(event))}>
                        <input type="name" placeholder="nome" value={nome} onChange={(event) => setNome(event.target.value)}></input>

                        <input type="email" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)}></input>
                        <input type="password" placeholder="senha" value={senha} onChange={(event) => setSenha(event.target.value)}></input>

                        <select value={tipo} onChange={(event) => setTipo(event.target.value)}>
                            <option hidden>tipo</option>
                            <option value={1}>Geral</option>
                            <option value={2}>Admin</option>
                            <option value={3}>Root</option>
                        </select>

                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </main>
        </div>
    )
}