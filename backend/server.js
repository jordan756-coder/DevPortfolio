require('dotenv').config();
const http = require('http');

const projetosRoutes = require('./routes/projetosRoutes');

const server = http.createServer((req, res) => {

    
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.statusCode = 204;
        res.end();
        return;
    }


    if (req.url === '/') {

        res.end('Olá! Bem-vindo ao meu DevPortfolio.');

    }

    else if (req.url === '/sobre') {

        res.end('Olá! Sou um desenvolvedor em busca da minha primeira oportunidade.');

    }

    else if (req.url === '/projetos') {

        res.end('Aqui estarão meus projetos.');

    }

    else if (projetosRoutes(req, res)) {

        return;

    }

    else {

        res.statusCode = 404;
        res.end('Erro 404: Página não encontrada.');

    }

});

server.listen(3000, () => {

    console.log('Servidor rodando em http://localhost:3000');

});