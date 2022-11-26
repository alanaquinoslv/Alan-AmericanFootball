-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

CREATE DATABASE football;
USE football;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
);

create table quiz (
idQuiz int primary key auto_increment,
fkUsuario int,
foreign key (fkUsuario) references usuario(id),
acertos int,
pontos int
);

create table comentario (
idComent varchar (45),
fkUsuario int,
foreign key (fkUsuario) references usuario (id),
comentario varchar (200)
);


select nome, max(pontos) as 'Pontuação max' from quiz join usuario on id = fkUsuario group by nome limit 5;
select nome, pontos from quiz join usuario on id = fkUsuario where id = 3




