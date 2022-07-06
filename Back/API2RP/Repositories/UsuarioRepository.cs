using API2RP.Contexts;
using API2RP.Domains;
using API2RP.Interfaces;
using API2RP.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API2RP.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly RpContext ctx;

        public UsuarioRepository(RpContext appContext)
        {
            ctx = appContext;
        }

        public Usuario Login(string email, string senha)
        {
            var usuario = ctx.Usuarios.FirstOrDefault(u => u.Email == email);

            if (usuario != null)
            {
                if (usuario.Senha.Length != 60 && usuario.Senha[0].ToString() != "$")
                {
                    if (senha == usuario.Senha)
                    {
                        usuario.Senha = Criptografia.GerarHash(usuario.Senha);
                        ctx.Usuarios.Update(usuario);
                        ctx.SaveChanges();
                        return usuario;
                    }
                    else
                    {
                        return null;
                    }
                }

                if (Criptografia.CompararSenha(senha, usuario.Senha))
                {
                    return usuario;
                }
            }

            return null;
        }

        public List<Usuario> ListarUsuarios()
        {
            return ctx.Usuarios.ToList();
        }

        public Usuario ListarPorId(int id)
        {
            return ctx.Usuarios.FirstOrDefault(e => e.IdUsuario == id);
        }

        public void Cadastrar(Usuario novoUsario)
        {
            ctx.Usuarios.Add(novoUsario);
            ctx.SaveChanges();
        }

        public void AlterarTudo(int id, Usuario usuarioAtt)
        {
            Usuario usuarioBuscado = ListarPorId(id);

            if (usuarioBuscado != null)
            {
                usuarioBuscado.IdTipoUsuario = usuarioAtt.IdTipoUsuario;
                usuarioBuscado.Nome = usuarioAtt.Nome;
                usuarioBuscado.Email = usuarioAtt.Email;
                usuarioBuscado.Status = usuarioAtt.Status;
                ctx.Usuarios.Update(usuarioBuscado);
                ctx.SaveChanges();
            }
        }

        public void AlterarPropriasInformacoes(int id, Usuario usuarioAtt)
        {
            Usuario usuarioBuscado = ListarPorId(id);

            if (usuarioBuscado != null)
            {
                usuarioBuscado.Nome = usuarioAtt.Nome;
                usuarioBuscado.Email = usuarioAtt.Email;
                usuarioBuscado.Senha = usuarioAtt.Senha;
                ctx.Usuarios.Update(usuarioBuscado);
                ctx.SaveChanges();
            }
        }

        public void Excluir(int id)
        {
            ctx.Usuarios.Remove(ListarPorId(id));
            ctx.SaveChanges();
        }
    }
}
