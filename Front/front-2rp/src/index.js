import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Login from './pages/Login';
import ListagemAdmin from './pages/ListagemAdmin';
import ListagemRoot from './pages/ListagemRoot';
import AtualizarTudoOutro from './pages/AtualizarTudoOutro';
import AtualizarMinhas from './pages/AtualizarMinhas';
import Cadastro from './pages/Cadastro';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/listagemadmin' element={<ListagemAdmin/>}/>
        <Route path='/listagemroot' element={<ListagemRoot/>}/>
        <Route path='/atualizartudooutro' element={<AtualizarTudoOutro/>}/>
        <Route path='/atualizarminhas' element={<AtualizarMinhas/>}/>
        <Route path='cadastro' element={<Cadastro/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
