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
idComent int primary key auto_increment,
fkUsuario int,
foreign key (fkUsuario) references usuario (id),
comentario varchar (200)
);

-- pre apresentacao
insert into usuario values
(null, 'Alan', 'alan@gmail.com', '1234'),
(null, 'Diego', 'diego@gmail.com', '1234'),
(null, 'Sara', 'sara@gmail.com', '1234');

insert into quiz values 
(null, 1, 3, 50),
(null, 2, 2, 30),
(null, 3, 4, 20);


-- select nome, max(pontos) as 'Pontuação max' from quiz join usuario on id = fkUsuario group by nome limit 5;
-- select nome, pontos from quiz join usuario on id = fkUsuario where id = 3
-- select nome, max(pontos) as pontos from quiz join usuario on id = fkUsuario group by pontos limit 5;

-- select da listagem/grafico
select u.nome, q.pontos from usuario u join quiz q on fkUsuario = id order by q.pontos desc limit 10;

-- selects
select count(comentario) as 'quantidade de comentários', usuario.nome 
from comentario join usuario on fkUsuario = id where fkUsuario = 1;