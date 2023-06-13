-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/
CREATE DATABASE gamers;

USE gamers;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
);

CREATE TABLE personagem (
	idPersonagem INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45),
	habilidade VARCHAR(45)
)AUTO_INCREMENT = 100;

INSERT INTO personagem VALUES
	(NULL, 'Alok', 'DJ MUNDIALMENTE'),
	(NULL, 'LAURA', 'AGENTE ESPECIAL'),
	(NULL, 'A-PATROA', 'CHEFE DA MÚSICA'),
	(NULL, 'KELLY', 'VELOCISTA DE PISTA'),
	(NULL, 'SANTINO', 'DESIGNER DE MODA'),
	(NULL, 'MAXIM', 'COMEDOR DE COGUMELO');
    
CREATE TABLE votar (
    fkUsuario INT,
    fkPersonagem INT,
    PRIMARY KEY (fkUsuario, fkPersonagem),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id),
    FOREIGN KEY (fkPersonagem) REFERENCES personagem(idPersonagem)
);

select personagem.nome, count(fkPersonagem)'Votos' from votar 
			join personagem on personagem.idPersonagem = votar.fkPersonagem
						group by fkPersonagem;
	