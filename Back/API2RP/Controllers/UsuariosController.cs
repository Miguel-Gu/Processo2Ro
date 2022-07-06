using API2RP.Domains;
using API2RP.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API2RP.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuariosController(IUsuarioRepository repo)
        {
            _usuarioRepository = repo;
        }

        /// <summary>
        /// Lista todos os usuários
        /// </summary>
        /// <returns>Uma lista de usuários</returns>
        [Authorize(Roles = "2,3")]
        [HttpGet("ListarUsuarios")]
        public IActionResult ListarUsuarios()
        {
            try
            {
                return Ok(_usuarioRepository.ListarUsuarios());
            }
            catch (Exception error)
            {
                return BadRequest(new
                {
                    mensagem = "Erro ao listar usuários",
                    error
                });
            }
        }

        /// <summary>
        /// Lista um usuário através do id dele
        /// </summary>
        /// <param name="id">id do usuário a ser buscado</param>
        /// <returns>Um usuário buscado</returns>
        [HttpGet("ListarPorId/{id}")]
        public IActionResult ListarPorId(byte id)
        {
            try
            {
                return Ok(_usuarioRepository.ListarPorId(id));
            }
            catch (Exception error)
            {
                return BadRequest(new
                {
                    mensagem = "Erro ao listar usuário",
                    error
                });
            }
        }


        /// <summary>
        /// Cadastra um novo usuário
        /// </summary>
        /// <param name="novoUsuario">Novo usuário a ser cadastrado</param>
        /// <returns></returns>
        [Authorize(Roles = "2,3")]
        [HttpPost("Cadastrar")]
        public IActionResult Cadastrar(Usuario novoUsuario)
        {
            _usuarioRepository.Cadastrar(novoUsuario);
            return StatusCode(201);
        }

        /// <summary>
        /// Altera as informações do usuário
        /// </summary>
        /// <param name="id">id do usuário a ser alterado</param>
        /// <param name="usuarioAtt">usuário com as informacoes atualizadas</param>
        /// <returns></returns>
        [Authorize(Roles = "2,3")]
        [HttpPatch("AlterarTudo/{id}")]
        public IActionResult AlterarTudo(int id, Usuario usuarioAtt)
        {
            _usuarioRepository.AlterarTudo(id, usuarioAtt);
            return StatusCode(204);
        }

        /// <summary>
        /// Altera as informações do usuário
        /// </summary>
        /// <param name="id">id do usuário a ser alterado</param>
        /// <param name="usuarioAtt">usuário com as informacoes atualizadas</param>
        /// <returns></returns>
        [HttpPatch("AlterarPropriasInformacoes/{id}")]
        public IActionResult AlterarPropriasInformacoes(int id, Usuario usuarioAtt)
        {
            _usuarioRepository.AlterarPropriasInformacoes(id, usuarioAtt);
            return StatusCode(204);
        }

        /// <summary>
        /// Exclui um usuário
        /// </summary>
        /// <param name="id">id do usuário a ser excluido</param>
        /// <returns></returns>
        [Authorize(Roles = "3")]
        [HttpDelete("Excluir/{id}")]
        public IActionResult Excluir(int id)
        {
            _usuarioRepository.Excluir(id);
            return StatusCode(204);
        }
    }
}
