CREATE TABLE projetos (
	id SERIAL PRIMARY KEY,
	nome VARCHAR (150) NOT NULL,
	descricao TEXT NOT NULL,
	tecnologias TEXT[] NOT NULL
);