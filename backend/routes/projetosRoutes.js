const { listarProjetos, criarProjeto, atualizarProjeto, excluirProjeto } = require('../controllers/projetosController');

function projetosRoutes(req, res) {

    if (req.url === "/api/projetos" && req.method === "GET") {

        listarProjetos(req, res);

        return true;
    }

    if (req.url === "/api/projetos" && req.method === "POST") {
        criarProjeto(req, res);
        return true;
    
    }

    if (req.url.startsWith("/api/projetos/") && req.method === "PUT") {
        atualizarProjeto(req, res);
        return true;
    }

    if (req.url.startsWith("/api/projetos/") && req.method === "DELETE") {
        excluirProjeto(req, res);
        return true;
    }

    return false;
}

module.exports = projetosRoutes