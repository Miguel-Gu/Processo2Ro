import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from '../../services/auth';
import axios from 'axios';
import logo from '../../assets/2rpnet-1627595561-principalpng.png';

export default function Login(){

    let navigation = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [msg, setMsg] = useState('');

    function efetuaLogin(event) {

        event.preventDefault();
        setMsg('Carregando');

        axios
            .post('https://localhost:5001/api/Login', {
                email: email,
                senha: senha,
            })
            .then((resposta) => {

                if  (resposta.status === 200) {
                    localStorage.setItem('usuario-login', resposta.data.token);

                    if (parseJwt().IdTipoUsuario === '1') {
                        navigation('/atualizarminhas');
                    }
                    else if (parseJwt().IdTipoUsuario === '2') {
                        navigation('/listagemadmin');
                    }
                    else if (parseJwt().IdTipoUsuario === '3'){
                        navigation('/listagemroot');
                    }
                }
                
            })
            .catch(() => {
                setMsg('E-mail e/ou senha inválidos');
            });
    }

    return (
        <div className='telaLogin'>
            <main>
                <div className='quadrado_login'>
                    <form onSubmit={(event) => efetuaLogin(event)}>
                        <img src={logo} alt="logo da 2RP net Data-driven company"/>

                        <p>{msg}</p>

                        <input type="email" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)}></input>
                        <input type="password" placeholder="senha" value={senha} onChange={(event) => setSenha(event.target.value)}></input>

                        <button type="submit">Entrar</button>
                    </form>
                </div>
            </main>
        </div>
    )
}