CREATE DATABASE PROCESSO_2RP;

USE PROCESSO_2RP;

CREATE TABLE TIPOUSUARIO(
idTipoUsuario TINYINT PRIMARY KEY IDENTITY NOT NULL,
nomeTipoUsuario VARCHAR(256) UNIQUE NOT NULL
);
GO

CREATE TABLE USUARIO(
idUsuario INT PRIMARY KEY IDENTITY NOT NULL,
idTipoUsuario TINYINT FOREIGN KEY REFERENCES TIPOUSUARIO(idTipoUsuario) NOT NULL,
nome VARCHAR(100) NOT NULL,
email VARCHAR(256) NOT NULL,
senha VARCHAR(62) NOT NULL,
status VARCHAR(7) NOT NULL
);
GO

INSERT INTO tipoUsuario (nomeTipoUsuario)
VALUES ('geral'),('admin'),('root');
GO

INSERT INTO usuario (idTipoUsuario, nome, email, senha, status)
VALUES  ('3', 'Gustavo Miguel', 'gumiguel390@gmail.com', 'SenhaGustavo', 'ativo'),
		('1', 'Fabio Miguel', 'fabiomiguel618@gmail.com', 'SenhaFabio', 'ativo'),
		('2', 'Susana Maria', 'susannaaraujo@hotmail.com', 'SenhaSusana', 'ativo'),
		('2', 'Helena Araujo', 'helenaaraujo@hotmail.com', 'SenhaHelena', 'ativo'),
		('3', 'Leticia Santos', 'lesantos@outlook.com', 'SenhaLeticia', 'ativo'),
		('3', 'Mariana Santos', 'marisantos@outlook.com', 'SenhaMari', 'ativo');
GO

SELECT * FROM tipoUsuario
SELECT * FROM usuario