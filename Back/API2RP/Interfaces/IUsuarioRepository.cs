using API2RP.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API2RP.Interfaces
{
    public interface IUsuarioRepository
    {
        Usuario Login(string email, string senha);
        List<Usuario> ListarUsuarios();
        Usuario ListarPorId(int id);
        void Cadastrar(Usuario novoUsario);
        void AlterarTudo(int id, Usuario usuarioAtt);
        void AlterarPropriasInformacoes(int id, Usuario usuarioAtt);
        void Excluir(int id);

    }
}
